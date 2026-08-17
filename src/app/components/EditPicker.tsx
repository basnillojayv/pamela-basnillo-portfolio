'use client'

import { useCallback, useEffect, useState } from 'react'
import { useEdit, type Region } from './EditProvider'
import { Icon } from './Icon'

/**
 * Choosing, for the things that are not sentences.
 *
 * Text is edited where it sits, because typing over a heading is the whole
 * point. A photograph and an icon are picked from a set instead, so they get a
 * panel rather than a caret.
 *
 * HOW THEY ARE FOUND
 * Not by looking. A heading can be found because its text is its identity, and
 * one picture element looks like every other one. So the components say which
 * field they are rendering, with `data-edit-key`, and this matches on that.
 *
 * WHY A BADGE AND NOT JUST A CLICK
 * Clicking the photograph was the obvious design and it does not work. The
 * ghosted images sit at `z-index:-2` (globals.css: `.why__bg`, `.footer__bg`,
 * `.divider__bg`), which paints them behind their own section — so a click
 * lands on the content above and never reaches the image at all. No amount of
 * handler on the element can catch an event that is not delivered to it.
 *
 * So each region gets a badge in a layer above the page, positioned over it.
 * That works the same whether the region is a picture element, a video, or a
 * CSS background painted behind everything, which is three cases the direct
 * click handled badly or not at all.
 */
export function EditPicker() {
  const edit = useEdit()
  const editing = Boolean(edit?.editing)
  const regions = edit?.regions
  const media = edit?.media ?? []

  const [open, setOpen] = useState<Region | null>(null)
  const [spots, setSpots] = useState<{ region: Region; top: number; left: number }[]>([])

  /**
   * Mark every region that is on this page, and keep a badge over each one.
   *
   * The registry covers three globals and the visitor is looking at one page of
   * them, so most keys will not be found here. That is expected, not an error.
   */
  useEffect(() => {
    if (!editing || !regions?.length) return

    const marked: {
      region: Region
      el: HTMLElement
      handler: (event: MouseEvent) => void
      src: string | null
    }[] = []

    for (const region of regions) {
      const el = document.querySelector<HTMLElement>(`[data-edit-key="${region.key}"]`)
      if (!el) continue

      el.classList.add('is-editable-region')

      // Still worth having for the regions that *are* hit-testable — an icon
      // responds to being clicked, which is what anyone will try first.
      const handler = (event: MouseEvent) => {
        // An icon is often inside a card that is a link. Same problem the text
        // path has, same answer.
        event.preventDefault()
        event.stopPropagation()
        setOpen(region)
      }
      el.addEventListener('click', handler, true)

      marked.push({
        region,
        el,
        handler,
        src: el instanceof HTMLImageElement ? el.src : el.style.getPropertyValue('--img') || null,
      })
    }

    /** Badge positions, in viewport coordinates because the layer is fixed. */
    const measure = () => {
      setSpots(
        marked
          .map(({ region, el }) => {
            const rect = el.getBoundingClientRect()
            return { region, rect }
          })
          // Off-screen regions get no badge — 13 of them scattered down a long
          // page would otherwise pile up at the edges.
          .filter(({ rect }) => rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0)
          .map(({ region, rect }) => ({
            region,
            top: Math.max(8, rect.top + 8),
            left: Math.max(8, rect.left + 8),
          })),
      )
    }

    measure()

    let frame = 0
    const remeasure = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(measure)
    }
    window.addEventListener('scroll', remeasure, { passive: true })
    window.addEventListener('resize', remeasure)

    /**
     * Put the page back. A staged photograph is shown immediately — otherwise
     * choosing one would appear to do nothing until after Save — and that
     * preview is a lie told to the DOM, so it is taken back when edit mode
     * ends, whether that was Cancel or a successful Save.
     */
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', remeasure)
      window.removeEventListener('resize', remeasure)

      for (const { el, handler, src } of marked) {
        el.classList.remove('is-editable-region')
        el.removeEventListener('click', handler, true)
        if (src === null) continue
        if (el instanceof HTMLImageElement) el.src = src
        else el.style.setProperty('--img', src)
      }

      setSpots([])
      setOpen(null)
    }
  }, [editing, regions])

  const close = useCallback(() => setOpen(null), [])

  if (!edit || !editing) return null

  const badges = (
    <div className="edit-spots">
      {spots.map(({ region, top, left }) => (
        <button
          key={region.key}
          className="edit-spot"
          style={{ top, left }}
          onClick={() => setOpen(region)}
        >
          {region.kind === 'image' ? 'Change photo' : 'Change icon'}
        </button>
      ))}
    </div>
  )

  if (!open) return badges

  /** What is currently chosen: the staged value if there is one, else what is saved. */
  const stagedValue = edit.pending[open.key]?.value

  const chooseImage = (id: number | string, url: string) => {
    edit.stage({ key: open.key, value: Number(id) })

    // Show it at once, in whichever way this particular image is rendered.
    const el = document.querySelector<HTMLElement>(`[data-edit-key="${open.key}"]`)
    if (el instanceof HTMLImageElement) el.src = url
    else el?.style.setProperty('--img', `url('${url}')`)
  }

  const currentMediaId =
    open.kind === 'image'
      ? stagedValue !== undefined
        ? Number(stagedValue)
        : open.mediaId
      : null

  const selected = media.find((item) => Number(item.id) === currentMediaId)
  const altKey = currentMediaId === null ? null : `media.${currentMediaId}.alt`
  const altValue =
    altKey && edit.pending[altKey] !== undefined
      ? String(edit.pending[altKey].value)
      : (selected?.alt ?? '')

  return (
    <>
      {badges}

      <div className="edit-pick" role="dialog" aria-modal="true" aria-label="Choose">
        <div className="edit-pick__scrim" onClick={close} />

        <div className="edit-pick__panel">
          <div className="edit-pick__head">
            <h2 className="edit-pick__title">{open.kind === 'image' ? open.label : 'Icon'}</h2>
            <button className="edit-pick__close" onClick={close} aria-label="Close">
              ✕
            </button>
          </div>

          {open.kind === 'icon' ? (
            <ul className="edit-pick__icons">
              {open.options.map((option) => {
                const active =
                  (stagedValue !== undefined ? stagedValue : open.value) === option.value
                return (
                  <li key={option.value}>
                    <button
                      className={`edit-pick__icon${active ? ' is-on' : ''}`}
                      onClick={() => edit.stage({ key: open.key, value: option.value })}
                      aria-pressed={active}
                    >
                      {/* The real component, so the choice looks like the result. */}
                      <Icon name={option.value} />
                      <span>{option.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <>
              {media.length === 0 && (
                <p className="edit-pick__note">
                  No photographs are available to choose from.
                </p>
              )}

              <ul className="edit-pick__grid">
                {media.map((item) => {
                  const active = Number(item.id) === currentMediaId
                  return (
                    <li key={item.id}>
                      <button
                        className={`edit-pick__shot${active ? ' is-on' : ''}`}
                        onClick={() => chooseImage(item.id, item.url)}
                        aria-pressed={active}
                      >
                        {/* Deliberately a plain picture element: these are 480px
                            thumbnails already, and routing them through the
                            optimizer to show them at 100px is work for nothing. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.url} alt={item.alt} loading="lazy" />
                      </button>
                    </li>
                  )
                })}
              </ul>

              {altKey && (
                <div className="edit-pick__alt">
                  <label htmlFor="edit-pick-alt">Description</label>
                  <input
                    id="edit-pick-alt"
                    type="text"
                    value={altValue}
                    onChange={(event) => edit.stage({ key: altKey, value: event.target.value })}
                  />
                  <p className="edit-pick__note">
                    Read aloud by screen readers, and used by search engines. It belongs to the
                    photograph itself — changing it changes the description everywhere this
                    photograph is used.
                  </p>
                </div>
              )}

              {/* There is no upload path on this site: photographs are part of
                  the repository. Saying so is better than pointing at an admin
                  panel that does not exist. */}
              <p className="edit-pick__note">
                These are the photographs already on the site. Adding a new one is a change to the
                site itself — ask your developer.
              </p>
            </>
          )}

          <button className="btn btn--dark btn--pill edit-pick__done" onClick={close}>
            Done
          </button>
        </div>
      </div>
    </>
  )
}
