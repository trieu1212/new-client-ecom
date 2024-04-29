import React, { useEffect, useState } from 'react'
import GoldenCard from '../../assets/images/GoldenCard.gif'
import payment from '../../assets/images/payment.svg'
import { useDispatch, useSelector } from 'react-redux'
import { formatPrice } from '../../ultils/helpers'
import { Congrats, InputField, Paypal } from '../../components'
import { getUser } from '../../redux/apiRequest/userApiRequest'
import { Link } from 'react-router-dom'
const Checkout = () => {
  const carts = useSelector((state) => state.user?.carts)
  const user = useSelector((state) => state.auth?.login?.userData)
  const [address, setAddress] = useState(user?.address)
  const [isSuccess, setIsSuccess] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    if (isSuccess === true) {
      getUser(dispatch)
    }
  }, [isSuccess])
  return (
    <>
      <div className='grid w-full grid-cols-10 h-full max-h-screen overflow-y-auto p-8 '>
        {isSuccess === true && <Congrats />}
        <div className='col-span-3 w-full flex flex-col gap-10 justify-center'>
          <Link to={`/cart`}>
            <span className='hover:text-main'>Quay về giỏ hàng</span>
          </Link>
          <img src={payment} alt="" className='h-[80%] object-contain' />
        </div>
        <div className='col-span-7 w-full flex flex-col gap-6 justify-center items-center'>
          <h2 className='text-2xl font-semibold text-main'>Checkout Đơn Hàng</h2>
          <img src={GoldenCard} alt="" className='h-[100px] object-contain' />
          <div className='flex gap-6'>
            <table className='table-auto flex-1'>
              <thead>
                <tr className='border bg-cyan-700 text-white'>
                  <th className=' p-2'>STT</th>
                  <th className=' p-2'>Tên Sản Phẩm</th>
                  <th className=' p-2'>Giá</th>
                  <th className=' p-2'>Số Lượng</th>
                  <th className=' p-2'>Thành Tiền</th>
                </tr>
              </thead>
              <tbody>
                {carts?.map((cart, index) => (
                  <tr key={index} className='border'>
                    <td className='text-center '>{index + 1}</td>
                    <td className='text-center '>{cart?.Product.title}</td>
                    <td className='text-center '>{formatPrice(cart?.Product.price)}</td>
                    <td className='text-center '>{cart?.quantity}</td>
                    <td className='text-center '>{formatPrice(cart?.Product.price * cart.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex-1 flex flex-col justify-between'>
              <div>
                <span className='flex items-center gap-8 text-lg'>
                  <span className='text-[20px] '>
                    Tổng đơn hàng:
                  </span>
                  <span className='text-main text-[20px]'>
                    {formatPrice(carts?.reduce((sum, i) => +i?.Product?.price * i?.quantity + sum, 0))}
                  </span>
                </span>
                <span className='mt-3'>
                  <span>
                    <label className='text-[14px] underline'>Nhập địa chỉ giao hàng: </label>
                  </span>
                  <InputField
                    label='Địa chỉ nhận hàng'
                    type='text'
                    placeholder='Nhập địa chỉ nhận hàng'
                    data={address}
                    setData={setAddress}
                  />
                </span>
              </div>
              {address && address.length > 5 && <div className='w-full mx-auto'>
                <Paypal
                  amount={Math.round(+carts?.reduce((sum, i) => +i?.Product?.price * i?.quantity + sum, 0) / 23500)}
                  payload={{
                    address: address,
                    products: carts,
                    amount: carts?.reduce((sum, i) => +i?.Product?.price * i?.quantity + sum, 0),
                    userId: user?.id
                  }}
                  setIsSuccess={setIsSuccess}
                />
              </div>}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Checkout