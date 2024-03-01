import axios from 'axios'
import NProgress from 'nprogress'
import { store } from '../redux/store'

const instance = axios.create({
  baseURL: 'http://localhost:8081/'
})

// loading bar
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 150
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Get user access token
    const user_access_token = store?.getState()?.user?.account?.access_token
    // Set access token to headers when call API
    config.headers['Authorization'] = `Bearer ${user_access_token}`
    // hien thanh progess khi nguoi dung request
    NProgress.start()
    // Do something before request is sent
    return config
  },
  function (error) {
    NProgress.start() // hien thanh progess khi nguoi dung request
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done() // huy thanh progess khi tra ve ket qua
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response
  },
  function (error) {
    NProgress.done() // huy thanh progess khi tra ve ket qua
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error)
  }
)

export default instance
