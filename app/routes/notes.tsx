import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import { getStoredNotes, storeNotes } from "~/data/notes";
import NewNote, { newNoteLinks } from "~/components/NewNote";
import NoteList, { noteListLinks } from "~/components/NoteList";
import type { INoteType } from "~/types/noteTypes";

export default function Notes() {
  const notes: INoteType[] = useLoaderData();

  return (
    <main id="content">
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export const links = () => [...newNoteLinks(), ...noteListLinks()];

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json({ message: "No notes found" }, 404);
  }
  return notes;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const noteData = {
    id: new Date().toISOString(),
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  if (noteData.title?.trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long" };
  }

  const existingNotes = await getStoredNotes();
  const updatedNotes = [...existingNotes, noteData];
  await storeNotes(updatedNotes);
  // await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
  return redirect("/notes");
}

export function ErrorBoundary() {
  const error = useRouteError() as Error;

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <NewNote />
        <main className="info-message">
          <h1>No notes found</h1>
          <p>{error.message}</p>
        </main>
      </>
    );
  }

  return (
    <main className="error">
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{error.message}</pre>
    </main>
  );
}
