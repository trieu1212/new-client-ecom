import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiGetOrder } from '../../apis/cart'
import { Button, InputField } from '../../components'
import { apiUpdateUser } from '../../apis/user'
import { getUser } from '../../redux/apiRequest/userApiRequest'
import { toast } from 'react-toastify'

const Profile = (props) => {
  const { option } = props
  const user = useSelector((state) => state.user?.user)
  const [username, setUsername] = useState(user?.username)
  const [email, setEmail] = useState(user?.email)
  const [phone, setPhone] = useState(user?.phone)
  const [address, setAddress] = useState(user?.address)
  const dispatch = useDispatch()
  const handleUpdateUserInfo = async () => {
    const data = {
      username,
      email,
      phone,
      address
    }
    const response = await apiUpdateUser(data, user?.id)
    if (response.message === "Cập nhật người dùng thành công") {
      toast.success(response.message)
      await getUser(dispatch)
    }
  }
  return (
    <>
      <h2 className='font-semibold text-[18px] mb-8 border-b border-gray-400 py-4 '>
        Hồ Sơ Của Tôi
      </h2>
      <div className='w-main mx-auto flex flex-col items-center'>

        <div className='w-[1000px] flex flex-col  gap-2 border p-4 pl-12 rounded-lg shadow-xl overflow-y-auto'>
          <div className='flex gap-8 items-center'>
            <span className='font-semibold'>Họ và tên: </span>
            <div className='w-[400px]'>
              <InputField
                label='Họ và tên'
                placeholder='Nhập họ và tên'
                data={username}
                setData={setUsername}
              />
            </div>
          </div>
          <div className='flex items-center gap-16'>
            <span className='font-semibold'>Email: </span>
            <div className='w-[400px]'>
              <InputField
                label='Họ và tên'
                placeholder='Nhập email'
                data={email}
                setData={setEmail}
              />
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='font-semibold'>Số điện thoại: </span>
            <div className='w-[400px]'>
              <InputField
                label='Họ và tên'
                placeholder='Nhập số điện thoại'
                data={phone}
                setData={setPhone}
              />
            </div>
          </div>
          <div className='flex gap-14 items-center'>
            <span className='font-semibold'>Địa chỉ: </span>
            <div className='w-[400px]'>
              <InputField
                label='Họ và tên'
                placeholder='Nhập địa chỉ'
                data={address}
                setData={setAddress}
              />
            </div>
          </div>
        </div>
        <div className='mt-3'>
          <Button
            name='Lưu thay đổi'
            handleOnClick={handleUpdateUserInfo}
          />
        </div>
      </div>
    </>
  )
}

export default Profile