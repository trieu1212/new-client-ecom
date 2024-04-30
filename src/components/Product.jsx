import React, { useState } from 'react'
import { formatPrice } from '../ultils/helpers';
import { SelectOption } from './index'
import icons from '../ultils/icons'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { apiUpdateCart } from '../apis/cart';
import { getUser } from '../redux/apiRequest/userApiRequest';
const Product = (props) => {
  const { id, title, image, price, showOption } = props
  const { FaRegStar, FaStar, FaRegEye, IoIosMenu, FaCartShopping } = icons
  const [isShowOption, setIsShowOption] = useState(false)
  const user = useSelector(state => state.auth?.login?.userData)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const updateCart = async (productId) => {
    try {
      const data = {
        productId: +productId || id,
        quantity: 1
      };
      const params = {
        userId: user?.id
      };
      const setTimeOutId = setTimeout(async () => {
        const response = await apiUpdateCart(params, data)
        if (response.message == 'Updated cart successfully') {
          await getUser(dispatch);
          toast.success('Sản phẩm đã được cập nhật vào giỏ hàng.');
        } else if (response.message == 'Created cart successfully') {
          await getUser(dispatch);
          toast.success('Sản phẩm đã được thêm vào giỏ hàng.');
        }
      }, 300)
      return () => clearTimeout(setTimeOutId)
    } catch (error) {
      // toast.error('Thao tác thất bại. Vui lòng thử lại sau.');
      console.log(error)
    }
  }
  const handleClickOption = async (productId) => {
    if (user) {
      await updateCart(productId)
    }
    else {
      Swal.fire({
        title: 'Thông báo!',
        text: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng',
        icon: 'info',
        cancelButtonText: 'Hủy',
        showCancelButton: true,
        confirmButtonText: 'Đăng nhập',
      }).then((res) => res.isConfirmed && navigate('/login'))
    }
  }
  const renderStart = (number) => {
    const stars = []
    for (let i = 0; i < +number; i++) {
      stars.push(<FaStar key={i} className='text-yellow-400' />)
    }
    for (let i = 0; i < 5 - number; i++) {
      stars.push(<FaRegStar key={i + number} className='text-yellow-400' />)
    }
    return stars
  }
  return (
    <>
      <div className='mr-4' key={id}>
        {showOption === true ?
          (<div
            className='flex flex-col w-full relative mr-2 border hover:shadow-sm'
            onMouseEnter={(e) => {
              e.stopPropagation()
              setIsShowOption(true)
            }}
            onMouseLeave={(e) => {
              e.stopPropagation()
              setIsShowOption(false)
            }}
          >
            <img src={image} alt={title} className='px-8 w-50 h-48 object-cover mb-9' />
            {
              isShowOption &&
              <div className='absolute bottom-16 left-0 right-0 flex justify-center gap-8 animate-slide-top'>
                <span title='Xem nhanh'><SelectOption icon={<FaRegEye />} /></span>
                <Link to={`/product/${id}`}><span title='Xem chi tiết'><SelectOption icon={<IoIosMenu />} /></span></Link>
                <span title='Thêm vào giỏ' onClick={() => handleClickOption(id)}><SelectOption icon={<FaCartShopping />} /></span>
              </div>
            }
            <div className='flex flex-col text-center gap-2 mt-2'>
              <p className='text-sm font-semibold'>{title}</p>
              <span className='flex items-center justify-center'>{renderStart(5)}</span>
              <p className='text-sm font-bold text-main'>{formatPrice(price)}</p>
            </div>
          </div>)
          : (
            <div className='flex flex-col w-full relative mr-2 px-[10px] border hover:shadow-xl hover:shadow-orange-900'>
              <img src={image} alt={title} className='px-8 w-50 h-48 object-cover mb-9' />
              {
                isShowOption &&
                <div className='absolute bottom-16 left-0 right-0 flex justify-center gap-8 animate-slide-top'>
                  <span title='Xem nhanh'><SelectOption icon={<FaRegEye />} /></span>
                  <Link to={`/product/${id}`}><span title='Xem chi tiết'><SelectOption icon={<IoIosMenu />} /></span></Link>
                  <span title='Thêm vào giỏ' onClick={() => handleClickOption(id)}><SelectOption icon={<FaCartShopping />} /></span>
                </div>
              }
              <div className='flex flex-col text-center gap-2 mt-2'>
                <Link to={`/product/${id}`}>
                  <p className='text-lg font-semibold'>{title}</p>
                </Link>
                <span className='flex items-center justify-center'>{renderStart(5)}</span>
                <p className='text-sm font-bold text-main'>{formatPrice(price)}</p>
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default Product