
import { apis } from "../../apis"
import { getAllCategoriesError, getAllCategoriesStart, getAllCategoriesSuccess } from "../slice/categorySlice"


export const getAllCategories = async (dispatch) =>{
    dispatch(getAllCategoriesStart())
    try {
        const response = await apis.getApiCategories()
        if (response.status === 200) {
            dispatch(getAllCategoriesSuccess(response.data))
        }
    } catch (error) {
        dispatch(getAllCategoriesError())
    }
}