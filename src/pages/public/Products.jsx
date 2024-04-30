import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apis } from '../../apis'
import Masonry from 'react-masonry-css'
import {Product} from '../../components'
const Products = () => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  const { categoryId, categoryName } = useParams()
  const [products, setProducts] = useState([])
  const [categories,setCategories] = useState([])
  const [sort,setSort] = useState('DESC')
  const getAllCategories = async() =>{
    const response = await apis.getApiCategories()
    setCategories(response)
  }
  const getAllProductsByCategory = async () => {
    const response = await apis.getApiProducts({}, { categoryId, sort })
    setProducts(response.product)
  }
  const getAllProducts = async() =>{
    const response = await apis.getApiProducts({}, { limit:20, sort})
    setProducts(response.product)
  }
  useEffect(() => {
    if(categoryName===":categoryName"){
      getAllCategories()
      getAllProducts()
    }else{
    getAllProductsByCategory()
    getAllCategories()
    }
  }, [categoryId,sort])
  return (
    <>
      <div className='w-full'>
        <div className='h-[81px] flex justify-center items-center bg-gray-100'>
          <div className='w-main '>
            <h3 className='font-semibold text-[20px]'>
              {categoryName===":categoryName" ? 'Tất cả sản phẩm' : categoryName}
            </h3>
          </div>
        </div>
        <div className='w-main border p-4 flex items-center justify-between m-auto mt-4'>
          <div className='w-4/5 flex-auto flex gap-2 items-center'>
            {categories.map((category)=>{
              return(
                <div key={category.id} className=' p-2 bg-main border rounded-xl text-white hover:bg-cyan-600'>
                  <Link to={`/products/${category.id}/${category.name}`} >{category.name}</Link>
                </div>
              )
            })}
          </div>
          <div className='w-1/5 flex flex-col'>
            <div 
              className={sort==='ASC'? 'cursor-pointer text-cyan-500': 'cursor-pointer'}
              onClick={()=>setSort('ASC')}
            >
              Giá từ thấp đến cao
            </div>
            <div
              className={sort==='DESC'? 'cursor-pointer text-cyan-500': 'cursor-pointer'}
              onClick={()=>setSort('DESC')}
            >
              Giá từ cao đến thấp
            </div>
          </div>
        </div>
        <div className='mt-8 w-main m-auto'>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {products.map((product)=>{
              return(
                <>
                  <div key={product.id} className=''>
                    <Product showOption={false} id={product.id} title={product.title} image={product.image} price={product.price} />
                  </div>
                </>
              )
            })}
          </Masonry>
        </div>
      </div>
    </>
  )
}

export default Products