import React,{ useEffect, useState } from 'react'
import {Container, Row, Col} from 'reactstrap'
import Helmet from '../Helmet/Helmet'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import BookingForm from '../UI/Cars/BookingForm'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, getCar } from '../../../redux/features/users/cars/singleCar/singleCarSlice'
import { placeReset, getPlace } from '../../../redux/features/place/placeSlice'



const Single = () => {

  const dispatch = useDispatch()
  const { state } = useLocation()
  const { car } = useSelector((state) => state.singleCar)


  useEffect(() => {
    dispatch(getCar(state.id))
    dispatch(getPlace())

    return () => {
      dispatch(reset())
      dispatch(placeReset())
    }
  },[])

  return (
    <Helmet title='Single Car'>
      <Header/>
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <img src={car.image} alt="" className='w-100' />
            </Col>

            <Col>
            <div className='car_info'>
                <h2 className='section_title2'>{car.name}</h2>

                <div className='d-flex align-items-center gap-5 mb-4 mt-3'>
                    <h6 className="rent_price fw-bold fs-4">Rs.{car.rent}.00 / Hour</h6>

                    <span className='d-flex align-items-center gap-2'>
                    <span style={{color:'#f9a826'}}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    (5 ratings)
                  </span>
                </div>

                <p className="section_description1">
                  {car.description}
                </p>

              <div className='d-flex align-items-center mt-3' style={{columnGap: '4rem'}}>
                <span className='d-flex align-items-center gap-1 section_description1'>
                <i class="ri-roadster-line" style={{color:'#f9a826'}}></i> {car.model}
                </span>

                <span className='d-flex align-items-center gap-1 section_description1'>
                <i class="ri-settings-2-line" style={{color:'#f9a826'}}></i> {car.transmission}
                </span>

                <span className='d-flex align-items-center gap-1 section_description1'>
                <i class="ri-timer-flash-line" style={{color:'#f9a826'}}></i> {car.fuel}
                </span>

              </div>


              <div className='d-flex align-items-center mt-3' style={{columnGap: '2.8rem'}}>
                <span className='d-flex align-items-center gap-1 section_description1'>
                <i class="ri-map-pin-line" style={{color:'#f9a826'}}></i> {car.place}
                </span>

                <span className='d-flex align-items-center gap-1 section_description1'>
                <i class="ri-wheelchair-line" style={{color:'#f9a826'}}></i> {car.body}
                </span>

                <span className='d-flex align-items-center gap-1 section_description1'>
                <i class="ri-building-2-line" style={{color:'#f9a826'}}></i>{car.brand}
                </span>

              </div>

            </div>
            </Col>

            <Col lg='12' className='mt-5'>
              <div className='booking-info mt-5'>
                <h5 className='mb-4 fw-bold' style={{color:'#000d6b'}}>Booking Information</h5>
                <BookingForm/>
              </div>
            </Col>

          </Row>
        </Container>
      </section>
      <Footer/>
    </Helmet>
  )
}

export default Single
