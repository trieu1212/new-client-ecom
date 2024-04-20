import React from 'react'

const Button = (props) => {
    const {name,iconBefore,iconAfter,handleOnClick,style,fw} = props
  return (
    <>
        <button
            type='button'
            className={style? style : `px-4 py-2 mt-2 rounded-md text-white bg-main font-semibold ${fw? 'w-full' : 'w-fit'}`}
            onClick={()=>{handleOnClick && handleOnClick()}}
        >
        {iconBefore && <span>{iconBefore}</span>}
            <span>{name}</span>
        {iconAfter && <span>{iconAfter}</span>}
        </button>
    </>
  )
}

export default Button