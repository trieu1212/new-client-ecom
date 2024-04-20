import React from 'react'

const InputField = (props) => {
   const {data, setData, type, invalidField, setInvalidField, placeholder} = props
  return (
    <div className='w-full'>
        <input 
            type={type|| 'text'}
            className='px-4 py-2 rounded-sm border w-full my-2'
            placeholder={placeholder} 
            value={data}
            onChange={(e) => setData(e.target.value)}
        />
    </div>
  )
}

export default InputField