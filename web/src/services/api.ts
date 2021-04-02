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
    if (error.response.status === 401) {
      localStorage.removeItem('@Whiteeth:token')
      localStorage.removeItem('@Whiteeth:user')

      window.location.reload()
    }

    throw new Error(
      error.response.data.message || getMessage('server.internal_error')
    )
  }
)

export default api
