import React, { useEffect, useState } from 'react'
import {SelectQuantity} from '../components'
import { formatPrice } from '../ultils/helpers'
import { useDispatch } from 'react-redux'
import { updateCart } from '../redux/slice/userSlice'
const OrderItem = (props) => {
    const {id,productId,image,title,price, defaultQuantity=1,size} = props
    const [quantity, setQuantity] = useState(defaultQuantity)
    const dispatch = useDispatch()
    const handleQuantity = (number) => {
      if (+number>1) setQuantity(number)
    }
    const handleChangeQuantity = (x) => {
        if(x==='minus' && quantity===1) return;
        if (x === 'minus') {
          setQuantity(prev => +prev - 1);
        }
        if (x === 'plus') setQuantity(prev => +prev + 1)
      }
    useEffect(()=>{
        dispatch(updateCart({productId:productId,quantity:quantity}))
    },[quantity])
    return (
        <>
            <div  className='font-semibold grid grid-cols-10 mt-4 border-b py-3'>
                <span className='col-span-6 w-full text-center'>
                    <div  className='ml-3 flex gap-3'>
                        <img src={image} alt="" className='object-cover w-30 h-28' onClick={() => dispatch(isShowCart())} />
                        <div className=' flex flex-col gap-1 '>
                            <span className=' text-[15px] text-main'>
                                {title}
                            </span>
                            <span className=' text-[15px]'>
                               Size: {size}
                            </span>
                        </div>
                    </div>
                </span>
                <span className='col-span-1 w-full flex items-center justify-center text-center'>
                    <SelectQuantity
                        quantity={quantity}
                        handleQuantity={handleQuantity}
                        handleChangeQuantity={handleChangeQuantity}
                    />
                </span>
                <span className='col-span-3 text-lg flex items-center justify-center w-full text-center'>
                    {formatPrice(price * quantity)}
                </span>
            </div>
        </>
    )
}

export default OrderItem