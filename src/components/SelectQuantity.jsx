import React from 'react'

const SelectQuantity = (props) => {
    const {quantity, handleQuantity, handleChangeQuantity} = props
  return (
    <>
        <div className='flex items-center'>
            <span className=' p-2 border-r cursor-pointer border-black'
                onClick={()=>handleChangeQuantity('minus')}
            >-</span>
            <input 
                type="text" 
                className='py-2 text-center w-[30px] outline-none'
                value={quantity}
                onChange={(e)=>handleQuantity(e.target.value)}
            />
            <span className=' p-2 border-l cursor-pointer border-black'
                onClick={()=>handleChangeQuantity('plus')}
            >+</span>
        </div>
    </>
  )
}

export default SelectQuantity