import React, { useCallback } from 'react'
import { InputField,Button } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/apiRequest/authApiRequest'
const Register = () => {
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const user = useSelector((state)=>state.user?.user)
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const handleRegister =  useCallback(async()=>{
      const data = {
        username,
        email,
        password
      }
       await register(data,dispatch,navigate)
    },[username,password,email])
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
              <h3 className='font-semibold text-[28px] text-main text-center mb-8'>Đăng ký</h3>
              <InputField data={username} setData={setUsername} placeholder='USERNAME' />
              <InputField data={email} setData={setEmail} placeholder='EMAIL' />
              <InputField data={password} setData={setPassword} placeholder='PASSWORD' type='password' />
              <Button
                name='Đăng Ký'
                handleOnClick={handleRegister}
                fw={true}
              />
              <div className='mt-2'>
                <p className='text-center'>Đã có tài khoản? <Link to='/login' className='hover:text-main'>Đăng Nhập ngay</Link></p>
              </div>
            </div>
          </div>
        </div>}
      </>
    )
}

export default Register