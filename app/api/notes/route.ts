import { readNotes, addNote } from "@/lib/fs";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  try {
    const notes = await readNotes();
    return NextResponse.json(notes);

  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" }, 
      { status: 500 } 
    ); 
  }
}

export async function POST(req: NextRequest) {
  try{
    const body = await req.json();
    const {title,content} = body;

    if (!title && !content) {
      return NextResponse.json(
        { error: "Title or content is required" },
        { status: 400 } 
      );
    }

    const newNote = addNote({
      title : title || "New Note",
      content : content || ""
    });

    return NextResponse.json(newNote, {status : 200 });
  }
  catch(error){
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );}
}
