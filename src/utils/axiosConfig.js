import axios from 'axios'
import NProgress from 'nprogress'

const instance = axios.create({
  baseURL: 'http://localhost:8081/'
})

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 150
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    NProgress.start() // hien thanh progess khi nguoi dung request
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
