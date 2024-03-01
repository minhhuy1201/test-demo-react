import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { deleteQuiz } from '../../../../services/quizServices'

const ModalDeleteQuiz = props => {
  const {
    show,
    setShow,
    setQuizDeleteData,
    quizDeleteData,
    fetchAllQuizzesData
  } = props

  const handleClose = () => {
    setQuizDeleteData({})
    setShow(false)
  }

  const handleSubmitDeleteQuiz = async () => {
    const data = await deleteQuiz(quizDeleteData.id)

    if (data && data.EC === 0) {
      toast.success(data.EM)
      handleClose()
      await fetchAllQuizzesData()
    } else toast.error(data.EM)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this quiz ? name =
          <b>
            {quizDeleteData && quizDeleteData.name ? quizDeleteData.name : ''}
          </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={() => handleSubmitDeleteQuiz()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDeleteQuiz
