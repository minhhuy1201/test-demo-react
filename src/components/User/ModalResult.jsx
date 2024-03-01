import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ModalResult = props => {
  const { show, setShow, resultData } = props

  console.log(resultData)

  const handleClose = () => {
    setShow(false)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!! Here is your result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total correct:
            <b>
              {resultData.countCorrect}/{resultData.countTotal}
            </b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary'>Show answer</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalResult
