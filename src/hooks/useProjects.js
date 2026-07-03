import { useState, useEffect, useCallback } from 'react'
import { projectService } from '../services/projectService.js'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await projectService.getAll()
      setProjects(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const createProject = async (data) => {
    const project = await projectService.create(data)
    await fetchProjects()
    return project
  }

  const removeProject = async (id) => {
    await projectService.remove(id)
    await fetchProjects()
  }

  return { projects, loading, error, createProject, removeProject, refetch: fetchProjects }
}
