import { Route, Routes } from 'react-router-dom'
import { Login, Home, Public, Products, ProductDetail, Blogs, Register } from './pages/public'
import { ScrollToTop, Cart } from './components'
import path from './ultils/path'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { isShowCart } from './redux/slice/userSlice'
function App() {
  const dispatch = useDispatch()
  const showCart = useSelector((state) => state.user?.showCart)
  return (
    <>
      <div className={`min-h-screen relative font-main`}>
        {
          showCart && <div
            onClick={() => dispatch(isShowCart())}
            className='h-screen fixed inset-0 bg-blend-overlay z-50 flex justify-end bg-black bg-opacity-50 overflow-hidden'
          >
            <Cart />
          </div>
        }
        <ScrollToTop />
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
