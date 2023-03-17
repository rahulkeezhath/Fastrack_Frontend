import React from 'react'
import { Col } from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import './CarItem.css'

const CarItem = ({name,rent,model,transmission,fuel,id,image}) => {

   const navigate = useNavigate()

   
  return <Col lg='4' md='4' sm='6' className='mb-5'>
    <div className="car_item">
        <div className="car_img">
            <img style={{width:'10rem', height:'10rem'}} src={image} alt="" className='w-100' />
        </div>

        <div className="car_item-content mt-4">
            <h4 className="section_title text-center">{name}</h4>
            <h6 className="rent_price text-center">{rent}
            <span>/ Hour</span></h6>

            <div className="car_item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className='d-flex align-items-center gap-1' ><i class="ri-car-line"></i>{model}</span>
            <span className='d-flex align-items-center gap-1' ><i class="ri-settings-2-line"></i>{transmission}</span>
            <span className='d-flex align-items-center gap-1' ><i class="ri-timer-flash-line"></i>{fuel}</span>
            </div>

            <button className='w-50 car_item-btn car_btn-rent'>
                <span onClick={() => navigate(`/car`,{state:{id:id}})}>Rent</span>
            </button>

            <button className='w-50 car_item-btn car_btn-details'>
                <span onClick={() => navigate(`/car`,{state:{id:id}})}>Details</span>
            </button>
        </div>
    </div>
  </Col>
}

export default CarItem
