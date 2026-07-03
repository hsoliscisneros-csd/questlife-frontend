import { apiClient } from './apiClient.js'

export const authService = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (data) => apiClient.post('/auth/register', data),
  getProfile: () => apiClient.get('/auth/profile'),
}

export const userService = {
  getMe: () => apiClient.get('/users/me'),
  updateMe: (data) => apiClient.patch('/users/me', data),
  updateAvatar: (data) => apiClient.patch('/users/me/avatar', data),
}
