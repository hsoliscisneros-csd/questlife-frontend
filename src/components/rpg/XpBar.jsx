export function XpBar({ current, max, level, title }) {
  const percent = max > 0 ? Math.min((current / max) * 100, 100) : 0

  return (
    <div className="rpg-card p-5">
      <div className="mb-2 flex justify-between text-xs text-slate-400">
        <span>Nivel {level} — {title}</span>
        <span>{current} / {max} XP</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-violet-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
