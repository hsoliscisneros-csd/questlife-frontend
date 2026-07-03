import { useEffect, useState } from 'react'
import { AppShell } from '../../components/layout/AppShell.jsx'
import { XpBar } from '../../components/rpg/XpBar.jsx'
import { LevelBadge } from '../../components/rpg/LevelBadge.jsx'
import { CoinDisplay } from '../../components/rpg/CoinDisplay.jsx'
import { userService } from '../../services/authService.js'

export function ProgressPage() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userService.getMe().then(setProfile).finally(() => setLoading(false))
  }, [])

  const progress = profile?.progress

  return (
    <AppShell>
      <h1 className="mb-6 text-2xl font-bold">Mapa de progreso</h1>
      {loading ? (
        <p className="text-slate-400">Cargando...</p>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <LevelBadge level={progress?.level} title={progress?.levelTitle} />
            <CoinDisplay amount={progress?.coins} />
            <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm text-red-400">
              🔥 {progress?.globalStreak ?? 0} días
            </span>
          </div>
          <XpBar
            current={progress?.totalXp ?? 0}
            max={progress?.nextXpRequired ?? 100}
            level={progress?.level ?? 1}
            title={progress?.levelTitle ?? 'Novato'}
          />
        </div>
      )}
    </AppShell>
  )
}
