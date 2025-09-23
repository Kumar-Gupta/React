import React from 'react'

const Note = ({note, deleteNote}) => {
  return (
    <div
        className={`p-4 bg-white rounded-lg shadow-md border-l-4
        ${note.priority === "High" ? "border-red-500" : note.priority === "Moderate" ? "border-yellow-500" : note.priority === "Low" ? "border-green-500" : null}
        `}
        >
            <h3 className='text-lg text-gray-600'>{note.title}</h3>
            <p className='text-sm text-gray-600'><small><strong>Category: </strong>{note.category}</small></p>
            <p><small><strong>priority:</strong>{note.priority}</small></p>
            <p className='mt-2'>{note.description}</p>
            <button 
            onClick={()=> deleteNote(note.id)}
            className="mt-3 text-red-500 cursor-pointer transition hover:text-red-600" 
            >🗑️ Delete</button>
    </div>
  )
}

export default Note;