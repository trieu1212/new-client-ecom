import { createSlice } from "@reduxjs/toolkit"
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser:null,//access,refresh
            isFetching:false,
            isError:false,
            isSuccess:false
        },
        register: {
            isFetching: false,
            isSuccess: false,
            isError: false,
        }
    },
    reducers: {
        registerStart: (state) => {
            state.register.isFetching = true
            state.register.isSuccess = false
            state.register.isError = false
        },
        registerSuccess: (state) => {
            state.register.isFetching = false
            state.register.isSuccess = true
            state.register.isError = false
        },
        registerError: (state) => {
            state.register.isFetching = false
            state.register.isSuccess = false
            state.register.isError = true
        },
        loginStart:(state) =>{
            state.login.isFetching = true
            state.login.isSuccess = false
            state.login.isError = false
        },
        loginSuccess: (state,action) =>{
            state.login.isFetching = false;
            state.login.isError = false;
            state.login.isSuccess = true;
            state.login.currentUser = action.payload;
        },
        loginError:(state)=>{
            state.login.isFetching = false
            state.login.isSuccess = false
            state.login.isError = true
        },
        logoutSuccess:(state) =>{
            state.login.currentUser = null
        }
    }
})
export default authSlice.reducer
export const {
    registerStart,
    registerSuccess,
    registerError,
    loginStart,
    loginSuccess,
    loginError,
    logoutSuccess
} = authSlice.actions