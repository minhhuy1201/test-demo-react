import axios from '../utils/axiosConfig'

// Get all quizs for that user (use access-token)
const getQuizByUser = () => {
  return axios.get('/api/v1/quiz-by-participant')
}

// Get questions of that quiz (use quiz id for param)
const getDataQuiz = (quizId) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${quizId}`)
}

export { getQuizByUser, getDataQuiz }
