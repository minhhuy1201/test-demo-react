import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        {/* <Navbar.Brand href='#home'>huy kirito</Navbar.Brand> */}
        <NavLink to='/' className='navbar-brand'>
          huy kirito
        </NavLink>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavLink className='nav-link' to='/'>
              Home
            </NavLink>
            <NavLink className='nav-link' to='/user'>
              User
            </NavLink>
            <NavLink className='nav-link' to='/admin'>
              Admin
            </NavLink>
          </Nav>

          <Nav>
            <button className='btn-sign-in'>Sign in</button>
            <button className='btn-sign-up'>Sign up</button>
            {/* <NavDropdown title='Setting' id='basic-nav-dropdown'>
              <NavDropdown.Item>Log in</NavDropdown.Item>
              <NavDropdown.Item>Log out</NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
