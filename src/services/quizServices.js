import axios from '../utils/axiosConfig'

// Get all quizs for that user (use access-token)
const getQuizByUser = () => {
  return axios.get('/api/v1/quiz-by-participant')
}

// Get questions of that quiz (use quiz id for param)
const getDataQuiz = quizId => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${quizId}`)
}

// Submit the quiz
const postSubmitQuiz = data => {
  console.log('....data: ', { ...data })
  return axios.post('/api/v1/quiz-submit', { ...data })
}

// Create new quiz
const postCreateNewQuizz = (name, desc, difficult, image) => {
  const data = new FormData()
  data.append('name', name)
  data.append('description', desc)
  data.append('difficulty', difficult)
  data.append('quizImage', image)

  return axios.post('/api/v1/quiz', data)
}

// Get all quiz for admin to manage them
const getAllQuizzesForAdmin = () => {
  return axios.get('/api/v1/quiz/all')
}

// Update quiz
const putUpdateQuiz = (id, name, desc, difficult, image) => {
  const data = new FormData()
  data.append('id', id)
  data.append('name', name)
  data.append('description', desc)
  data.append('difficulty', difficult)
  data.append('quizImage', image)

  return axios.put('/api/v1/quiz', data)
}

// Delete Quiz
const deleteQuiz = id => {
  return axios.delete(`/api/v1/quiz/${id}`)
}

export {
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuizz,
  getAllQuizzesForAdmin,
  putUpdateQuiz,
  deleteQuiz
}
