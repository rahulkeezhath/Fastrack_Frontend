import React from 'react'
import Slider from 'react-slick'
import './Testimonial.css'
import Ava01 from '../../../../assets/all-images/ava-1.jpg'
import Ava02 from '../../../../assets/all-images/ava-2.jpg'
import Ava03 from '../../../../assets/all-images/ava-3.jpg'
import Ava04 from '../../../../assets/all-images/ava-4.jpg'

const Testimonial = () => {

    const settings = {
        dots: true,
        infinite:true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow:3,
        slidesToScroll:1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow:2,
                    slidesToScroll:1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow:1,
                    slidesToScroll:1,
                }
            }
        ]
    }

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3 mb-4">
        <p className="section_description1">
          "I rented a car from Fastrack Car Rental for a weekend trip and I was
          really impressed with the service. The car was in great condition, the
          rental process was smooth, and the staff were friendly and helpful. I
          would definitely recommend this company to anyone looking for a
          hassle-free car rental experience."
        </p>
        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={Ava01} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h6 className="mb-0 mt-3">Roshith</h6>
            <p className="section_description1">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section_description1">
          "I've used LMN Car Rentals several times now and I have always had a
          great experience. The cars are clean and well-maintained, the rental
          process is fast and easy, and the staff are always friendly and
          professional. I would definitely recommend this company to anyone
          looking for a reliable car rental service."
        </p>
        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={Ava02} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h6 className="mb-0 mt-3">Rashmika</h6>
            <p className="section_description1">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section_description1">
          "I rented a car from Fastrack Car Rentals for a road trip with my family
          and we had a wonderful experience. The car was spacious and
          comfortable, the rental process was easy, and the staff went above and
          beyond to make sure we had everything we needed for our trip. I would
          definitely use this company again."
        </p>
        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={Ava03} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h6 className="mb-0 mt-3">Raghav</h6>
            <p className="section_description1">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section_description1">
          "I have rented from Fastrack numerous times of the past 6-7 years and
          the reason I keep coming back is simply because they have always
          provided me with the vehicle I reserved at a reasonable price. In
          addition, they have picked me up from the airport in a timely manner.
          Kudos."
        </p>
        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={Ava04} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h6 className="mb-0 mt-3">Vyshnavi</h6>
            <p className="section_description1">Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
}

export default Testimonial
