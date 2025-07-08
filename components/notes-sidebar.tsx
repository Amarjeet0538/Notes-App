import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EmptyState from "@/components/empty-state";
import { formatDate } from "@/lib/storage";
import { Note } from "@/lib/types";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface noteSidebarProps {
  notes: Note[];
  createNote: () => void;
  onSelectNode: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  activeNoteId?: string;
}

export default function NotesSidebar({
  notes,
  createNote,
  onSelectNode,
  onDeleteNote,
  activeNoteId,
}: noteSidebarProps) {
  return (
    <Card className="min-w-1/6">
      <CardHeader>
        <CardTitle>My Notes</CardTitle>
      </CardHeader>
      <CardContent className="justify-center">
        {notes.length == 0 ? (
          <EmptyState
            message="No Notes yet"
            buttonText="Create your first Note"
            createNote={createNote}
          />
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              onClick={() => onSelectNode(note)}
              className={`p-3 rounded-md cursor-pointer hover:bg-accent transition-colors ${
                activeNoteId === note.id ? "bg-accent" : " "
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium ">
                    {note.title.substring(0, 30)}
                    {note.title.length > 30 ? "..." : " "}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {note.content.substring(0, 40)}
                    {note.content.length > 40 ? "..." : " "}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(note.createdAt)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:text-destructive cursor-pointer text-muted-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNote(note.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
