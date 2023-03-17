import React from 'react'

import {Container,Row,Col,ListGroup,ListGroupItem} from 'reactstrap'
import { Link } from 'react-router-dom'
import './Footer.css'

const quickLinks = [
  {
    path:'/about',
    display:'About'
  },
  {
    path:'#',
    display:'Privacy Policy'
  },
  {
    path:'/cars',
    display:'Cars'
  },
  {
    path:'/contact',
    display:'Contact'
  }, 
]

const Footer = () => {

  const date = new Date()
  const year = date.getFullYear()

  return <footer className='footer'>
    <Container>
      <Row>
        <Col lg='3' md='3' sm='12'>
        <div className="logo1 footer_logo">
            <h1><Link to='/' className='d-flex align-items-center gap-3'>
            <i class="ri-car-line"></i>
            <span>Fastrack</span>
              </Link></h1>
          </div>
          <p className="footer_logo-content">
          Car rental system (CRS) is a web based system for a company that rents out cars.
          This system enables the company to make their services available to the public 
          through the internet and also keep records about their services. 
          </p>
        </Col>

        <Col lg='3' md='3' sm='6'>
        <div className='mb-4'>
            <h5 className="footer_link-title"> Quick Links</h5>
            <ListGroup>
              {
                quickLinks.map((item,index)=>(
                  <ListGroupItem key={index} className='quick_link p-0 mt-3'>
                  <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
        </div>
        </Col>

        <Col lg='3' md='3' sm='6'>
          <div className='mb-4'>
          <h5 className="footer_link-title mb-4">Head Office</h5>
          <p className='office_info'>
            272 Manjeri, Malappuram, Kerala
          </p>
          <p className='office_info'>Phone: +91 6282314460</p>
          <p className='office_info'>Email: rahulkeezhath@gmail.com</p>
          <p className='office_info'>Office Time: 10am - 7pm</p>
          </div>
        </Col>

        <Col lg='3' md='3' sm='12'>
          <div className="mb-4">
            <h5 className="footer_link-title">NewsLetter</h5>
            <p className="section_description">Subscribe Our NewsLetter</p>
            <div className="newsletter">
              <input type="email" placeholder='Email' />
              <span><i class="ri-send-plane-fill"></i></span>
            </div>
          </div>
        </Col>

        <Col lg='12'>
          <div className='footer_bottom'>
              <p className="section_description d-flex  align-items-center justify-content-center gap-1 pt-4">
              <i class="ri-copyright-line"></i>Copyright {year},
              Developed by Rahul Keezhath. All rights reserved.
              </p>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer
