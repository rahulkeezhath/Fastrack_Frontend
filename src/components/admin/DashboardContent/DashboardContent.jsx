import React, {useEffect} from 'react'
import styled from 'styled-components'
import Navbar from '../Navbar/Navbar'
import DashboardCard from '../DashboardCard/DashboardCard'
import scrollreveal from 'scrollreveal'
import './DashboardContent.scss'
import {ResponsiveContainer,BarChart,Bar,XAxis, YAxis,Tooltip} from 'recharts'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../../../redux/features/adminBooking/adminBookingSlice'
import { allUsers } from "../../../redux/features/adminUsers/adminUsersSlice";
import { getCars } from '../../../redux/features/cars/carSlice'
import { getPlace } from '../../../redux/features/place/placeSlice'


const DashboardContent = () => {

  const dispatch = useDispatch()

  const { users } = useSelector((state) => state.adminUsers);
  const {places } = useSelector((state) => state.places)
  const { car } = useSelector((state) => state.car)
  const { bookings} = useSelector((state) => state.adminBooking)


  
const allData=[
  {name:"Cars",mileStats:car.length},
  {name:"Bookings",mileStats:bookings.length},
  {name:"Places",mileStats:places.length},
  {name:"Users",mileStats:users.length}
];

  useEffect(() => {
    dispatch(allUsers())
    dispatch(getPlace())
    dispatch(getCars())
    dispatch(getAllBookings())
  }, [dispatch])


  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });

    sr.reveal(
      `
      nav,
      .row_one,
      .row_two
      `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);


  return <Section>
    <Navbar/>
      <div className="dashboard">
      <div className="dashboard_warapper">
        <div className="dashboard_cards">
          <DashboardCard title={'Users'} value={users.length} symbol={<i class="ri-user-fill"></i>} />
          <DashboardCard title={'Places'} value={places.length} symbol={<i class="ri-map-pin-fill"></i>} />
          <DashboardCard title={'Cars'} value={car.length} symbol={<i class="ri-roadster-line"></i>} />
          <DashboardCard title={'Bookings'} value={bookings.length} symbol={<i class="ri-book-open-line"></i>} />
        </div>
        <div className="statics">
          <div className="stats">
            <h3>Miles Statics</h3>
            <ResponsiveContainer width={'100%'} aspect={4/1}>
              <BarChart data={allData}>
            <XAxis dataKey={'name'} stroke='#000' />
            <YAxis domain={[0,100]}/>
            <Bar dataKey={'mileStats'} stroke={'rgba(94, 80, 63, 0.81)'} fill={'rgba(95, 71, 42, 0.81)'} barSize={30} />
            <Tooltip cursor={false} wrapperClassName='toolTip_style' />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
        </div>
      </div>
    </div>
  </Section>
}

const Section = styled.section`
margin-left: 18vw;
padding: 2rem;
height: 100%;
.grid{
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  margin-top: 2rem;
  .row_one{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 50%;
    gap: 1rem;
  }
  .row_two{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 50%;
    gap: 1rem;
  }
}
@media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;

export default DashboardContent
