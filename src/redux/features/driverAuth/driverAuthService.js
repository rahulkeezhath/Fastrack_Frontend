import axiosInstance from  '../../../../utils/axiosInstance'
import {message} from 'antd'


// Register Driver
const register = async (driverData) => {
    const response = await axiosInstance.post('/driver/signup',driverData)
    message.success("Driver Registered Successfully")
    return response.data
}

// Login Driver
const login = async (loginData) => {
    const response = await axiosInstance.post('/driver/login',loginData)
    if (response.data) {
        localStorage.setItem('driver', JSON.stringify(response.data))
    }
    message.success("Driver Logged in Successfully")
    return response.data
}

// Logout Driver
const logout = () => {
    localStorage.removeItem('driver')
    message.success("Driver Logout Successfully")

}

const driverAuthService = {
    register,
    login,
    logout
}

export default driverAuthService