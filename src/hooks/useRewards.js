import { useState, useEffect, useCallback } from 'react'
import { rewardService } from '../services/rewardService.js'

export function useRewards() {
  const [rewards, setRewards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRewards = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await rewardService.getAll()
      setRewards(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRewards()
  }, [fetchRewards])

  const purchase = async (id) => {
    const result = await rewardService.purchase(id)
    await fetchRewards()
    return result
  }

  return { rewards, loading, error, purchase, refetch: fetchRewards }
}
