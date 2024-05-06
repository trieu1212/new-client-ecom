
import { useSelector } from 'react-redux'
import { formatPrice } from '../../ultils/helpers'
import { OrderItem } from '../../components'
import { Link } from 'react-router-dom'
const CartDetail = () => {
  const user = useSelector((state) => state.user?.user)
  const carts = useSelector((state) => state.user?.carts)
  return (
    <>
      {carts?.length === 0 ? <h3 className='text-3xl font-semibold tracking-tight my-8 text-center'>Giỏ hàng của bạn đang trống</h3> : (
        <div className='flex justify-start flex-col w-main'>
          <h3 className='text-3xl font-semibold tracking-tight my-8'>
            Giỏ hàng của tôi
          </h3>
          <div className='flex flex-col border'>
            <div className='font-semibold grid grid-cols-10 mb-3 border py-2 bg-main text-white'>
              <span className='col-span-6 w-full text-center'>Sản phẩm</span>
              <span className='col-span-1 w-full text-center'>Số lượng</span>
              <span className='col-span-3 w-full text-center'>Giá tiền</span>
            </div>
            <div>
              {user && user?.Carts?.length > 0 &&
                user?.Carts?.map((item) => {
                  return (
                    <>
                      <OrderItem
                        key={item.id}
                        id={item.id}
                        productId={item?.productId}
                        image={item?.Product?.image}
                        title={item?.Product?.title}
                        price={item?.Product?.price}
                        defaultQuantity={item?.quantity}
                        size={item?.size}
                      />
                    </>
                  )
                })
              }
            </div>
          </div>
          <div className='w-main mx-auto flex flex-col justify-center items-end gap-3 mt-4'>
            <span className='flex items-center gap-8 text-sm'>
              <span>
                Tổng đơn hàng:
              </span>
              <span className='text-main'>
                {formatPrice(carts?.reduce((sum, i) => +i?.Product?.price * i?.quantity + sum, 0))}
              </span>
            </span>
            <Link to={`/checkout`} className='p-2 border bg-main text-white rounded-lg hover:bg-gray-600'>
              Checkout
            </Link>
          </div>
        </div>
      )}

    </>
  )
}

export default CartDetail