import React, { useEffect, useState } from 'react'
import { apis } from '../apis'
import Slider from "react-slick";
import { Product } from './index'
import banner1 from '../assets/images/banner1.jpg'
import banner2 from '../assets/images/banner2.jpg'
var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const BestSeller = () => {
    const [type, setType] = useState('Best Seller')
    const [products, setProducts] = useState([])
    const query = {
        limit: type === 'Best Seller' ? 5 : 1,
        currentPage: 1,
    }
    const fetchProducts = async () => {
        const response = await apis.getApiProducts({}, query)
        setProducts(response.product)
    }
    useEffect(() => {
        fetchProducts()
    }, [type])
    return (
        <>
            <div>
                <div className='flex text-xl gap-8 mt-3 font-light border-b-2 pb-2 border-main'>
                    <span
                        className='border-r px-6 cursor-pointer hover:text-main'
                        onClick={() => setType('Best Seller')}
                    >
                        Sản phẩm bán chạy
                    </span>
                    <span
                        className='cursor-pointer hover:text-main'
                        onClick={() => setType('News Arrivals')}
                    >
                        Sản phẩm mới
                    </span>
                </div>
                <div className='mt-4 ml-4'>
                    <Slider {...settings}>
                        {products.map((product) => {
                            return (
                                <div key={product.id}>
                                    <Product showOption={true} id={product.id} title={product.title} image={product.image} price={product.price} />
                                </div>
                            )
                        })}
                    </Slider>
                </div>
                <div className='flex w-full gap-8 mt-10'>
                    <img src={banner1} alt="" className='w-[274px] flex-1 object-contain'/>
                    <img src={banner2} alt="" className='w-[274px] flex-1 object-contain' />
                </div>
            </div>
        </>
    )
}

export default BestSeller