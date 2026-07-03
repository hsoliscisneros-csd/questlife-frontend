import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-violet-400">
          QuestLife
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {isAuthenticated ? (
            <>
              <Link to="/tareas" className="text-slate-300 hover:text-white">Tareas</Link>
              <Link to="/habitos" className="text-slate-300 hover:text-white">Hábitos</Link>
              <Link to="/proyectos" className="text-slate-300 hover:text-white">Proyectos</Link>
              <Link to="/perfil" className="text-slate-300 hover:text-white">
                {user?.name || 'Perfil'}
              </Link>
              <button type="button" onClick={handleLogout} className="text-slate-400 hover:text-white">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-300 hover:text-white">Entrar</Link>
              <Link to="/register" className="btn-primary">Registro</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
