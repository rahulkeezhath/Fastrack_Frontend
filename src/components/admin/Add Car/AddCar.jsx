import React, { useEffect, useState } from 'react'
import './AddCar.scss'
import { useForm } from 'react-hook-form'
import previewImage from '../../../assets/previewDemo.jpg'
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset, addCar } from '../../../redux/features/cars/carSlice'
import { getPlace } from '../../../redux/features/place/placeSlice'
import { getBrands } from '../../../redux/features/brands/brandSlice'
import Spinner from '../../Spinner/Spinner'

const AddCar = ({type, stateChange}) => {

    const [preview, setPreview] = useState()
    const [image, setImage] = useState()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.car)
    const {places} = useSelector((state) => state.places)
    const {brands} = useSelector((state) => state.brands)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            toast.success(message.message)
            navigate('/admin/cars')
        }
        dispatch(getPlace())
        dispatch(getBrands())
        dispatch(reset())
    }, [isError, message, isSuccess, dispatch])

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setPreview(URL.createObjectURL(e.target.files[0]))
        setFileToBase(file)
    }

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImage(reader.result)
        }
    }


    const onSubmit = (data) => {
        const { name, rent, body, place, model, transmission, fuel, brand, description } = data

        const carData = { name, rent, body, place, model, transmission, fuel, brand, description, image}
        dispatch(addCar(carData))
    }

    if(isLoading) {
        return(<><Spinner/></>)
    }

  return (
       <div className="add_car_container">
            <div className="add_car_wrapper">
                <div className="add_car_header">
                    <h1>{type} Car</h1>
                    <span onClick={() => {
                        stateChange(false)
                    }}><i className="ri-close-fill"></i></span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}  className='add_car_form_wrapper'>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Name</label>
                        <input type="text" name="name" {...register('name', { required: 'Please Enter Name'})} />
                        {errors.name && <p className='errorMessage'>{errors.name?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Rent</label>
                        <input type="text" name="rent" {...register('rent', { required: 'Please Enter Rent'})} />
                        {errors.rent && <p className='errorMessage'>{errors.rent?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Description</label>
                        <input type="text" name="description" {...register('description', { required: 'Please Enter Description'})} />
                        {errors.description && <p className='errorMessage'>{errors.description?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Place</label>
                        <select name="place" {...register('place', { required: 'Please Select Place'})}>
                            <optgroup>
                                <option hidden value=''>Select Place</option>
                                {places.map((place) => (
                                    <option key={place._id} value={place.place}>{place.place}</option>
                                ))}                               
                            </optgroup>
                        </select>
                        {errors.place && <p className='errorMessage'>{errors.place?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Brand</label>
                        <select name="brand"  {...register('brand', { required: 'Please Select Brand'})}>
                            <optgroup>
                                <option hidden value=''>Select Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand._id} value={brand.brand}>{brand.brand}</option>
                                ))}
                            </optgroup>
                        </select>
                        {errors.brand && <p className='errorMessage'>{errors.brand?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Type</label>
                        <select name="body" {...register('body', {required: 'Please Select Type'})}>
                            <optgroup>
                                <option hidden value=''>Select Type</option>
                                <option value="SUV">SUV</option>
                                <option value="Sedan">Sedan</option>
                                <option value="MPV">Crossover</option>
                                <option value="Hatchback">Hatchback</option>
                            </optgroup>
                        </select>
                        {errors.body && <p className='errorMessage'>{errors.body?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Transmission</label>
                        <select name="transmission" id="" {...register('transmission', {required: 'Please Select Tranasmission'})}>
                            <optgroup>
                                <option hidden value=''>Select Transmission</option>
                                <option value="Auto">Auto</option>
                                <option value="Manual">Manual</option>
                            </optgroup>
                        </select>
                        {errors.transmission && <p className='errorMessage'>{errors.transmission?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Fuel</label>
                        <select name="fuel" {...register("fuel", {required: 'Please Select Fuel'})}>
                            <optgroup>
                                <option hidden value=''>Select Fuel Type</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="EV">EV</option>
                            </optgroup>
                        </select>
                        {errors.fuel && <p className='errorMessage'>{errors.fuel?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Model</label>
                        <input type="text" name="model" {...register('model', { required: 'Please Enter the Model Of Car'})}/>
                        {errors.model && <p className='errorMessage'>{errors.model?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Image</label>
                        <img className='previewImage' src={preview ? preview : previewImage} alt="preview" />
                        <input type={'file'} name='image' accept='image/*' required onChange={handleFileChange} />
                    </div>
                    <button type='submit'>{type}</button>
                </form>
            </div>
            <Toaster/>
        </div>
  )
}

export default AddCar
