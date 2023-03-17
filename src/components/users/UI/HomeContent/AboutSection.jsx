import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import './AboutSection.css'
import AboutImage from '../../../../assets/all-images/cars-img/tesla.png'

const AboutSection = ({aboutClass}) => {
  return <section className='about_section' 
  style={
    aboutClass === 'aboutPage' ? {marginTop: "0px"} : {marginTop: "280px"}
  }>
    <Container>
        <Row>
            <Col lg='6' md='6'>
                <div className="about_section-content">
                <h4 className='section_subtitle2'>About Us</h4>
                <h2 className="section_title2">Welcome To Fastrack</h2>
                <p className="section_description1">
                A car rental, hire car or car hire agency is a company that
                rents automobiles for short periods of time to the public, 
                generally ranging from a few hours to a few weeks. It is often
                organized with numerous local branches (which allow a user to return a vehicle to a different location),
                and primarily located near airports or busy city areas and often complemented by a website allowing online
                reservations.
                </p>

            <div className="about_section-item d-flex align-items-center">
                <p className='section_description1 d-flex align-items-center gap-2'>
                <i class="ri-checkbox-circle-line"></i>Best Rental Car Service
                </p>

                <p className='section_description1 d-flex align-items-center gap-2'>
                <i class="ri-checkbox-circle-line"></i>Cars on Cheaper Price
                </p>
            </div>

            <div className="about_section-item d-flex align-items-center">
                <p className='section_description1 d-flex align-items-center gap-2'>
                <i class="ri-checkbox-circle-line"></i>Good Quality Cars
                </p>

                <p className='section_description1 d-flex align-items-center gap-2'>
                <i class="ri-checkbox-circle-line"></i>Best Service Providing Cars
                </p>
            </div>
                </div>
            </Col>

            <Col lg='6' md='6'>
                <div className='about_img'>
                    <img src={AboutImage}
                     alt="" className='w-100' />
                </div>
            </Col>
        </Row>
    </Container>
  </section>
}

export default AboutSection
