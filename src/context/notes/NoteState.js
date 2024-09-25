import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // List all Note
  const listNote = async () => {
    //TO-DO Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json)
  }
  //Add a Note
  const addNote = async (title, description, tag) => {
    console.log("Adding a new note")
    //TO-DO Api call
    let note = {
      "title": title,
      "description": description,
      "tag": tag,
      user: {
        id: "66e91f01956bd77d6e7cbdaa"
      }
    };
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(note)
    })
    const json = await response.json();
    setNotes(notes.concat(json))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    console.log("Deleting a note")
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    })
    const json = await response.json();
    const newNotes = notes.filter((note) => { return note._id !== json.note._id })
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    })
    let NotesList = JSON.parse(JSON.stringify(notes))
    // const json = await response.json();
    for (let i = 0; i <= NotesList.length; i++) {
      const note = NotesList[i] 
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag
        break;
      }
    }
    setNotes(NotesList);
  }
  return (
    <NoteContext.Provider value={{ notes, listNote, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;