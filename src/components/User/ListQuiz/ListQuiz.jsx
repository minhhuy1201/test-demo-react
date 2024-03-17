import { useEffect, useState } from 'react'
import { getQuizByUser } from '../../../services/quizServices'
import './ListQuiz.scss'
import relaxImg from '../../../assets/relax.jpg'
import { useNavigate } from 'react-router-dom'

const ListQuiz = props => {
  const [arrQuiz, setArrQuiz] = useState([])
  const navigate = useNavigate()

  const getQuizData = async () => {
    const res = await getQuizByUser()

    if (res && res.EC === 0) {
      setArrQuiz(res.DT)
    }
  }

  // Call API and render quiz
  useEffect(() => {
    getQuizData()
  }, [])

  return (
    <div className='list-quiz-container container'>
      {/* If user have quizs */}
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((quiz, idx) => {
          return (
            <div key={`${idx} - quiz`} className='card'>
              <img
                src={`data:image/jpeg;base64,${quiz.image}`}
                className='card-img-top'
                alt='quiz-img'
              />
              <div className='card-body'>
                <h5 className='card-title'>Quiz {idx + 1}</h5>
                <p className='card-text'>{quiz.description}</p>
                <button
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizTitle: quiz.description }
                    })
                  }
                  className='btn btn-primary'
                >
                  Start now
                </button>
              </div>
            </div>
          )
        })}

      {/* If user dont have any quizs */}
      {arrQuiz && arrQuiz.length === 0 && (
        <div className='mx-auto text-center'>
          <p className='fs-2 fw-bold'>
            You dont have any quiz now, please relax and comeback later
          </p>
          <img src={relaxImg} alt='relax' />
        </div>
      )}
    </div>
  )
}

export default ListQuiz
