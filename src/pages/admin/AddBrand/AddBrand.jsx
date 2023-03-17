import React from 'react'
import AdminLayout from '../../../components/admin/Layout/Layout'
import AddBrands from '../../../components/admin/Add Brand/AddBrand'

const AddBrand = () => {
  return (
   <>
   <AdminLayout children={<AddBrands/>} />
   </>
  )
}

export default AddBrand