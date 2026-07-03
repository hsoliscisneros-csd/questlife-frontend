import { useState } from 'react'
import { AppShell } from '../../components/layout/AppShell.jsx'
import { Input } from '../../components/ui/Input.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { useProjects } from '../../hooks/useProjects.js'

export function ProjectsPage() {
  const { projects, loading, error, createProject, removeProject } = useProjects()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setActionLoading(true)
    try {
      await createProject({
        title: title.trim(),
        description: description.trim() || undefined,
      })
      setTitle('')
      setDescription('')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <AppShell>
      <h1 className="mb-2 text-2xl font-bold">Proyectos</h1>
      <p className="mb-6 text-sm text-slate-400">Agrupa misiones en campañas mayores.</p>

      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleCreate} className="rpg-card space-y-4 p-6">
          <h2 className="text-lg font-semibold text-violet-300">Nuevo proyecto</h2>
          <Input
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div>
            <label className="mb-1 block text-sm text-slate-400">Descripción</label>
            <textarea
              className="input-field min-h-20 resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={actionLoading || !title.trim()}>
            Crear proyecto
          </Button>
        </form>

        <div>
          {error && <p className="text-red-400">{error}</p>}
          {loading ? (
            <p className="text-slate-400">Cargando proyectos...</p>
          ) : projects.length === 0 ? (
            <p className="text-sm text-slate-500">Sin proyectos aún.</p>
          ) : (
            <ul className="space-y-3">
              {projects.map((project) => (
                <li key={project.id} className="rpg-card flex items-start justify-between gap-3 p-4">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    {project.description && (
                      <p className="mt-1 text-sm text-slate-400">{project.description}</p>
                    )}
                    <p className="mt-1 text-xs text-slate-500">Estado: {project.status}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    className="text-xs text-slate-500 hover:text-red-400"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  )
}
