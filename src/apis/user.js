import axios from "../axios";
export const apiRegister = (data)=> axios({
    url:'/auth/register',
    method:'POST',
    data
})
export const apiLogin = (data)=> axios({
    url:'/auth/login',
    method:'POST',
    data
})

export const apiLogout = (refreshToken) => axios({
    url:'/auth/logout',
    method:'POST',
    data:{refreshToken}
})