import React from 'react'
const SelectOption = (props) => {
    const { icon } = props
    return (
        <>
            <div className='w-10 h-10 bg-white rounded-full border shadow-sm flex items-center justify-center hover:bg-gray-800 hover:text-white cursor-pointer hover:border-gray-800'>
                {icon}
            </div>
        </>
    )
}

export default SelectOption