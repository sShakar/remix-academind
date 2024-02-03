import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import newNoteStyles from "./NewNote.css";

export default function NewNote() {
  const navigation = useNavigation();
  const actionData = useActionData() as { message?: string } | undefined;
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" id="note-form">
      {actionData?.message && <p>{actionData.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export const newNoteLinks = () => [{ rel: "stylesheet", href: newNoteStyles }];

export function ErrorBoundary() {
  const error = useRouteError() as Error;

  return (
    <main className="error">
      <h1>An error related to your notes occurred</h1>
      <p>{error.message}</p>
      <Link to="/">Back to safety!</Link>
    </main>
  );
}
