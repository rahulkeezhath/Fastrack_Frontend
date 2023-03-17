import React from "react";
import "./Signup.css";
import { toast, Toaster } from "react-hot-toast";
import {useDispatch, useSelector} from 'react-redux'
import SP from "../../../assets/Signup.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { userRegister, reset } from "../../../redux/features/auth/authSlice";
import { useEffect } from "react";
import Spinner from '../../../components/Spinner/Spinner'


 

function Signup() {


  const {register, formState: {errors}, handleSubmit} = useForm()


  


  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isError, isSuccess, isLoading, message, user } = useSelector((state) => state.auth)


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      navigate('/otp')
    }
    if(user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, user, navigate, dispatch])



  const onSubmit = async (data) => {
    const {fullName, email, phoneNumber, password} = data
    const userData = {fullName, email, phoneNumber, password}
    dispatch(userRegister(userData))
  };
  if (isLoading) {
    return (<><Spinner/></>)
  }

  return (
    <div className="first1">
      <div className="main">
        <div className="container1">
          <div className="titulo">
            <h1>Welcome To Fastrack</h1>
            <p className="sub">Signup in the Page for Accessing Cars</p>
          </div>
          <form id="form" className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label for="email">Full Name</label>
              <input
                type={'text'}
                id="fName"
                name="fullName"
                placeholder="Full Name"
                {...register("fullName",{required: 'Please Enter Name', minLength: { value: 3, message: 'Name must be 3 or more characters'}})}
              />
              {errors.fullName && <p className="error_mg">{errors.fullName?.message}</p>}
           
            </div>

            <div className="form-control">
              <label for="email">Email</label>
              <input
                type={'email'}
                id="email"
                name="email"
                placeholder="Email"
                {...register("email",{required:"Please Enter Email", pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z-9-]+\.[a-zA-Z0-9-.]+$/i, message: "Invalid Email Address"})}
              />
              {errors.email && <p className="error_mg">{errors.email?.message}</p>}
            </div>

            <div className="form-control">
              <label for="email">Phone Number</label>
              <input
                type={"text"}
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                {...register("phoneNumber",{required: "Please Enter Phone Number",minLength: {value: 10, message: "Phone number must be  10 numbers"}, maxLength: {value: 10, message: "Phone number cannot exceed more than 10 numbers"}})}
              />
              {errors.phoneNumber && <p className="error_mg">{errors.phoneNumber?.message}</p>}
            </div>

            <div className="form-control">
              <label for="password">Password</label>
              <input
                type={'password'}
                id="password"
                name="password"
                placeholder="Password"
                {...register("password",{required: "Please Enter  Password" ,minLength: {value: 8, message: "Password must be 8 characters"}})}
              />
               {errors.password && <p className="error_mg">{errors.password?.message}</p>}
            </div>
            <br />
            <button  className="button-entrar" type="submit">
              Signup
            </button>
            <br />
            <Link to={"/login"}>
              <button className="button-criar" type="submit">
                Login
              </button>
            </Link>
          </form>
        </div>
        <div className="container2">
          <img src={SP} alt="image" width="100%" height="100%" />
        </div>
      </div>
      <script
        src="https://kit.fontawesome.com/021e83338f.js"
        crossorigin="anonymous"
      ></script>
      <Toaster/>
    </div>
  );
}

export default Signup;
