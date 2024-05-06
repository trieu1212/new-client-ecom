import React, { useEffect } from 'react'
import axios from '../../axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
const UserManage = () => {
  const [users, setUsers] = React.useState([])
  const user = useSelector((state)=>state.user?.user)
  const getAllUsers = async()=>{
    const res = await axios.get(`/user/all/${user?.id}`)
    setUsers(res)
  }
  useEffect(()=>{
    getAllUsers()
  },[])
  const handleEditUser = (id)=>{
  }
  const handleDeleteUser = async(id)=>{
    const res = await axios.delete(`/user/delete/${id}`)
    toast.success(res)
    await getAllUsers()
  }
  return (
    <>
      <div className='flex flex-col items-center gap-4'>
        <h3 className='text-[32px] font-semibold'>Quản lý Người dùng</h3>
        <div>
          <table border={1} className='table-auto '>
            <thead className='bg-yellow-200'>
              <tr>
                <th className='p-4'>STT</th>
                <th className='p-4'>Tên</th>
                <th className='p-4'>Email</th>
                <th className='p-4'>Số điện thoại</th>
                <th className='p-4'>Địa chỉ</th>
                <th className='p-4'>Quyền</th>
                <th className='p-4'>Thao tác</th>
              </tr>
            </thead>
            <tbody className='border bg-green-300'>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className='p-4'>{index + 1}</td>
                  <td className='p-4'>{user.username}</td>
                  <td className='p-4'>{user.email}</td>
                  <td className='p-4'>{user.phone}</td>
                  <td className='p-4'>{user.address}</td>
                  <td className='p-4'>{user.isAdmin===1 ? 'Admin' : 'user'}</td>
                  <td className='p-4'>
                    <button 
                      className='bg-green-500 text-white p-2 rounded-md mr-2'
                      onClick={()=>handleEditUser(user.id)}
                    >Sửa</button>
                    <button className='bg-red-500 text-white p-2 rounded-md'
                      onClick={()=>handleDeleteUser(user.id)}
                    >Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default UserManage