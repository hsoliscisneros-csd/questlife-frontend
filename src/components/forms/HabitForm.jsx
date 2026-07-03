import { useState } from 'react'
import { Input } from '../ui/Input.jsx'
import { Button } from '../ui/Button.jsx'

export function HabitForm({ onSubmit, loading }) {
  const [title, setTitle] = useState('')
  const [frequency, setFrequency] = useState('daily')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    await onSubmit({ title: title.trim(), frequency })
    setTitle('')
    setFrequency('daily')
  }

  return (
    <form onSubmit={handleSubmit} className="rpg-card space-y-4 p-6">
      <h2 className="text-lg font-semibold text-violet-300">Nuevo hábito</h2>
      <Input
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ej. Leer 30 minutos"
        required
      />
      <div>
        <label className="mb-1 block text-sm text-slate-400">Frecuencia</label>
        <select
          className="input-field"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="daily">Diario</option>
          <option value="weekly">Semanal</option>
        </select>
      </div>
      <Button type="submit" disabled={loading || !title.trim()}>
        Crear hábito
      </Button>
    </form>
  )
}
