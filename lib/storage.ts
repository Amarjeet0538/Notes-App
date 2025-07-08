/*import { Note } from "./types";
const STORAGE_KEY = "notes";

export function loadNote(): Note[] {
  if (typeof window === "undefined") return [];

  const savedNotes = localStorage.getItem(STORAGE_KEY);

  if (savedNotes) {
    try {
      return JSON.parse(savedNotes);
    } catch (error) {
      console.log("Failed to parse ", error);
      return [];
    }
  }
  return [];
}

export function saveNotes(notes: Note[]): void {
  if (typeof window === "undefined") return;
  return localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
  */



import { Note } from "./types";
import { noteApi } from "./api";

export async function loadNote(): Promise<Note[]> {
  try{
    return await noteApi.getAllNotes();
  }catch(error){
    console.error("Error loading notes:", error);
    return [];
  }
}

export async function saveNotes(noteData: {
  title: string;
  content: string;
}): Promise<Note> {
  try {
    return await noteApi.createNote(noteData);

  } catch (error) {
    console.error("Error saving note:", error);
    throw error;
  }
}

export async function updateNotes(note : Note): Promise<Note> {
  try {
    return await noteApi.updateNote(note.id, {
      title: note.title,
      content: note.content,
    });

  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
}

export async function deleteNotes(id:string): Promise<void> {
  try {
    await noteApi.deleteNote(id);
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
