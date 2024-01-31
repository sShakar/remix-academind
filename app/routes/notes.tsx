import { redirect } from "@remix-run/node";
import type { LinksFunction, ActionFunctionArgs } from "@remix-run/node";
import { getStoredNotes, storeNotes } from "~/data/notes";
import NewNote, { newNoteLinks } from "~/components/NewNote";

export const links: LinksFunction = () => [...newNoteLinks()];

export default function Notes() {
  return (
    <main id="content">
      <NewNote />
    </main>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const noteData = {
    id: new Date().toISOString(),
    title: formData.get("title"),
    content: formData.get("content"),
  };

  const existingNotes = await getStoredNotes();
  const updatedNotes = [...existingNotes, noteData];
  await storeNotes(updatedNotes);
  return redirect("/");
}
