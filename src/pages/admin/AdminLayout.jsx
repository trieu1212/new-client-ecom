import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import path from '../../ultils/path'
import { AdminSidebar } from '../../components'

const AdminLayout = () => {
  const user = useSelector((state) => state.auth?.login)
  if (+user?.userData?.isAdmin === 0 || !user.accessToken) return <Navigate to={`/${path.LOGIN}`} replace={true} />
  return (
    <>
      <div className='flex w-full bg-gray-300 min-h-screen relative text-white'>
        <div className='w-[327px] flex-none fixed top-0 bottom-0'>
          <AdminSidebar />
        </div>
        <div className='w-[327px]'></div>
        <div className='flex-auto text-black my-12 mx-6'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AdminLayout