import React, { useEffect } from 'react'
import Helmet from '../Helmet/Helmet'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import {userBookings, bookingReset} from '../../../redux/features/users/booking/bookingSlice'
import Spinner from '../../Spinner/Spinner'

function MyBookingContent() {

    const dispatch = useDispatch()
    const {bookings, bookingIsLoading} = useSelector((state) => state.booking)
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        dispatch(userBookings(user._id))
        return () => {
            bookingReset()
        }
    }, [])

       
    const columns = [
        {
          name: "Sl.No",
          selector: (row) => row.slNo,
          sortable:true
        },
        {
          name: "Car Name",
          selector: (row) => row.carName,
          sortable:true,
          width: '130px'
        },
        {
            name: "Image",
            cell: (row) => (
              <img
              src={row.image}
              width={100}
              alt='Player'
            />
            )
            
          },
        {
          name: "Driver",
          selector: (row) => row.driverRequire,
          sortable:true
        },
        {
          name: "Pickup Date",
          selector: (row) => row.pickUpDate,
          sortable:true,
          width:"150px"
        },
        {
          name: "Dropoff Date",
          selector: (row) => row.dropOffDate,
          sortable:true,
          width:"150px"
        },
        {
          name: "Total Hours",
          selector: (row) => row.totalHours,
          sortable:true,
          width:"110px"
        },
        {
          name: "Total Amount",
          selector: (row) => row.totalAmount,
          sortable:true,
          width:"120px"
        },
        {
          name: "Dropoff City",
          selector: (row) => row.dropOffCity,
          sortable:true,
          width:"120px"
        },
        {
            name: "Payment",
            selector: (row) => row.payment,
            sortable:true
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable:true
        }
      ]

      
         


   

    const rows = bookings.map((booking, index) => {
        return {
            slNo: index + 1,
            carName: booking.carData[0].name,
            image: booking.carData[0].image,
            payment: booking.transactionId === 'pending' ? 'Pending' : 'Success',
            driverRequire: booking.driverRequire === true ? 'Required' : 'Not Required',
            pickUpDate: moment(booking.bookedSlots.from).format('MMM DD yyyy hh:mm'),
            dropOffDate: moment(booking.bookedSlots.to).format('MMM DD yyyy hh:mm'),
            totalHours: booking.totalHours,
            totalAmount: booking.totalAmount,
            dropOffCity: booking.dropoffCity,
            status: booking.status
        }
      })

   
      if (bookingIsLoading) {
        return (<><Spinner/></>)
      }

  return (
    <Helmet title='My Bookings'>
    <Header/>
        <div className="grid">
          <div className="row__one mt-5"></div>
    <DataTable title="Booking Details"
      columns={columns}
      data={rows}
      pagination 
      fixedHeader
      fixedHeaderScrollHeight='450px'
      highlightOnHover
      subHeader
      />
      </div>
      <Footer/>
      </Helmet>
  )
}

export default MyBookingContent