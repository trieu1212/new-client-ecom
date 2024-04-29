
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, TopHeader, Footer, MemberSidebar } from '../../components'
import { useSelector } from 'react-redux'
import Profile from './Profile'
import OrderHistory from './OrderHistory'
const Member = () => {
    const user = useSelector((state) => state.auth?.login?.accessToken)
    const navigate = useNavigate()
    const [option,setOption] = React.useState('Thông tin tài khoản')
    if (!user) {
        navigate('/')
    }
    return (
        <>
            <div className='w-full flex flex-col items-center overflow-x-hidden'>
                <TopHeader />
                <Header />
                <div className='w-full flex items-center border-t p-6  mx-auto bg-[#f5f5f5] '>
                    <div className='w-fill flex mx-auto'>
                        <div className='flex-2 border-r border-gray-600 pr-4'>
                            <MemberSidebar setOption={setOption} option={option} />
                        </div>
                        <div className='flex-1 pl-4'>
                            {option === 'Thông tin tài khoản' && <Profile option={option} />}
                            {option === 'Đơn hàng của tôi' && <OrderHistory option={option} />}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}


export default Member