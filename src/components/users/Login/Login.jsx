import React from 'react'
import './Login.css'
import  LG from'../../../assets/Login.jpg'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from "react-hot-toast";
import Spinner from '../../../components/Spinner/Spinner'
import { login, reset } from '../../../redux/features/auth/authSlice'
import { useEffect } from 'react'




function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)


  useEffect(() => {
    if (isError) {
      toast.error("Logged Failed ")
    }
    if(isSuccess || user) {
      toast.success("Logged IN Successfully")
      navigate('/')
    }
    dispatch(reset())
  }, [isError, user, message, isSuccess, navigate, dispatch])


  const onSubmit =  (data) =>{
    dispatch(login(data))
  }

  if (isLoading) {
    return (<><Spinner/></>)
  }

  return (
    <div className='first2'>
       <div className="main">
      <div className="container3">
        <div className="titulo">
          <h1>Welcome To Fastrack</h1>
          <p className="sub">Log in to the Page for Booking Cars</p>
        </div>
        <form id="form" className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label for="email">Email</label>
            <input type={'email'}
             id="email"
             name='email'
             placeholder="Email"
             {...register('email', {required: 'Please Enter Email', pattern:{value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid Email Address"}})}
            />
            {errors.email && <p className='error_mg'>{errors.email?.message}</p>}
          </div>

          <div className="form-control">
            <label for="password">Password</label>
            <input
              type={'password'}
              id="password"
              name='password'
              placeholder="Password"
              {...register("password", { required: "Please Enter Password", minLength: { value: 5, message: "Password must be 8 characters"}})}
            />
            {errors.password && <p className='error_mg'>{errors.password?.message}</p>}
          </div>
          <div className="lemb-esq">
            <div className="checkbox">
              <input type={"checkbox" } className="checkbox-box" />
              <p className="Lembrar">Remember My login</p>
            </div>
            <p className="re_senha">Forgot Password</p>
          </div>
          <button className="button-entrar" type="submit">Login</button><br />
          <Link to={"/signup"}>
          <button className="button-criar" type="submit">Signup</button>
          </Link>
        </form>
      </div>
      <div className="container4">
        <img src={LG} alt="image" width="100%" height="100%" />
      </div>
    </div>
    <script
      src="https://kit.fontawesome.com/021e83338f.js"
      crossorigin="anonymous"
    ></script>
    <Toaster/>
    </div>
  )
}

export default Login
