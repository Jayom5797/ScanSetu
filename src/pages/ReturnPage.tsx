import { useState } from 'react'
import { returnItem } from '../lib/inventoryUtils'
import BarcodeScanner from '../components/BarcodeScanner'

export default function ReturnPage() {
  const [scannerOpen, setScannerOpen] = useState(false)
  const [manualCode, setManualCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleReturn(code: string) {
    setLoading(true)
    setMessage(null)

    try {
      const result = await returnItem(code)

      if (result.success) {
        setMessage({ type: 'success', text: `Item "${code}" returned to stock successfully!` })
        setManualCode('')
        setScannerOpen(false)
      } else {
        setMessage({ type: 'error', text: result.error ?? 'Failed to return item' })
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
        <h1 className="text-2xl font-bold mb-6">Return Item</h1>

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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && manualCode && !loading) {
                      handleReturn(manualCode)
                    }
                  }}
                  placeholder="e.g., SPNA1"
                  className="w-full px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 outline-none font-mono"
                  autoFocus
                />
              </div>
              <button
                onClick={() => handleReturn(manualCode)}
                disabled={!manualCode || loading}
                className="w-full px-4 py-3 rounded-md bg-brand text-neutral-950 font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Returning...' : 'Return Item'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-950/60 p-6">
          <h2 className="text-lg font-semibold mb-4">USB Barcode Scanner</h2>
          <p className="text-sm text-neutral-400 mb-4">
            Connect a USB barcode scanner and scan directly into the manual entry field above. Press Enter or click the button to
            return the item.
          </p>
        </div>
      </div>

      <BarcodeScanner
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScan={(code) => handleReturn(code)}
        title="Scan Item to Return"
      />
    </div>
  )
}

