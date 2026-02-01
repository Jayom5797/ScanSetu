import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import BarcodeDisplay from '../components/BarcodeDisplay'

type Item = {
  id: string
  code: string
  status: string
  product: {
    id: string
    name: string
    sku: string
  }
}

export default function Inventory() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'in_stock' | 'issued'>('all')

  useEffect(() => {
    loadItems()
  }, [filter])

  async function loadItems() {
    try {
      setLoading(true)
      setError('')
      let query = supabase
        .from('items')
        .select('id, code, status, products(id, name, sku)')
        .order('code', { ascending: true })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error: err } = await query

      if (err) throw err

      const formattedItems: Item[] = (data || []).map((item: any) => ({
        id: item.id,
        code: item.code,
        status: item.status,
        product: {
          id: item.products.id,
          name: item.products.name,
          sku: item.products.sku,
        },
      }))

      setItems(formattedItems)
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load items')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Inventory</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-2 rounded-md text-sm ${filter === 'all' ? 'bg-brand text-neutral-950' : 'border border-neutral-800'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('in_stock')}
              className={`px-3 py-2 rounded-md text-sm ${filter === 'in_stock' ? 'bg-brand text-neutral-950' : 'border border-neutral-800'}`}
            >
              In Stock
            </button>
            <button
              onClick={() => setFilter('issued')}
              className={`px-3 py-2 rounded-md text-sm ${filter === 'issued' ? 'bg-brand text-neutral-950' : 'border border-neutral-800'}`}
            >
              Issued
            </button>
          </div>
        </div>

        {error && <div className="mb-4 text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded p-3">{error}</div>}

        {loading ? (
          <div className="text-neutral-400">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-neutral-400">No items found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-sm font-semibold">{item.code}</div>
                  <span
                    className={`px-2 py-0.5 text-xs rounded ${
                      item.status === 'issued'
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {item.status === 'issued' ? 'Issued' : 'In Stock'}
                  </span>
                </div>
                <div className="text-sm text-neutral-300 mb-3">{item.product.name}</div>
                <div className="mt-3">
                  <BarcodeDisplay code={item.code} width={1.5} height={40} fontSize={12} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

