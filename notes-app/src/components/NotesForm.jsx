import React, { useState } from 'react'
import TextInput from './inputs/TextInput'
import DropdownInput from './inputs/DropdownInput'
import TextAreaInput from './inputs/TextAreaInput'


const NotesForm = ({notes, setNotes}) => {
  const [formdata, setFormdata] = useState({
    title:"",
    priority: "Moderate",
    category: "Work",
    description: ""
  })

  const[isFormOpen, setIsFormOpen]= useState(false)

  const handleChange = (e) => {
    setFormdata({...formdata,
    [e.target.name] : e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formdata.title || !formdata.description) return;

    const newNote = { id: Date.now(), ...formdata}

    setNotes([ newNote, ...notes])

    setFormdata({
      title:"",
      priority: "Moderate",
      category: "Work",
      description: ""
    })
  }

  return (
    <>
    <button className='w-full py-2 border border-gray-300 bg-gray-100 text-purple-800 cursor-pointer rounded-lg
      hover:bg-purple-200 hover:border-purple-300 transition mb-4' onClick={()=> setIsFormOpen(!isFormOpen)}>
      {isFormOpen ? 'Hide Form ❌' : ' Add New Note ➕'}  
    </button>

    {isFormOpen &&
      <form onSubmit={handleSubmit} className='mb-6'>

      <TextInput 
      label="Title" 
      name="title" 
      value={formdata.title} 
      onChange={handleChange} 
      required />

      <DropdownInput 
      label="Priority" 
      name="priority" 
      value={formdata.priority} 
      onChange={handleChange} 
      options={[
        { label: "🔴 High", value: "High" },
        { label: "🟠 Moderate", value: "Moderate" },
        { label: "🟢 Low", value: "Low" },
      ]} />

      <DropdownInput 
      label="Category" 
      name="category" 
      value={formdata.category} 
      onChange={handleChange} 
      options={[
        { label: "📂Work", value: "Work" },
        { label: "🏠Personal", value: "Personal" },
        { label: "💡Ideas", value: "Ideas" },
      ]} />

      <TextAreaInput 
        name="description" 
        label="Decription"
        value={formdata.description}
        onChange={handleChange}
        required
      />

      <button className="w-full bg-purple-500 text-white py-2 rounded-lg cursor-pointer hover:bg-purple-600">Add Note</button>

      </form>
    }
    
    </>
  )
}

export default NotesForm;