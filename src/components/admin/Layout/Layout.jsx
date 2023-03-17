import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'

const AdminLayout = ({children}) => {
  return (

    <><div className="layout">
          <Sidebar />
          </div><div className="content">
              {children}
          </div></>
  )
}

export default AdminLayout
