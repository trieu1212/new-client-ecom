import React from 'react'
import Logo from './../assets/images/logo.jpg'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import path from '../ultils/path'
const Header = () => {
    const { RiPhoneFill,MdEmail,BsCart3,FaUserLarge } = icons
    return (
        <div className='flex justify-between items-center  w-main h-[110px] py-[35px]'>
            <Link to ={`/${path.HOME}`}>
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
                    <BsCart3 color='red' size={18}/>
                    <span>
                        0 items
                    </span>
                </div>
                <div className='flex items-center px-6  justify-center'>
                    <FaUserLarge size={24}/>
                </div>
            </div>
        </div>
    )
}

export default Header