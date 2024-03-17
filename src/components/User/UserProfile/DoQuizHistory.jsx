import Table from 'react-bootstrap/Table'
import { getQuizHistory } from '../../../services/userServices'
import { useState, useEffect } from 'react'

const DoQuizHistory = () => {
  const [quizHistoryData, setQuizHistoryData] = useState([])

  const fetchQuizHistory = async () => {
    let res = await getQuizHistory()

    console.table(res)
  }

  useEffect(() => {
    fetchQuizHistory()
  }, [])

  return (
    <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Quiz Name</th>
          <th>Total Questions</th>
          <th>Total Correct</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default DoQuizHistory
