import React, { useEffect } from 'react'
import './Login.css'
import DR from '../../../assets/driverLogin.jpg'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { reset, driverLogin } from '../../../redux/features/driverAuth/driverAuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../Spinner/Spinner'
import { toast } from 'react-toastify'



const Login = () => {

  const { register, handleSubmit, formState: {errors} } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { driver, isLoading, isSuccess, isError, error } =useSelector((state) => state.driverAuth)

  useEffect(() => {
    if(isError) {
      toast.error(error)
      navigate('/driverReject')
    }
    if(isSuccess || driver) {
      navigate('/driverSuccess')
    }
    dispatch(reset())
  }, [isError, error, isSuccess, driver, dispatch])

  const onSubmit = (data) => {
    dispatch(driverLogin(data))
  }

  if(isLoading) {
    return(<Spinner/>)
  }
  
  return (
    <div>
<link href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap" rel="stylesheet" />
<div className="cont2">
  <div className="img">
    <img src={DR} />
  </div>
  <div className="login-content">
    <form className='form1' onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title">Welcome</h2>
      <div className="input-div one">
        <div className="i">
          <i className="fas fa-user" />
        </div>
        <div className="div">
          <input type="email" className="input" placeholder=' Email'  {...register('email', {
                            required: 'Please enter email', pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })} />
        </div>
      </div>
                        {errors.email && <p className="errorMessage">{errors.email?.message}</p>}
      <div className="input-div pass">
        <div className="i"> 
          <i className="fas fa-lock" />
        </div>
        <div className="div">
          <input type="password" className="input" placeholder=' Password'  {...register('password', { required: 'Please enter password', minLength: { value: 8, message: 'Password must be 8 characters' } })} />
                        
      </div>
        </div>
      {errors.password && <p className="errorMessage">{errors.password?.message}</p>}
      <a style={{textDecoration:'none',textAlign:'start'}} href="/driverSignup">Create a New Account?</a>
      <a style={{textDecoration:'none', textAlign:'end'}} href="#">Forgot Password?</a>
      <input type="submit" className="btn1" defaultValue="Login" />
    </form>
  </div>
</div>
</div>
  )
}

export default Login