import axios from '../utils/axiosConfig'

const postLogin = (email, password) => {
  return axios.post(
    'api/v1/login',
    { email, password, delay: 3000 } // delay 3s de call api
  ) // data that ra la object khong co key, ten key se giong ten value
}

const postSignup = (email, password, username) => {
  return axios.post('api/v1/register', { email, username, password })
}

export { postLogin, postSignup }
