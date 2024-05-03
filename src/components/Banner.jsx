import React from 'react'
import banner_clothes from '../assets/images/banner-clothes.jpg'
import img1 from '../assets/images/7.jpg'
import img2 from '../assets/images/8.jpg'
import img3 from '../assets/images/9.jpg'
const Banner = () => {
  return (
    <>
      <div className='w-full relative'>
        <img 
          src={banner_clothes} 
          alt="Banner"
          className='object-cover w-full h-[480px]' 
        />
        <div className='absolute top-0 bottom-0 left-0 right-0 flex'>
          <div className='m-auto text-center flex-[60%]'>
            <h1 className='text-white text-[48px] font-semibold'>Welcome to our store</h1>
            <p className='text-white text-[24px]'>The best place to buy clothes</p>
          </div>
          <div className='flex gap-2 my-auto mr-2 '>
            <img src={img1} alt="" className=' animate-bounce delay-1000 object-cover rounded-lg' />
            <img src={img2} alt="" className=' animate-bounce delay-2000 object-cover rounded-lg' />
            <img src={img3} alt="" className=' animate-bounce delay-3000 object-cover rounded-lg'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner