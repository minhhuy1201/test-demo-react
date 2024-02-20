import SideBar from './SideBar'
import './Admin.scss'
import { FaHeart, FaBars } from 'react-icons/fa'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Admin = props => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className='admin-container'>
      {/* --------- ADMIN SIDEBAR ---------- */}
      <div className='admin-sidebar'>
        <SideBar collapsed={collapsed} />
      </div>

      {/* --------- ADMIN CONTENT ----------- */}
      <div className='admin-content'>
        {/* ----- ADMIN CONTENT HEADER ----- */}
        <div className='admin-header'>
          <FaBars onClick={() => setCollapsed(!collapsed)} />
        </div>

        {/* ------ ADMIN CONTENT MAIN ----- */}
        <div className='admin-main'>
          <Outlet />
        </div>

        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme='light'
        />
        <ToastContainer />
      </div>
    </div>
  )
}

export default Admin
