import React from 'react'
import {Col} from 'reactstrap'
import './ServicesList.css'
import ServiceData from '../../../../assets/data/serviceData'

const SerivcesList = () => {
  return <>
  {ServiceData.map((item)=>(
       <ServiceItem item={item} key={item.id} />
    ))}
  </>
}

const ServiceItem=({item})=>(
  <Col lg='4' md='4' sm='6' className='mb-3'>
    <div className="service_item mb-3">
      <span className='mb-3 d-inline-block'>
      <i class={item.icon}/>
      </span>

      <h6>{item.title}</h6>
      <p className='section_description2'>{item.desc}</p>
    </div>
  </Col>
)

export default SerivcesList
