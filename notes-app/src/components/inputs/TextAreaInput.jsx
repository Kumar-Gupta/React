import React from 'react'

const TextAreaInput = ({name, label, value, onChange, required = false}) => {
  return (
    <div className='mb-4'>
        <label htmlFor={name} className='block font-semibold'>{label}</label>
        <textarea 
        name={name}
        id={name}
        className='w-full p-2 border rounded-lg'
        value={value}
        onChange={onChange}
        required={required}
        >
        </textarea>
    </div>
  )
}

export default TextAreaInput