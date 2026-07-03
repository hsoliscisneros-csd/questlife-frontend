import { useState } from 'react'
import { AppShell } from '../../components/layout/AppShell.jsx'
import { TaskForm } from '../../components/forms/TaskForm.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { useTasks } from '../../hooks/useTasks.js'

const STATUS_LABELS = {
  pending: 'Pendiente',
  completed: 'Completada',
  cancelled: 'Cancelada',
}

export function TasksPage() {
  const { tasks, loading, error, createTask, completeTask, removeTask } = useTasks()
  const [actionLoading, setActionLoading] = useState(false)
  const [rewardMsg, setRewardMsg] = useState('')

  const handleCreate = async (data) => {
    setActionLoading(true)
    try {
      await createTask(data)
    } finally {
      setActionLoading(false)
    }
  }

  const handleComplete = async (id) => {
    setActionLoading(true)
    setRewardMsg('')
    try {
      const result = await completeTask(id)
      const parts = [`+${result.xpGained} XP`, `+${result.coinsGained} monedas`]
      if (result.levelUp) parts.push(`¡Nivel ${result.newLevel}!`)
      setRewardMsg(parts.join(' · '))
    } finally {
      setActionLoading(false)
    }
  }

  const pending = tasks.filter((t) => t.status === 'pending')
  const done = tasks.filter((t) => t.status === 'completed')

  return (
    <AppShell>
      <h1 className="mb-2 text-2xl font-bold">Misiones diarias</h1>
      <p className="mb-6 text-sm text-slate-400">Completa tareas y gana experiencia.</p>

      {rewardMsg && (
        <p className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
          {rewardMsg}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <TaskForm onSubmit={handleCreate} loading={actionLoading} />

        <div className="space-y-6">
          {error && <p className="text-red-400">{error}</p>}
          {loading ? (
            <p className="text-slate-400">Cargando tareas...</p>
          ) : (
            <>
              <section>
                <h2 className="mb-3 font-semibold text-violet-300">Pendientes ({pending.length})</h2>
                {pending.length === 0 ? (
                  <p className="text-sm text-slate-500">Sin tareas pendientes.</p>
                ) : (
                  <ul className="space-y-3">
                    {pending.map((task) => (
                      <li key={task.id} className="rpg-card flex items-start justify-between gap-3 p-4">
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="mt-1 text-xs text-slate-400">
                            Dif. {task.difficulty} · +{task.xpReward} XP
                            {task.dueDate && ` · Vence ${task.dueDate}`}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <Button
                            type="button"
                            onClick={() => handleComplete(task.id)}
                            disabled={actionLoading}
                          >
                            Completar
                          </Button>
                          <button
                            type="button"
                            onClick={() => removeTask(task.id)}
                            className="text-xs text-slate-500 hover:text-red-400"
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {done.length > 0 && (
                <section>
                  <h2 className="mb-3 font-semibold text-slate-400">Completadas ({done.length})</h2>
                  <ul className="space-y-2">
                    {done.map((task) => (
                      <li key={task.id} className="rounded-lg bg-slate-900/50 px-4 py-2 text-sm text-slate-500 line-through">
                        {task.title} — {STATUS_LABELS[task.status]}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </AppShell>
  )
}
