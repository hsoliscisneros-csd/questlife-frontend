import { AppShell } from '../../components/layout/AppShell.jsx'
import { useAchievements } from '../../hooks/useAchievements.js'

export function AchievementsPage() {
  const { catalog, unlockedIds, loading, error } = useAchievements()

  return (
    <AppShell>
      <h1 className="mb-2 text-2xl font-bold">Logros</h1>
      <p className="mb-6 text-sm text-slate-400">Insignias por hitos de productividad.</p>

      {error && <p className="text-red-400">{error}</p>}
      {loading ? (
        <p className="text-slate-400">Cargando logros...</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {catalog.map((a) => {
            const unlocked = unlockedIds.has(a.id)
            return (
              <li
                key={a.id}
                className={`rpg-card p-4 ${unlocked ? 'border-amber-500/40' : 'opacity-70'}`}
              >
                <p className="font-medium">{a.title}</p>
                <p className="mt-1 text-sm text-slate-400">{a.description}</p>
                <p className="mt-2 text-xs text-amber-400">
                  {unlocked ? '✓ Desbloqueado' : `Meta: ${a.conditionValue} · +${a.xpReward} XP`}
                </p>
              </li>
            )
          })}
        </ul>
      )}
    </AppShell>
  )
}
