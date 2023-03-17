import axiosInstance from "../../../../utils/axiosInstance";
import {message} from 'antd'

// Register user 
const register = async (userData) => {
    const response = await axiosInstance.post('/users/userSignup',userData)

    if(response.data) {
        localStorage.setItem('userData', JSON.stringify(userData))
        message.success("Registration Succesfull")
    }

    return response.data
}

// Otp Verification
const otp = async (data) => {
    const response = await axiosInstance.post('/users/otp',data)
   
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        message.success('OTP Verified')
    }
    return response.data
}

// Login user 

const login = async (userData) => {
    const response = await axiosInstance.post('/users/userLogin', userData)
    
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        message.success("Login Success")
    }
    return response.data
}


// Logout user
const logout = () => {
    localStorage.removeItem('user')
    message.success("Logout Success")
}


const authService = {
    register,
    otp,
    login,
    logout
}

export default authService