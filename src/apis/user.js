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

export const apiLogout = () => axios({
    url:'/auth/logout',
    method:'POST',
})

export const apiGetUser = () => axios({
    url: '/auth/current',
    method: 'GET',
})
