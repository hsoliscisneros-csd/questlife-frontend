import { useState, useEffect, useCallback } from 'react'
import { inventoryService } from '../services/inventoryService.js'

export function useInventory() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await inventoryService.getAll()
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const equip = async (id) => {
    await inventoryService.equip(id)
    await fetchItems()
  }

  return { items, loading, error, equip, refetch: fetchItems }
}
