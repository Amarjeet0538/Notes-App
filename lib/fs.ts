import path from "path";
import fs from "fs";
import { Note } from "./types";

const filePath = path.join(process.cwd(), "data", "notes.json");

export function readNotes(): Note[] {
  const savedNotes = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(savedNotes);
}

export function writeNotes(notes: Note[]) {
  return fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

export function findNoteById(id: string): Note | null {
  const notes = readNotes();

  const foundNote = notes.find((note) => note.id === id);

  return foundNote || null;
}

export function addNote(noteData: { title: string; content: string }): Note {
  const notes = readNotes();

  const newNote: Note = {
    id: Date.now().toString(),
    title: noteData.title,
    content: noteData.content,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  notes.unshift(newNote);
  writeNotes(notes);

  return newNote;
}

export function updateNote(
  id: string,
  updates: { title?: string; content?: string }
): Note | null {
  const notes = readNotes();
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return null;
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    ...updates,
    updatedAt: Date.now(),
  };

  writeNotes(notes);

  return notes[noteIndex];
}

export function delelteNote(id: string): boolean {
  const notes = readNotes();

  const filteredNotes = notes.filter((note) => note.id !== id);

  if (filteredNotes.length === notes.length) {
    return false;
  }

  writeNotes(filteredNotes);

  return true;
}
