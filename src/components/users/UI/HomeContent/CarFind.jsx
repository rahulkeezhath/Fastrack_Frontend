import React, {useEffect} from 'react'
import './CarFind.css'
import { Form, FormGroup } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getPlace, placeReset } from '../../../../redux/features/place/placeSlice'

const CarFind = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { places } = useSelector((state) => state.places)

    useEffect(() => {
        dispatch(getPlace())
        return () => {
            dispatch(placeReset())
        }
    },[])


    const { register, handleSubmit, formState } = useForm()

    const onSubmit = (data) => {
        console.log(data);
    }

  return( <Form onSubmit={handleSubmit(onSubmit)} className='form'>
    <div className='d-flex align-items-center justify-content-between flex-wrap'>
    <FormGroup className='select-group'>
    <select name='pickupCity' {...register('pickupCity', { required: 'Please Select Pickup City'})}>
    {formState.errors.pickupCity && (
      <span>This field is required</span>
    )}
        <option hidden value="" >Select City</option>
        {
            places.map((place) => (
                <option key={place._id} value={place.place}>{place.place}</option>
            ))
        }
       </select>
    </FormGroup>
    <FormGroup className='form_group'>
        <input type="date" name='pickupDate'  {...register('pickupDate', { required: 'Please Select Pickup Date'})} />
        {formState.errors.pickupDate && (
      <span>This field is required</span>
    )}
    </FormGroup>

    <FormGroup className='form_group'>
        <input type="date" name='dropoffDate' {...register('dropoffDate', { required: 'Please Select DropOff Date'})} />
        {formState.errors.dropoffDate && (
      <span>This field is required</span>
    )}
    </FormGroup>
     
    <FormGroup className='form_group'>
        <button onClick={() => navigate('/cars')} type='submit' className='find_car-btn' disabled={!formState.isValid}>Find Car</button>
    </FormGroup>
    </div>
  </Form>
  );
}

export default CarFind
