import './Login.scss'
import { lazy, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/auth'
import { toast } from 'react-toastify'

const Login = props => {
  const [formInput, setFormInput] = useState({
    email: '',
    password: ''
  })

  const [formError, setFormError] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value
    })
  }

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const validateForm = () => {
    let inputError = {
      email: '',
      password: ''
    }

    if (!validateEmail(formInput.email)) {
      setFormError({
        ...inputError,
        email: 'Invalid email !'
      })
      return
    }

    if (!formInput.password) {
      setFormError({
        ...inputError,
        password: 'Password should not empty'
      })
      return
    }

    setFormError(inputError)
  }

  const handleLogin = async event => {
    event.preventDefault()
    // VALIDATE
    validateForm()

    // CALL API
    let data = await postLogin(formInput.email, formInput.password)

    if (data && data.EC === 0) {
      toast.success(data.EM)
      navigate('/')
    } else toast.error(data.EM)
  }

  return (
    <div className='login-container'>
      <div className='login-header'>
        <span>Don't have an account yet?</span>
        <button onClick={() => navigate('/signup')}>Sign up</button>
        <a href='#!'>Contact us</a>
      </div>
      <div className='login-title col-2 mx-auto'>Huy Kirito</div>
      <div className='login-welcome col-2 mx-auto'>Hello, who's this?</div>

      <form onSubmit={handleLogin} className='content-form col-2 mx-auto'>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            className='form-control'
            placeholder='info@gmail.com'
            value={formInput.email}
            onChange={({ target }) =>
              handleUserInput(target.name, target.value)
            }
          />
          {formError.email && <p>{formError.email}</p>}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            className='form-control'
            placeholder='Enter your password'
            value={formInput.password}
            onChange={({ target }) =>
              handleUserInput(target.name, target.value)
            }
          />
          {formError.password && <p>{formError.password}</p>}
        </div>
        <span>Forgot password?</span>
        <div>
          <button type='submit' className='login-submit'>
            Log in to Huy Kirito
          </button>
        </div>
        <div className='text-center back-homepage'>
          <button onClick={() => navigate('/')}>
            &#60;&#60; Go to HomePage
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
