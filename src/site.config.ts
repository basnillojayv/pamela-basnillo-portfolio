/**
 * Site-level facts the editor's sign-in panel needs before it knows anything
 * about the content. Kept here rather than read from copy.json because the
 * panel renders on `/edit`, which must not pull the whole content module in.
 */
export const site = {
  name: "Pamela Basnillo",
} as const;
