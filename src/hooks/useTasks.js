import { useState, useEffect, useCallback } from 'react'
import { taskService } from '../services/taskService.js'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await taskService.getAll()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const createTask = async (data) => {
    const task = await taskService.create(data)
    await fetchTasks()
    return task
  }

  const completeTask = async (id) => {
    const result = await taskService.complete(id)
    await fetchTasks()
    return result
  }

  const removeTask = async (id) => {
    await taskService.remove(id)
    await fetchTasks()
  }

  return { tasks, loading, error, createTask, completeTask, removeTask, refetch: fetchTasks }
}
