import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apis from '../../apis/app'
import ReactImageMagnify from 'react-image-magnify';
import { VNDPrice, formatPrice } from '../../ultils/helpers'
import icons from '../../ultils/icons'
import { Button, SelectQuantity, Product } from '../../components'
import Slider from "react-slick";
const ProductDetail = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  const { FaRegStar, FaStar, FaTruck, FaShieldHeart, FaPhoneVolume, BsArrowReturnLeft, TiTick, MdOutlinePayment } = icons
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState([])
  useEffect(() => {
    const getProductDetail = async () => {
      const res = await apis.getOneApiProduct(id)
      setProduct(res)
    }
    getProductDetail()
  }, [id])
  const getRelatedProducts = async () => {
    const query = {
      categoryId: product?.categoryId,
      limit: 4
    }
    const res = await apis.getApiProducts({}, query)
    setRelatedProducts(res.product)
  }
  useEffect(() => {
    if (product) {
      getRelatedProducts()
    }
  }, [id])
  const handleQuantity = useCallback((number) => {
    if (!Number(number) || Number(number) < 1) {
      return
    }
    else {
      setQuantity(number)
    }
  }, [quantity])
  const handleChangeQuantity = useCallback((x) => {
    console.log(quantity)
    if (x === 'minus') setQuantity(prev => +prev - 1)
    if (x === 'plus') setQuantity(prev => +prev + 1)
  }, [])
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
      <div className='w-full'>
        <div className='h-[81px] flex justify-center items-center bg-gray-100'>
          <div className='w-main '>
            <h3 className='font-semibold text-[20px]'>
              {product.title}
            </h3>
          </div>
        </div>
        <div className='w-main m-auto mt-4 flex'>
          <div className='w-3/6'>
            <div className='w-[400px] h-[480px]'>
              <img src={product.image} alt="" className='h-[480px] w-[400px] object-cover' />
            </div>
          </div>
          <div className='w-3/6 flex flex-col gap-8 pr-[24px]'>
            <h2 className='text-[36px] font-semibold'>
              {formatPrice(VNDPrice(product.price))}
            </h2>
            <div className='flex items-center '>
              {renderStart(5)}
            </div>
            <div className='text-gray-400 text-[20px]'>
              {product.description}
            </div>
            <div className='flex flex-col gap-8'>
              <div className='flex items-center gap-4'>
                <span className='font-semibold'>Số lượng: </span>
                <SelectQuantity
                  quantity={quantity}
                  handleQuantity={handleQuantity}
                  handleChangeQuantity={handleChangeQuantity}
                />
              </div>
              <Button
                name='Thêm vào giỏ hàng'
                fw={true}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
            <div className='flex gap-4 '>
              <div className='flex flex-col gap-2 flex-1 text-[14px]'>
                <h3 className='font-semibold text-[18px]'>Chính sách bán hàng</h3>
                <span className='flex items-center gap-2'> <FaTruck size={36} color='red' /> MIỄN PHÍ giao hàng từ 499,000đ</span>
                <span className='flex items-center gap-2'> <FaShieldHeart size={68} color='red' /> Sản xuất tại Nhà máy UIT. Với hơn 10.000 nghệ nhân ở Việt Nam</span>
                <span className='flex items-center gap-2'> <FaPhoneVolume size={36} color='red' /> Tổng đài MIỄN PHÍ 1800 xxxx</span>
              </div>
              <div className='flex-1 flex flex-col gap-4 text-[14px]'>
                <h3 className='font-semibold text-[18px]'>Thông tin thêm</h3>
                <span className='flex items-center gap-2'> <BsArrowReturnLeft FaTruck size={28} color='red' /> Đổi hàng Không cần lý do</span>
                <span className='flex items-center gap-2'> <TiTick FaTruck size={36} color='red' /> Mở hộp kiểm tra nhận hàng</span>
                <span className='flex items-center gap-2'> <MdOutlinePayment FaTruck size={34} color='red' /> Đa dạng hình thức thanh toán</span>
              </div>
            </div>
          </div>
        </div>
        <div className='w-main m-auto mt-16'>
          <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>
            Sản phẩm liên quan
          </h3>
          <div className='mt-8'>
            <Slider {...settings}>
              {relatedProducts.map((item) => {
                return (
                  <div key={item.id}>
                    <Product showOption={false} id={item.id} title={item.title} image={item.image} price={item.price} />
                  </div>
                )
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail