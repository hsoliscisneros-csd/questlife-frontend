import { apiClient } from './apiClient.js'

export const taskService = {
  getAll: (status) => {
    const query = status ? `?status=${status}` : ''
    return apiClient.get(`/tasks${query}`)
  },
  getById: (id) => apiClient.get(`/tasks/${id}`),
  create: (data) => apiClient.post('/tasks', data),
  update: (id, data) => apiClient.patch(`/tasks/${id}`, data),
  complete: (id) => apiClient.patch(`/tasks/${id}/complete`),
  remove: (id) => apiClient.delete(`/tasks/${id}`),
}
