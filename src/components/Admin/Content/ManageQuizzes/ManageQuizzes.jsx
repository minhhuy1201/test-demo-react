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
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

const ManageQuizzes = props => {
  const [listQuizzes, setListQuizzes] = useState([])
  const [showModalCreateQuiz, setShowModalCreateQuiz] = useState(false)
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false)
  const [showModalUpdateQuiz, setshowModalUpdateQuiz] = useState(false)
  const [quizDeleteData, setQuizDeleteData] = useState({})
  const [quizUpdateData, setQuizUpdateData] = useState({})
  const [trigCreateQuiz, setTrigCreateQuiz] = useState(false)

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
      <Tabs
        defaultActiveKey='mng-quizzes'
        id='justify-tab-example'
        className='mb-3'
        justify
      >
        <Tab eventKey='mng-quizzes' title='Manage Quizzes'>
          <div className='title'>Manage Quizzes</div>
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
        </Tab>
        <Tab eventKey='manage-ques-ans' title='Update Q/A Quizzes'>
          <div className='title'>Update Q/A Quizzes</div>
          <QuizQA
            trigCreateQuiz={trigCreateQuiz}
            setTrigCreateQuiz={setTrigCreateQuiz}
          />
        </Tab>
        <Tab eventKey='assign-quiz' title='Assign Quiz To User'>
          <div className='title'>Assign Quiz To User</div>
          <AssignToUser
            trigCreateQuiz={trigCreateQuiz}
            setTrigCreateQuiz={setTrigCreateQuiz}
          />
        </Tab>
      </Tabs>

      <ModalCreateQuiz
        show={showModalCreateQuiz}
        setShow={setShowModalCreateQuiz}
        fetchAllQuizzesData={fetchAllQuizzesData}
        setTrigCreateQuiz={setTrigCreateQuiz}
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
