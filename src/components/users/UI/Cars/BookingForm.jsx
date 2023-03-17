import React, {useEffect, useState} from 'react'
import './BookingForm.scss'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { getPlace, placeReset } from '../../../../redux/features/place/placeSlice';
import { bookCar, bookingReset} from '../../../../redux/features/users/booking/bookingSlice'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {toast, Toaster} from 'react-hot-toast'
import BookedSlots from '../../BookedSlots/BookedSlots';




const BookingForm = () => {

    
    const [dropOffCity, setDropOffCity] = useState()
    const [dropOffDate, setDropOffDate] = useState()
    const [pickUpDate, setPickUpDate] = useState()
    const [totalDays, setTotalDays] = useState(0)
    const [driver, setDriver] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)
    const [showBookedSlots, setShowBookedSlots] = useState(false)


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const bookDispatch = useDispatch()

    const { car } = useSelector((state) => state.singleCar)
    const { bookingMessage, bookingIsSuccess, bookingIsError, bookingError } = useSelector((state) => state.booking)
    const { places } = useSelector((state) => state.places)
    
   
    let bookedSlots =car? car.bookedSlots : null;

    const highlightDates = {};
    if(bookedSlots && bookedSlots.highlights ){

    
    const { highlights } = bookedSlots

    highlights.forEach((highlight) => {
        const  fromDate = new Date(highlight.from).toISOString().split('T')[0];
        const toDate = new Date(highlight.to).toISOString().split("T")[0];
        
        for(let date = fromDate; date <= toDate; date=new Date(date.setDate(date.getDate()+1)).toISOString().split('T')[0]) {
          highlightDates[date] = true
        }
      });
    }

    useEffect(() => {
        dispatch(getPlace())

        return()=> {
            dispatch(placeReset())
            dispatch(bookingReset())
        }
    }, [])

    useEffect(() => {
      if(dropOffDate) {
        setTotalDays(moment(dropOffDate).diff(moment(pickUpDate),'hours'))
      }
      if (totalDays) {
        if(pickUpDate < dropOffDate) {
          if(driver) {
            setTotalAmount(Number.parseFloat(car.rent) * Number.parseInt(totalDays) + (Number.parseInt(totalDays) * 100))
          } else {
            setTotalAmount(Number.parseFloat(car.rent) * Number.parseInt(totalDays))
          }
        }else {
          setTotalAmount(0)
        }
      }
    }, [dropOffDate, totalDays, driver, pickUpDate])




    useEffect(() => {
      if(bookingIsError) {
        toast.error(bookingError)
      }
      if(bookingIsSuccess) {
        navigate('/checkout', { state: {bookingMessage, car: car}})
      }
      dispatch(bookingReset())
    }, [navigate, bookingIsError, bookingIsSuccess, bookingError])

    function onSubmit(e) {
      e.preventDefault()
      if(!dropOffCity || !pickUpDate || !dropOffDate) {
        if(!dropOffCity) {
          toast.error('Please Add Dropoff City')
        }
        if(!pickUpDate ) {
          toast.error("Please Add PickupDate")
        }
        if(!dropOffDate) {
          toast.error('Please Add DropoffDate')
        }
      } else {
        let user = JSON.parse(localStorage.getItem('user'))
        if(!user) {
          navigate('/login')
        } else {
          const reqObj = {
            user: user._id,
            car: car._id,
            totalAmount,
            totalDays,
            pickUpDate,
            dropOffDate,
            dropOffCity,
            driverRequire: driver
          }
          if(totalDays >= 1) {
            bookDispatch(bookCar(reqObj))
          } else {
            toast.error("Book Car atleast for 1 hour")
          }
        }
      }
    }
  
  return (
    <div className="booking_sec_wrapper">
      <form onSubmit={onSubmit} className="booking">
        <div className="booking_field">
          <label htmlFor="">Dropoff City</label>
          <select onChange={(e) => setDropOffCity(e.target.value)}>
            <option value="" hidden>
              Select City
            </option>
            {places.map((place) => (
              <option key={place._id} value={place.place}>
                {place.place}
              </option>
            ))}
          </select>
        </div>
        <div className="booking_field">
          <label htmlFor="">Pickup Date</label>
          <DatePicker
            selected={pickUpDate}
            minDate={Date.now()}
            showTimeSelect
            timeIntervals={60}
            dateFormat="MM d, yyyy h:mm aa"
            isClearable
            showYearDropdown
            highlightDates={highlightDates}
            onChange={(date) => {
              setPickUpDate(date);
            }}
            placeholderText="Select Pickup Date"
          />
        </div>
        <div className="booking_field">
          <label htmlFor="">Dropoff Date</label>
          <DatePicker
            selected={dropOffDate}
            minDate={Date.now()}
            showTimeSelect
            timeIntervals={60}
            dateFormat="MM d, yyyy h:mm aa"
            isClearable
            showYearDropdown
            highlightDates={highlightDates}
            onChange={(date) => {
              setDropOffDate(date);
            }}
            placeholderText="Select Dropoff Date"
          />
        </div>
        <div className="booking_field_driver">
          <div
            onClick={() => setShowBookedSlots(true)}
            className="booked_slots "
          >
            Click Here to know the Booked Slots 
          </div>
          {showBookedSlots && (
            <BookedSlots stateChange={setShowBookedSlots} data={bookedSlots} />
          )}
        </div>

        <div className="booking_field_driver">
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setDriver(true);
              } else {
                setDriver(false);
              }
            }}
          />
          <label htmlFor="">Driver Require</label>
        </div>
        <div className="booking_field">
          <p>Total hours : {totalDays >= 1 ? totalDays : 0} </p>
          <h1>Total : ₹ {totalAmount} </h1>
        </div>
        <div className="booking_field">
          <button
            style={{ backgroundColor: "#000d6b" }}
            className="book"
            type="submit"
          >
            Book Now
          </button>
        </div>
      </form>
      <Toaster/>
    </div>
  );
}

export default BookingForm
