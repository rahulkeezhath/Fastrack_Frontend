import React, { useEffect } from 'react'
import HeroSlider from '../../../components/users/UI/HomeContent/HeroSlider'
import Helmet from '../../../components/users/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import CarFind from '../../../components/users/UI/HomeContent/CarFind'
import AboutSection from '../../../components/users/UI/HomeContent/AboutSection'
import SerivcesList from '../../../components/users/UI/HomeContent/SerivcesList'
import CarItem from '../../../components/users/UI/HomeContent/CarItem'
import BecomeDriverSection from '../../../components/users/UI/HomeContent/BecomeDriverSection'
import Testimonial from '../../../components/users/UI/HomeContent/Testimonial'
import Header from '../../../components/users/Header/Header'
import Footer from '../../../components/users/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { allCars, reset } from '../../../redux/features/users/cars/carSlice'


function Home() {

  const dispatch = useDispatch()
  const { cars } = useSelector((state) => state.userCars)

  useEffect(() => {
    dispatch(allCars())
    return () => {
      dispatch(reset())
    }
  },[dispatch])

  return <Helmet title='Home'>

    <Header/>

    {/* ---------- Hero Section ----------- */}
    <section className="p-0 hero_slider-section">
      <HeroSlider/>

      <div className="hero_form">
        <Container>
          <Row className='form_row'>
            <Col lg='4' md='4'>
              <div className="find_cars-left">
                <h2>Find Your Best Car Here</h2>
              </div>
            </Col>

            <Col lg='8' md='8' sm='12'> 
            <CarFind/>
            </Col>
          </Row>
        </Container>
      </div>
    </section>

    {/* ------------- About Section ---------------- */}
    <AboutSection/>


    {/* -------------- Service Section --------------- */}
    <section>
      <Container>
        <Row>
          <Col lg='12' className='mt-5 mb-4 text-center'>
            <h6 className='section_subtitle2'>See our</h6>
            <h2 className='section_title2'>Popular Services</h2>
          </Col>

          <SerivcesList/>
        </Row>
      </Container>
    </section>


    {/* --------------- Car Offer Section ---------------- */}

    <section>
      <Container>
        <Row>
          <Col lg='12' className='mt-5 mb-4 text-center'>
            <div className="section_subtitle2 ">Come with</div>
            <h2 className='section_title2 '>Hot Offers</h2>
          </Col>
          
          {cars.slice(0,3).map((car)=>(
            <CarItem image={car.image}  name={car.name} rent={car.rent} model={car.model} transmission={car.transmission} fuel={car.fuel} id={car._id} />
          ))}
        
        </Row>
      </Container>
    </section>


    {/* --------------- Become a Driver Section ------------- */}
    <BecomeDriverSection/>

    {/* --------------- Testimonial Section ----------------*/}
    <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-5 mt-5 text-center'>
            <h6 style={{color:'#f9a826'}}>Our Clients Says</h6>
            <h2 style={{color:'#000d6b'}}>Testimonials</h2>
          </Col>

          <Testimonial/>
        </Row>
      </Container>
    </section>
<Footer/>
  </Helmet>
}

export default Home
