import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, InputField } from '../../components'
import axios from '../../axios'
import Swal from 'sweetalert2'
const ResetPassword = () => {
    const {email,token} = useParams()
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()
    const handleSubmit = async() =>{
        const data = {
            password,
            token
        }
        const res = await axios.put('/user/forgot-password',data)
        if(res.message === 'Đổi mật khẩu thành công'){
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Đổi mật khẩu thành công'
            }).then(()=>{
                navigate('/login')
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Thất bại!',
                text: 'Đổi mật khẩu không thành công'
            })
        }
    }
    return (
        <>
            <img
                src="https://png.pngtree.com/thumb_back/fw800/back_our/20190628/ourmid/pngtree-beautiful-e-commerce-red-background-image_267394.jpg"
                alt="background"
                className='w-full min-h-screen object-cover'
            />
            <div className='absolute top-0 bottom-0 left-0 right-0 flex'>
                <div className='m-auto bg-white rounded-md min-w-[500px] p-8'>
                    <h3 className='font-semibold text-[20px] text-main text-center mb-8'>Thiết lập mật khẩu mới cho tài khoản {email}</h3>
                    <label htmlFor="">Nhập mật khẩu mới:</label>
                    <InputField data={password} setData={setPassword} placeholder='PASSWORD' />
                    <Button
                        name='Lưu mật khẩu'
                        handleOnClick={handleSubmit}
                        fw={true}
                    />
                    <div className='mt-2'>
                        <p className='text-center'><Link to='/login' className='hover:text-main'>Quay về Trang đăng nhập</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword