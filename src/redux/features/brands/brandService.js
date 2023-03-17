import axiosInstance from "../../../../utils/axiosInstance";
import {message} from 'antd'


// Add Brand
const addBrand = async(brand,token) => {
   const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
    const response = await axiosInstance.post('/admin/addBrand', brand,config)
    message.success("Brand Added Successfully")
    return response.data
}


// Get Brands
 const getBrands = async() => {
    const response = await axiosInstance.get('/admin/getBrands')
    return response .data
 }


 // Delete Brand
 const deleteBrand = async(id,token)=>{
   const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
    const response = await axiosInstance.delete(`/admin/deleteBrand?id=${id}`,config)
    return response.data
 }


 const brandService = {
    addBrand,
    getBrands,
    deleteBrand
 }

 export default brandService