import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem'
import AddNote from './AddNote';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Notes = (props) => {
  const { showAlert} = props
  const fetchContext = useContext(noteContext);
  const { notes, listNote, editNote } = fetchContext;
  const history = useHistory();
  useEffect(() => {
    if(localStorage.getItem("token")) {
      listNote();
    } else {
      history.push('/login');
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refclose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click(); 
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  }

  const [note, setNote] = useState({etitle: "", edescription: "", etag: ""})

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value })
  }

  const handleUpdateClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click();
    showAlert("Note updated successfully", "success");
  }

  return (
    <>
      <AddNote showAlert={showAlert}/>
      <button style={{display: "none"}} type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                  <div className="mb-3">
                      <label htmlFor="etitle" className="form-label">Title</label>
                      <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="edescription" className="form-label">Description</label>
                      <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange}  minLength={5} required/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="etag" className="form-label">Tag</label>
                      <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                  </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refclose} data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleUpdateClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && 'No Notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem showAlert={showAlert} key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
