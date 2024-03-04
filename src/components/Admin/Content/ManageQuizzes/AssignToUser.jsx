import './AssignToUser.scss'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { getAllQuizzesForAdmin } from '../../../../services/quizServices'
import { getAllUser } from '../../../../services/userServices'

const AssignToUser = props => {
  const [listQuizzes, setListQuizzes] = useState([])
  const [selectedQuiz, setselectedQuiz] = useState({})
  const [listUsers, setListUsers] = useState([])
  const [selectedUser, setselectedUser] = useState({})

  const fetchAllQuizzesData = async () => {
    let res = await getAllQuizzesForAdmin()

    if (res && res.EC === 0) {
      let tempQuizzes = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`
        }
      })

      setListQuizzes(tempQuizzes)
    }
  }

  const fetchAllUserData = async () => {
    let res = await getAllUser()
    if (res && res.EC === 0) {
      let tempUsers = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.username} - ${item.email}`
        }
      })
      setListUsers(tempUsers)
    }
  }

  useEffect(() => {
    fetchAllQuizzesData()
    fetchAllUserData()
  }, [])

  return (
    <div className='assign-quiz-container row'>
      <div className='col-7 form-group'>
        <label className='quiz-title mb-2' htmlFor='selectedQuiz'>
          Select Quiz
        </label>
        <Select
          id='selectedQuiz'
          defaultValue={selectedQuiz}
          onChange={setselectedQuiz}
          options={listQuizzes}
        />
      </div>
      <div className='col-5 form-group'>
        <label className='quiz-title mb-2' htmlFor='selectedQuiz'>
          Select User
        </label>
        <Select
          id='selectedQuiz'
          defaultValue={selectedUser}
          onChange={setselectedUser}
          options={listUsers}
        />
      </div>
      <div className='mt-3'>
        <button className='btn btn-warning'>Confirm Assign</button>
      </div>
    </div>
  )
}

export default AssignToUser
