import React from 'react'
import './Login.css'
import {useForm} from 'react-hook-form'
import {toast, Toaster} from 'react-hot-toast' 
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {adminLogin, reset} from '../../../redux/features/adminAuth/adminAuthSlice'
import Spinner from '../../../components/Spinner/Spinner'
import { useEffect } from 'react'


const AdminLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { admin, isLoading, isSuccess, isError } = useSelector((state) => state.adminAuth)
    const { register, formState: {errors}, handleSubmit } = useForm()

 
    useEffect(()=>{
      if (isError) {
        toast.error("Login Failed",)
      }
      if(isSuccess || admin){
        navigate('/admin/dashboard')
      }
      dispatch(reset())
    },[isError,isSuccess,admin,dispatch,navigate])

    const onSubmit =  (data) => {
      dispatch(adminLogin(data))
    }
    if(isLoading){
      return(<Spinner/>)
    }

  return (
   
<div className="mainLogin">
        <div className="container">
            <div className="login">
                <div className="row lgn">
                    <div className="col-md img">    
                    </div>
                    <div className="col-md">
                        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                            <h4>Admin Login</h4>
                            <div className="form-group">
                                <input className="form-control " name="userName" type={'text'} autocomplete="off" placeholder="User Name" {...register('userName', {required: 'Please Enter User Name'})}/>
                                <i className="fa ic fa-envelope" aria-hidden="true"></i>
                            </div>
                                {errors.userName && <p className='error_mg'>{errors.userName?.message}</p>}
                            <div className="form-group">
                                <input className="form-control " type={'password'} name="password" placeholder="Password" autocomplete="new-password" {...register('password', {required: 'Please Enter Password'})}/>
                                <i className="fa ic fa-lock" aria-hidden="true"></i>
                            </div>
                                {errors.password && <p className='error_mg'>{errors.password?.message}</p>}
                            <button className="btn-login" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Toaster/>
    </div>
  )
}

export default AdminLogin
