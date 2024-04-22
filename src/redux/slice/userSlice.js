import { createSlice } from "@reduxjs/toolkit"
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:null
    },
    reducers: {
        getUserInfo: (state,action) => {
            state.user = action.payload
        },
        logoutUser:(state) => {
            state.user = null
        }
    }
})
export default userSlice.reducer
export const {
    getUserInfo,
    logoutUser
} = userSlice.actions