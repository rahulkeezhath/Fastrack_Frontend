import React, { useState } from 'react'
import './OtpVerification.css'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, otp } from '../../../redux/features/auth/authSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../Spinner/Spinner'



const OtpVerification = () => {

  const { register, handleSubmit, formState: {errors} } = useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  // const [minutes, setMinutes] = useState(1);
  // const [seconds, setSeconds] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (seconds > 0) {
  //       setSeconds(seconds - 1);
  //     }

  //     if (seconds === 0) {
  //       if (minutes === 0) {
  //         clearInterval(interval);
  //       } else {
  //         setSeconds(59);
  //         setMinutes(minutes - 1);
  //       }
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [seconds]);

  // const resendOTP = () => {
  //   setMinutes(1);
  //   setSeconds(0);
  // };

  useEffect(() => {
    if(isError) {
      toast.error(message)
      navigate('/signup')
    }
    if(isSuccess || user) {
      toast.success(message)
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isLoading, message, navigate, dispatch])

  const onSubmit = (data) => {
    const { otpCode } = data
    dispatch(otp(otpCode))
  }

  if(isLoading) {
    return (<><Spinner/></>)
  }

  return (
    <div className="body1">
      <h1 className="enter">Enter OTP</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="otp">
          <input
            type="text"
            name="otpCode"
            {...register("otpCode", {
              required: "Please Enter OTP",
              minLength: { value: 6, message: "OTP must be  6 numbers" },
              maxLength: {
                value: 6,
                message: "OTP cannot exceed more than 6 numbers",
              },
            })}
          />
        </div>
        {errors.otpCode && (
          <p className="error_msg">{errors.otpCode?.message}</p>
        )}
        {/* <div className="countdown-text">
          {seconds > 0 || minutes > 0 ? (
            <p>
              Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : (
            <p>Didn't recieve code?</p>
          )}  
            <button
              disabled={seconds > 0 || minutes > 0}
              style={{
                color: seconds > 0 || minutes > 0 ? "#a5a5a5" : "#ef0606",
                backgroundColor: "transparent",
                fontWeight: "500",
                textDecoration: "underline",
                marginTop:'-20px'
              }}
              onClick={resendOTP}
            >
              Resend OTP
            </button>
        </div> */}
        <button type="submit">Verify</button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default OtpVerification
