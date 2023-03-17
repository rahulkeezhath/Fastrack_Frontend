import React, {useEffect} from 'react'
import './AddNew.scss'
import { useForm } from 'react-hook-form'
import { addBrand, brandReset } from '../../../redux/features/brands/brandSlice'
import { useDispatch } from 'react-redux'

const AddBrandModal = ({stateChange}) => {
  const { register, formState:{errors}, handleSubmit } = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(brandReset())
  }, [dispatch])

  const onSubmit = (data) => {
    dispatch(addBrand(data))
  }

  return (
    <div className="add_car_container">
            <div className="add_car_wrapper">
                <div className="add_car_header">
                    <h1>Add Brand</h1>
                    <span><i  onClick={ () => {
                      stateChange(false)
                    }} className="ri-close-fill"></i></span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='add_car_form_wrapper'>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Brand</label>
                        <input type="text" name='brand' {...register('brand',{required:'Please Enter Brand'})} />
                       {errors.brand&&<p className="errorMessage">{errors.brand?.message}</p>}
                    </div>
                    <button type='submit'>Add</button>
                </form>
            </div>
        </div>
  )
}

export default AddBrandModal