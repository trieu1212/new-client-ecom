import { apiGetUser } from "../../apis/user"
import { getUserInfo } from "../slice/userSlice"

export const getUser = async (dispatch) =>{
    const response = await apiGetUser()
    dispatch(getUserInfo(response))
}