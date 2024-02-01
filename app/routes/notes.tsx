import { redirect } from "@remix-run/node";
import type { LinksFunction, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getStoredNotes, storeNotes } from "~/data/notes";
import NewNote, { newNoteLinks } from "~/components/NewNote";
import NoteList, { noteListLinks } from "~/components/NoteList";
import type { INoteType } from "~/types/noteTypes";

export const links: LinksFunction = () => [
  ...newNoteLinks(),
  ...noteListLinks(),
];

export default function Notes() {
  const notes: INoteType[] = useLoaderData();

  return (
    <main id="content">
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
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
  return redirect("/notes");
}
