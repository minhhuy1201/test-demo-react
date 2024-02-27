import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getDataQuiz } from '../../../services/quizServices'
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from './../Question/Question'

const DetailQuiz = props => {
  const param = useParams()
  const location = useLocation()
  const quizId = param.id

  const [dataQuiz, setDataQuiz] = useState([])
  // To know
  const [questionIdx, setQuestionIdx] = useState(0)

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId)
    if (res && res.EC === 0) {
      let raw = res.DT

      let data = _.chain(raw)
        // Group the elements of Array based on `id` property
        .groupBy('id')
        // `key` is group's name (id), `value` is the array of objects
        .map((value, key) => {
          let answers = []
          let questionDesc,
            image = null

          value.forEach((item, idx) => {
            // Just get 1 questionDesc and image because they are all same
            if (idx === 0) {
              questionDesc = item.description
              image = item.image
            }

            answers.push(item.answers)
          })
          return { questionId: key, answers, questionDesc, image }
        })
        .value()

      // Set all the question and answer in dataQuiz
      setDataQuiz(data)
    }
  }

  const handleNextBtn = () => {
    if (dataQuiz && dataQuiz.length > questionIdx + 1)
      setQuestionIdx(questionIdx + 1)
  }

  const handlePrevBtn = () => {
    if (questionIdx === 0) return
    setQuestionIdx(questionIdx - 1)
  }

  useEffect(() => {
    fetchQuestions()
  }, [quizId])

  return (
    <div className='detail-quiz-container container'>
      <div className='left-content'>
        <h2 className='question-title'>
          Quiz {quizId}: {location?.state?.quizTitle}
        </h2>
        <hr />
        <div className='question-content'>
          <Question
            questionIdx={questionIdx}
            // data for THAT question
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[questionIdx] : []}
          />
        </div>
        <div className='quiz-pagination'>
          <button className='btn btn-secondary' onClick={() => handlePrevBtn()}>
            Prev
          </button>
          <button className='btn btn-primary' onClick={() => handleNextBtn()}>
            Next
          </button>
        </div>
      </div>
      <div className='right-content'>Count Down</div>
    </div>
  )
}

export default DetailQuiz
