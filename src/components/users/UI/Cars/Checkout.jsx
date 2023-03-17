import React, {useEffect} from 'react'
import './Checkout.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector} from 'react-redux'
import { bookingPayment, bookingReset } from '../../../../redux/features/users/booking/bookingSlice'
import moment from 'moment'
import { toast, Toaster } from "react-hot-toast";

const CheckoutPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { bookingIsSuccess, bookingIsError, bookingError, bookingMessage }  = useSelector((state) => state.booking)

  const allData = useLocation()
 

  const bookingData = allData.state.bookingMessage
  

  const carData = allData.state.car
  

  const bookedSlots = bookingData.bookedSlots


  
  const from = bookedSlots.from
 


  const to = bookedSlots.to





  useEffect(() => {
    if(bookingIsError) {
      toast.error(bookingError)
    }
    if(bookingIsSuccess) {
      toast.success(bookingMessage.message)
      navigate('/myBookings')
    }
    dispatch(bookingReset())
  }, [bookingIsError, bookingIsSuccess, bookingError, bookingMessage])

  function onToken(data) {
    let checkoutData = {
        bookingId: bookingData._id,
        totalAmount: bookingData.totalAmount,
        token: data
    }
    dispatch(bookingPayment(checkoutData))
  }

  if(allData.state === null) {
    return (
      <div className='no_checkout_page_container'>
      <div className='no_checkout_page_wrapper'>
        <p>No Cars booked for Checkout!!</p>
      </div>

    </div>
    )
  }


  return (
    <div className='checkout_page_container'>
    <div className="checkout_page_wrapper">
      <h1>
        Checkout
      </h1>
      <div className='checkout_content'>
        <img src={carData.image} alt="" />
        <h3>{carData.name}</h3>
        <h3>Rs.{carData.rent}/hour</h3>
        <hr />
        <h5><span className='from'>{moment(from).format('MMM DD yyy hh:mm')}</span> to <span className='to'>{moment(to).format('MMM DD yyy hh:mm')}</span></h5>
        <h5 className='hour'>{bookingData.totalHours} hours</h5>
        <h5 className='inline'><span className='label'> Dropoff City </span> <span className='result'>{bookingData.dropoffCity} </span></h5>
        <hr />
        <h5 className='inline payD'><span className='label'> Rent </span> <span className='result'>{(Number.parseInt(carData.rent)) * Number.parseInt(bookingData.totalHours)} </span></h5>
        <h5 className='inline payD'><span className='label'> Driver </span> <span className='result'>{bookingData.driverRequire ? (Number.parseInt(bookingData.totalHours) * 100)  : '0'}</span></h5>
        <h5 className='inline payD'><span className='label'> Total </span> <span className='result'>{bookingData.totalAmount}</span></h5>
        <hr />
      </div>
      <StripeCheckout
      shippingAddress
      token={onToken}
      amount={bookingData.totalAmount * 100}
      currency= 'INR'
      stripeKey={'pk_test_51Mg3gFSFAwfsuLHcJkrQ5LqsAaNZjnbuQm0nVRjnRZN0qRtWcxZY1BBH18v94drHf15G2fCbTRb6PMr0f4CXmvKE00JRka5zhs'}
      >
        <button>Pay Now</button>
      </StripeCheckout> 
    </div>
    <Toaster/>
  </div>
  )
}

export default CheckoutPage
