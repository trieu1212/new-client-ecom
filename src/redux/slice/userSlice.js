import { createSlice } from "@reduxjs/toolkit"
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:null,
        carts:[],
        showCart:false
    },
    reducers: {
        getUserInfo: (state,action) => {
            state.user = action.payload
            state.carts = action.payload.Carts
        },
        isShowCart:(state) =>{
            state.showCart = !state.showCart
        },
        updateCart:(state,action) =>{
            const {productId,quantity,size} = action.payload
            const updateCart = JSON.parse(JSON.stringify(state.carts))
            state.carts = updateCart.map((item)=>{
                if(item.productId === productId || item.size === size){
                    return {...item,quantity:quantity}
                }
                return item
            })
        },

        logoutUser:(state) => {
            state.user = null
            state.carts = []
            state.showCart = false
        }
    }
})
export default userSlice.reducer
export const {
    getUserInfo,
    logoutUser,
    isShowCart,
    updateCart
} = userSlice.actions