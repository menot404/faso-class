export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  columns?: { key: keyof T; label: string }[]
) {
  if (!data.length) return

  const headers = columns
    ? columns.map((col) => col.label)
    : Object.keys(data[0])

  const rows = data.map((item) =>
    headers
      .map((header) => {
        const key = columns?.find((col) => col.label === header)?.key || header
        return item[key] ?? ''
      })
      .join(',')
  )

  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Génère un blob CSV et retourne son URL.
 * @param data - Tableau d'objets
 * @param columns - Définition des colonnes (key et label)
 * @returns URL du blob CSV
 */
export function generateCSVBlob<T extends Record<string, unknown>>(
  data: T[],
  columns: { key: keyof T; label: string }[]
): string {
  const headers = columns.map(col => col.label)
  const rows = data.map(item =>
    columns.map(col => item[col.key]?.toString() ?? '').join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  return URL.createObjectURL(blob)
}