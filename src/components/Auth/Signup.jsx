import './Signup.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postSignup } from '../../services/auth'
import { toast } from 'react-toastify'

const Signup = props => {
  const navigate = useNavigate()

  const [formInput, setFormInput] = useState({
    email: '',
    userName: '',
    password: '',
    confirmPassword: ''
  })

  const [formError, setFormError] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

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
      password: '',
      confirmPassword: ''
    }

    if (!validateEmail(formInput.email)) {
      setFormError({
        ...inputError,
        email: 'Enter a valid email address'
      })
      return
    }

    if (!formInput.password) {
      setFormError({
        ...inputError,
        password: 'Password should be not empty'
      })
      return
    } else if (formInput.password.length < 6) {
      setFormError({
        ...inputError,
        password: 'Password length >= 6'
      })
      return
    }

    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...inputError,
        confirmPassword: 'Confirm password not match the password'
      })
      return
    }

    setFormError({ ...inputError })
  }

  const handleSignup = async event => {
    event.preventDefault()
    // VALIDATE
    validateForm()

    // CALL API
    let data = await postSignup(
      formInput.email,
      formInput.password,
      formInput.userName
    )
    console.log('check data: ', data)

    if (data && data.EC === 0) {
      toast.success(data.EM)
      navigate('/')
    } else toast.error(data.EM)
  }

  return (
    <div className='signup-container'>
      <div className='signup-header'>
        <span>Already have an account?</span>
        <button onClick={() => navigate('/login')}>Log in</button>
      </div>
      <div className='signup-title col-2 mx-auto'>Huy Kirito</div>
      <div className='signup-welcome col-2 mx-auto'>Sign up and come on in</div>

      <form onSubmit={handleSignup} className='content-form col-2 mx-auto'>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='email'
            id='email'
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
          <label htmlFor='userName'>User name</label>
          <input
            name='userName'
            type='text'
            id='userName'
            className='form-control'
            placeholder='huykirito1201'
            value={formInput.userName}
            onChange={({ target }) =>
              handleUserInput(target.name, target.value)
            }
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            className='form-control'
            placeholder='At least 6 characters'
            value={formInput.password}
            onChange={({ target }) =>
              handleUserInput(target.name, target.value)
            }
          />
          {formError.password && <p>{formError.password}</p>}
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm password</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            className='form-control'
            value={formInput.confirmPassword}
            onChange={({ target }) =>
              handleUserInput(target.name, target.value)
            }
          />
          {formError.confirmPassword && <p>{formError.confirmPassword}</p>}
        </div>
        <div>
          <button type='submit' className='signup-submit'>
            Create my account
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

export default Signup
