import React, { useCallback, useEffect } from 'react'
import { InputField, Button } from '../../components'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { login } from '../../redux/apiRequest/authApiRequest'
import { useDispatch, useSelector } from 'react-redux'
const Login = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user?.user)
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')
  const handleLogin = useCallback(async () => {
    const data = {
      username,
      password
    }
    await login(data,dispatch,navigate,redirect)
  }, [username, password])
  useEffect(() => {
    if (user) {
      navigate('/') 
    }
  }, [user, navigate])
  return (
    <>
      {user===null && <div className='w-screen h-screen relative'>
        <img
          src="https://png.pngtree.com/thumb_back/fw800/back_our/20190628/ourmid/pngtree-beautiful-e-commerce-red-background-image_267394.jpg"
          alt="background"
          className='w-full h-full object-cover'
        />
        <div className='absolute top-0 bottom-0 left-0 right-0 flex'>
          <div className='m-auto bg-white rounded-md min-w-[500px] p-8'>
            <h3 className='font-semibold text-[28px] text-main text-center mb-8'>Đăng Nhập</h3>
            <InputField data={username} setData={setUsername} placeholder='USERNAME' />
            <InputField data={password} setData={setPassword} placeholder='PASSWORD' type='password' />
            <Button
              name='Đăng Nhập'
              handleOnClick={handleLogin}
              fw={true}
            />
            <div className='mt-2'>
              <p className='text-center'>Đã có tài khoản? <Link to='/register' className='hover:text-main'>Đăng Ký ngay</Link></p>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default Login