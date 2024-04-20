import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='w-full mt-8'>
        <div className='h-[103px] w-full bg-main justify-center  items-center text-white flex'>
          <div className='w-main flex '>
            <div className='w-main flex flex-col flex-1'>
              <span className='text-[20px] font-semibold text-gray-100'>Đăng ký để nhận thông báo</span>
              <span>
                <small className='text-[13px] text-gray-300 cursor-pointer'>
                  Đăng ký ngay
                </small>
              </span>
            </div>
            <input type="text" placeholder='   Email . . .' className='p-2 rounded-l-full rounded-r-full flex-1 bg-[#F04646] outline-none' />
          </div>
        </div>
        <div className='h-[350px] w-full bg-gray-800 justify-center items-center  flex'>
          <div className='w-main flex text-white text-[13px]'>
            <div className='flex-2 flex flex-col gap-2'>
              <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px] pr-[12px]'>Về Chúng Tôi</h3>
              <div className='flex flex-col ml-4 gap-2'>
                <span>
                  <span className='font-semibold'>Địa chỉ:     </span>
                  <span>UIT - Thủ Đức</span>
                </span>
                <span>
                  <span className='font-semibold'>Điện thoại:     </span>
                  <span>(+84)123456xxx</span>
                </span>
                <span>
                  <span className='font-semibold'>Mail:     </span>
                  <span>UIT@gmail.com</span>
                </span>
              </div>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>Thông Tin</h3>
              <div className='flex flex-col ml-5 gap-2'>
                <span>Mẫu mã</span>
                <span>Hình ảnh</span>
                <span>Deal mới</span>
                <span>Địa chỉ cửa hàng</span>
                <span>Liên hệ</span>
              </div>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>Trợ Giúp</h3>
              <div className='flex flex-col ml-5 gap-2'>
                <span>Hỗ trợ</span>
                <span>Miễn phí vận chuyển</span>
                <span>FAQs</span>
                <span>Đổi trả hàng</span>
                <span>Thử hàng</span>
              </div>
            </div>
            <div className='flex-1'>
              <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>WorkShop</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer