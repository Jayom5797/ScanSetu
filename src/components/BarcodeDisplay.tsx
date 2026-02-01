import Barcode from 'react-barcode'

type BarcodeDisplayProps = {
  code: string
  width?: number
  height?: number
  fontSize?: number
  className?: string
}

export default function BarcodeDisplay({ code, width = 2, height = 50, fontSize = 14, className = '' }: BarcodeDisplayProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Barcode
        value={code}
        format="CODE128"
        width={width}
        height={height}
        fontSize={fontSize}
        displayValue={true}
        background="#ffffff"
        lineColor="#000000"
      />
      <div className="mt-2 font-mono text-xs text-neutral-400">{code}</div>
    </div>
  )
}

