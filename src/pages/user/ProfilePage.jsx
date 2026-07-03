import { useEffect, useState } from 'react'
import { AppShell } from '../../components/layout/AppShell.jsx'
import { XpBar } from '../../components/rpg/XpBar.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { userService } from '../../services/authService.js'

export function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    userService.getMe()
      .then(setProfile)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return (
      <AppShell>
        <p className="text-slate-400">Cargando perfil...</p>
      </AppShell>
    )
  }

  if (error) {
    return (
      <AppShell>
        <p className="text-red-400">{error}</p>
      </AppShell>
    )
  }

  const progress = profile?.progress

  return (
    <AppShell>
      <h1 className="mb-6 text-2xl font-bold">Perfil del aventurero</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="rpg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-violet-300">{profile?.name}</h2>
          <p className="text-sm text-slate-400">{profile?.email}</p>
          <p className="mt-2 text-sm">Rol: <span className="text-amber-400">{profile?.role}</span></p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-slate-800 p-3">
              <p className="text-slate-400">Monedas</p>
              <p className="text-xl font-bold text-yellow-400">{progress?.coins ?? 0}</p>
            </div>
            <div className="rounded-lg bg-slate-800 p-3">
              <p className="text-slate-400">Racha</p>
              <p className="text-xl font-bold text-red-400">{progress?.globalStreak ?? 0} días</p>
            </div>
          </div>
        </article>

        <XpBar
          current={progress?.totalXp ?? 0}
          max={progress?.nextXpRequired ?? 100}
          level={progress?.level ?? 1}
          title={progress?.levelTitle ?? 'Novato'}
        />
      </div>
    </AppShell>
  )
}
