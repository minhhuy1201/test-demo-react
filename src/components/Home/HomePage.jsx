import './HomePage.scss'
import videoHomePage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const HomePage = props => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className='homepage-container'>
      <video autoPlay muted loop>
        <source src={videoHomePage} type='video/mp4' />
      </video>

      <div className='home-page-content'>
        <div className='title-1'>{t('home-container.title-1')}</div>
        <div className='title-2'>{t('home-container.title-2')}</div>
        <div>
          {/* When user not login -> navigate to login */}
          {isAuthenticated === false ? (
            <button onClick={() => navigate('/login')} className='title-3'>
              {t('home-container.title-3')}
            </button>
          ) : (
            <button onClick={() => navigate('/user')} className='title-3'>
              {t('home-container.title-3-login')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
