import { FcPlus } from 'react-icons/fc'

const Profile = props => {
  const { email, setUserName, userName, role, handleUploadImage, previewImg } =
    props

  return (
    <form className='row g-3'>
      <div className='col-md-4'>
        <label className='form-label'>Email</label>
        <input type='email' className='form-control' value={email} disabled />
      </div>

      <div className='col-md-4'>
        <label className='form-label'>User name</label>
        <input
          type='text'
          className='form-control'
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
      </div>

      <div className='col-md-4'>
        <label className='form-label'>Role</label>
        <input className='form-control' value={role} disabled></input>
      </div>

      <div className='col-md-12'>
        <label className='form-label label-upload' htmlFor='labelUpload'>
          <FcPlus style={{ marginRight: '5px' }} />
          Change Your Avatar
        </label>
        <input
          id='labelUpload'
          type='file'
          hidden
          onChange={e => handleUploadImage(e)}
        />
      </div>

      <div className='col-md-12 img-preview'>
        {previewImg ? (
          <img src={previewImg} alt='' />
        ) : (
          <span>Preview Your Avatar</span>
        )}
      </div>
    </form>
  )
}

export default Profile
