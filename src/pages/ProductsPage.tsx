import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { generateItemCodes } from '../lib/barcodeUtils'
import BarcodeDisplay from '../components/BarcodeDisplay'

type Product = {
  id: string
  name: string
  sku: string | null
  created_at: string
  item_count?: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAddItemsModal, setShowAddItemsModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({ name: '', sku: '' })
  const [itemCount, setItemCount] = useState(10)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      setLoading(true)
      setError('')
      const { data, error: err } = await supabase
        .from('products')
        .select('id, name, sku, created_at')
        .order('created_at', { ascending: false })

      if (err) throw err

      // Get item counts for each product
      const productsWithCounts = await Promise.all(
        (data || []).map(async (p: any) => {
          const { count } = await supabase.from('items').select('*', { count: 'exact', head: true }).eq('product_id', p.id)
          return {
            id: p.id,
            name: p.name,
            sku: p.sku,
            created_at: p.created_at,
            item_count: count ?? 0,
          }
        })
      )

      const formattedProducts: Product[] = productsWithCounts

      setProducts(formattedProducts)
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const { data, error: err } = await supabase
        .from('products')
        .insert({
          name: formData.name,
          sku: formData.sku || null,
        })
        .select('id')
        .single()

      if (err) throw err

      setFormData({ name: '', sku: '' })
      setShowAddModal(false)
      await loadProducts()
    } catch (err: any) {
      setError(err?.message ?? 'Failed to add product')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleAddItems() {
    if (!selectedProduct || !selectedProduct.sku) {
      setError('Product must have an SKU to generate item codes')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const codes = generateItemCodes(selectedProduct.sku, itemCount)

      // Check which codes already exist
      const { data: existing } = await supabase.from('items').select('code').in('code', codes)

      const existingCodes = new Set((existing || []).map((e) => e.code))
      const newCodes = codes.filter((c) => !existingCodes.has(c))

      if (newCodes.length === 0) {
        setError('All item codes for this product already exist')
        setSubmitting(false)
        return
      }

      // Insert new items
      const itemsToInsert = newCodes.map((code) => ({
        product_id: selectedProduct.id,
        code,
        status: 'in_stock',
      }))

      const { error: err } = await supabase.from('items').insert(itemsToInsert)

      if (err) throw err

      setShowAddItemsModal(false)
      setSelectedProduct(null)
      setItemCount(10)
      await loadProducts()
    } catch (err: any) {
      setError(err?.message ?? 'Failed to add items')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeleteProduct(productId: string) {
    if (!confirm('Are you sure you want to delete this product? All associated items will also be deleted.')) return

    try {
      const { error: err } = await supabase.from('products').delete().eq('id', productId)
      if (err) throw err
      await loadProducts()
    } catch (err: any) {
      setError(err?.message ?? 'Failed to delete product')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-md bg-brand text-neutral-950 font-semibold hover:opacity-90"
          >
            Add Product
          </button>
        </div>

        {error && <div className="mb-4 text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded p-3">{error}</div>}

        {loading ? (
          <div className="text-neutral-400">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-neutral-400">No products found. Add your first product to get started.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold">{product.name}</div>
                    {product.sku && <div className="text-sm text-neutral-400 font-mono mt-1">SKU: {product.sku}</div>}
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
                <div className="text-sm text-neutral-300 mb-3">Items: {product.item_count || 0}</div>
                <button
                  onClick={() => {
                    setSelectedProduct(product)
                    setShowAddItemsModal(true)
                  }}
                  className="w-full px-3 py-2 rounded-md border border-neutral-800 text-sm hover:bg-neutral-900"
                >
                  Add Items
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowAddModal(false)} />
          <div className="relative z-10 w-[95vw] max-w-md rounded-lg border border-neutral-800 bg-neutral-950 p-6">
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-300 mb-2">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-2">SKU (Optional)</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                  placeholder="e.g., SPN-A"
                  className="w-full px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 outline-none font-mono"
                />
                <p className="mt-1 text-xs text-neutral-400">Used to generate item codes (e.g., SPNA1, SPNA2)</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 rounded-md bg-brand text-neutral-950 font-semibold hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? 'Adding...' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-md border border-neutral-800 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Items Modal */}
      {showAddItemsModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowAddItemsModal(false)} />
          <div className="relative z-10 w-[95vw] max-w-md rounded-lg border border-neutral-800 bg-neutral-950 p-6">
            <h2 className="text-xl font-semibold mb-4">Add Items to {selectedProduct.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-300 mb-2">Number of Items</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={itemCount}
                  onChange={(e) => setItemCount(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 outline-none"
                />
                <p className="mt-1 text-xs text-neutral-400">
                  Items will be created with codes: {selectedProduct.sku}1, {selectedProduct.sku}2, etc.
                </p>
              </div>
              {selectedProduct.sku && (
                <div className="p-3 rounded bg-neutral-900 border border-neutral-800">
                  <div className="text-xs text-neutral-400 mb-2">Preview:</div>
                  <BarcodeDisplay code={generateItemCodes(selectedProduct.sku, 1)[0]} width={1.5} height={40} fontSize={12} />
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleAddItems}
                  disabled={submitting || !selectedProduct.sku}
                  className="flex-1 px-4 py-2 rounded-md bg-brand text-neutral-950 font-semibold hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? 'Adding...' : 'Add Items'}
                </button>
                <button
                  onClick={() => setShowAddItemsModal(false)}
                  className="px-4 py-2 rounded-md border border-neutral-800 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

