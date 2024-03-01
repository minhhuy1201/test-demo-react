import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FcPlus } from 'react-icons/fc'
import { toast } from 'react-toastify'
import Select from 'react-select'
import { putUpdateQuiz } from '../../../../services/quizServices'

const ModalUpdateQuiz = props => {
  const {
    show,
    setShow,
    fetchAllQuizzesData,
    quizUpdateData,
    setQuizUpdateData
  } = props

  const [quizzInput, setQuizzInput] = useState({
    id: null,
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

  // Submit update quizz
  const handleSubmitUpdateQuizz = async () => {
    // Validate
    if (!quizzInput.name || !quizzInput.desc) {
      toast.error('Name/Description for quizz is required')
      return
    }

    // Call API
    let res = await putUpdateQuiz(
      quizzInput.id,
      quizzInput.name,
      quizzInput.desc,
      quizzInput.difficult,
      quizzInput.image
    )

    if (res && res.EC === 0) {
      toast.success(res.EM)
      handleClose()
      await fetchAllQuizzesData()
    } else toast.error(res.EM)
  }

  const handleClose = () => {
    setShow(false)
    setQuizUpdateData({})
  }

  useEffect(() => {
    setQuizzInput({
      id: quizUpdateData.id,
      name: quizUpdateData.name,
      desc: quizUpdateData.description,
      difficult: quizUpdateData.difficulty,
      image: quizUpdateData.image,
      previewImage: `data:image/jpeg;base64,${quizUpdateData.image}`
    })
  }, [quizUpdateData])

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
          <Modal.Title>Update quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='row g-3'>
            <div className='form-floating mb-3'>
              <input
                name='name'
                type='text'
                className='form-control'
                id='floatingName'
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
                value={quizzInput.desc}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value)
                }}
              />
              <label htmlFor='floatingDesc'>Description</label>
            </div>
            <div className='my-3'>
              <Select
                // defaultValue={selectedOption}
                // onChange={setSelectedOption}
                options={options}
                name='difficult'
                placeholder='Level of difficult'
                defaultValue={quizzInput.difficult}
                defaultInputValue={quizUpdateData.difficulty}
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
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmitUpdateQuizz}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalUpdateQuiz
