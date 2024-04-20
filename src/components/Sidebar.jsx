import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {createSlug} from '../ultils/helpers'
import icons from '../ultils/icons'
import { apis } from '../apis'
const Sidebar = () => {
  const {AiOutlineMenu,IoShirtSharp} = icons
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const response = await apis.getApiCategories()
      setCategories(response)
    }
    getCategories()
  }, [])
  return (
    <>
      <div className='mt-4 flex flex-col gap-4 mb-4 mt-2 border mr-2'>
        <div className='flex items-center mb-6 gap-3 border p-6 bg-red-600 text-white font-bold text-xl '>
          <AiOutlineMenu />
          <span>
              ALL COLLECTIONS
          </span>
        </div>
        {categories.map(category => {
          return (
            <NavLink
              className='pb-12 hover:text-main text-sm pl-6 flex gap-4'
              key={createSlug(category.name)}
              to={`products/${category.id? category.id : null}/${category.name}`}
            >
              <IoShirtSharp />
              {category.name}
            </NavLink>
          )
        })}
      </div>
    </>
  )
}

export default Sidebar