// Utility functions for barcode operations

/**
 * Generate a barcode code for an item based on product SKU and index
 * Format: {sku}{index} (e.g., SPN-A1, SPN-A2, etc.)
 */
export function generateItemCode(sku: string, index: number): string {
  // Remove any non-alphanumeric characters from SKU for cleaner codes
  const cleanSku = sku.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
  return `${cleanSku}${index}`
}

/**
 * Generate multiple item codes for a product
 */
export function generateItemCodes(sku: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => generateItemCode(sku, i + 1))
}

/**
 * Parse barcode to extract product SKU and item number
 * Returns null if format is invalid
 */
export function parseItemCode(code: string): { sku: string; index: number } | null {
  // Try to match pattern like "SPNA1" or "SPN-A1"
  const match = code.match(/^([A-Z0-9]+)(\d+)$/i)
  if (!match) return null

  const [, skuPart, indexPart] = match
  const index = parseInt(indexPart, 10)
  if (isNaN(index) || index < 1) return null

  return { sku: skuPart, index }
}

