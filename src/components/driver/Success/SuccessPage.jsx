import React from 'react'
import './Success.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/features/driverAuth/driverAuthSlice'


const SuccessPage = () => {

  const driver = JSON.parse(localStorage.getItem('driver'))

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const driverLogout = () => {
    dispatch(logout())
    navigate('/driverLogin')
  }

  return (
        <div className="container5">
          <h1>Logged In Successfully</h1>
          <p>Welcome back, <span className="username3">{driver.name}</span>!</p>
          <p>You are Successfully Logged in and has approved your Driver request. We will call you When driver needed.</p>
          <a onClick={driverLogout} className="logout-btn6">Logout</a>
        </div>
  )
}

export default SuccessPage