import { useState, useEffect } from 'react'
import './ManageQuizzes.scss'
import TableQuizzes from './TableQuizzes'
import ModalCreateQuiz from './ModalCreateQuizz'
import { FcPlus } from 'react-icons/fc'
import { getAllQuizzesForAdmin } from '../../../../services/quizServices'
import ModalDeleteQuiz from './ModalDeleteQuiz'
import ModalUpdateQuiz from './ModalUpdateQuiz'

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
      <div className='title'>Manage Quizzes</div>
      <hr />
      <div className='btn-add-new'>
        <button
          className='btn btn-primary'
          onClick={e => setShowModalCreateQuiz(true)}
        >
          <FcPlus style={{ marginRight: '5px' }} /> Add new quiz
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
