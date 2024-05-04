import React from 'react'
import Logo from './../assets/images/logo.jpg'
import icons from '../ultils/icons'
import { Link, useNavigate } from 'react-router-dom'
import path from '../ultils/path'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { isShowCart } from '../redux/slice/userSlice'
const Header = () => {
    const { RiPhoneFill, MdEmail, BsCart3, FaUserLarge, FaUserCircle } = icons
    const user = useSelector((state) => state.user?.user)
    const isAdmin = useSelector((state)=>state.auth.login?.userData?.isAdmin)
    const dispatch = useDispatch()
    const [isShowDropdown, setIsShowDropdown] = React.useState(false)
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
                {user &&
                    <>
                        <div
                            className='flex px-6 border-r justify-center items-center gap-2'
                        >
                            <BsCart3 color='red' size={24} onClick={() => dispatch(isShowCart())} className='cursor-pointer' />
                            <span className=''>
                                {user?.Carts?.length > 0 ? user?.Carts?.length : 0} sản phẩm
                            </span>
                        </div>
                        <div
                            onClick={() => setIsShowDropdown(!isShowDropdown)}
                            className='flex items-center px-6 gap-2 justify-center cursor-pointer relative'
                        >
                            <FaUserCircle size={24} color='red' />
                            {isShowDropdown &&
                                <div className='absolute z-50 top-full flex flex-col gap-2 items-center justify-center left-6 right-1 min-w-[160px] py-2 rounded-lg bg-gray-300'>
                                    <Link className='p-1 flex items-center justify-center w-full hover:bg-main  hover:text-white font-semibold text-[14px] border-b' to={`${path.MEMBER}/${path.PROFILE}`}>
                                        Thông tin tài khoản
                                    </Link>
                                    <Link className='p-1 flex items-center justify-center w-full hover:bg-main hover:text-white font-semibold text-[14px]' to={`/${path.CART}`}>
                                        Giỏ hàng
                                    </Link>
                                    {isAdmin===1 && <Link className='p-1 flex items-center justify-center w-full hover:bg-main hover:text-white font-semibold text-[14px]' to={`/${path.ADMIN}/${path.MANAGE_USER}`}>
                                        Admin
                                    </Link>}
                                </div>
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Header