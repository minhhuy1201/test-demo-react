import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import _ from 'lodash'

const ModalViewUser = props => {
  const { show, setShow, viewUser, resetViewUser } = props

  const handleClose = () => {
    setShow(false)

    // clean state when close modal
    setEmail('')
    setUserName('')
    setPassword('')
    setRole('')
    setUserImg('')
    setPreviewImg('')
    resetViewUser()
  }

  // Init state
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [userImg, setUserImg] = useState('')
  const [previewImg, setPreviewImg] = useState('')

  useEffect(() => {
    // check if the object not empty
    if (!_.isEmpty(viewUser)) {
      // update state
      setEmail(viewUser.email)
      setUserName(viewUser.username)
      setRole(viewUser.role)
      setUserImg('')
      if (viewUser.image)
        setPreviewImg(`data:image/jpeg;base64,${viewUser.image}`)
    }
  }, [viewUser])

  return (
    <>
      <Modal
        className='modal-for-user'
        show={show}
        onHide={handleClose}
        size='xl'
        backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title>View a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='row g-3'>
            <div className='col-md-6'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                className='form-control'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled
              />
            </div>

            <div className='col-md-6'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                className='form-control'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled
              />
            </div>

            <div className='col-md-6'>
              <label className='form-label'>User name</label>
              <input
                type='text'
                className='form-control'
                value={userName}
                onChange={e => setUserName(e.target.value)}
                disabled
              />
            </div>

            <div className='col-md-4'>
              <label className='form-label'>Role</label>
              <select
                className='form-select'
                onChange={e => setRole(e.target.value)}
                value={role}
                disabled
              >
                <option value='USER'>USER</option>
                <option value='ADMIN'>ADMIN</option>
              </select>
            </div>

            <div className='col-md-12 img-preview'>
              {previewImg ? (
                <img src={previewImg} alt='' />
              ) : (
                <span>Preview Your Avatar</span>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalViewUser
