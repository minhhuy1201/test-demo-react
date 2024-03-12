import SideBar from './SideBar'
import './Admin.scss'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import LanguagesChange from '../Header/LanguagesChange'

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
          <span className='left-side' onClick={() => setCollapsed(!collapsed)}>
            <FaBars />
          </span>
          <div className='right-side'>
            <LanguagesChange />
            <NavDropdown title='Setting' id='basic-nav-dropdown'>
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Log out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>

        {/* ------ ADMIN CONTENT MAIN ----- */}
        <div className='admin-main'>
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  )
}

export default Admin
