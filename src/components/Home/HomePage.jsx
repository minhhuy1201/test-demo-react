import videoHomePage from '../../assets/video-homepage.mp4'

import './HomePage.scss'

const HomePage = props => {
  return (
    <div className='homepage-container'>
      <video autoPlay muted loop>
        <source src={videoHomePage} type='video/mp4' />
      </video>

      <div className="home-page-content">
        <div className='title-1'>Lorem ipsum dolor sit amet.</div>
        <div className='title-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia corrupti, eligendi vel corporis molestiae dolores aspernatur aliquam molestias quibusdam laborum!</div>
        <div>
          <button className='title-3'>Get start. It's free</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
