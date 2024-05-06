import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiGetOrder } from '../../apis/cart'
import icons from '../../ultils/icons'
import { formatPrice } from '../../ultils/helpers'
const OrderHistory = () => {
    const user = useSelector((state) => state.user?.user)
    const { FaTruckField } = icons
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const getOrders = async () => {
            const response = await apiGetOrder({ userId: user?.id })
            setOrders(response)
        }
        getOrders()
    }, [])
    // console.log(orders)
    return (
        <>
            <div className='w-main mx-auto flex flex-col '>
                <h2 className='font-semibold text-[18px] mb-8 border-b border-gray-400 py-4 '>
                    Đơn mua
                </h2>
                {orders.length === 0 && <div className='font-semibold text-2xl'>Chưa có đơn hàng nào</div>}
                <div className='border flex flex-col gap-4'>
                    {orders.length > 0 && orders.map((order) => {
                        return (
                            <>
                                <div key={order?.id} className='bg-white p-4 border-b'>
                                    <div className='flex justify-between border-b'>
                                        <div className='border-b py-3'>
                                            <span className='font-semibold'>Mã đơn hàng: </span>
                                            <span>{order?.id}</span>
                                        </div>
                                        <div className='flex items-center pb-2'>
                                            <div className='flex items-center gap-2 pr-2 border-r'>
                                                <FaTruckField size={28} color='blue' />
                                                <span>Giao hàng thành công</span>
                                            </div>
                                            <span className='pl-2 text-main'>{order?.status}</span>
                                        </div>
                                    </div>
                                    {order?.OrderItems?.map((item) => {
                                        return (
                                            <div key={item?.id} className='flex justify-between gap-4 mt-3 pb-3 border-b'>
                                                <div className='flex'>
                                                    <img src={item?.Product?.image} alt="" className='w-[100px] h-[100px] object-contain' />
                                                    <div className='flex flex-col'>
                                                        <span className='font-semibold'>{item?.Product?.title}</span>
                                                        <span>x{item?.quantity}</span>
                                                        <span>Size {item?.size}</span>
                                                    </div>
                                                </div>
                                                <span>{formatPrice(item?.Product?.price)}</span>
                                            </div>
                                        )
                                    })}
                                    <div className='mt-6 float-end'>
                                        <span className='font-semibold'>Tổng tiền: </span>
                                        <span className='text-main'>{formatPrice(order?.amount)}</span>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default OrderHistory