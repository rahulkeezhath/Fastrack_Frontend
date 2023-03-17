import axiosInstance from '../../../../utils/axiosInstance'

// Get Drivers
const getBookings = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get('/admin/getBookings',config)
    return response.data
}

const adminBookingService = {
    getBookings
}

export default adminBookingService
