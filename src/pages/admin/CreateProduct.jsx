import React, { Fragment, useEffect } from 'react'
import { Button, InputField } from '../../components'
import { apis } from '../../apis'
import { formatPrice } from '../../ultils/helpers'
const CreateProduct = () => {
  const [categories, setCategories] = React.useState([])
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [image, setImage] = React.useState('')
  const [categoryId, setCategoryId] = React.useState('')
  const [inStock, setInStock] = React.useState(true)
  const getAllCategory = async () => {
    const res = await apis.getApiCategories()
    setCategories(res)
  }
  useEffect(() => {
    getAllCategory()
  }, [])
  const handleCreateProduct = async () =>{
    const data = {
      title,
      description,
      price,
      image,
      categoryId,
      inStock
    }
    console.log(data)
  }
  return (
    <>
      <div className='p-4 flex flex-col gap-12 '>
        <h3 className='text-[32px] font-semibold text-center'>Thêm Sản phẩm</h3>
        <div className='flex flex-col justify-center gap-4'>
          <div>
            <label htmlFor="title">Tên sản phẩm</label>
            <InputField
              data={title}
              setData={setTitle}
            />
          </div>
          <div>
            <label htmlFor="description">Mô tả</label>
            <InputField
              data={description}
              setData={setDescription}
            />
          </div>
          <div>
            <label htmlFor="price">Giá</label>
            <InputField
              type='number'
              data={price}
              setData={setPrice}
            />
          </div>
          <div>
            <label htmlFor="image">Hình ảnh</label>
            <InputField
              data={image}
              setData={setImage}
            />
            {image && <img src={image} alt="" className='w-[150px] h-[200px] object-contain' />}
          </div>
          <div className='flex gap-6 mb-12'>
            <label htmlFor="inStock">Mở bán</label>
            <select name="inStock" id="inStock"onChange={(e)=>setInStock(e.target.value)} >
              <option value={true} >Mở</option>
              <option value={false} >Đóng</option>
            </select>
          </div>
          <div className='flex gap-6'>
            <label htmlFor="categoryId">Danh mục sản phẩm</label>
            <select name="categoryId" id="categoryId" onChange={(e)=>setCategoryId(e.target.value)}>
              {categories.map((category) => {
                return (
                  <Fragment key={category.id}>
                    <option  value={category.id}>{category.name}</option>
                  </Fragment>
                )
              })}
            </select>
          </div>
        </div>
        <div className='text-center'>
          <Button
            name='Thêm sản phẩm'
            handleOnClick={handleCreateProduct}
          />
        </div>
      </div>
    </>
  )
}

export default CreateProduct