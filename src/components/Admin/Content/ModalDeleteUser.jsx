import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { deleteUser } from '../../../services/userServices'
import { toast } from 'react-toastify'

const ModalDeleteUser = props => {
  const {
    show,
    setShow,
    deleteUserData,
    resetDeleteUser,
    fetchListUsers,
    fetchListUsersWithPaginate,
    setCurrentPage
  } = props

  const handleClose = () => {
    resetDeleteUser()
    setShow(false)
  }

  const handleSubmitDeleteUser = async () => {
    const data = await deleteUser(deleteUserData.id)

    if (data && data.EC === 0) {
      toast.success(data.EM)
      handleClose()
      // await fetchListUsers()
      setCurrentPage(1)
      await fetchListUsersWithPaginate(1)
    } else toast.error(data.EM)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user ? email =
          <b>
            {deleteUserData && deleteUserData.email ? deleteUserData.email : ''}
          </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={() => handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDeleteUser
