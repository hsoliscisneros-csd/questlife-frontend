import { Link } from 'react-router-dom'
import { AppShell } from '../../components/layout/AppShell.jsx'
import { Button } from '../../components/ui/Button.jsx'

export function LandingPage() {
  return (
    <AppShell>
      <section className="py-16 text-center">
        <p className="mb-2 text-sm uppercase tracking-widest text-violet-400">RPG de productividad</p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Convierte tus tareas en una aventura
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-slate-400">
          QuestLife gamifica tu productividad con XP, niveles, misiones y recompensas.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register"><Button>Comenzar aventura</Button></Link>
          <Link to="/login" className="rounded-lg border border-slate-700 px-4 py-2 hover:border-violet-500">
            Ya tengo cuenta
          </Link>
        </div>
      </section>
    </AppShell>
  )
}
