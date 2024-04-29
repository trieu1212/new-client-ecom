
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
            <div className='w-full flex flex-col items-center'>
                <TopHeader />
                <Header />
                <div className='w-full flex items-center border-t p-6 mx-auto bg-[#f5f5f5] '>
                    <div className='w-main flex mx-auto'>
                        <div className='w-1/5 border-r border-gray-600'>
                            <MemberSidebar setOption={setOption} option={option} />
                        </div>
                        <div className='w-4/5 pl-4'>
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