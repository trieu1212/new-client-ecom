import React, { useEffect } from 'react'
import { apis } from '../../apis'
import { formatPrice } from '../../ultils/helpers'
const ProductManage = () => {
  const [products, setProducts] = React.useState([])
  const getAllproducts = async () => {
    const res = await apis.getApiProducts({}, {limit:20,currentPage:1})
    setProducts(res.product)
  }
  useEffect(() => {
    getAllproducts()
  }, [])
  console.log(products)
  return (
    <>
      <div className='flex flex-col items-center gap-4 p-12'>
        <h3 className='text-[32px] font-semibold'>Quản lý Sản phẩm</h3>
        <div>
          <table border={1} className='table-auto '>
            <thead className='bg-yellow-200'>
              <tr>
                <th className='p-4'>STT</th>
                <th className='p-4'>Tên sản phẩm</th>
                <th className='p-4'>Mô tả</th>
                <th className='p-4'>Hình ảnh</th>
                <th className='p-4'>Giá</th>
                <th className='p-4'>Đang mở bán</th>
                <th className='p-4'>Danh mục sản phẩm</th>
                <th colSpan={2} className='p-4'>Thao tác</th>
              </tr>
            </thead>
            <tbody className='border bg-green-300'>
              {products.map((product, index) => (
                <tr key={product.id} className='border-b'>
                  <td className='p-4'>{index + 1}</td>
                  <td className='p-4'>{product.title}</td>
                  <td className='p-4'>{product.description}</td>
                  <td className='p-4'><img src={product.image} alt="" className='w-[50px] h-[50px] object-cover' /></td>
                  <td className='p-4'>{formatPrice(product.price)}</td>
                  <td className='p-4'>{product.inStock ? 'Còn hàng' : 'Hết hàng'}</td>
                  <td className='p-4'>{product.Category?.name}</td>
                  <td colSpan={2} className='p-4 flex'>
                    <button
                      className='bg-green-500 text-white p-2 rounded-md mr-2'
                    >Sửa</button>
                    <button className='bg-red-500 text-white p-2 rounded-md'
                    >Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ProductManage