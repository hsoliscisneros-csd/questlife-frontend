import { useState } from 'react'
import { Input } from '../ui/Input.jsx'
import { Button } from '../ui/Button.jsx'

const DIFFICULTY_LABELS = ['', 'Fácil', 'Normal', 'Media', 'Difícil', 'Épica']

export function TaskForm({ onSubmit, loading }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState(2)
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    await onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      difficulty: Number(difficulty),
      dueDate: dueDate || undefined,
    })
    setTitle('')
    setDescription('')
    setDifficulty(2)
    setDueDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="rpg-card space-y-4 p-6">
      <h2 className="text-lg font-semibold text-violet-300">Nueva misión</h2>
      <Input
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ej. Entregar reporte de laboratorio"
        required
      />
      <div>
        <label className="mb-1 block text-sm text-slate-400">Descripción</label>
        <textarea
          className="input-field min-h-20 resize-y"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalles opcionales"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-slate-400">
            Dificultad — {DIFFICULTY_LABELS[difficulty]}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full accent-violet-500"
          />
        </div>
        <Input
          label="Fecha límite"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={loading || !title.trim()}>
        Crear tarea
      </Button>
    </form>
  )
}
