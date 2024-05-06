import axios from "../axios"

// export const apiUpdateCart= (params,data) => axios({
//     url: `/cart/create/${params.userId}`,
//     method: 'POST',
//     data
// })
export const apiUpdateCart = (params, data) => {
    return axios.post(`/cart/create/${params.userId}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };
export const apiRemoveCart= (params) => axios({
    url: `/cart/delete/${params.productId}/${params.size}/${params.userId}`,
    // params: params,
    method: 'DELETE',
})
export const apiCreateOrder =(data) => axios({
    url: `/order/create/${data.userId}`,
    method: 'POST',
    data
})

export const apiGetOrder = (params) =>axios({
    url: `/order/${params.userId}`,
    method: 'GET',
})