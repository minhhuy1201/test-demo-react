import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
// components
import { Suspense } from 'react'
import App from './App'
import Admin from './components/Admin/Admin'
import HomePage from './components/Home/HomePage'
import ManageUsers from './components/Admin/Content/ManageUsers/ManageUsers'
import Dashboard from './components/Admin/Content/Dashboard/Dashboard'
import Login from './components/Auth/Login'
import { ToastContainer, toast } from 'react-toastify'
import Signup from './components/Auth/Signup'
import ListQuiz from './components/User/ListQuiz/ListQuiz'
import DetailQuiz from './components/User/DetailQuiz/DetailQuiz'
import ManageQuizzes from './components/Admin/Content/ManageQuizzes/ManageQuizzes'
import ManageQuestions from './components/Admin/Content/ManageQuestions/ManageQuestions'
import NotFound from './components/NotFound'
import ProtectAdminRoute from './routes/ProtectAdminRoute'

const Layout = props => {
  return (
    <Suspense fallback={<div className='fs-1'>Loading...........</div>}>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          {/* List all quiz for THAT user */}
          <Route
            path='user'
            element={
              <PrivateRoute>
                <ListQuiz />
              </PrivateRoute>
            }
          />
          <Route path='/quiz/:id' element={<DetailQuiz />} />
        </Route>

        <Route
          path='/admin'
          element={
            <ProtectAdminRoute>
              <Admin />
            </ProtectAdminRoute>
          }
        >
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
    </Suspense>
  )
}

export default Layout
