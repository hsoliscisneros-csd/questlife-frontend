import { apiClient } from './apiClient.js'

export const rewardService = {
  getAll: () => apiClient.get('/rewards'),
  purchase: (id) => apiClient.post(`/rewards/${id}/purchase`),
}
