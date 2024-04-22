import axios from "../axios"

export const apiUpdateCart= (params,data) => axios({
    url: `/cart/create/${params.userId}`,
    method: 'POST',
    data
})
export const apiRemoveCart= (params) => axios({
    url: '/cart/delete/',
    params: params,
    method: 'POST',
})