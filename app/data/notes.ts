import fs from "fs/promises";
import type { INoteType } from "~/types/noteTypes";

export async function getStoredNotes() {
  const rawFileContent = await fs.readFile("notes.json", { encoding: "utf-8" });
  const data = JSON.parse(rawFileContent);
  return data.notes ?? [];
}

export function storeNotes(notes: INoteType[]) {
  return fs.writeFile("notes.json", JSON.stringify({ notes: notes || [] }));
}
