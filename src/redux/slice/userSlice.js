import { createSlice } from "@reduxjs/toolkit"
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:null,
        showCart:false
    },
    reducers: {
        getUserInfo: (state,action) => {
            state.user = action.payload
        },
        isShowCart:(state) =>{
            state.showCart = !state.showCart
        },

        logoutUser:(state) => {
            state.user = null
        }
    }
})
export default userSlice.reducer
export const {
    getUserInfo,
    logoutUser,
    isShowCart
} = userSlice.actions