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
import { GiSpinningBlades } from 'react-icons/gi'
import { useTranslation } from 'react-i18next'
import ModalUserProfile from '../User/UserProfile/ModalUserProfile'
import { useState } from 'react'

const Header = () => {
  const [showModalUserProfile, setShowModalUserProfile] = useState(false)

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

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
    <>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container>
          <NavLink to='/' className='navbar-brand'>
            <GiSpinningBlades className='brand-icon' />
            <span>huy kirito</span>
          </NavLink>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <NavLink className='nav-link' to='/'>
                {t('header.nav-home')}
              </NavLink>
              <NavLink className='nav-link' to='/user'>
                {t('header.nav-do-quiz')}
              </NavLink>
              {account.role === 'USER' || !isAuthenticated ? (
                <></>
              ) : (
                <NavLink className='nav-link' to='/admin'>
                  {t('header.nav-admin')}
                </NavLink>
              )}
            </Nav>

            <Nav>
              {isAuthenticated === false ? (
                <>
                  <button className='btn-sign-in' onClick={() => handleLogin()}>
                    {t('header.login')}
                  </button>
                  <button
                    className='btn-sign-up'
                    onClick={() => handleSignup()}
                  >
                    {t('header.signup')}
                  </button>
                </>
              ) : (
                <NavDropdown
                  title={t('header.setting')}
                  id='basic-nav-dropdown'
                >
                  <NavDropdown.Item
                    className='item-dropdown'
                    onClick={() => setShowModalUserProfile(true)}
                  >
                    {t('header.profile')}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className='item-dropdown'
                    onClick={() => handleLogout()}
                  >
                    {t('header.logout')}
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <LanguagesChange />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalUserProfile
        show={showModalUserProfile}
        setShow={setShowModalUserProfile}
        account={account}
      />
    </>
  )
}

export default Header
