import './App.scss'

import { Link, Outlet } from 'react-router-dom'
// components
import Header from './components/Header/Header'

// import { useDispatch, useSelector } from 'react-redux';
// import { increaseCounter, decreaseCounter } sfrom './redux/action/counterAction';

const App = () => {
  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header />
      </div>

      <div className='main-container'>
        <div className='sidenav-container'></div>
        <div className='app-container'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default App
