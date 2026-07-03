import { useState, useEffect, useCallback } from 'react'
import { habitService } from '../services/habitService.js'

export function useHabits() {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHabits = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await habitService.getAll()
      setHabits(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchHabits()
  }, [fetchHabits])

  const createHabit = async (data) => {
    const habit = await habitService.create(data)
    await fetchHabits()
    return habit
  }

  const logHabit = async (id) => {
    const result = await habitService.log(id, { completed: true })
    await fetchHabits()
    return result
  }

  const removeHabit = async (id) => {
    await habitService.remove(id)
    await fetchHabits()
  }

  return { habits, loading, error, createHabit, logHabit, removeHabit, refetch: fetchHabits }
}
