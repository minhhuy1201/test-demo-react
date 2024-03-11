import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getDataQuiz, postSubmitQuiz } from '../../../services/quizServices'
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from './../Question/Question'
import ModalResult from '../ModalResult'
import CounterBoard from './CounterBoard/CounterBoard'

const DetailQuiz = props => {
  const param = useParams()
  const location = useLocation()
  const quizId = param.id
  const [dataQuiz, setDataQuiz] = useState([])
  const [questionIdx, setQuestionIdx] = useState(0)
  const [isShowModalResult, setIsShowModalResult] = useState(false)
  const [resultData, setResultData] = useState({})

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
            // To know the question is answered or not
            item.answers.isSelected = false

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

  const handleFinishBtn = async () => {
    // GET READY DATA FOR API SUBMIT
    let payload = {
      quizId: +quizId,
      answers: []
    }

    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach(item => {
        let userAnswerId = []

        item.answers.forEach(i => {
          if (i.isSelected === true) userAnswerId.push(i.id)
        })

        payload.answers.push({
          questionId: +item.questionId,
          userAnswerId: userAnswerId
        })
      })
    }

    // SUBMIT API
    let res = await postSubmitQuiz(payload)

    if (res && res.EC === 0) {
      setResultData({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: { ...res.DT.quizData }
      })
      setIsShowModalResult(true)
    } else {
      alert('BUGGGGGGGGGG')
    }
  }

  const handleCheckboxParent = (answerId, questionId) => {
    // React hook doesnt merge state -> clone state
    let dataQuizClone = _.cloneDeep(dataQuiz)
    let questionClone = dataQuizClone.find(
      item => +item.questionId === +questionId
    )

    if (questionClone && questionClone.answers) {
      questionClone.answers = questionClone.answers.map(item => {
        if (+item.id === +answerId) item.isSelected = !item.isSelected

        return item
      })
    }

    let idx = dataQuizClone.findIndex(item => +item.questionId === +questionId)
    // assign the array which the answer is selected
    if (idx > -1) {
      dataQuizClone[idx] = questionClone
      setDataQuiz(dataQuizClone)
    }
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
            handleCheckboxParent={handleCheckboxParent}
          />
        </div>
        <div className='quiz-pagination'>
          <button className='btn btn-secondary' onClick={() => handlePrevBtn()}>
            Prev
          </button>
          <button className='btn btn-primary' onClick={() => handleNextBtn()}>
            Next
          </button>
          <button className='btn btn-warning' onClick={() => handleFinishBtn()}>
            Finish
          </button>
        </div>
      </div>
      <div className='right-content'>
        <CounterBoard
          handleFinishBtn={handleFinishBtn}
          dataQuiz={dataQuiz}
          setQuestionIdx={setQuestionIdx}
        />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        resultData={resultData}
      />
    </div>
  )
}

export default DetailQuiz
