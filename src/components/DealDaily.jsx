import React, { useEffect, useState } from 'react'
import icons from '../ultils/icons'
import { apis } from '../apis'
import { formatPrice } from '../ultils/helpers';
import { Link } from 'react-router-dom';
const DealDaily = () => {
    const { FaStar, FaRegStar, AiOutlineMenu } = icons
    const [product, setProduct] = useState({})
    const query = {
        limit: 1
    }
    const getDealProduct = async () => {
        const response = await apis.getApiProducts({ page: 5 }, query)
        setProduct(response.product[0])
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

    useEffect(() => {
        getDealProduct()
    }, [])
    return (
        <>
            <div className='border flex-auto mr-2'>
                <div className='flex justify-center items-center mt-3'>
                    <span className='flex-2 pl-3'><FaStar color='red' size={20} /></span>
                    <span className='flex-5 font-semibold text-[20px]'>Deal Hôm Nay!</span>
                    <span className='flex-2'></span>
                </div>
                <div className='w-full flex flex-col items-center pt-8 gap-2'>
                    <img src={product?.image} alt={product?.title} className='w-full px-8 object-contain mb-4' />
                    <p className='text-[18px] font-semibold'>{product?.title}</p>
                    <span className='flex items-center justify-center'>{renderStart(5)}</span>
                    <p className='text-sm font-bold text-main'>{formatPrice(product?.price)}</p>
                </div>
                <div className='px-4 mt-4'>
                    <Link to={`/product/${product.id}`}>
                        <button
                            className='flex gap-2 justify-center items-center border py-2 rounded w-full bg-main hover:bg-gray-800 text-white font-medium'
                            type='button'
                        >
                            <AiOutlineMenu size={20} />
                            <span>Xem chi tiết</span>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default DealDaily