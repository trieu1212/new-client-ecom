import React from 'react'
import { Button, InputField } from '../../components'
import { Link } from 'react-router-dom'
import axios from '../../axios'
import Swal from 'sweetalert2'
const ForgotPassword = () => {
    const [email, setEmail] = React.useState('')
    const handleSubmit = async() =>{
        const res = await axios.get(`/auth/forgot-password?email=${email}`)
        if(res.accepted){
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: `Vui lòng kiểm tra email ${email} để lấy lại mật khẩu`
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Thất bại!',
                text: 'Email không hợp lệ'
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
                    <h3 className='font-semibold text-[28px] text-main text-center mb-8'>Quên mật khẩu</h3>
                    <label htmlFor="">Nhập Email:</label>
                    <InputField data={email} setData={setEmail} placeholder='EMAIL' />
                    <Button
                        name='Lấy lại mật khẩu'
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

export default ForgotPassword