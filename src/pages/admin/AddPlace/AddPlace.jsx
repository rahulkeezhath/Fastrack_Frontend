import React from 'react'
import AdminLayout from '../../../components/admin/Layout/Layout'
import AddPlaces from '../../../components/admin/AddPlace/AddPlace'

const AddPlace = () => {
  return (
    <>
    <AdminLayout children={<AddPlaces/>}/>
    </>
  )
}

export default AddPlace