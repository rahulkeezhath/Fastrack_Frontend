import React from 'react'
import './Dashboard.css'
import styled from 'styled-components'
import DashboardContent from '../../../components/admin/DashboardContent/DashboardContent'
import Sidebar from '../../../components/admin/Sidebar/Sidebar'


const Dashboard = () => {
  return(
  <Div>
    <Sidebar/>  
    <DashboardContent/>
  </Div>
  )
  }

  const Div = styled.div`
  position: relative;
  `;

export default Dashboard
