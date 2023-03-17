import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/driver/Signup/Signup'
import Login from '../pages/driver/Login/Login'
import Success from '../pages/driver/Success/Success'
import Reject from '../pages/driver/Reject/Reject'

const DriverRoute = () => {
  return (
    <>
    <Routes>
      <Route path='/driverSignup' element={<Signup/>} />
      <Route path='/driverLogin' element={<Login/>} />
      <Route path='/driverSuccess' element={<Success/>} />
      <Route path='/driverReject' element={<Reject/>} />
    </Routes>
    </>
  )
}

export default DriverRoute