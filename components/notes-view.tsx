import { Note } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { formatDate } from "@/lib/storage";
import { Button } from "./ui/button";

interface NoteViewProps {
  note: Note;
  onEdit: () => void;
}

export default function NoteView({ note, onEdit }: NoteViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {formatDate(note.createdAt)}
        </p>
      </CardHeader>
      <CardContent>
        {note.content}
        <CardFooter className="flex justify-end ">
          <Button onClick={onEdit}>Edit Note</Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
