import { Note } from "@/lib/types";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { X, Save } from "lucide-react";
import { Button } from "./ui/button";
interface NoteEditorProps {
  note: Note;
  onCancel: () => void;
  onSave: (note : Note) => void;
}

export default function NoteEditor({
  note,
  onCancel,
  onSave,
}: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onSave({
      ...note,
      title: title.trim() || "Untitled Note",
      content,
    });
  };

  return (
    <Card>
      <CardHeader>
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Note Title"
          className="text-xl font-bold border-none px-0 focus-visible:ring-0"
        />
      </CardHeader>

      <CardContent>
        <Textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Write your text here ..."
          className="min-h-[calc(100vh-350px)] resize-none border-none p-0 focus-visible:ring-0"
        />
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
