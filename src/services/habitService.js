import { apiClient } from './apiClient.js'

export const habitService = {
  getAll: () => apiClient.get('/habits'),
  getById: (id) => apiClient.get(`/habits/${id}`),
  create: (data) => apiClient.post('/habits', data),
  update: (id, data) => apiClient.patch(`/habits/${id}`, data),
  log: (id, data) => apiClient.post(`/habits/${id}/log`, data ?? {}),
  remove: (id) => apiClient.delete(`/habits/${id}`),
}
