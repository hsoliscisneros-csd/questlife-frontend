export function CoinDisplay({ amount }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1 text-sm font-semibold text-yellow-400">
      🪙 {amount ?? 0}
    </span>
  )
}
