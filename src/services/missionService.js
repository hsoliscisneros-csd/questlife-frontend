import { apiClient } from './apiClient.js'

export const missionService = {
  getTemplates: () => apiClient.get('/missions'),
  getActive: () => apiClient.get('/missions/active'),
}
