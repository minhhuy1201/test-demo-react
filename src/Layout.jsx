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
import Signup from './components/Auth/Signup';

const Layout = props => {
  return (
    <>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='user' element={<User />} />
        </Route>

        <Route path='/admin' element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path='manage-users' element={<ManageUsers />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
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
