import React from 'react'
import { useSelector } from 'react-redux'
import icons from '../ultils/icons'
const MemberSidebar = (props) => {
    const { setOption, option } = props
    const user = useSelector((state) => state.user?.user)
    const { FaUserCircle, FaUserLarge, RiBillFill } = icons
    return (
        <>
            <div className='flex flex-col gap-9'>
                <div>
                    <div className='flex items-center gap-2'>
                        <FaUserCircle size={50} />
                        <span className='font-semibold text-[24px]'>{user?.username}</span>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                        <FaUserLarge size={36} />
                        <span
                            className={`font-medium text-[18px] hover:text-main cursor-pointer ${option === 'Thông tin tài khoản' ? 'text-main' : ''}`}
                            onClick={() => setOption('Thông tin tài khoản')}
                        >
                            Thông tin tài khoản
                        </span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <RiBillFill size={36} />
                        <span
                            className={`font-medium text-[18px] hover:text-main cursor-pointer ${option === 'Đơn hàng của tôi' ? 'text-main' : ''}`}
                            onClick={() => setOption('Đơn hàng của tôi')}
                        >
                            Đơn hàng của tôi
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberSidebar