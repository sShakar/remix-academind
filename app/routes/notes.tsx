import type { LinksFunction } from "@remix-run/node";
import NewNote, { newNoteLinks } from "~/components/NewNote";

export const links: LinksFunction = () => [...newNoteLinks()];

export default function Notes() {
  return (
    <main id="content">
      <NewNote />
    </main>
  );
}
