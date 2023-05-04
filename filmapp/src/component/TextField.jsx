import React from 'react'

const TextField = ({ label, inputProps, onChange, value }) => {
  return (
    <div className='flex flex-col'>
      <label className='mb-2 text-base text-gray-800'>{label}</label>
      <input
        className='py-2 px-3 border-2 outline-none'
        {...inputProps}
        onChange={onChange}
        defaultValue={value}
      />
    </div>
  )
}

export default TextField