

import { toast } from "react-toastify";
import { apiLogout, apiRegister } from "../../apis/user";
import { apiLogin } from "../../apis/user";
import { loginError, loginStart, loginSuccess, logoutSuccess, registerError, registerStart, registerSuccess } from "../slice/authSlice";
import Swal from 'sweetalert2'
import { logoutUser } from "../slice/userSlice";

export const register = async (data, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        const res = await apiRegister(data)
        dispatch(registerSuccess(res))
        Swal.fire('Đăng Ký thành công!', 'Chuyển hướng đến trang đăng nhập...', 'success').then(() => {
            navigate('/login')
        })
    } catch (error) {
        dispatch(registerError())
        toast.error('Đăng ký thất bại!')
    }
}

export const login = async (data,dispatch,navigate) =>{
    dispatch(loginStart())
    try {
        const res = await apiLogin(data)
        dispatch(loginSuccess(res))
        Swal.fire('Đăng nhập thành công!', 'Chuyển hướng đến trang chính...', 'success').then(() => {
            navigate('/')
        })
    } catch (error) {
        dispatch(loginError())
        toast.error('Đăng nhập thất bại!')
    }
}

export const logout = async (dispatch,navigate) =>{
    const res = await apiLogout()
    dispatch(logoutSuccess())
    dispatch(logoutUser())
    toast.success('Đăng xuất thành công!')
    navigate('/login')
}