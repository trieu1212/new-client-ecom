import React from 'react'
import Logo from './../assets/images/logo.jpg'
import icons from '../ultils/icons'
import { Link, useNavigate } from 'react-router-dom'
import path from '../ultils/path'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
const Header = () => {
    const { RiPhoneFill, MdEmail, BsCart3, FaUserLarge } = icons
    const user = useSelector((state) => state.user?.user)
    const navigate = useNavigate()
    const handleToProfile = () => {
        if (user === null) {
            Swal.fire({
                title: 'Thông báo!',
                text: 'Bạn cần đăng nhập để xem thông tin cá nhân',
                icon: 'info',
                cancelButtonText: 'Hủy',
                showCancelButton: true,
                confirmButtonText: 'Đăng nhập',
            }).then((res) => res.isConfirmed && navigate('/login'))
        }
        else {

        }
    }
    return (
        <div className='flex justify-between items-center  w-main h-[110px] py-[35px]'>
            <Link to={`/${path.HOME}`}>
                <img src={Logo} alt="LOGO" className='w-[100px] object-contain' />
            </Link>
            <div className='flex text-[13px]'>
                <div className='flex flex-col px-6 border-r items-center'>
                    <span className='flex items-center gap-1'>
                        <RiPhoneFill color='red' />
                        <span className='font-semibold'>(+1800) 000 8080</span>
                    </span>
                    <span>Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className='flex flex-col px-6 border-r items-center'>
                    <span className='flex items-center gap-1'>
                        <MdEmail color='red' />
                        <span className='font-semibold'> SUPPORT@UIT.COM</span>
                    </span>
                    <span>Online Support 24/7</span>
                </div>
                <div className='flex flex-col px-6 border-r justify-center items-center gap-2'>
                    <BsCart3 color='red' size={18} />
                    <span>
                        {user?.Carts?.length > 0 ? user?.Carts?.length : 0} items
                    </span>
                </div>
                <div
                    onClick={handleToProfile}
                    className='flex items-center px-6 gap-2 justify-center cursor-pointer'
                >
                    <FaUserLarge size={24} />
                    <span className='text-sm'>Profile</span>
                </div>
            </div>
        </div>
    )
}

export default Header