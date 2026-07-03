import { AppShell } from '../../components/layout/AppShell.jsx'
import { useMissions } from '../../hooks/useMissions.js'

export function MissionsPage() {
  const { missions, loading, error } = useMissions()

  return (
    <AppShell>
      <h1 className="mb-2 text-2xl font-bold">Misiones</h1>
      <p className="mb-6 text-sm text-slate-400">Objetivos diarios, semanales y mensuales.</p>

      {error && <p className="text-red-400">{error}</p>}
      {loading ? (
        <p className="text-slate-400">Cargando misiones...</p>
      ) : missions.length === 0 ? (
        <p className="text-slate-500">No hay misiones activas.</p>
      ) : (
        <ul className="space-y-3">
          {missions.map((m) => {
            const target = m.targetValue ?? 1
            const pct = Math.min(100, Math.round((m.progress / target) * 100))
            return (
              <li key={m.id} className="rpg-card p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{m.title}</p>
                    <p className="text-xs text-slate-400 capitalize">{m.type} · +{m.xpReward} XP</p>
                  </div>
                  <span className="text-xs text-violet-300">{m.progress}/{target}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-violet-500 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </AppShell>
  )
}
