import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const fetchContext = useContext(noteContext);
  const {deleteNote} = fetchContext;
  const {note, updateNote, showAlert} = props;
  return (
    <div className='col-md-3'>
        <div className="card my-3">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <h4 className="card-title">{note.title}</h4>
                <i className='far fa-edit mx-2' onClick={() => {updateNote(note)}}></i>
                <i className='far fa-trash-alt mx-2' onClick={()=> {deleteNote(note._id); showAlert("Note deleted successfully", "success")}}></i>
              </div>
                <p className="card-text"><b>Description: </b> {note.description}</p>
                <p className="card-text"><b>Tag: </b> {note.tag}</p>
            </div>
        </div>
    </div>
  )
}

export default NoteItem
