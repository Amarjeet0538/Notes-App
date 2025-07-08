/*"use client";
import NoteView from "@/components/notes-view";
import NotesSidebar from "@/components/notes-sidebar";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { Note } from "@/lib/types";
import NoteEditor from "@/components/note-editor";
import EmptyState from "@/components/empty-state";
import { loadNote, saveNotes } from "@/lib/storage";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isEditing, setIsEditting] = useState(false);

  useEffect(() => {
    setNotes(loadNote());
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: ``,
      createdAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setIsEditting(true);
  };

  const selectNode = (note: Note) => {
    setActiveNote(note);
    setIsEditting(false);
  };

  const cancelEdit = () => {
    setIsEditting(false);
  };

  const saveNote = (updatedNote: Note) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setActiveNote(updatedNote);
    setIsEditting(false);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));

    if (activeNote && activeNote.id === id) {
      setActiveNote(null);
    }
    setIsEditting(false);
  };

  const renderNoteContent = () => {
    if (!activeNote && notes.length === 0) {
      return (
        <EmptyState
          message="Create your first node to get started"
          buttonText="New Note"
          createNote={createNewNote}
        />
      );
    }

    if (activeNote && isEditing) {
      return (
        <NoteEditor note={activeNote} onCancel={cancelEdit} onSave={saveNote} />
      );
    }
    if (activeNote) {
      return <NoteView note={activeNote} onEdit={() => setIsEditting(true)} />;
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      <Header
        buttonFxn={createNewNote}
        heading="All Notes"
        buttonText="New Note"
      />
      <main className="container mx-auto p-4 flex h-full gap-4">
        <NotesSidebar
          notes={notes}
          createNote={createNewNote}
          onSelectNode={selectNode}
          onDeleteNote={deleteNote}
          activeNoteId={activeNote?.id}
        />
        <div className="w-full h-full"> {renderNoteContent()} </div>
      </main>
    </div>
  );
}
*/

//api use 2

"use client";
import NoteView from "@/components/notes-view";
import NotesSidebar from "@/components/notes-sidebar";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { Note } from "@/lib/types";
import NoteEditor from "@/components/note-editor";
import EmptyState from "@/components/empty-state";
import { deleteNotes, loadNote, saveNotes, updateNotes } from "@/lib/storage";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]); 
  const [activeNote, setActiveNote] = useState<Note | null>(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true); 
        const data = await loadNote(); 
        setNotes(data); 
        setError(null); 
      } catch (err) {
        setError("Failed to load notes. Please try again.");
        console.error("Error loading notes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes(); 
  }, []);

  const createNewNote = async () => {
    try {
      const newNoteData = {
        title: "New Note",
        content: "",
      };

      const savedNote = await saveNotes(newNoteData);

      setNotes([savedNote, ...notes]); 
      setActiveNote(savedNote); 
      setIsEditing(true); 
      setError(null); 
    } catch (err) {
      setError("Failed to create note. Please try again.");
      console.error("Error creating note:", err);
    }
  };

  const selectNode = (note: Note) => {
    setActiveNote(note);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveNote = async (updatedNote: Note) => {
    try {
      const savedNote = await updateNotes(updatedNote);

      const updatedNotes = notes.map((note) =>
        note.id === savedNote.id ? savedNote : note
      );
      setNotes(updatedNotes);
      setActiveNote(savedNote);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError("Failed to save note. Please try again.");
      console.error("Error saving note:", err);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await deleteNotes(id);

      const remaining = notes.filter((n) => n.id !== id);
      setNotes(remaining);

      if (activeNote?.id === id) {
        setActiveNote(null);
      }

      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError("Failed to delete note. Please try again.");
      console.error("Error deleting note:", err);
    }
  };

  const renderNoteContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500">Loading notes...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-red-500 text-center">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (!activeNote && notes.length === 0) {
      return (
        <EmptyState
          message="Create your first note to get started"
          buttonText="New Note"
          createNote={createNewNote}
        />
      );
    }

    if (activeNote && isEditing) {
      return (
        <NoteEditor note={activeNote} onCancel={cancelEdit} onSave={saveNote} />
      );
    }

    if (activeNote) {
      return <NoteView note={activeNote} onEdit={() => setIsEditing(true)} />;
    }

    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Select a note to view it</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <Header
        buttonFxn={createNewNote}
        heading="All Notes"
        buttonText="New Note"
      />
      <main className="container mx-auto p-4 flex h-full gap-4">
        <NotesSidebar
          notes={notes}
          createNote={createNewNote}
          onSelectNode={selectNode}
          onDeleteNote={deleteNote}
          activeNoteId={activeNote?.id}
        />
        <div className="w-full h-full">{renderNoteContent()}</div>
      </main>
    </div>
  );
}