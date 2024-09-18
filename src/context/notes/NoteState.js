import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "66ea642a45a466959c87fcf8",
          "user": "66e91f01956bd77d6e7cbdaa",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "Personal",
          "date": "2024-09-18T05:24:58.488Z",
          "__v": 0
        },
        {
          "_id": "66ea647d45a466959c87fcfe",
          "user": "66e91f01956bd77d6e7cbdaa",
          "title": "New Title",
          "description": "Please access early",
          "tag": "Professional",
          "date": "2024-09-18T05:26:21.871Z",
          "__v": 0
        },
        {
            "_id": "66ea642a45a466959c87fcf8",
            "user": "66e91f01956bd77d6e7cbdaa",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2024-09-18T05:24:58.488Z",
            "__v": 0
          },
          {
            "_id": "66ea647d45a466959c87fcfe",
            "user": "66e91f01956bd77d6e7cbdaa",
            "title": "New Title",
            "description": "Please access early",
            "tag": "Professional",
            "date": "2024-09-18T05:26:21.871Z",
            "__v": 0
          },
          {
            "_id": "66ea642a45a466959c87fcf8",
            "user": "66e91f01956bd77d6e7cbdaa",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2024-09-18T05:24:58.488Z",
            "__v": 0
          },
          {
            "_id": "66ea647d45a466959c87fcfe",
            "user": "66e91f01956bd77d6e7cbdaa",
            "title": "New Title",
            "description": "Please access early",
            "tag": "Professional",
            "date": "2024-09-18T05:26:21.871Z",
            "__v": 0
          },
          {
            "_id": "66ea642a45a466959c87fcf8",
            "user": "66e91f01956bd77d6e7cbdaa",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2024-09-18T05:24:58.488Z",
            "__v": 0
          },
          {
            "_id": "66ea647d45a466959c87fcfe",
            "user": "66e91f01956bd77d6e7cbdaa",
            "title": "New Title",
            "description": "Please access early",
            "tag": "Professional",
            "date": "2024-09-18T05:26:21.871Z",
            "__v": 0
          },
          {
            "_id": "66ea642a45a466959c87fcf8",
            "user": "66e91f01956bd77d6e7cbdaa",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2024-09-18T05:24:58.488Z",
            "__v": 0
          },
          {
            "_id": "66ea647d45a466959c87fcfe",
            "user": "66e91f01956bd77d6e7cbdaa",
            "title": "New Title",
            "description": "Please access early",
            "tag": "Professional",
            "date": "2024-09-18T05:26:21.871Z",
            "__v": 0
          }
      ]
      const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;