import React, {useState, useEffect} from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Helmet from '../Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../UI/About/CommonSection'
import CarItem from '../UI/HomeContent/CarItem'
import { useDispatch, useSelector } from 'react-redux'
import { allCars, reset } from '../../../redux/features/users/cars/carSlice'
import { toast, Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../Spinner/Spinner'



const Cars = () => {
  const [ searchQuery, setSearchQuery ] = useState("")
  const dispatch = useDispatch()
  const { cars, message, isLoading, isError } = useSelector((state) => state.userCars)
  const [items, setItems ] = useState(cars)
  const keys = ["name", "body", "place", "brand"]

  const filterItem = (bodyItem) => {
    const updatedItems = cars.filter((curElem) => {
      return curElem.body === bodyItem
    })
    setItems(updatedItems)
  }

  useEffect(() => {
    if(isError) {
      toast.error("Error Occured")
    }
    dispatch(allCars())
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  if( isLoading) {
    return (<><Spinner/></>)
  }

  return (
    <Helmet title='Cars'>
      <Header/>
      <CommonSection title='Cars' />

      <section>
        <Container>
          <Row>
            <Col lg='12'>
            <h1 className='mt-5 text-center main-heading'>Select Your Favourite Car </h1>
            <hr />

            <div className='menu-tabs container'>
              <div className='menu-tabs d-flex justify-content-around'>

                <button className='btn btn-warning' onClick={() => filterItem('SUV')}>SUV</button>
                <button className='btn btn-warning' onClick={() => filterItem('Sedan')}>Sedan</button>
                <button className='btn btn-warning'onClick={() => filterItem('Crossover')}>Crossover</button>
                <button className='btn btn-warning' onClick={() => filterItem('Hatchback')}>Hatchback</button>
                <button   className='btn btn-warning' onClick={() => setItems(cars)}>All</button>

              </div>
            </div>

              <div className='d-flex align-items-center gap-3 mb-5 mt-5'>
                <span className='d-flex align-items-center gap-2 mt-5'>
                 <i class="ri-sort-asc"></i> Filter </span>
               <input  type={'search'} placeholder='Search' className='mt-5' onChange={(e) => setSearchQuery(e.target.value)} /> 
              </div>
            </Col>
            {
              items.filter(car => keys.some(key => car[key].toLowerCase().includes(searchQuery.toLowerCase()))).map((car)=>(
                 <CarItem key={car._id} name={car.name} rent={car.rent} place={car.place} brand={car.brand} model={car.model} transmission={car.transmission} fuel={car.fuel} id={car._id} image={car.image} />))
            }
          </Row>
        </Container>
      </section>
     <Toaster/>
    <Footer/>
    </Helmet>
  )
}

export default Cars
