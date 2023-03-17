import React from 'react'
import AdminLayout from "../../../components/admin/Layout/Layout";
import CarsContent from '../../../components/admin/CarsContent/CarsContent';

const Cars = () => {
  return (
    <>
    <AdminLayout children={<CarsContent/>} />
    </>
  )
}

export default Cars