import { createSlice } from "@reduxjs/toolkit"
import { getAllCategories } from "../apiRequest/categoryApiRequests"

const categorySlice = createSlice({
    name: 'category',
    initialState:{
        category: [],
        isFetching: false,
        isSuccess: false,
        isError: false,
    },
    reducers:{
        getAllCategoriesStart:(state) =>{
            state.isFetching = true
            state.isSuccess = false
            state.isError = false
        },
        getAllCategoriesSuccess: (state,action) => {
            state.isFetching = false
            state.isSuccess = true
            state.isError = false
            state.category = action.payload
        },
        getAllCategoriesError: (state) => {
            state.isFetching = false
            state.isSuccess = false
            state.isError = true
        }
    }
})

export default categorySlice.reducer
export const {
    getAllCategoriesStart,
    getAllCategoriesSuccess,
    getAllCategoriesError
} = categorySlice.actions