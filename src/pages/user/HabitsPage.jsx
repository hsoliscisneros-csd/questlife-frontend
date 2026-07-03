import { useState } from 'react'
import { AppShell } from '../../components/layout/AppShell.jsx'
import { HabitForm } from '../../components/forms/HabitForm.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { useHabits } from '../../hooks/useHabits.js'

export function HabitsPage() {
  const { habits, loading, error, createHabit, logHabit, removeHabit } = useHabits()
  const [actionLoading, setActionLoading] = useState(false)
  const [rewardMsg, setRewardMsg] = useState('')

  const handleCreate = async (data) => {
    setActionLoading(true)
    try {
      await createHabit(data)
    } finally {
      setActionLoading(false)
    }
  }

  const handleLog = async (id) => {
    setActionLoading(true)
    setRewardMsg('')
    try {
      const result = await logHabit(id)
      if (result.xpGained > 0) {
        const parts = [`+${result.xpGained} XP`, `Racha: ${result.streak} días`]
        if (result.levelUp) parts.push(`¡Nivel ${result.newLevel}!`)
        setRewardMsg(parts.join(' · '))
      } else {
        setRewardMsg(`Registrado · Racha: ${result.streak} días`)
      }
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <AppShell>
      <h1 className="mb-2 text-2xl font-bold">Hábitos</h1>
      <p className="mb-6 text-sm text-slate-400">Construye rachas y mantén la constancia.</p>

      {rewardMsg && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-300">
          {rewardMsg}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <HabitForm onSubmit={handleCreate} loading={actionLoading} />

        <div>
          {error && <p className="text-red-400">{error}</p>}
          {loading ? (
            <p className="text-slate-400">Cargando hábitos...</p>
          ) : habits.length === 0 ? (
            <p className="text-sm text-slate-500">Aún no tienes hábitos registrados.</p>
          ) : (
            <ul className="space-y-3">
              {habits.map((habit) => (
                <li key={habit.id} className="rpg-card flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-medium">{habit.title}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {habit.frequency === 'daily' ? 'Diario' : 'Semanal'} · +{habit.xpReward} XP
                      · Racha: <span className="text-red-400">{habit.streak ?? 0}</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button
                      type="button"
                      onClick={() => handleLog(habit.id)}
                      disabled={actionLoading || !habit.isActive}
                    >
                      Hoy ✓
                    </Button>
                    <button
                      type="button"
                      onClick={() => removeHabit(habit.id)}
                      className="text-xs text-slate-500 hover:text-red-400"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  )
}
