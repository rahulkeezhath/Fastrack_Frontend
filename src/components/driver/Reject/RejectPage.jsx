import React from 'react'
import './Reject.css'

const RejectPage = () => {
  return (
    <div className="container3">
      <h1>Your request has been sent</h1>
      <p>Your Account is waiting for our Administrator approval,<span className="username2"> Please check back later.</span>!</p>
      <a href="/" className="logout-btn1">Go to HomePage</a>
    </div>
  )
}

export default RejectPage