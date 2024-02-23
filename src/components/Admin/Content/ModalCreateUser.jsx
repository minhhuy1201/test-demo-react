import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FcPlus } from 'react-icons/fc'
import { toast } from 'react-toastify'
import { postCreateNewUser } from '../../../services/userServices'

const ModalCreateUser = props => {
  const {
    show,
    setShow,
    fetchListUsersWithPaginate,
    setCurrentPage
  } = props

  const handleClose = () => {
    setShow(false)

    // clean state when close modal
    setEmail('')
    setUserName('')
    setPassword('')
    setRole('USER')
    setUserImg('')
    setPreviewImg('')
  }

  // Init state
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [userImg, setUserImg] = useState('')
  const [previewImg, setPreviewImg] = useState('')

  // handle when user click 'Upload image' for their avatar
  const handleUploadImage = e => {
    if (e.target && e.target.files && e.target.files[0])
      setPreviewImg(URL.createObjectURL(e.target.files[0]))
    setUserImg(e.target.files[0])
  }

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  // handle submit create user
  const handleSubmitCreateUser = async () => {
    // Validate
    const isValidEmail = validateEmail(email)
    if (!isValidEmail) {
      toast.error('Invalid email')
      // toast.success()
      return
    }

    if (!password) {
      toast.error('Password is required')
    }

    // CALL API and POST the user data
    let data = await postCreateNewUser(email, password, userName, role, userImg)

    if (data && data.EC === 0) {
      toast.success(data.EM)
      handleClose()
      setCurrentPage(1)
      await fetchListUsersWithPaginate(1)
    } else toast.error(data.EM)
  }

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
          <Modal.Title>Add new user</Modal.Title>
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
              />
            </div>

            <div className='col-md-6'>
              <label className='form-label'>User name</label>
              <input
                type='text'
                className='form-control'
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />
            </div>

            <div className='col-md-4'>
              <label className='form-label'>Role</label>
              <select
                className='form-select'
                onChange={e => setRole(e.target.value)}
                value={role}
              >
                <option value='USER'>USER</option>
                <option value='ADMIN'>ADMIN</option>
              </select>
            </div>

            <div className='col-md-12'>
              <label className='form-label label-upload' htmlFor='labelUpload'>
                <FcPlus style={{ marginRight: '5px' }} />
                Upload Avatar
              </label>
              <input
                id='labelUpload'
                type='file'
                hidden
                onChange={e => handleUploadImage(e)}
              />
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

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmitCreateUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalCreateUser
