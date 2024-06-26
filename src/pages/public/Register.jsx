import React, { useCallback, useEffect } from 'react'
import { InputField,Button, Loading } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/apiRequest/authApiRequest'
import { showModal } from '../../redux/slice/authSlice'
import { toast } from 'react-toastify'
const Register = () => {
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [phone, setPhone] = React.useState(0)
    const [address, setAddress] = React.useState('')
    const user = useSelector((state)=>state.user?.user)
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const handleRegister =  useCallback(async()=>{
      if(username==='' || email==='' || password===''){
        return toast.error('Vui lòng điền đầy đủ thông tin')
      }
      const data = {
        username,
        email,
        password,
      }
      dispatch(showModal({isShowModal:true,modalChildren:<Loading/>}))
      await register(data,dispatch,navigate)
      dispatch(showModal({isShowModal:false,modalChildren:null}))
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
              {/* <InputField data={phone} setData={setPhone} placeholder='PHONE' type='number'/>
              <InputField data={address} setData={setAddress} placeholder='ADDRESS' /> */}
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