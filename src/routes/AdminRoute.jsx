import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/admin/Login/Login'
import Dashboard from '../pages/admin/Dashboard/Dashboard'
import Drivers from '../pages/admin/Drivers/Drivers'
import Users from '../pages/admin/Users/Users'
import Cars from '../pages/admin/Cars/Cars'
import AddPlace from '../pages/admin/AddPlace/AddPlace'
import AddBrand from '../pages/admin/AddBrand/AddBrand'
import Booking from '../pages/admin/Booking/Booking'
// import Error from '../pages/Error/Error'

const AdminRoute = () => {
  return (
    <Routes>
        <Route exact path='/admin' element={<AdminLogin/>} />
        {/* <Route  path='*' element={<Error/>} /> */}
        <Route element={<ProtectedRoute/>}>
        <Route exact path='/admin/dashboard' element={<Dashboard/>} />
        <Route exact path='/admin/users' element={<Users/>} />
        <Route exact path='/admin/addPlace' element={<AddPlace/>} />
        <Route exact path='/admin/addBrand' element={<AddBrand/>} />
        <Route exact path='/admin/cars' element={<Cars/>} />
        <Route exact path='/admin/drivers' element={<Drivers/>} />  
        <Route exact path='/admin/bookings' element={<Booking/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRoute


function ProtectedRoute() {
  let auth = localStorage.getItem('admin')
  if(!auth) {
    return <Navigate to={'/admin'} replace />
  }
  return <Outlet/>
}