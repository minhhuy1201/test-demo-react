import './CounterBoard.scss'
import CountDown from './CountDown'

const CounterBoard = props => {
  const { dataQuiz, handleFinishBtn, setQuestionIdx } = props

  // When time up -> auto submit quiz
  const onTimeUp = () => {
    alert('time up')
  }

  const getClasQuestion = (idx, question) => {
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(item => item.isSelected === true)

      if (isAnswered) return 'ques-idx selected'
    }
    return 'ques-idx'
  }

  const handleClickQues = idx => {
    setQuestionIdx(idx)
  }

  return (
    <div className='counter-board-container'>
      <div className='counter-timer'>
        <CountDown handleFinishBtn={handleFinishBtn} onTimeUp={onTimeUp} />
      </div>
      <div className='question-board'>
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, idx) => {
            return (
              <div
                key={`ques-${idx}`}
                className={getClasQuestion(idx, item)}
                onClick={() => handleClickQues(idx)}
              >
                {idx + 1}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default CounterBoard
