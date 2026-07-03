import { apiClient } from './apiClient.js'

export const projectService = {
  getAll: () => apiClient.get('/projects'),
  getById: (id) => apiClient.get(`/projects/${id}`),
  create: (data) => apiClient.post('/projects', data),
  update: (id, data) => apiClient.patch(`/projects/${id}`, data),
  remove: (id) => apiClient.delete(`/projects/${id}`),
}
