import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import icons from '../ultils/icons'
import { logout } from '../redux/apiRequest/authApiRequest'
import { getUser } from '../redux/apiRequest/userApiRequest'
const TopHeader = () => {
    const {RiLogoutBoxRLine} = icons
    const user = useSelector((state) => state.auth?.login?.userData)
    const [userInfo, setUserInfo] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async() =>{
        await logout(dispatch,navigate)
    }
    const getUserInfo = async()=>{
        const res = await getUser(dispatch);
        setUserInfo(res)
    }
    useEffect(()=>{
        if(user){
            getUserInfo()
        }
    },[])

    return (
        <>
            <div className='h-[38px] w-full bg-main flex justify-center items-center'>
                <div className='w-main text-white text-xs flex items-center justify-between'>
                    <div>
                        Đặt Online, Gọi ngay: 1800 000 8080
                    </div>
                    {!user ? <Link to='/login'>
                        <div className='hover:text-cyan-400'>
                            Đăng ký hoặc đăng nhập
                        </div>
                    </Link> : (
                        <div className='flex justify-center items-center gap-3'>
                            <span>
                                Chào <span className='font-semibold'>{user?.username}</span>
                            </span>
                            <span 
                                className='cursor-pointer p-1 hover:rounded-full hover:bg-gray-200 hover:text-main'
                                onClick={handleLogout}
                            >
                                <RiLogoutBoxRLine size={20}/>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TopHeader