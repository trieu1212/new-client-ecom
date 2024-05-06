import React, { useEffect, useState } from 'react'
import GoldenCard from '../../assets/images/GoldenCard.gif'
import payment from '../../assets/images/payment.svg'
import payment1 from '../../assets/images/pay-by-bank-card.svg'
import credit from '../../assets/images/credit-card.svg'
import { useDispatch, useSelector } from 'react-redux'
import { formatPrice } from '../../ultils/helpers'
import { Congrats, InputField, Paypal } from '../../components'
import { getUser } from '../../redux/apiRequest/userApiRequest'
import { Link } from 'react-router-dom'
import icons from '../../ultils/icons'
const Checkout = () => {
  const carts = useSelector((state) => state.user?.carts)
  const user = useSelector((state) => state.user?.user)
  const [address, setAddress] = useState(user?.address)
  const [isSuccess, setIsSuccess] = useState(false)
  const { BsArrowReturnLeft } = icons
  const dispatch = useDispatch()
  useEffect(() => {
    if (isSuccess === true) {
      getUser(dispatch)
    }
  }, [isSuccess])
  console.log(user)
  return (
    <>
      <div className='grid w-full grid-cols-10 h-full max-h-screen overflow-y-auto p-12 '>
        {isSuccess === true && <Congrats />}
        <div className='col-span-4 p-8 w-full flex flex-col gap-10 border rounded-lg shadow-xl justify-center'>
          <h3 className='text-center text-[28px]'>Thông tin đơn hàng</h3>
          <table className='table-auto flex-1'>
            <thead>
              <tr className='border bg-cyan-700 text-white'>
                <th className=' p-2'>STT</th>
                <th className=' p-2'>Tên Sản Phẩm</th>
                <th className=' p-2'>Kích cỡ</th>
                <th className=' p-2'>Giá</th>
                <th className=' p-2'>Số Lượng</th>
              </tr>
            </thead>
            <tbody>
              {carts?.map((cart, index) => (
                <tr key={index} className='border'>
                  <td className='text-center '>{index + 1}</td>
                  <td className='text-center '>{cart?.Product.title}</td>
                  <td className='text-center '>{cart?.size}</td>
                  <td className='text-center '>{formatPrice(cart?.Product.price)}</td>
                  <td className='text-center '>{cart?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <span className='border-t pt-3 border-main'>
            <span className='text-[18px]'>Mô tả: </span>
            <span className='italic'>Thanh toán online qua Paypal</span>
          </span>
          <div className='flex flex-col gap-4 border-t pt-3 border-main'>
            <span className='text-[20px]'>Phí vận chuyển: 0đ</span>
            <div className='flex gap-4'>
              <span className='text-[20px] '>
                Tổng đơn hàng:
              </span>
              <span className='text-main text-[20px]'>
                {formatPrice(carts?.reduce((sum, i) => +i?.Product?.price * i?.quantity + sum, 0))}
              </span>
            </div>
          </div>
          <Link to={`/cart`} className='border-t pt-3 border-main flex hover:text-main items-center gap-2'>
            <BsArrowReturnLeft size={20} />
            <span className=' '>Quay về giỏ hàng</span>
          </Link>
        </div>
        <div className='col-span-6 ml-6 p-8 border rounded-lg shadow-xl w-full flex flex-col gap-6 justify-center items-center'>
          <div className='flex items-center'>
            <img src={credit} alt="" className='h-[40px]' />
            <h2 className='text-2xl font-semibold text-main'>Thông tin khách hàng</h2>
          </div>
          <img src={payment1} alt="" className='h-[200px] object-contain' />
          <div className='flex gap-6'>
            <div className='flex-1 flex flex-col justify-between'>
              <div>
                <div className='flex gap-6'>
                  <span className='mt-3'>
                    <span>
                      <label className='text-[14px] underline'>Tên người nhận hàng: </label>
                    </span>
                    <InputField
                      type='text'
                      data={user?.username}
                      disabled={true}
                    />
                  </span>
                  <span className='mt-3'>
                    <span>
                      <label className='text-[14px] underline'>Email: </label>
                    </span>
                    <InputField
                      type='text'
                      data={user?.email}
                      disabled={true}
                    />
                  </span>
                </div>
                <span className='mt-3'>
                  <span>
                    <label className='text-[14px] underline'>Số điện thoại: </label>
                  </span>
                  <InputField
                    type='text'
                    data={user?.phone}
                    disabled={true}
                  />
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