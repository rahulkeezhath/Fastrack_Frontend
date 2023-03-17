import React, { useEffect, useState } from 'react'
import './Signup.scss'
import { Link, useNavigate } from 'react-router-dom'
import DRSP from '../../../assets/driverLogin.jpg'
import { useForm } from 'react-hook-form'
import { reset, driverRegister } from '../../../redux/features/driverAuth/driverAuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../Spinner/Spinner'
import { toast } from 'react-toastify'





function Signup() {

    const { register, handleSubmit, formState: {errors} } = useForm()
    const [profileImg, setProfileImg] = useState()
    const [licenceFront, setLicenceFront] = useState()
    const [licenceRear, setLicenceRear] = useState()
    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const {driver, isLoading, isSuccess, isError, message, error} = useSelector((state) => state.driverAuth)


    useEffect(()=> {
        if(isError) {
            toast.error(error)
        }
        if(isSuccess) {
            toast.success(message.message)
            navigate('/driverLogin')
        }
        if(driver) {
            navigate('/driver')
        }
        dispatch(reset())
    }, [dispatch, navigate, message, error,isError, isSuccess])


    const setFileToBase = (file, cb) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            cb(reader.result)
        }
    }

    const onSubmit = (data) => {
        const {name, email, phoneNumber, password} = data
        const driverData = { name, email, phoneNumber, password, profilePhoto:profileImg, driverLicenceFront: licenceFront, drivingLicenceRear: licenceRear }
        dispatch(driverRegister(driverData))
    }

    if(isLoading) {
        return(<Spinner/>)
    }

    return (
        <div className="driver_container">
            <div className="login_wrapper">

                <div className="logo_wrapper">
                    <img src={DRSP} alt="" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Driver Registration</h1>
                    <div>
                        <input type={'text'} name='name' placeholder='Name' {...register('name', {
                            required: 'Please enter name'
                        })} />
                        {errors.name && <p className="errorMessage">{errors.name?.message}</p>}
                        
                    </div>
                    <div>
                        <input type={'email'} name='email' placeholder='Email'  {...register('email', {
                            required: 'Please enter email', pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })} />
                        {errors.email && <p className="errorMessage">{errors.email?.message}</p>}
                       
                    </div>
                    <div>
                        <input type={'tel'} name='phoneNumber' placeholder='Phone Number'{...register('phoneNumber', { required: 'Please enter phone number', minLength: { value: 10, message: 'Phone number must be 10 numbers' }, maxLength: { value: 10, message: 'Phone number cannot exceed more than 10 numbers' } })} />
                        {errors.phoneNumber && <p className="errorMessage">{errors.phoneNumber?.message}</p>}
                    </div>
                    <div>
                        <input type={'password'} name='password' placeholder='Password'{...register('password', { required: 'Please enter password', minLength: { value: 8, message: 'Password must be 8 characters' } })} />
                        {errors.password && <p className="errorMessage">{errors.password?.message}</p>}
                        
                    </div>
                    <div>
                        <h1>Profile Photo</h1>
                        <input type={'file'} name='profilePic' onChange={(e) => {
                            const file = e.target.files[0]
                            setFileToBase(file, setProfileImg)
                        }} accept='image/*' required/>
                    </div>
                    <div>
                        <h1>Driving License Front</h1>
                        <input type={'file'} name='DrivingLicenseFront' onChange={(e) => {
                            const file = e.target.files[0]
                            setFileToBase(file, setLicenceFront)
                        }} accept='image/*' required/>
                    </div>
                    <div>
                        <h1>Driving License Rear</h1>

                        <input type={'file'} name='DrivingLicenseRear' onChange={(e) => {
                            const file = e.target.files[0]
                            setFileToBase(file, setLicenceRear)
                        }} accept= 'image/*' required/>
                    </div>
                    <button type='submit'>Signup</button>
               <span className='signup_link'><Link to={'/driverLogin'} style={{textDecoration:'none'}}>Already have account?</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup