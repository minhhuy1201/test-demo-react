import { useState, useEffect } from 'react'
import './ManageQuizzes.scss'
import TableQuizzes from './TableQuizzes'
import ModalCreateQuiz from './ModalCreateQuizz'
import { FcPlus } from 'react-icons/fc'
import { getAllQuizzesForAdmin } from '../../../../services/quizServices'
import ModalDeleteQuiz from './ModalDeleteQuiz'
import ModalUpdateQuiz from './ModalUpdateQuiz'
import Accordion from 'react-bootstrap/Accordion'
import QuizQA from './QuízQA'
import AssignToUser from './AssignToUser'

const ManageQuizzes = props => {
  const [listQuizzes, setListQuizzes] = useState([])
  const [showModalCreateQuiz, setShowModalCreateQuiz] = useState(false)
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false)
  const [showModalUpdateQuiz, setshowModalUpdateQuiz] = useState(false)
  const [quizDeleteData, setQuizDeleteData] = useState({})
  const [quizUpdateData, setQuizUpdateData] = useState({})

  const handleDeleteBtn = quiz => {
    setQuizDeleteData(quiz)
    setShowModalDeleteQuiz(true)
  }

  const handleUpdateBtn = quiz => {
    console.log(quiz)
    setQuizUpdateData(quiz)
    setshowModalUpdateQuiz(true)
  }

  const fetchAllQuizzesData = async () => {
    setQuizDeleteData({})
    setQuizUpdateData({})
    let res = await getAllQuizzesForAdmin()

    if (res && res.EC === 0) {
      setListQuizzes(res.DT)
    }
  }

  useEffect(() => {
    fetchAllQuizzesData()
  }, [])

  return (
    <div className='manage-quiz-container'>
      <Accordion defaultActiveKey='0'>
        {/* Manage Quizzes */}
        <Accordion.Item eventKey='0'>
          <Accordion.Header>
            <div className='title'>Manage Quizzes</div>
          </Accordion.Header>
          <Accordion.Body>
            <div className='btn-add-new'>
              <button
                className='btn btn-primary'
                onClick={e => setShowModalCreateQuiz(true)}
              >
                <FcPlus style={{ marginRight: '5px' }} /> Add New Quiz
              </button>
            </div>

            <div className='list-quizzes'>
              <TableQuizzes
                listQuizzes={listQuizzes}
                setListQuizzes={setListQuizzes}
                fetchAllQuizzesData={fetchAllQuizzesData}
                handleDeleteBtn={handleDeleteBtn}
                handleUpdateBtn={handleUpdateBtn}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Manage questions and answers */}
        <Accordion.Item eventKey='1'>
          <Accordion.Header>
            <div className='title'>Update Q/A Quizzes</div>
          </Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header>
            <div className='title'>Assign Quiz To User</div>
          </Accordion.Header>
          <Accordion.Body>
            <AssignToUser />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <ModalCreateQuiz
        show={showModalCreateQuiz}
        setShow={setShowModalCreateQuiz}
        fetchAllQuizzesData={fetchAllQuizzesData}
      />
      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setshowModalUpdateQuiz}
        fetchAllQuizzesData={fetchAllQuizzesData}
        quizUpdateData={quizUpdateData}
        setQuizUpdateData={setQuizUpdateData}
      />
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        fetchAllQuizzesData={fetchAllQuizzesData}
        quizDeleteData={quizDeleteData}
        setQuizDeleteData={setQuizDeleteData}
      />
    </div>
  )
}

export default ManageQuizzes
