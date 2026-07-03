import { apiClient } from './apiClient.js'

export const achievementService = {
  getAll: () => apiClient.get('/achievements'),
  getMine: () => apiClient.get('/achievements/mine'),
}
