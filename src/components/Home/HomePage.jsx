import './HomePage.scss'
import videoHomePage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = props => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigate = useNavigate()

  return (
    <div className='homepage-container'>
      <video autoPlay muted loop>
        <source src={videoHomePage} type='video/mp4' />
      </video>

      <div className='home-page-content'>
        <div className='title-1'>Lorem ipsum dolor sit amet.</div>
        <div className='title-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          corrupti, eligendi vel corporis molestiae dolores aspernatur aliquam
          molestias quibusdam laborum!
        </div>
        <div>
          {/* When user not login -> navigate to login */}
          {isAuthenticated === false ? (
            <button onClick={() => navigate('/login')} className='title-3'>
              Get start. It's free
            </button>
          ) : (
            <button onClick={() => navigate('/user')} className='title-3'>
              Do quiz now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
