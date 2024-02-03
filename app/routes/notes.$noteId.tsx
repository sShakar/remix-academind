import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import noteDetailsStyles from "~/styles/note-details.css";

export function NoteDetails() {
  const { slug } = useLoaderData<typeof loader>();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to notes</Link>
        </nav>
        <h1>Note Details</h1>
      </header>
      <p id="note-details-content">Here are the details of the {slug}</p>
    </main>
  );
}

export const links = () => [{ rel: "stylesheet", href: noteDetailsStyles }];

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ slug: params.noteId });
};
