import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import carService from './carService'




const initialState = {
    car:[],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

// Add Car
export const addCar = createAsyncThunk('car/add', async (carData, thunkAPI) => {
    try {
        const token=thunkAPI.getState().adminAuth.admin.token
        return await carService.addCar(carData,token)
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Get Car
export const getCars = createAsyncThunk('car/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await carService.getCar(token)
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete Car
export const deleteCar = createAsyncThunk('car/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await carService.deleteCar(id,token)
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Block and Unblock Car
export const blockAndUnblockCar = createAsyncThunk('car/blockAndUnblockCar', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await carService.blockAndUnblockCar(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        reset: (state) => {
            state.car = []
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }        
    },
    extraReducers:(builder) => {
        builder
        .addCase(addCar.pending,(state) => {
            state.isLoading=true
        })
        .addCase(addCar.fulfilled,(state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.message = (action.payload)
        })
        .addCase(addCar.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message  = action.payload
        })
        .addCase(getCars.pending,(state) => {
            state.isLoading=true
        })
        .addCase(getCars.fulfilled,(state,action)=> {
            state.isLoading = false
            state.car = action.payload
        })
        .addCase(getCars.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message  = action.payload
        })
        .addCase(deleteCar.pending,(state) => {
            state.isLoading=true
        })
        .addCase(deleteCar.fulfilled,(state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload.message
        })
        .addCase(deleteCar.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message  = action.payload
        })
        .addCase(blockAndUnblockCar.pending,(state) => {
            state.isLoading=true
        })
        .addCase(blockAndUnblockCar.fulfilled,(state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
        })
        .addCase(blockAndUnblockCar.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message  = action.payload
        })
    }
})

export const { reset } = carSlice.actions
export default carSlice.reducer