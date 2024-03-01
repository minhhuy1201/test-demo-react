import { BrowserRouter, Route, Routes } from 'react-router-dom'

// components
import App from './App'
import User from './components/User/User'
import Admin from './components/Admin/Admin'
import HomePage from './components/Home/HomePage'
import ManageUsers from './components/Admin/Content/ManageUsers/ManageUsers'
import Dashboard from './components/Admin/Content/Dashboard'
import Login from './components/Auth/Login'
import { ToastContainer, toast } from 'react-toastify'
import Signup from './components/Auth/Signup'
import ListQuiz from './components/User/ListQuiz/ListQuiz'
import DetailQuiz from './components/User/DetailQuiz/DetailQuiz'
import notFoundImg from '../src/assets/not_found.png'
import ManageQuizzes from './components/Admin/Content/ManageQuizzes/ManageQuizzes'
import ManageQuestions from './components/Admin/Content/ManageQuestions/ManageQuestions'

const NotFound = () => {
  return (
    <div className=' container text-center fs-2 fw-bold'>
      <img
        className='img-fluid rounded'
        style={{ backgroundColor: 'transparent' }}
        src={notFoundImg}
        alt='not-found'
      />
      <p className='alert alert-danger'>PAGE NOT FOUND</p>
    </div>
  )
}

const Layout = props => {
  return (
    <>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          {/* List all quiz for THAT user */}
          <Route path='user' element={<ListQuiz />} />
        </Route>
        <Route path='/quiz/:id' element={<DetailQuiz />} />

        <Route path='/admin' element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path='manage-users' element={<ManageUsers />} />
          <Route path='manage-quizzes' element={<ManageQuizzes />} />
          <Route path='manage-questions' element={<ManageQuestions />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* Not found URL */}
        <Route path='*' element={<NotFound />} />
      </Routes>

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme='light'
      />
      <ToastContainer />
    </>
  )
}

export default Layout
