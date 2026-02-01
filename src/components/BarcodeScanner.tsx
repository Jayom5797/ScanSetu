import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'

type BarcodeScannerProps = {
  open: boolean
  onClose: () => void
  onScan: (code: string) => void
  title?: string
}

export default function BarcodeScanner({ open, onClose, onScan, title = 'Scan Barcode' }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null)
  const [error, setError] = useState('')
  const [scanning, setScanning] = useState(false)
  const scanIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (!open) {
      // Cleanup when closed
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current)
        scanIntervalRef.current = null
      }
      if (codeReaderRef.current) {
        codeReaderRef.current.reset()
        codeReaderRef.current = null
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
      return
    }

    // Initialize scanner
    const codeReader = new BrowserMultiFormatReader()
    codeReaderRef.current = codeReader

    async function startScanning() {
      try {
        setError('')
        if (!('mediaDevices' in navigator) || !navigator.mediaDevices?.getUserMedia) {
          setError('Camera API not available. Please use a modern browser with camera support.')
          return
        }
        if (!window.isSecureContext) {
          setError('Camera requires HTTPS or localhost. Current protocol: ' + window.location.protocol)
          return
        }

        const videoInputDevices = await codeReader.listVideoInputDevices()
        const deviceId = videoInputDevices.length > 0 ? videoInputDevices[0].deviceId : undefined

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            deviceId: deviceId ? { exact: deviceId } : undefined,
          },
          audio: false,
        })

        streamRef.current = stream

        // Attach stream to video element
        const video = videoRef.current
        if (video) {
          video.srcObject = stream
          await video.play()
          setScanning(true)

          // Start continuous scanning
          const scanCallback = (result: any, err: any) => {
            if (result) {
              const code = result.getText()
              if (code) {
                onScan(code)
                // Stop scanning after successful scan
                setScanning(false)
                if (codeReaderRef.current) {
                  codeReaderRef.current.reset()
                }
                if (scanIntervalRef.current) {
                  clearInterval(scanIntervalRef.current)
                  scanIntervalRef.current = null
                }
              }
            } else if (err && !(err instanceof NotFoundException)) {
              // NotFoundException is normal when no barcode is found
              // Only log actual errors
            }
          }

          // Start decoding from video device
          codeReaderRef.current.decodeFromVideoDevice(deviceId, video, scanCallback)
        }
      } catch (err: any) {
        setError(`Camera access failed: ${err?.message ?? String(err)}`)
        setScanning(false)
      }
    }

    startScanning()

    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current)
        scanIntervalRef.current = null
      }
      if (codeReaderRef.current) {
        codeReaderRef.current.reset()
        codeReaderRef.current = null
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
    }
  }, [open, onScan])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 w-screen h-screen md:w-[95vw] md:h-auto md:max-w-2xl rounded-none md:rounded-lg border border-neutral-800 bg-neutral-950 p-0 md:p-4">
        <div className="flex items-center justify-between p-4 md:p-0 md:pb-4">
          <h3 className="font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 hover:bg-neutral-900"
            aria-label="Close Scanner"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-neutral-300">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {error ? (
          <div className="p-4 md:p-0">
            <div className="text-sm text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded p-3">{error}</div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setError('')} className="px-3 py-2 rounded-md bg-brand text-neutral-950 text-sm font-semibold">
                Retry
              </button>
              <button onClick={onClose} className="px-3 py-2 rounded-md border border-neutral-800 text-sm">
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 md:p-0">
            <div className="relative aspect-[3/4] sm:aspect-video w-full overflow-hidden rounded-none md:rounded-md border border-neutral-800 bg-black">
              <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" autoPlay muted playsInline />
              {/* Scanner overlay */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
                <div className="absolute inset-10 sm:inset-16 rounded-md border-2 border-brand/60" />
                <div className="absolute inset-10 sm:inset-16">
                  <div className="absolute -top-1 -left-1 h-6 w-6 border-t-2 border-l-2 border-brand" />
                  <div className="absolute -top-1 -right-1 h-6 w-6 border-t-2 border-r-2 border-brand" />
                  <div className="absolute -bottom-1 -left-1 h-6 w-6 border-b-2 border-l-2 border-brand" />
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 border-b-2 border-r-2 border-brand" />
                </div>
                {scanning && (
                  <div className="absolute left-10 right-10 sm:left-16 sm:right-16">
                    <div className="h-[2px] bg-brand/80 shadow-[0_0_15px_rgba(34,211,238,0.6)] animate-[scan_2.2s_linear_infinite]" />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 text-xs text-neutral-400 p-4 md:p-0">
              Align the barcode within the frame. Scanning automatically...
            </div>
            <style>{`@keyframes scan { 0% { transform: translateY(12%); } 50% { transform: translateY(85%); } 100% { transform: translateY(12%); } }`}</style>
          </div>
        )}
        <div className="mt-4 flex justify-end gap-2 p-4 md:p-0">
          <button onClick={onClose} className="px-3 py-2 rounded-md border border-neutral-800 text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

