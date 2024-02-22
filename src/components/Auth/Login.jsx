import './Login.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warningMess, setWarningMess] = useState('')

  const navigate = useNavigate()

  const handleLogin = () => {
    alert(email, password)
    // validate
  }

  const handleSignup = () => {
    alert('sign-up')
  }

  const handleEmailBlur = () => {
    if (!email) {
      setWarningMess('Please enter your email')
    } else {
      setWarningMess('')
    }
  }

  return (
    <div className='login-container'>
      <div className='login-header'>
        <span>Don't have an account yet?</span>
        <button onClick={() => handleSignup()}>Sign up</button>
        <a href='#!'>Contact us</a>
      </div>
      <div className='login-title col-2 mx-auto'>Huy Kirito</div>
      <div className='login-welcome col-2 mx-auto'>Hello, who's this?</div>
      <div className='content-form col-2 mx-auto'>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            className='form-control'
            placeholder='info@gmail.com'
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              if (warningMess) setWarningMess('')
            }}
            onBlur={handleEmailBlur}
          />
          {warningMess && (
            <div className='alert alert-warning text-center '>
              {warningMess}
            </div>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            className='form-control'
            placeholder='At least 8 characters'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <span>Forgot password?</span>
        <div>
          <button className='login-submit' onClick={() => handleLogin()}>
            Log in to Huy Kirito
          </button>
        </div>
        <div className='text-center back-homepage'>
          <button onClick={() => navigate('/')}>
            &#60;&#60; Go to HomePage
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
