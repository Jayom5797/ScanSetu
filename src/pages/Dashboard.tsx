import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import Inventory from './Inventory'
import IssuePage from './IssuePage'
import ReturnPage from './ReturnPage'
import ProductsPage from './ProductsPage'

function StatCard({ title, value, hint }: { title: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-5 hover:bg-neutral-900/60 transition-colors">
      <div className="text-xs text-neutral-400">{title}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      {hint ? <div className="mt-2 text-xs text-neutral-500">{hint}</div> : null}
    </div>
  )
}

function MobileActivityList({ rows }: { rows: ActivityRow[] }) {
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.code} className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
          <div className="flex items-center justify-between">
            <div className="font-mono text-sm">{r.code}</div>
            <span className={`px-2 py-0.5 text-[11px] rounded ${r.status === 'Issued' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'}`}>{r.status}</span>
          </div>
          <div className="mt-1 text-sm">{r.product}</div>
          <div className="mt-1 text-xs text-neutral-400">{r.holder} • {r.updated}</div>
        </div>
      ))}
    </div>
  )
}

function Topbar({
  onMenuClick,
  onNavigate,
  onExportCSV,
}: {
  onMenuClick: () => void
  onNavigate: (page: string) => void
  onExportCSV: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-800 hover:bg-neutral-900"
          onClick={onMenuClick}
          aria-label="Open Menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-neutral-300">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="h-8 w-8 rounded-sm bg-brand flex items-center justify-center">
          <div className="h-4 w-4 bg-neutral-900 rotate-45" />
        </div>
        <div>
          <div className="font-semibold">ScanSetu</div>
          <div className="text-xs text-neutral-400">Lab Inventory Dashboard</div>
        </div>
      </div>
      {/* Search hidden on small screens */}
      <div className="flex-1 max-w-xl hidden sm:block">
        <div className="flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2">
          <input
            placeholder="Search items, barcodes, users..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-neutral-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                // Navigate to inventory with search
                onNavigate('inventory')
                // Could add search state management here if needed
              }
            }}
          />
          <div className="text-xs text-neutral-500">CTRL + K</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onExportCSV}
          className="hidden sm:inline-flex px-3 py-2 rounded-md border border-neutral-800 text-sm hover:bg-neutral-900"
        >
          Export CSV
        </button>
        <Link to="/" className="px-3 py-2 rounded-md bg-neutral-200 text-neutral-900 text-sm font-medium hover:opacity-90">
          Home
        </Link>
      </div>
    </div>
  )
}

function Sidebar({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  const items = [
    { name: 'Overview', page: 'overview' },
    { name: 'Inventory', page: 'inventory' },
    { name: 'Issue', page: 'issue' },
    { name: 'Return', page: 'return' },
    { name: 'Products', page: 'products' },
  ]
  return (
    <aside className="w-60 shrink-0 border-r border-neutral-800 hidden md:block">
      <div className="p-4">
        <div className="text-xs uppercase tracking-widest text-neutral-500">Navigation</div>
        <div className="mt-3 space-y-1">
          {items.map((it) => (
            <button
              key={it.name}
              onClick={() => onNavigate(it.page)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm border ${
                currentPage === it.page
                  ? 'bg-neutral-900/70 border-neutral-800 text-white'
                  : 'border-transparent hover:border-neutral-800 hover:bg-neutral-900/50'
              }`}
            >
              {it.name}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-neutral-800">
        <div className="text-xs text-neutral-500">Quick Actions</div>
        <div className="mt-3 grid grid-cols-1 gap-2">
          <button
            onClick={() => onNavigate('issue')}
            className="px-3 py-2 rounded-md bg-brand text-neutral-950 text-sm font-semibold"
          >
            Scan to Issue
          </button>
          <button
            onClick={() => onNavigate('return')}
            className="px-3 py-2 rounded-md border border-neutral-800 text-sm"
          >
            Scan to Return
          </button>
          <button
            onClick={() => onNavigate('products')}
            className="px-3 py-2 rounded-md border border-neutral-800 text-sm"
          >
            Add Product
          </button>
        </div>
      </div>
    </aside>
  )
}

type ActivityRow = {
  code: string
  product: string
  holder: string
  status: 'Issued' | 'In Stock'
  updated: string
}

function Table({ rows }: { rows: ActivityRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800">
      <div className="min-w-[720px]">
        <div className="grid grid-cols-12 bg-neutral-950/80 px-4 py-2 text-xs text-neutral-400">
          <div className="col-span-2">Item Code</div>
          <div className="col-span-3">Product</div>
          <div className="col-span-3">Holder</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Updated</div>
        </div>
        {rows.map((r, idx) => (
          <div key={r.code} className={`grid grid-cols-12 px-4 py-3 text-sm ${idx % 2 === 0 ? 'bg-neutral-950/40' : ''} hover:bg-neutral-900/60` }>
            <div className="col-span-2 font-mono">{r.code}</div>
            <div className="col-span-3">{r.product}</div>
            <div className="col-span-3">{r.holder}</div>
            <div className="col-span-2">
              <span className={`px-2 py-0.5 text-xs rounded ${r.status === 'Issued' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'}`}>{r.status}</span>
            </div>
            <div className="col-span-2 text-right text-neutral-400">{r.updated}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('overview')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [stats, setStats] = useState({
    totalProducts: 0,
    itemsInStock: 0,
    currentlyIssued: 0,
    overdue: 0,
  })
  const [activity, setActivity] = useState<ActivityRow[]>([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  async function loadDashboardData() {
    if (!isSupabaseConfigured()) return
    try {
      // Stats
      const [{ count: productCount }, { count: inStockCount }, { count: issuedCount }, overdueRes] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('items').select('*', { count: 'exact', head: true }).eq('status', 'in_stock'),
        supabase.from('items').select('*', { count: 'exact', head: true }).eq('status', 'issued'),
        supabase.from('assignments').select('*', { count: 'exact', head: true }).eq('status', 'issued').lt('due_at', new Date().toISOString()),
      ])

      setStats({
        totalProducts: productCount ?? 0,
        itemsInStock: inStockCount ?? 0,
        currentlyIssued: issuedCount ?? 0,
        overdue: overdueRes.count ?? 0,
      })

      // Recent activity: expects a view or table named recent_activity with columns
      // code, product, holder, status, updated
      const { data: recent, error: recentErr } = await supabase
        .from('recent_activity')
        .select('*')
        .order('updated', { ascending: false })
        .limit(6)

      if (!recentErr && Array.isArray(recent) && recent.length > 0) {
        const rows: ActivityRow[] = recent.map((r: any) => ({
          code: r.code,
          product: r.product,
          holder: r.holder ?? '-',
          status: (r.status === 'issued' ? 'Issued' : 'In Stock') as ActivityRow['status'],
          updated: new Date(r.updated).toLocaleString(),
        }))
        setActivity(rows)
      } else {
        setActivity([])
      }
    } catch (e) {
      console.warn('Supabase fetch failed:', e)
      setActivity([])
    }
  }

  async function handleExportCSV() {
    try {
      // Fetch all items with their details
      const { data: items, error } = await supabase
        .from('items')
        .select('id, code, status, products(name, sku)')
        .order('code', { ascending: true })

      if (error) throw error

      // Get assignments for each item
      const itemsWithAssignments = await Promise.all(
        (items || []).map(async (item: any) => {
          const { data: assignments } = await supabase
            .from('assignments')
            .select('status, issued_at, returned_at, users(full_name, email)')
            .eq('item_id', item.id)
            .order('issued_at', { ascending: false })
            .limit(1)

          return {
            ...item,
            assignment: assignments?.[0] || null,
          }
        })
      )

      // Format CSV
      const headers = ['Code', 'Product', 'SKU', 'Status', 'Holder', 'Issued At', 'Returned At']
      const rows = itemsWithAssignments.map((item: any) => {
        const assignment = item.assignment
        return [
          item.code,
          item.products?.name || '',
          item.products?.sku || '',
          item.status,
          assignment?.users?.full_name || assignment?.users?.email || '',
          assignment?.issued_at ? new Date(assignment.issued_at).toLocaleString() : '',
          assignment?.returned_at ? new Date(assignment.returned_at).toLocaleString() : '',
        ]
      })

      const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `scansetu-inventory-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err: any) {
      alert(`Failed to export CSV: ${err?.message ?? 'Unknown error'}`)
    }
  }

  function renderPage() {
    switch (currentPage) {
      case 'inventory':
        return <Inventory />
      case 'issue':
        return <IssuePage />
      case 'return':
        return <ReturnPage />
      case 'products':
        return <ProductsPage />
      case 'overview':
      default:
        return renderOverview()
    }
  }

  function renderOverview() {
    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <StatCard title="Total Products" value={stats.totalProducts} />
          <StatCard title="Items in Stock" value={stats.itemsInStock} />
          <StatCard title="Currently Issued" value={stats.currentlyIssued} />
          <StatCard title="Overdue" value={stats.overdue} />
        </div>
        <div className="mt-4 md:mt-6 grid lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <button
                onClick={() => setCurrentPage('inventory')}
                className="text-sm text-neutral-300 hover:text-white hidden sm:inline-flex"
              >
                View all
              </button>
            </div>
            <div className="hidden md:block">
              <Table rows={activity} />
            </div>
            <div className="md:hidden">
              <MobileActivityList rows={activity} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-5">
              <h3 className="font-semibold">Quick Actions</h3>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <button
                  onClick={() => setCurrentPage('issue')}
                  className="px-3 py-2 rounded-md bg-brand text-neutral-950 text-sm font-semibold"
                >
                  Issue Item
                </button>
                <button
                  onClick={() => setCurrentPage('return')}
                  className="px-3 py-2 rounded-md border border-neutral-800 text-sm"
                >
                  Return Item
                </button>
                <button
                  onClick={() => setCurrentPage('products')}
                  className="px-3 py-2 rounded-md border border-neutral-800 text-sm"
                >
                  Manage Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Mobile drawer overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 md:hidden" aria-hidden onClick={() => setMobileNavOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[80%] bg-neutral-950 border-r border-neutral-800 p-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-sm bg-brand flex items-center justify-center">
                  <div className="h-3.5 w-3.5 bg-neutral-900 rotate-45" />
                </div>
                <div className="font-semibold">Menu</div>
              </div>
              <button
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 hover:bg-neutral-900"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close Menu"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-neutral-300">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <div className="text-xs uppercase tracking-widest text-neutral-500">Navigation</div>
              <div className="mt-3 space-y-1">
                {[
                  { name: 'Overview', page: 'overview' },
                  { name: 'Inventory', page: 'inventory' },
                  { name: 'Issue', page: 'issue' },
                  { name: 'Return', page: 'return' },
                  { name: 'Products', page: 'products' },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setCurrentPage(item.page)
                      setMobileNavOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm border ${
                      currentPage === item.page
                        ? 'bg-neutral-900/70 border-neutral-800 text-white'
                        : 'border-transparent hover:border-neutral-800 hover:bg-neutral-900/50'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="mt-6 text-xs text-neutral-500">Quick Actions</div>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <button
                  onClick={() => {
                    setCurrentPage('issue')
                    setMobileNavOpen(false)
                  }}
                  className="px-3 py-2 rounded-md bg-brand text-neutral-950 text-sm font-semibold"
                >
                  Scan to Issue
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('return')
                    setMobileNavOpen(false)
                  }}
                  className="px-3 py-2 rounded-md border border-neutral-800 text-sm"
                >
                  Scan to Return
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('products')
                    setMobileNavOpen(false)
                  }}
                  className="px-3 py-2 rounded-md border border-neutral-800 text-sm"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">
        <Topbar
          onMenuClick={() => setMobileNavOpen(true)}
          onNavigate={setCurrentPage}
          onExportCSV={handleExportCSV}
        />
        <div className="mt-4 md:mt-6 flex gap-6">
          <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
          <main className="flex-1">{renderPage()}</main>
        </div>
      </div>
    </div>
  )
}
