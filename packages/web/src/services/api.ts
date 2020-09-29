import api from '@monorepo/axios-config'

import apiConfig from '../config/api'

const apiClient = api(apiConfig.baseUrl)

export default apiClient
