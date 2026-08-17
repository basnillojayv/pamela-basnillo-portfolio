/**
 * The picker's icon renderer.
 *
 * `EditPicker` expects a project `Icon` component, which on a Payload site
 * draws an inline SVG from a glyph name. Here the icons are raster files in
 * `public/icon`, and the schema's option values are their paths — so `name` is
 * already the src and this is the whole component.
 *
 * Deliberately not `next/image`: these are 28px renders of files that are
 * small to begin with, inside a modal that only an editor ever opens, and the
 * optimizer would put a blurred placeholder where a crisp choice should be.
 */
export function Icon({ name, editKey }: { name: string; editKey?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={name} alt="" width={28} height={28} data-edit-key={editKey} />
  );
}
