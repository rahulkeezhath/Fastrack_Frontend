import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import driverAuthService from './driverAuthService'

// Get driver from LocalStorage
const driver = JSON.parse(localStorage.getItem('driver'))

const initialState = {
    driver: driver?driver:null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
    error: ''
}

// register driver
export const driverRegister=createAsyncThunk('driverAuth/register',async(driverData,thunkAPI)=>{
    try {
        return await driverAuthService.register(driverData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// login driver
export const driverLogin=createAsyncThunk('driverAuth/login',async(loginData,thunkAPI)=>{
    try {
        return await driverAuthService.login(loginData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout driver
export const logout = createAsyncThunk('driverAuth/logout', async () => {
    await driverAuthService.logout()
})

export const driverAuthSlice=createSlice({
    name:'driverAuth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.driver=null
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
            state.message=''
            state.error=''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(driverRegister.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(driverRegister.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.message=action.payload
        })
        .addCase(driverRegister.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.error=action.payload
        })
        .addCase(driverLogin.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(driverLogin.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.driver=action.payload
        })
        .addCase(driverLogin.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.error=action.payload
        })
        .addCase(logout.fulfilled, (state) => {
            state.driver = null
        })
    }
})

export const {reset} =driverAuthSlice.actions
export default driverAuthSlice.reducer