import { useState } from 'react'
import { AppShell } from '../../components/layout/AppShell.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { useRewards } from '../../hooks/useRewards.js'

export function ShopPage() {
  const { rewards, loading, error, purchase } = useRewards()
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const handleBuy = async (id, name) => {
    setBusy(true)
    setMsg('')
    try {
      const result = await purchase(id)
      setMsg(`Compraste "${name}" por ${result.coinsSpent} monedas.`)
    } catch (err) {
      setMsg(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AppShell>
      <h1 className="mb-2 text-2xl font-bold">Tienda</h1>
      <p className="mb-6 text-sm text-slate-400">Gasta monedas en cosméticos y badges.</p>

      {msg && (
        <p className="mb-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-yellow-300">
          {msg}
        </p>
      )}
      {error && <p className="text-red-400">{error}</p>}
      {loading ? (
        <p className="text-slate-400">Cargando tienda...</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rewards.map((r) => (
            <li key={r.id} className="rpg-card flex flex-col p-4">
              <p className="font-medium">{r.name}</p>
              <p className="mt-1 flex-1 text-sm text-slate-400">{r.description}</p>
              <p className="my-3 text-lg font-bold text-yellow-400">🪙 {r.priceCoins}</p>
              <Button type="button" disabled={busy} onClick={() => handleBuy(r.id, r.name)}>
                Comprar
              </Button>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  )
}
