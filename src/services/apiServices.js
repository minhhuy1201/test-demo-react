import axios from '../utils/axiosConfig'

const getOverView = () => {
  return axios.get('api/v1/overview')
}

export { getOverView }
