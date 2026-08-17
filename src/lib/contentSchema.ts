import type { FieldLike } from '@/lib/inlineEdit'
import { MEDIA, humanizeFilename } from '@/lib/media'

/**
 * What may be edited on the page, and how.
 *
 * This stands in for the Payload field config the shipped walk was written
 * against. It is not optional and it is not a convenience: without it the only
 * way to decide "is this string prose?" would be to look at the value, and
 * this content has enums that read exactly like prose. `layout: "board"` is
 * five characters of plain English that selects a component. Declared fields
 * are the allowlist.
 *
 * A field absent from here is not merely undeclared, it is **unwritable** —
 * `setPath` only assigns where a key already exists on the path it walked, so
 * a forged key gets no further than a `false` return.
 */

const ICON_OPTIONS = MEDIA.filter((item) => item.kind === 'icon').map((item) => ({
  label: humanizeFilename(item.filename),
  value: item.url,
}))

/** A list rendered one row per entry. Rows are objects because the walk needs
 *  a field name to address; see the note in content.ts. */
const proseList = (name: string, type: 'text' | 'textarea' = 'text'): FieldLike => ({
  type: 'array',
  name,
  fields: [{ type, name: 'text' }],
})

export const contentSchema: FieldLike[] = [
  {
    type: 'group',
    name: 'profile',
    fields: [
      /**
       * `name` is deliberately absent. Its first text node in document order is
       * the `.sr-only` span in Nav, so an editable name would attach to
       * invisible text and none of its four visible renderings would respond.
       * Making it editable means splitting the hero `<h1>`, which is a separate
       * decision.
       *
       * `email`, `phone` and `phoneHref` are absent because each is both
       * visible text and the inside of a `mailto:`/`tel:` link — editing the
       * text alone would leave six links pointing at the old address.
       * `eligible()` would drop the first two by name anyway; this is the half
       * that also stops a forged key.
       */
      { type: 'text', name: 'role' },
      { type: 'textarea', name: 'line' },
      { type: 'text', name: 'location' },
    ],
  },

  {
    type: 'group',
    name: 'about',
    fields: [
      { type: 'textarea', name: 'lead' },
      proseList('body', 'textarea'),
      proseList('practice'),
      proseList('motto'),
    ],
  },

  {
    type: 'array',
    name: 'services',
    fields: [
      { type: 'text', name: 'title' },
      // Named exactly `icon`, which is what routes it to the picker rather
      // than to the text map.
      { type: 'select', name: 'icon', options: ICON_OPTIONS },
      proseList('items'),
    ],
  },

  {
    type: 'array',
    name: 'collections',
    fields: [
      { type: 'text', name: 'title' },
      { type: 'text', name: 'meta' },
      { type: 'textarea', name: 'blurb' },
      {
        type: 'array',
        name: 'images',
        fields: [
          // Emits an ImageRegion, so the picker can swap the photograph.
          { type: 'upload', name: 'src', relationTo: 'media' },
          /**
           * `alt` is declared for completeness and then dropped by
           * `eligible()`, which skips that name outright. It could not work
           * anyway: alt is an attribute, and the walk only ever sees text
           * nodes. Alt text stays hand-edited in copy.json.
           */
          { type: 'text', name: 'alt' },
        ],
      },
      // id, field and layout are not here, and are not in copy.json either.
    ],
  },

  {
    type: 'group',
    name: 'sections',
    fields: [
      {
        type: 'group',
        name: 'hero',
        fields: [
          { type: 'text', name: 'greeting' },
          { type: 'textarea', name: 'intro' },
          { type: 'text', name: 'takeALook' },
          { type: 'array', name: 'entrances', fields: [{ type: 'textarea', name: 'copy' }] },
        ],
      },
      /**
       * The two eyebrows below duplicate a nav label exactly ("About",
       * "Services"), and matching is by text content in document order — so
       * they depend on the nav's own labels carrying `data-edit-skip`. Without
       * those markers the nav link consumes this path and the heading quietly
       * stops responding. The status route warns if two paths ever share a
       * value, which is the cheap guard against this drifting.
       */
      {
        type: 'group',
        name: 'about',
        fields: [
          { type: 'text', name: 'eyebrow' },
          { type: 'text', name: 'practiceHeading' },
          { type: 'textarea', name: 'aside' },
        ],
      },
      {
        type: 'group',
        name: 'services',
        fields: [
          { type: 'text', name: 'eyebrow' },
          { type: 'textarea', name: 'intro' },
        ],
      },
      {
        type: 'group',
        name: 'tools',
        fields: [
          { type: 'text', name: 'eyebrow' },
          { type: 'textarea', name: 'note' },
        ],
      },
      {
        type: 'group',
        name: 'work',
        fields: [
          { type: 'text', name: 'eyebrow' },
          { type: 'textarea', name: 'intro' },
        ],
      },
      {
        type: 'group',
        name: 'contact',
        fields: [
          { type: 'text', name: 'heading' },
          { type: 'textarea', name: 'body' },
          { type: 'text', name: 'cta' },
          { type: 'text', name: 'aside' },
          // *Label, not email/phone: eligible() drops those names outright.
          { type: 'text', name: 'emailLabel' },
          { type: 'text', name: 'phoneLabel' },
          { type: 'text', name: 'locationLabel' },
        ],
      },
      { type: 'group', name: 'nav', fields: [{ type: 'text', name: 'emailLabel' }] },
    ],
  },
]
