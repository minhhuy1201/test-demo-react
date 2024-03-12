import axios from '../utils/axiosConfig'

const postLogin = (email, password) => {
  return axios.post(
    'api/v1/login',
    { email, password, delay: 2500 } // delay 2.5s de call api
  ) // data that ra la object khong co key, ten key se giong ten value
}

const postSignup = (email, password, username) => {
  return axios.post('api/v1/register', { email, username, password })
}

const postLogout = (email, refresh_token) => {
  return axios.post('api/v1/logout', {
    email,
    refresh_token
  })
}

export { postLogin, postSignup, postLogout }
