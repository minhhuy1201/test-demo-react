import _ from 'lodash'

const Question = props => {
  const { data, questionIdx, handleCheckboxParent } = props

  // Return <> when dont have any data
  if (_.isEmpty(data)) {
    return <></>
  }

  const handleCheckbox = (e, answerId, questionId) => {
    handleCheckboxParent(answerId, questionId)
  }

  return (
    <>
      {data.image ? (
        <div className='question-img'>
          <img src={`data:image/jpeg;base64,${data.image}`} alt='' />
        </div>
      ) : (
        <div className='question-img'></div>
      )}

      <div className='question-title'>
        Question {questionIdx + 1}: {data.questionDesc} ?
      </div>
      <ul className='answer'>
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((item, idx) => {
            return (
              <li key={`answer-${idx}`}>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='flexCheckDefault'
                    checked={item.isSelected}
                    onChange={e =>
                      handleCheckbox(e, `${item.id}`, `${data.questionId}`)
                    }
                  />
                  <label
                    className='form-check-label'
                    htmlFor='flexCheckDefault'
                  >
                    {item.description}
                  </label>
                </div>
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default Question
