import { AppShell } from '../../components/layout/AppShell.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { useInventory } from '../../hooks/useInventory.js'

export function InventoryPage() {
  const { items, loading, error, equip } = useInventory()

  return (
    <AppShell>
      <h1 className="mb-2 text-2xl font-bold">Inventario</h1>
      <p className="mb-6 text-sm text-slate-400">Tus objetos adquiridos.</p>

      {error && <p className="text-red-400">{error}</p>}
      {loading ? (
        <p className="text-slate-400">Cargando inventario...</p>
      ) : items.length === 0 ? (
        <p className="text-slate-500">Inventario vacío. Visita la tienda.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="rpg-card flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-slate-400 capitalize">{item.type}</p>
                {item.isEquipped && (
                  <p className="mt-1 text-xs text-violet-400">Equipado</p>
                )}
              </div>
              {!item.isEquipped && (
                <Button type="button" onClick={() => equip(item.id)}>
                  Equipar
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  )
}
