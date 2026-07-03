import { useState, useEffect, useCallback } from 'react'
import { missionService } from '../services/missionService.js'

export function useMissions() {
  const [missions, setMissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMissions = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await missionService.getActive()
      setMissions(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMissions()
  }, [fetchMissions])

  return { missions, loading, error, refetch: fetchMissions }
}
