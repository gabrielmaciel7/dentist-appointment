import axios, { AxiosInstance } from 'axios'

const api = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL
  })
}

export default api
