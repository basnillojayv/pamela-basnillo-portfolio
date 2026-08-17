import { NextResponse } from 'next/server'
import copy from '@/content/copy.json'
import { applyEdits } from '@/lib/applyEdits'
import { idForPath } from '@/lib/media'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** TEMPORARY: exercises applyEdits against the real content document. */
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'not available' }, { status: 404 })
  }

  const results: { name: string; pass: boolean; detail: string }[] = []
  const check = (name: string, pass: boolean, detail: string) =>
    results.push({ name, pass, detail })

  const fresh = () => JSON.parse(JSON.stringify(copy)) as Record<string, unknown>
  const at = (doc: unknown, path: string) =>
    path.split('.').reduce<unknown>((n, k) => (n as Record<string, unknown>)?.[k], doc)

  // 1. plain prose
  {
    const doc = fresh()
    const n = applyEdits(doc, [{ key: 'copy.about.lead', value: 'NEW LEAD' }])
    check('prose write', n === 1 && at(doc, 'about.lead') === 'NEW LEAD', `count=${n}`)
  }

  // 2. nested list row
  {
    const doc = fresh()
    const n = applyEdits(doc, [{ key: 'copy.services.2.items.1.text', value: 'NEW ITEM' }])
    check(
      'list row write',
      n === 1 && at(doc, 'services.2.items.1.text') === 'NEW ITEM',
      `count=${n}`,
    )
  }

  // 3. icon choice
  {
    const doc = fresh()
    const n = applyEdits(doc, [{ key: 'copy.services.0.icon', value: '/icon/ai.webp' }])
    check('icon write', n === 1 && at(doc, 'services.0.icon') === '/icon/ai.webp', `count=${n}`)
  }

  // 4. photograph swap: numeric id in, public path out
  {
    const doc = fresh()
    const target = '/work/ad-05.webp'
    const n = applyEdits(doc, [
      { key: 'copy.collections.0.images.0.src', value: idForPath(target) },
    ])
    check(
      'image swap by id',
      n === 1 && at(doc, 'collections.0.images.0.src') === target,
      `count=${n} src=${at(doc, 'collections.0.images.0.src')}`,
    )
  }

  // 5. unknown media id writes nothing
  {
    const doc = fresh()
    const before = at(doc, 'collections.0.images.0.src')
    const n = applyEdits(doc, [{ key: 'copy.collections.0.images.0.src', value: 424242 }])
    check(
      'unknown media id ignored',
      n === 0 && at(doc, 'collections.0.images.0.src') === before,
      `count=${n}`,
    )
  }

  // 6. media alt fans out to the row using that file
  {
    const doc = fresh()
    const src = at(doc, 'collections.1.images.3.src') as string
    const n = applyEdits(doc, [{ key: `media.${idForPath(src)}.alt`, value: 'NEW ALT' }])
    check(
      'media alt fan-out',
      n === 1 && at(doc, 'collections.1.images.3.alt') === 'NEW ALT',
      `count=${n}`,
    )
  }

  // 7. swap + alt in one batch: alt must follow the NEW picture
  {
    const doc = fresh()
    const target = '/work/reel-03.webp'
    const n = applyEdits(doc, [
      { key: 'copy.collections.0.images.2.src', value: idForPath(target) },
      { key: `media.${idForPath(target)}.alt`, value: 'FOLLOWED' },
    ])
    check(
      'swap then alt, same batch',
      n === 2 &&
        at(doc, 'collections.0.images.2.src') === target &&
        at(doc, 'collections.0.images.2.alt') === 'FOLLOWED',
      `count=${n} alt=${at(doc, 'collections.0.images.2.alt')}`,
    )
  }

  /**
   * 8. Keys that exist in the document but are NOT in the schema.
   *
   * The dangerous case: setPath would happily write every one of these,
   * because the key really is there. Only the allowlist stops them.
   */
  {
    const doc = fresh()
    const n = applyEdits(doc, [
      { key: 'copy.profile.email', value: 'attacker@example.com' },
      { key: 'copy.profile.phone', value: '+00 000' },
      { key: 'copy.profile.phoneHref', value: '+00000' },
      { key: 'copy.profile.name', value: 'Someone Else' },
      { key: 'copy.collections.0.images.0.w', value: 1 },
      { key: 'copy.collections.0.images.0.alt', value: 'direct alt write' },
    ])
    check(
      'in-document but unschemad refused',
      n === 0 && JSON.stringify(doc) === JSON.stringify(copy),
      `count=${n} email=${at(doc, 'profile.email')}`,
    )
  }

  // 9. paths that do not exist at all
  {
    const doc = fresh()
    const n = applyEdits(doc, [
      { key: 'copy.collections.0.id', value: 'hacked' },
      { key: 'copy.nope.gone.0.text', value: 'x' },
      { key: 'copy.about.body.99.text', value: 'x' },
      { key: 'media.999999.alt', value: 'x' },
      { key: '__proto__.polluted', value: 'x' },
    ])
    check(
      'absent + unknown-media paths refused',
      n === 0 &&
        JSON.stringify(doc) === JSON.stringify(copy) &&
        ({} as Record<string, unknown>).polluted === undefined,
      `count=${n}`,
    )
  }

  // 10. positive control: a legitimate batch still applies in full
  {
    const doc = fresh()
    const n = applyEdits(doc, [
      { key: 'copy.sections.hero.greeting', value: 'A' },
      { key: 'copy.sections.contact.cta', value: 'B' },
      { key: 'copy.about.motto.2.text', value: 'C' },
    ])
    check(
      'legitimate batch applies',
      n === 3 &&
        at(doc, 'sections.hero.greeting') === 'A' &&
        at(doc, 'sections.contact.cta') === 'B' &&
        at(doc, 'about.motto.2.text') === 'C',
      `count=${n}`,
    )
  }

  // 9. document stays canonical after a write
  {
    const doc = fresh()
    applyEdits(doc, [{ key: 'copy.about.lead', value: 'X' }])
    const serialised = JSON.stringify(doc, null, 2) + '\n'
    check(
      'round-trips canonically',
      serialised === JSON.stringify(JSON.parse(serialised), null, 2) + '\n',
      `${serialised.length} bytes`,
    )
  }

  return NextResponse.json(
    { passed: results.filter((r) => r.pass).length, of: results.length, results },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
