import { useState, useEffect, useCallback } from 'react'
import { achievementService } from '../services/achievementService.js'

export function useAchievements() {
  const [catalog, setCatalog] = useState([])
  const [mine, setMine] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const [all, unlocked] = await Promise.all([
        achievementService.getAll(),
        achievementService.getMine(),
      ])
      setCatalog(all)
      setMine(unlocked)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const unlockedIds = new Set(mine.map((u) => u.achievement?.id))

  return { catalog, mine, unlockedIds, loading, error, refetch: fetchAll }
}
