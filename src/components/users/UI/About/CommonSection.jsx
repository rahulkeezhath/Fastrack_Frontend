import React from 'react'
import {Container} from 'reactstrap'
import './CommonSection.css'

const CommonSection = ({title}) => {
  return(
  <section className="common_section">
    <Container className='text-center'>
        <h1 className="text_light">{title}</h1>
    </Container>
  </section>
  )
}

export default CommonSection
