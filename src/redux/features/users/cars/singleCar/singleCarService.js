import axiosInstance from "../../../../../../utils/axiosInstance"

// Get Car
const getCar = async(id) => {
    const response = await axiosInstance.get(`/users/car?id=${id}`)
    return response.data
}


const singleCarService = {
    getCar
}

export default singleCarService