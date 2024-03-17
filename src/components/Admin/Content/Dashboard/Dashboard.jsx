import './Dashboard.scss'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { getOverView } from '../../../../services/apiServices'
import { useState, useEffect } from 'react'

const Dashboard = props => {
  const [overViewData, setOverViewData] = useState([])
  const [chartData, setChartData] = useState([])

  const fetchDataOverView = async () => {
    let res = await getOverView()

    if (res && res.EC === 0) {
      setOverViewData(res.DT)

      // process data to display in chart
      let Us = 0,
        Qz = 0,
        Qs = 0,
        Ans = 0
      Us = res?.DT?.users?.total ?? 0
      Qz = res?.DT?.others?.countQuiz ?? 0
      Qs = res?.DT?.others?.countQuestions ?? 0
      Ans = res?.DT?.others?.countAnswers ?? 0

      const data = [
        {
          name: 'Users',
          Us
        },
        {
          name: 'Quizzes',
          Qz
        },
        {
          name: 'Questions',
          Qs
        },
        {
          name: 'Answers',
          Ans
        }
      ]

      setChartData(data)
    }
  }

  useEffect(() => {
    fetchDataOverView()
  }, [])

  return (
    <div className='dashboard-container'>
      <div className='dashboard-title'>Analytics Dashboard</div>
      <div className='dashboard-content'>
        <div className='left-content'>
          <div className='c-child users'>
            <span className='text-1'>Total Users</span>
            <span className='text-2'>
              {overViewData &&
              overViewData.users &&
              overViewData.users.total ? (
                <>{overViewData.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className='c-child quizzes'>
            <span className='text-1'>Total Quizzes</span>
            <span className='text-2'>
              {overViewData &&
              overViewData.others &&
              overViewData.others.countQuiz ? (
                <>{overViewData.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className='c-child questions'>
            <span className='text-1'>Total Questions</span>
            <span className='text-2'>
              {overViewData &&
              overViewData.others &&
              overViewData.others.countQuestions ? (
                <>{overViewData.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className='c-child answers'>
            <span className='text-1'>Total Answers</span>
            <span className='text-2'>
              {overViewData &&
              overViewData.others &&
              overViewData.others.countAnswers ? (
                <>{overViewData.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className='right-content'>
          <ResponsiveContainer width='95%' height={400}>
            <BarChart
              width={500}
              height={`100%`}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <XAxis dataKey='name' />
              <Tooltip />
              <YAxis />
              <Legend />
              <Bar dataKey='Us' fill='#405189' />
              <Bar dataKey='Qz' fill='#3EA5F4' />
              <Bar dataKey='Qs' fill='#FDA005' />
              <Bar dataKey='Ans' fill='#F1526E' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
