import { apiClient } from './apiClient.js'

export const inventoryService = {
  getAll: () => apiClient.get('/inventory'),
  equip: (id) => apiClient.patch(`/inventory/${id}/equip`),
}
