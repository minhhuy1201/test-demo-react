import axios from '../utils/axiosConfig'

// CREATE NEW USER ------ POST
const postCreateNewUser = (email, password, userName, role, userImg) => {
  const data = new FormData()
  data.append('email', email)
  data.append('password', password)
  data.append('username', userName)
  data.append('role', role)
  data.append('userImage', userImg)

  return axios.post('api/v1/participant', data, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`
    }
  })
}

// GET ALL USERS
const getAllUser = () => {
  return axios.get('api/v1/participant/all')
}

const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

// UPDATE A USER
const putUpdateUser = (id, userName, role, userImg) => {
  const data = new FormData()
  data.append('id', id)
  data.append('username', userName)
  data.append('role', role)
  data.append('userImage', userImg)

  return axios.put('api/v1/participant', data, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`
    }
  })
}

// DELETE A USER
const deleteUser = userId => {
  return axios.delete('api/v1/participant', { data: { id: userId } })
}

export {
  postCreateNewUser,
  getAllUser,
  getUserWithPaginate,
  putUpdateUser,
  deleteUser
}
