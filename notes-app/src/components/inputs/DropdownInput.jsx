import React from 'react'

const DropdownInput = ({name, label, value, onChange, options}) => {
  return (
    <div className='mb-4'>
        <label htmlFor={name} className='block font-semibold'>{label}</label>
        <select 
        className='w-full p-2 border rounded-lg' 
        name={name} 
        id={name}
        value={value}
        onChange={onChange}
        >
        {options.map((option)=>(
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
        </select>
    </div>
  )
}

export default DropdownInput