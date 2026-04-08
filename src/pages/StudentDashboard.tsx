import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'
import BarcodeScanner from '../components/BarcodeScanner'
import { issueItem } from '../lib/inventoryUtils'

type MyItem = {
  code: string
  product: string
  status: 'Issued' | 'In Stock'
  issued_at: string | null
  due_at: string | null
}

export default function StudentDashboard() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ myItems: 0, overdue: 0 })
  const [items, setItems] = useState<MyItem[]>([])

  const [scannerOpen, setScannerOpen] = useState(false)
  const [manualCode, setManualCode] = useState('')
  const [loadingIssue, setLoadingIssue] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const uid = (await supabase.auth.getUser()).data.user?.id
        if (!uid) return

        // Find user record by email instead of auth_user_id (column doesn't exist)
        const { data: authUser } = await supabase.auth.getUser()
        const email = authUser.user?.email
        if (!email) return

        const { data: userRecord } = await supabase
          .from('users')
          .select('id')
          .eq('email', email)
          .maybeSingle()

        if (!userRecord) {
          setLoading(false)
          return
        }

        // My current issued items with product & due date
        const { data, error } = await supabase
          .from('assignments')
          .select('status, issued_at, due_at, items(code, products(name))')
          .eq('user_id', userRecord.id)
          .order('issued_at', { ascending: false })
        if (error) throw error
        const list: MyItem[] = (data || []).map((row: any) => ({
          code: row.items?.code ?? '-',
          product: row.items?.products?.name ?? '-',
          status: row.status === 'issued' ? 'Issued' : 'In Stock',
          issued_at: row.issued_at,
          due_at: row.due_at,
        }))
        setItems(list)
        const myItems = list.filter((i) => i.status === 'Issued').length
        const nowISO = new Date().toISOString()
        const overdue = list.filter((i) => i.status === 'Issued' && i.due_at && i.due_at < nowISO).length
        setStats({ myItems, overdue })
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load your items.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function handleIssue(code: string) {
    if (!profile) {
      setMessage({ type: 'error', text: 'You must be logged in to issue items' })
      return
    }

    setLoadingIssue(true)
    setMessage(null)

    try {
      const due = dueDate ? new Date(dueDate) : undefined
      const result = await issueItem(code, profile.id, due)

      if (result.success) {
        setMessage({ type: 'success', text: `Item "${code}" issued successfully!` })
        setManualCode('')
        setDueDate('')
        setScannerOpen(false)
        // Reload items
        const { data: authUser2 } = await supabase.auth.getUser()
        const email2 = authUser2.user?.email
        if (email2) {
          const { data: userRecord } = await supabase.from('users').select('id').eq('email', email2).maybeSingle()
          if (userRecord) {
            const { data, error } = await supabase
              .from('assignments')
              .select('status, issued_at, due_at, items(code, products(name))')
              .eq('user_id', userRecord.id)
              .order('issued_at', { ascending: false })
            if (!error && data) {
              const list: MyItem[] = data.map((row: any) => ({
                code: row.items?.code ?? '-',
                product: row.items?.products?.name ?? '-',
                status: row.status === 'issued' ? 'Issued' : 'In Stock',
                issued_at: row.issued_at,
                due_at: row.due_at,
              }))
              setItems(list)
              const myItems = list.filter((i) => i.status === 'Issued').length
              const nowISO = new Date().toISOString()
              const overdue = list.filter((i) => i.status === 'Issued' && i.due_at && i.due_at < nowISO).length
              setStats({ myItems, overdue })
            }
          }
        }
      } else {
        setMessage({ type: 'error', text: result.error ?? 'Failed to issue item' })
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message ?? 'Unknown error occurred' })
    } finally {
      setLoadingIssue(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-7xl p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">My Items</h1>
          <div className="flex gap-2">
            <button
              className="px-3 py-2 rounded-md bg-brand text-neutral-950 text-sm font-semibold"
              onClick={() => setScannerOpen(true)}
            >
              Scan to Issue
            </button>
            <button
              className="px-3 py-2 rounded-md border border-neutral-800 text-sm hover:bg-neutral-900"
              onClick={async () => { await signOut(); navigate('/') }}
            >
              Sign out
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`mt-4 p-3 rounded ${
              message.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-950/60 p-4">
          <h2 className="text-sm font-semibold mb-3">Issue New Item</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Item Code</label>
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                placeholder="e.g., SPNA1"
                className="w-full px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 outline-none font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Due Date (Optional)</label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 outline-none text-sm"
              />
            </div>
          </div>
          <button
            onClick={() => handleIssue(manualCode)}
            disabled={!manualCode || loadingIssue}
            className="mt-3 w-full px-4 py-2 rounded-md bg-brand text-neutral-950 text-sm font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingIssue ? 'Issuing...' : 'Issue Item'}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-5"><div className="text-xs text-neutral-400">Currently Issued</div><div className="mt-1 text-2xl font-bold">{stats.myItems}</div></div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-5"><div className="text-xs text-neutral-400">Overdue</div><div className="mt-1 text-2xl font-bold">{stats.overdue}</div></div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Your Recent Activity</h2>
          {loading ? (
            <div className="text-neutral-400">Loading…</div>
          ) : error ? (
            <div className="text-amber-400">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-neutral-400">No records yet.</div>
          ) : (
            <div className="space-y-2 md:hidden">
              {items.map((r, idx) => (
                <div key={idx} className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-sm">{r.code}</div>
                    <span className={`px-2 py-0.5 text-[11px] rounded ${r.status === 'Issued' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'}`}>{r.status}</span>
                  </div>
                  <div className="mt-1 text-sm">{r.product}</div>
                  <div className="mt-1 text-xs text-neutral-400">Issued: {r.issued_at ? new Date(r.issued_at).toLocaleString() : '-'}{r.due_at ? ` • Due: ${new Date(r.due_at).toLocaleString()}` : ''}</div>
                </div>
              ))}
            </div>
          )}

          <div className="hidden md:block overflow-x-auto rounded-lg border border-neutral-800 mt-2">
            <table className="w-full text-sm">
              <thead className="bg-neutral-900/40 text-neutral-300">
                <tr>
                  <th className="text-left px-4 py-2">Code</th>
                  <th className="text-left px-4 py-2">Product</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2">Issued</th>
                  <th className="text-left px-4 py-2">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {items.map((r, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 font-mono">{r.code}</td>
                    <td className="px-4 py-2">{r.product}</td>
                    <td className="px-4 py-2">{r.status}</td>
                    <td className="px-4 py-2">{r.issued_at ? new Date(r.issued_at).toLocaleString() : '-'}</td>
                    <td className="px-4 py-2">{r.due_at ? new Date(r.due_at).toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <BarcodeScanner
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScan={(code) => handleIssue(code)}
        title="Scan Item to Issue"
      />
    </div>
  )
}
