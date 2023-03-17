import React from 'react'
import Helmet from '../Helmet/Helmet'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import CommonSection from '../UI/About/CommonSection'
import AboutSection from '../UI/HomeContent/AboutSection'
import BecomeDriverSection from '../UI/HomeContent/BecomeDriverSection'
import {Container , Row, Col} from 'reactstrap'
import DriveImg from '../../../assets/all-images/drive.jpg'
import './About.css'

const About = () => {
  return(
   <Helmet title='About'>
    <Header/>
     <CommonSection title='About Us'/>
     <AboutSection aboutClass='aboutPage'/>

     <section className="about_page-section mt-5">
      <Container>
        <Row>
          <Col lg='6' md='6' sm='12' >
            <div className="about_page-img mb-4">
              <img src={DriveImg} alt="" className='w-100 rounded-3'/>
            </div>
          </Col>

          <Col lg='6' md='6' sm='12'>
            <div className="about_page-content ">
              <h2 className="section_title2">
                We are Committed To Provide Safe Ride Solutions
              </h2>

              <p className="section_description1">
              We have a wide range of cars available, from pick-ups to
              premium models and everything in between. Our rental rules
              provide you with freedom, flexibility, and safety, which means that
              you can rent a car for as long as you like.
              </p>

              <p className="section_description1">
              We prioritize our customer's needs which is why we provide them with
              a vast array of categories to choose from when renting a car.
              </p>

              <p className="section_description1">
              Here at Saferide, we provide our customers with a safe and efficient 
              car rental service like no other.
              </p>

              <div className='d-flex align-items-center gap-3 mt-4'>
                <span className='fs-4'><i class="ri-phone-line"></i></span>
              
              <div>
                <h6 className="section_subtitle2">Need Any Help?</h6>
                <h4 style={{color:'#000d6b'}}>+91 6282314460</h4>
              </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
     </section>
     <div className='mb-4'>
     <BecomeDriverSection/>
     </div>
    <Footer/>
    </Helmet>
  )
}

export default About
