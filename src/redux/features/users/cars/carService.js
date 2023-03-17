import axiosInstance from '../../../../../utils/axiosInstance'

// Get Cars 
const getCars = async() => {
    const response = await axiosInstance.get('/users/cars')
    return response.data
}

const carService = {
    getCars
}

export default carService