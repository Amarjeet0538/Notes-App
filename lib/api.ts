import { Note } from "./types";


export const noteApi = {

  async getAllNotes() : Promise <Note[]> {
    try {
      const Response = await fetch("/api/notes")

      if(!Response.ok) throw new Error("Failed fetching notes");
      
      return await Response.json()
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error; 
    }
  }
,
  async getNote( id : string) : Promise <Note>{
    try {
      const Response = await fetch(`/api/notes/${id}`)

      if(!Response.ok) throw new Error("Failed fetching notes");
      return await Response.json();

    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error; 
    }
  },

  async createNote(noteData: { title: string; content: string }): Promise<Note> {
    try {
      const Response = await fetch("/api/notes",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      })

      if(!Response.ok) throw new Error("Failed creating notes");
      return await Response.json();
    } catch (error) {
      console.error('Error creating notes:', error);
      throw error; 
    }
  },

  async updateNote(id : string , noteData: { title: string; content: string }) : Promise<Note>{
    try {
      const Response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if(!Response.ok) throw new Error("Failed updating notes");
      
      return await Response.json();
    } catch (error) {
      console.error('Error updating notes:', error);
      throw error; 
    }
  },

  async deleteNote(id: string): Promise<void> {
    try {
      const Response = await fetch(`/api/notes/${id}`, {
        method : 'Delete',
      })

      if(!Response.ok) throw new Error("Failed deleting notes");

    } catch (error) {
      console.error('Error deleting notes:', error);
      throw error; 
    }
  },

}
