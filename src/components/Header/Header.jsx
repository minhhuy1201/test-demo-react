import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postLogout } from '../../services/auth'
import { toast } from 'react-toastify'
import { doLogout } from '../../redux/action/userAction'
import LanguagesChange from './LanguagesChange'

const Header = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  const handleLogout = async () => {
    let res = await postLogout(account.email, account.refresh_token)

    if (res && res.EC === 0) {
      dispatch(doLogout())
      navigate('/')
    } else {
      toast.error(res.EM)
    }
  }

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
            {isAuthenticated === false ? (
              <>
                <button className='btn-sign-in' onClick={() => handleLogin()}>
                  Log in
                </button>
                <button className='btn-sign-up' onClick={() => handleSignup()}>
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown title='Setting' id='basic-nav-dropdown'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogout()}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <LanguagesChange />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
