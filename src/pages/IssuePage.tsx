import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { issueItem } from '../lib/inventoryUtils'
import BarcodeScanner from '../components/BarcodeScanner'
import { supabase } from '../lib/supabaseClient'

export default function IssuePage() {
  const { user } = useAuth()
  const [scannerOpen, setScannerOpen] = useState(false)
  const [manualCode, setManualCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [dueDate, setDueDate] = useState('')

  async function handleIssue(code: string) {
    if (!user) {
      setMessage({ type: 'error', text: 'You must be logged in to issue items' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      // Find the user's record in users table
      const { data: userRecord } = await supabase
        .from('users')
        .select('id')
        .eq('auth_user_id', user.id)
        .maybeSingle()

      if (!userRecord) {
        setMessage({ type: 'error', text: 'User record not found. Please contact administrator.' })
        setLoading(false)
        return
      }

      const due = dueDate ? new Date(dueDate) : undefined
      const result = await issueItem(code, user.id, due)

      if (result.success) {
        setMessage({ type: 'success', text: `Item "${code}" issued successfully!` })
        setManualCode('')
        setDueDate('')
        // Close scanner if open
        setScannerOpen(false)
      } else {
        setMessage({ type: 'error', text: result.error ?? 'Failed to issue item' })
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message ?? 'Unknown error occurred' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Issue Item</h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-6">
            <h2 className="text-lg font-semibold mb-4">Scan Barcode</h2>
            <p className="text-sm text-neutral-400 mb-4">Use your camera to scan the item barcode</p>
            <button
              onClick={() => setScannerOpen(true)}
              className="w-full px-4 py-3 rounded-md bg-brand text-neutral-950 font-semibold hover:opacity-90"
            >
              Open Camera Scanner
            </button>
          </div>

          <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-6">
            <h2 className="text-lg font-semibold mb-4">Manual Entry</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-300 mb-2">Item Code</label>
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                  placeholder="e.g., SPNA1"
                  className="w-full px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-2">Due Date (Optional)</label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 outline-none"
                />
              </div>
              <button
                onClick={() => handleIssue(manualCode)}
                disabled={!manualCode || loading}
                className="w-full px-4 py-3 rounded-md bg-brand text-neutral-950 font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Issuing...' : 'Issue Item'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-950/60 p-6">
          <h2 className="text-lg font-semibold mb-4">USB Barcode Scanner</h2>
          <p className="text-sm text-neutral-400 mb-4">
            Connect a USB barcode scanner and scan directly into the manual entry field above. The scanner will automatically
            enter the code.
          </p>
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

