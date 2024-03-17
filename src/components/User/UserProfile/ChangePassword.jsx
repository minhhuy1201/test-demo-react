import { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import { postChangePass } from '../../../services/userServices'

const ChangePassword = () => {
  // for change pass
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <>
      <FloatingLabel
        controlId='floatingInput'
        label='Your current password'
        className='mb-3'
      >
        <Form.Control type='password' placeholder='.' />
      </FloatingLabel>
      <FloatingLabel
        controlId='floatingInput'
        label='Your new password'
        className='mb-3'
      >
        <Form.Control type='password' placeholder='.' />
      </FloatingLabel>
      <FloatingLabel
        controlId='floatingInput'
        label='Confirm new password'
        className='mb-3'
      >
        <Form.Control type='password' placeholder='.' />
      </FloatingLabel>
    </>
  )
}

export default ChangePassword
