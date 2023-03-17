import axiosInstance from '../../../../utils/axiosInstance'
import {message} from 'antd'


// Get Drivers
const getDrivers = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get('/admin/drivers',config)
    return response.data
}

// Approve Driver
const approveDriver = async(id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.put('/admin/approveDriver',{id:id},config)
    return response.data
}

// Decline Driver
const declineDriver = async(id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.put('/admin/declineDriver',{id:id},config)
    return response.data
}


// Block and Unblock Driver
const blockAndUnblockDriver = async(id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.put('/admin/blockAndUnblockDriver',{id:id},config)
    return response.data
}

const adminDriverService = {
    getDrivers,
    approveDriver,
    declineDriver,
    blockAndUnblockDriver
}

export default adminDriverService