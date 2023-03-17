import React, { useEffect } from 'react'
import UserProfileModal from './UserProfileModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../../../redux/features/auth/authSlice'






const UserProfile = () => {
 

  const { user } = useSelector(state => state.auth)


  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  })
  


  return (
    <section style={{backgroundColor: '#fff'}}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{width: '150px'}} />
                  <h5 className="my-3">{user?.fullName}</h5>
                  <p className="text-muted mb-1">Welcome Rider</p>
                  <p className="text-muted mb-4">Have a Nice Trip</p>
                  <div className="d-flex justify-content-center mb-2">
                    {/* <UserProfileModal userDetails={user} />  */}
                    <button onClick={() => navigate('/myBookings')} type="submit" className="btn btn-outline-primary ms-1">My Bookings</button>
                  </div>  
                </div>
              </div>
            </div>
            <div className="col-lg-8  mt-5">
              <div className="card mb-4 mt-2">
                <div className="card-body mt-5 mb-5">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user?.fullName}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user?.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user?.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default UserProfile
