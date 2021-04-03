import axios from 'axios'
import apiConfig from '../config/api'

import getMessage from '../utils/getMessage'

const api = axios.create({
  baseURL: apiConfig.baseUrl
})

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const token = localStorage.getItem('@Whiteeth:token')

    if (error.response.status === 401 && token) {
      localStorage.removeItem('@Whiteeth:token')
      localStorage.removeItem('@Whiteeth:user')

      window.location.reload()
    }

    throw new Error(
      error.response.data.message ||
        error.response.message ||
        getMessage('server.internal_error')
    )
  }
)

export default api
