import axiosInstance from "../../../../utils/axiosInstance";
import { message } from "antd";

// Login Admin
const login = async (adminData) => {
    const response = await axiosInstance.post('/admin/adminLogin',adminData)

    if(response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data))
        message.success("Login Success")
    }
    return response.data
}

//Logout Admin
const logout = () => {
    localStorage.removeItem('admin')
    message.success("Logout Success")
}

const adminAuthService = {
    login,logout
}

export default adminAuthService