import axios from '../utils/axiosConfig'

// Create a new question into a quiz
const postCreateNewQuestionForQuiz = (quizId, quesDesc, quesIamge) => {
  const data = new FormData()
  data.append('quiz_id', quizId)
  data.append('description', quesDesc)
  data.append('questionImage', quesIamge)

  return axios.post('/api/v1/question', data)
}

// Create a new answer into a question
const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post('/api/v1/answer', {
    description,
    correct_answer,
    question_id
  })
}

export { postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion }
