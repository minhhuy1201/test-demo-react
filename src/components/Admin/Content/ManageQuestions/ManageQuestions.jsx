import { useState } from 'react'
import './ManageQuestions.scss'
import Select from 'react-select'

const ManageQuestions = props => {
  const [selectedQuiz, setselectedQuiz] = useState({})

  const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' }
  ]

  return (
    <div className='manage-question-container'>
      <div className='title'>Manage Questions</div>
      <div className='add-question'>
        <div className='col-6 form-group'>
          <label htmlFor='selectedQuiz'>Select Quiz</label>
          <Select
            id='selectedQuiz'
            defaultValue={selectedQuiz}
            onChange={setselectedQuiz}
            options={options}
          />
        </div>
        <div>
          <div class='form-floating mb-3'>
            <input
              type='text'
              class='form-control'
              placeholder='name@example.com'
            />
            <label>Description</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageQuestions
