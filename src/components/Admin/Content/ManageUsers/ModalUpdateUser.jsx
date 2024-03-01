import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FcPlus } from 'react-icons/fc'
import { toast } from 'react-toastify'
import { putUpdateUser } from '../../../../services/userServices'
import _ from 'lodash'

const ModalUpdateUser = props => {
  const {
    show,
    setShow,
    userUpdate,
    resetUpdateUser,
    fetchListUsersWithPaginate,
    currentPage
  } = props

  const handleClose = () => {
    setShow(false)

    // clean state when close modal
    setEmail('')
    setUserName('')
    setPassword('')
    setRole('')
    setUserImg('')
    setPreviewImg('')
    resetUpdateUser()
  }

  // Init state
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [userImg, setUserImg] = useState('')
  const [previewImg, setPreviewImg] = useState('')

  // fill the user data we want update into the modal
  useEffect(() => {
    // check if the object not empty
    if (!_.isEmpty(userUpdate)) {
      // update state
      setEmail(userUpdate.email)
      setUserName(userUpdate.username)
      setRole(userUpdate.role)
      setUserImg('')
      if (userUpdate.image)
        setPreviewImg(`data:image/jpeg;base64,${userUpdate.image}`)
    }
  }, [userUpdate])

  // handle when user click 'Upload image' for their avatar
  const handleUploadImage = e => {
    if (e.target && e.target.files && e.target.files[0])
      setPreviewImg(URL.createObjectURL(e.target.files[0]))
    setUserImg(e.target.files[0])
  }

  // handle submit create user
  const handleSubmitUpdateUser = async () => {
    // CALL API and update the user
    let data = await putUpdateUser(userUpdate.id, userName, role, userImg)

    if (data && data.EC === 0) {
      toast.success(data.EM)
      handleClose()
      await fetchListUsersWithPaginate(currentPage)
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
          <Modal.Title>Update a user</Modal.Title>
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
          <Button variant='primary' onClick={handleSubmitUpdateUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalUpdateUser
