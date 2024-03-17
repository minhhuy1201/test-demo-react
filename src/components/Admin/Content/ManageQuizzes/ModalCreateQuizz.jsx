import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FcPlus } from 'react-icons/fc'
import { toast } from 'react-toastify'
import Select from 'react-select'
import { postCreateNewQuizz } from '../../../../services/quizServices'

const ModalCreateQuiz = props => {
  const { show, setShow, fetchAllQuizzesData, setTrigCreateQuiz } = props
  const [quizzInput, setQuizzInput] = useState({
    name: '',
    desc: '',
    difficult: 'EASY',
    image: '',
    previewImage: ''
  })

  const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' }
  ]

  const handleUserInput = (name, value) => {
    setQuizzInput({
      ...quizzInput,
      [name]: value
    })
  }

  // handle when user click 'Upload image' for quizz image
  const handleUploadImage = e => {
    if (e.target && e.target.files && e.target.files[0])
      setQuizzInput({
        ...quizzInput,
        image: e.target.files[0],
        previewImage: URL.createObjectURL(e.target.files[0])
      })
  }

  // Submit create new quizz
  const handleSubmitCreateQuizz = async () => {
    // Validate
    if (!quizzInput.name || !quizzInput.desc) {
      toast.error('Name/Description for quizz is required')
      return
    }

    // Call API
    let res = await postCreateNewQuizz(
      quizzInput.name,
      quizzInput.desc,
      quizzInput.difficult,
      quizzInput.image
    )

    if (res && res.EC === 0) {
      toast.success(res.EM)
      handleClose()
      await fetchAllQuizzesData()
      setTrigCreateQuiz(true)
    } else toast.error(res.EM)
  }

  // Clear state
  const clearInput = () => {
    setQuizzInput({
      name: '',
      desc: '',
      difficult: 'EASY',
      image: '',
      previewImage: ''
    })
  }

  const handleClose = () => {
    setShow(false)
    clearInput()
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
          <Modal.Title>Add new quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='row g-3'>
            <div className='form-floating mb-3'>
              <input
                name='name'
                type='text'
                className='form-control'
                id='floatingName'
                placeholder='test'
                value={quizzInput.name}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value)
                }}
              />
              <label htmlFor='floatingName'>Name</label>
            </div>
            <div className='form-floating'>
              <input
                name='desc'
                type='text'
                className='form-control'
                id='floatingDesc'
                placeholder='Description'
                value={quizzInput.desc}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value)
                }}
              />
              <label htmlFor='floatingDesc'>Description</label>
            </div>
            <div className='my-3'>
              <Select
                defaultInputValue={quizzInput.difficult}
                options={options}
                name='difficult'
                placeholder='Level of difficult'
                defaultValue={quizzInput.difficult}
                onChange={e =>
                  setQuizzInput({
                    ...quizzInput,
                    difficult: e.label
                  })
                }
              />
            </div>
            <div className='more-actions form-group'>
              <label className='form-label label-upload' htmlFor='labelUpload'>
                <FcPlus style={{ marginRight: '5px' }} />
                Upload Image for Quizz (required)
              </label>
              <input
                id='labelUpload'
                type='file'
                hidden
                onChange={e => handleUploadImage(e)}
              />
            </div>
            <div className='col-md-12 img-preview'>
              {quizzInput.previewImage ? (
                <img src={quizzInput.previewImage} alt='' />
              ) : (
                <span>Preview Your Quizz Image</span>
              )}
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='primary' onClick={handleSubmitCreateQuizz}>
            Save
          </Button>
          <Button variant='secondary' onClick={clearInput}>
            Clear Input
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalCreateQuiz
