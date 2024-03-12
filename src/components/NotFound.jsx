import notFoundImg from '../assets/not_found.png'

const NotFound = () => {
  return (
    <div className='container text-center fs-2 fw-bold'>
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

export default NotFound
