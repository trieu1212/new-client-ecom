import React from 'react'
import {navigation} from '../ultils/contants'
import { NavLink } from 'react-router-dom'
const Navigation = () => {
  return (
    <div className='w-main h-[48px] py-2 border-y my-2 text-sm flex items-center'>
      {navigation.map((e)=>{
        return(
          <NavLink to={e.path}
           key={e.id}
           className={({isActive})=> isActive ? 'pr-12 hover:text-main text-main': 'pr-12 hover:text-main'}
           >
            {e.value}
          </NavLink>
        )
      })}
    </div>
  )
}

export default Navigation