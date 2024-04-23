import React from 'react'
import icons from '../ultils/icons'
import { useDispatch, useSelector } from 'react-redux'
import { isShowCart } from '../redux/slice/userSlice'
import { Link } from 'react-router-dom'
import { SelectQuantity, Button } from '../components'
const Cart = () => {
  const { IoMdClose } = icons
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user?.user)
  return (
    <>
      <div onClick={(e) => e.stopPropagation()} className='w-[400px] max-h-screen overflow-y-auto p-6 bg-black text-white'>
        <header
          className='py-4 border-b border-gray-600 font-bold text-2xl flex items-center justify-between'
        >
          <span>Giỏ hàng của bạn</span>
          <IoMdClose size={28} className='cursor-pointer' onClick={() => dispatch(isShowCart())} />
        </header>
        {!user && <div className='mt-8'>
          <span>Bạn cần đăng nhập để xem giỏ hàng</span>
          <Link to='/login'>
            <button className='w-full py-2 mt-4 bg-red-500 text-white' onClick={() => dispatch(isShowCart())}>Đăng nhập</button>
          </Link>
        </div>}
        {user && user?.Carts?.length === 0 && <div className='mt-8'>
          <span>Giỏ hàng của bạn đang trống</span>
        </div>}
        {user && user?.Carts?.length > 0 && <div className='mt-8 flex flex-col gap-3'>
          {user?.Carts?.map((item) => {
            return (
              <>
                <div key={item.id} className='flex'>
                  <div className='flex gap-6'>
                    <Link to={`product/${item?.Product?.id}`}>
                      <div className='w-[100px] h-[120px] flex-1/3' onClick={() => dispatch(isShowCart())}>
                        <img src={item?.Product?.image} alt="" className='w-[100px] h-[120px] object-cover' />
                      </div>
                    </Link>
                    <div className='flex flex-col justify-around items-center flex-1/3'>
                      <span className='text-white text-sm'>
                        {item?.Product?.title}
                      </span>
                      <span>
                        <SelectQuantity 
                          quantity={item?.quantity}
                        />
                      </span>
                    </div>
                    <div className='flex items-center justify-center flex-1/3'>
                      <Button
                        name='Xóa'
                      />
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>}
      </div>
    </>
  )
}

export default Cart