export function LevelBadge({ level, title }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-sm">
      <span className="font-bold text-violet-300">Nv. {level ?? 1}</span>
      <span className="text-slate-400">{title ?? 'Novato'}</span>
    </span>
  )
}
