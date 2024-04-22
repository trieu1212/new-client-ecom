import { Route, Routes } from 'react-router-dom'
import { Login, Home, Public, Products, ProductDetail, Blogs, Register } from './pages/public'
import path from './ultils/path'
import { ToastContainer } from 'react-toastify'
function App() {


  return (
    <>
      <div className='min-h-screen font-main'>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.PRODUCTS} element={<Products />} />
            <Route path={path.PRODUCT_DETAIL} element={<ProductDetail />} />
            <Route path={path.BLOGS} element={<Blogs />} />
          </Route>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
