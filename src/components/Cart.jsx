import React, { useEffect, useState } from 'react'
import icons from '../ultils/icons'
import { useDispatch, useSelector } from 'react-redux'
import { isShowCart } from '../redux/slice/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { formatPrice } from '../ultils/helpers'
import { apiRemoveCart } from '../apis/cart'
import { toast } from 'react-toastify'
import { getUser } from '../redux/apiRequest/userApiRequest'
const Cart = () => {
  const { IoMdClose, IoRemoveCircle } = icons
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user?.user)
  const carts = useSelector((state) => state.user?.carts)
  const navigate = useNavigate()
  const handleRemoveItem = async (id,size) => {
    const response = await apiRemoveCart({ productId: id,size:size, userId: user?.id });
    if (response.message === 'Deleted product from cart successfully') {
      toast.success('Xóa sản phẩm khỏi giỏ hàng thành công')
      await getUser(dispatch);
    }
  };
  return (
    <>
      <div onClick={(e) => e.stopPropagation()} className='w-[400px] h-screen grid grid-rows-10 p-6 bg-black text-white'>
        <header
          className='row-span-1 h-full border-b border-gray-600 font-bold text-2xl flex items-center justify-between'
        >
          <span>Giỏ hàng của bạn</span>
          <IoMdClose size={28} className='cursor-pointer' onClick={() => dispatch(isShowCart())} />
        </header>
        <section className='row-span-7 h-full max-h-full overflow-y-auto'>
          {!user && <div className='mt-8'>
            <span>Bạn cần đăng nhập để xem giỏ hàng</span>
            <Link to='/login'>
              <button className='w-full py-2 mt-4 bg-red-500 text-white' onClick={() => dispatch(isShowCart())}>Đăng nhập</button>
            </Link>
          </div>}
          {user && user?.Carts?.length === 0 && <div className='mt-8'>
            <span>Giỏ hàng của bạn đang trống</span>
          </div>}
          {user && user?.Carts?.length > 0 &&
            <div key={user?.id} className='mt-8 flex flex-col gap-3'>
              {carts?.map((item) => {
                return (
                  <>
                    <div className='flex justify-between '>
                      <div key={item.id} className='flex justify-center gap-3'>
                        <div className='object-cover w-[80px] h-[120px]'>
                          <Link to={`product/${item?.Product?.id}`} >
                            <img src={item?.Product?.image} alt="" className='object-cover' onClick={() => dispatch(isShowCart())} />
                          </Link>
                        </div>
                        <div className='flex flex-col gap-1 '>
                          <span className=' text-[15px] text-main'>
                            {item?.Product?.title}
                          </span>
                          <span className=' text-[12px]'>
                            Số lượng: {item?.quantity}
                          </span>
                          <span className=' text-[12px]'>
                            Kích cỡ: {item?.size}
                          </span>
                          <span className=' text-[12px]'>
                            Giá tiền: {formatPrice(item?.Product?.price)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className=''>
                          <IoRemoveCircle size={24} className='cursor-pointer' onClick={() => handleRemoveItem(item?.Product?.id,item?.size)} />
                        </span>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>}
        </section>
        {user && user?.Carts?.length > 0 &&
          <div className='row-span-2 h-full border-t mt-6'>
            <div className='flex justify-between'>
              <span className='font-semibold'>Tổng cộng</span>
              <span>{formatPrice(carts?.reduce((sum,i)=>+i?.Product?.price*i?.quantity+sum,0))}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Phí vận chuyển</span>
              <span>{formatPrice(0)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Thành tiền</span>
              <span>{formatPrice(carts?.reduce((sum,i)=>+i?.Product?.price*i?.quantity+sum,0))}</span>
            </div>
            <div className='flex justify-end' onClick={()=>{navigate('/cart'); dispatch(isShowCart())}}>
              <Button
                name='Tới trang giỏ hàng'
                fw={true}
              />
            </div>
          </div>}
      </div>
    </>
  )
}

export default Cart