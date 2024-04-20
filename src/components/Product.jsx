import React, { useState } from 'react'
import { formatPrice } from '../ultils/helpers';
import { SelectOption } from './index'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom';
const Product = (props) => {
  const { id, title, image, price, showOption } = props
  const { FaRegStar, FaStar, FaRegEye, IoIosMenu, FaCartShopping } = icons
  const [isShowOption, setIsShowOption] = useState(false)
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
        <Link to={`/product/${id}`}>
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
                  <SelectOption icon={<FaRegEye />} />
                  <SelectOption icon={<IoIosMenu />} />
                  <SelectOption icon={<FaCartShopping />} />
                </div>
              }
              <div className='flex flex-col text-center gap-2 mt-2'>
                <p className='text-sm font-semibold'>{title}</p>
                <span className='flex items-center justify-center'>{renderStart(5)}</span>
                <p className='text-sm font-bold text-main'>{formatPrice(price)}</p>
              </div>
            </div>)
            : (
              <div className='flex flex-col w-full relative mr-2 px-[10px] border hover:shadow-sm'>
                <img src={image} alt={title} className='px-4 w-50 h-48 object-cover mb-9' />
                {
                  isShowOption &&
                  <div className='absolute bottom-16 left-0 right-0 flex justify-center gap-8 animate-slide-top'>
                    <SelectOption icon={<FaRegEye />} />
                    <SelectOption icon={<IoIosMenu />} />
                    <SelectOption icon={<FaCartShopping />} />
                  </div>
                }
                <div className='flex flex-col text-center gap-2 mt-2'>
                  <p className='text-sm font-semibold'>{title}</p>
                  <span className='flex items-center justify-center'>{renderStart(5)}</span>
                  <p className='text-sm font-bold text-main'>{formatPrice(price)}</p>
                </div>
              </div>
            )}
        </Link>
      </div>
    </>
  )
}

export default Product