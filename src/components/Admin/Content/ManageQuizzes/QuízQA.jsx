import { useState, useEffect } from 'react'
import './QuizQA.scss'
import Select from 'react-select'
import { FcPlus } from 'react-icons/fc'
import { TbHeartPlus, TbHeartMinus } from 'react-icons/tb'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import {
  getAllQuizzesForAdmin,
  getQuestionFromQuiz,
  postUpsertQuiz
} from '../../../../services/quizServices'
import { toast } from 'react-toastify'

const QuizQA = props => {
  const { trigCreateQuiz, setTrigCreateQuiz } = props

  const [listQuizzes, setListQuizzes] = useState([])
  const [selectedQuiz, setselectedQuiz] = useState({})
  const initQuestions = [
    {
      id: uuidv4(),
      description: '',
      imageFile: '',
      previewImage: '',
      isValid: false,
      answers: [
        {
          id: uuidv4(),
          description: '',
          isCorrect: false,
          isValid: false
        }
      ]
    }
  ]
  const [questions, setQuestions] = useState(initQuestions)

  // Add or remove question
  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      const newQuestion = {
        id: uuidv4(),
        description: '',
        imageFile: '',
        previewImage: '',
        answers: [
          {
            id: uuidv4(),
            description: '',
            isCorrect: false
          }
        ]
      }

      setQuestions([...questions, newQuestion])
    } else if (type === 'REMOVE') {
      // else, remove question
      let questionClone = _.cloneDeep(questions)
      questionClone = questionClone.filter(item => item.id !== id)
      setQuestions(questionClone)
    }
  }

  // Add or remove answer
  const handleAddRemoveAnswer = (type, quesId, id) => {
    let questionClone = _.cloneDeep(questions)
    let quesIndex = questionClone.findIndex(item => item.id === quesId)

    // Found the question want modify
    if (quesIndex > -1) {
      if (type === 'ADD') {
        const newAnswer = {
          id: uuidv4(),
          description: '',
          isCorrect: false
        }
        questionClone[quesIndex].answers.push(newAnswer)
      } else if (type === 'REMOVE') {
        // else, remove answer
        questionClone[quesIndex].answers = questionClone[
          quesIndex
        ].answers.filter(item => item.id !== id)
      }
    }

    setQuestions(questionClone)
  }

  // Handle on change the question description
  const handleOnChange = (e, type, quesId, id) => {
    let questionClone = _.cloneDeep(questions)
    let quesIndex = questionClone.findIndex(item => item.id === quesId)

    if (quesIndex > -1) {
      if (type === 'QUESTION') {
        questionClone[quesIndex].description = e.target.value
        questionClone[quesIndex].isValid = true
      } else if (type === 'ANSWER') {
        let ansIndex = questionClone[quesIndex].answers.findIndex(
          item => item.id === id
        )

        if (ansIndex > -1) {
          questionClone[quesIndex].answers[ansIndex].description =
            e.target.value
          questionClone[quesIndex].answers[ansIndex].isValid = true
        }
      } else if (type === 'FILE') {
        questionClone[quesIndex].imageFile = e.target.files[0]
        questionClone[quesIndex].previewImage = URL.createObjectURL(
          e.target.files[0]
        )
      } else if (type === 'CHECKBOX') {
        questionClone[quesIndex].answers = questionClone[quesIndex].answers.map(
          item => {
            if (item.id === id) {
              item.isCorrect = e.target.checked
            }

            return item
          }
        )
      }
    }

    setQuestions(questionClone)
  }

  // Convert image file to string base64 to upload to the server
  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
    })

  // Handle submit questions for quizz
  const handleSubmitQuestionsForQuiz = async () => {
    // Validate
    // When user dont choose quiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error('Select the quiz first, please !!')
      return
    }

    // When user forgot input the description
    questions.forEach((item, idx) => {
      if (!item.description) {
        toast.error(`Question ${idx + 1} cant empty`)
        return
      }

      item.answers.forEach(ans => {
        if (!ans.description) {
          toast.error(`Answers for question ${idx + 1} cant empty`)
          return
        }
      })
    })

    let questionClone = _.cloneDeep(questions)
    console.log('clone: ', questionClone)

    for (let i = 0; i < questionClone.length; ++i) {
      let q = questionClone[i]

      if (q.imageFile) {
        q.imageFile = await toBase64(q.imageFile)
      }
    }

    console.log('clone1: ', questionClone)

    let res = await postUpsertQuiz({
      quizId: selectedQuiz.value,
      questions: questionClone
    })

    if (res && res.EC === 0) {
      toast.success(res.EM)
      fetchQAFromQuiz()
    }
  }

  const fetchAllQuizzesData = async () => {
    let res = await getAllQuizzesForAdmin()

    if (res && res.EC === 0) {
      let tempQuizzes = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`
        }
      })

      setListQuizzes(tempQuizzes)
    }
  }

  // Convert base64 to object file to display image
  const urlToFile = (url, filename, mimeType) => {
    if (url.startsWith('data:')) {
      var arr = url.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      var file = new File([u8arr], filename, { type: mime || mimeType })
      return Promise.resolve(file)
    }
    return fetch(url)
      .then(res => res.arrayBuffer())
      .then(buf => new File([buf], filename, { type: mimeType }))
  }

  // Get q/a from quiz
  const fetchQAFromQuiz = async () => {
    let res = await getQuestionFromQuiz(selectedQuiz.value)

    if (res && res.EC === 0) {
      if (!_.isEmpty(res.DT.qa)) {
        let newQ = []

        res.DT.qa.forEach(async item => {
          if (item.imageFile) {
            item.imageFile = await urlToFile(
              `data:image/jpeg;base64,${item.imageFile}`,
              `imgQues-${item.id}.jpeg`,
              'image/jpeg'
            )

            item.previewImage = URL.createObjectURL(item.imageFile)
          }
          item.isValid = true

          let newA = []
          item.answers.forEach(ans => {
            ans.isValid = true

            newA.push(ans)
          })
          item.answers = newA

          newQ.push(item)
        })

        setQuestions(newQ)
      } else setQuestions(initQuestions)
    }
  }

  useEffect(() => {
    fetchAllQuizzesData()

    if (trigCreateQuiz === true) setTrigCreateQuiz(false)
  }, [trigCreateQuiz])

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQAFromQuiz()
    }
  }, [selectedQuiz])

  return (
    <div className='manage-question-container'>
      <div className='add-question'>
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
        <div className='question-container'>
          {/* Question content */}
          <h3>Add question</h3>

          {questions &&
            questions.length > 0 &&
            questions.map((item, idx) => {
              return (
                <div key={item.id} className='q-main mb-5'>
                  <div className='question-content'>
                    <div className='form-floating question-desc'>
                      <input
                        required
                        type='text'
                        className={
                          item.isValid
                            ? 'form-control'
                            : 'form-control is-invalid'
                        }
                        placeholder='.'
                        value={item.description}
                        onChange={e => handleOnChange(e, 'QUESTION', item.id)}
                      />
                      <label>Question {idx + 1}'s decription:</label>
                    </div>
                    <div className='form-group question-image'>
                      <label
                        className='form-label label-upload'
                        htmlFor={item.id}
                      >
                        <FcPlus style={{ marginRight: '5px' }} />
                        Question's Image (option)
                      </label>
                      <input
                        id={item.id}
                        type='file'
                        hidden
                        onChange={e => handleOnChange(e, 'FILE', item.id)}
                      />
                      <div className='col-md-12 img-preview'>
                        {item.previewImage ? (
                          <img src={item.previewImage} alt='' />
                        ) : (
                          <span>Preview Your Question Image</span>
                        )}
                      </div>
                    </div>
                    <div className='btn-add-remove'>
                      <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                        <TbHeartPlus className='icon-add' />
                      </span>
                      {questions.length > 1 && (
                        <span
                          onClick={() =>
                            handleAddRemoveQuestion('REMOVE', item.id)
                          }
                        >
                          <TbHeartMinus className='icon-minus' />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Answer content */}
                  {item.answers &&
                    item.answers.length > 0 &&
                    item.answers.map((ansItem, idx) => {
                      return (
                        <div key={ansItem.id} className='answer-content'>
                          <input
                            className='form-check-input is-correct'
                            type='checkbox'
                            checked={ansItem.isCorrect}
                            onChange={e =>
                              handleOnChange(e, 'CHECKBOX', item.id, ansItem.id)
                            }
                          />
                          <div className='form-floating answer-name'>
                            <input
                              required
                              type='text'
                              className={
                                ansItem.isValid
                                  ? 'form-control'
                                  : 'form-control is-invalid'
                              }
                              placeholder='.'
                              value={ansItem.description}
                              onChange={e =>
                                handleOnChange(e, 'ANSWER', item.id, ansItem.id)
                              }
                            />
                            <label>Answer {idx + 1}</label>
                          </div>
                          <div className='btn-group'>
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer('ADD', item.id)
                              }
                            >
                              <AiOutlinePlusCircle className='icon-add' />
                            </span>
                            {item.answers.length > 1 && (
                              <span
                                onClick={() =>
                                  handleAddRemoveAnswer(
                                    'REMOVE',
                                    item.id,
                                    ansItem.id
                                  )
                                }
                              >
                                <AiOutlineMinusCircle className='icon-minus' />
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                </div>
              )
            })}

          {questions && questions.length > 0 && (
            <button
              onClick={() => handleSubmitQuestionsForQuiz()}
              type='submit'
              className='btn btn-warning'
            >
              SAVE QUESTIONS
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizQA
