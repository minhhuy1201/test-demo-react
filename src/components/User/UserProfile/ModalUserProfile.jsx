import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { toast } from 'react-toastify'
import { postUpdateProfile } from '../../../services/userServices'

import Profile from './Profile'
import ChangePassword from './ChangePassword'
import DoQuizHistory from './DoQuizHistory'

const ModalUserProfile = props => {
  const { show, setShow, account } = props

  console.table(account)

  const handleClose = () => {
    setShow(false)
  }

  // Init state
  const [email, setEmail] = useState(account.email)
  const [userName, setUserName] = useState(account.username)
  const [role, setRole] = useState(account.role)
  const [userImg, setUserImg] = useState('')
  const [previewImg, setPreviewImg] = useState(
    `data:image/jpeg;base64,${account.image}`
  )

  // handle when user click 'Upload image' for their avatar
  const handleUploadImage = e => {
    if (e.target && e.target.files && e.target.files[0])
      setPreviewImg(URL.createObjectURL(e.target.files[0]))
    setUserImg(e.target.files[0])
  }

  // handle change password
  // const changePassword = () => {
  //   validate
  //   if ()
  // }

  // handle submit create user
  const handleSubmitChangeProfile = async () => {
    // CALL API and POST the user data
    let data = await postUpdateProfile(userName, userImg)

    if (data && data.EC === 0) {
      toast.success(data.EM)
      handleClose()
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
          <Modal.Title>Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey='profile'
            id='uncontrolled-tab-example'
            className='mb-3'
          >
            <Tab eventKey='profile' title='Information'>
              <Profile
                email={email}
                userName={userName}
                setUserName={setUserName}
                previewImg={previewImg}
                role={role}
                handleUploadImage={handleUploadImage}
              />
            </Tab>
            <Tab eventKey='change-pass' title='Change Password'>
              <ChangePassword account={account} />
            </Tab>
            <Tab eventKey='quiz-history' title='History'>
              <DoQuizHistory />
            </Tab>
          </Tabs>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='primary' onClick={handleSubmitChangeProfile}>
            Save
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalUserProfile
