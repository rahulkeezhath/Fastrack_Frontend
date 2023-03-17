
import axiosInstance from '../../../../utils/axiosInstance'
import {message} from 'antd'

// Add Place
const addPlace = async(place,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post('/admin/addPlace',place,config)
    message.success("Place Added Successfully")
    console.log("redux add", response);
    return response.data
}

// Get Place
const getPlace = async() => {
    const response = await axiosInstance.get('/admin/getPlaces')
    return response.data
}

// Delete Place
const deletePlace = async(id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.delete(`/admin/deletePlace?id=${id}`,config)
    console.log("redux Delete", response);
    return response.data
}


const placeService={
    addPlace,
    getPlace,
    deletePlace
}

export default placeService