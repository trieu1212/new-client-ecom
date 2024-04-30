import axios from '../axios'

const apis = {
    //category
    getApiCategories: () => axios({
        url:'/category/',
        method:'GET'
    }),
    //products
    getApiProducts: (params,query) => axios({
        url:query.categoryId? `/product/?limit=${query.limit || 10}&&categoryId=${query.categoryId}&&sort=${query.sort||false}`: `/product/?limit=${query.limit}&&sort=${query.sort||false}`,
        method:'GET',
        params:params,
    }),
    getOneApiProduct: (id) => axios({
        url:`/product/${id}/`,
        method:'GET'
    }),
    createComment:(data,userId)=>axios({
        url:`/comment/create/${userId}/`,
        method:'POST',
        data:data
    }),
    getProductComments: (productId) => axios({
        url:`/comment/${productId}/`,
        method:'GET'
    }),
    deleteComment:(commentId,userId)=>axios({
        url:`/comment/delete/${commentId}/${userId}`,
        method:'DELETE'
    }),
}

export default apis


