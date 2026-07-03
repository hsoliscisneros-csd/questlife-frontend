import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './pages/public/LandingPage.jsx'
import { LoginPage } from './pages/public/LoginPage.jsx'
import { RegisterPage } from './pages/public/RegisterPage.jsx'
import { ProfilePage } from './pages/user/ProfilePage.jsx'
import { TasksPage } from './pages/user/TasksPage.jsx'
import { HabitsPage } from './pages/user/HabitsPage.jsx'
import { ProjectsPage } from './pages/user/ProjectsPage.jsx'
import { ProtectedRoute } from './components/layout/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tareas"
        element={
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/habitos"
        element={
          <ProtectedRoute>
            <HabitsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/proyectos"
        element={
          <ProtectedRoute>
            <ProjectsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
