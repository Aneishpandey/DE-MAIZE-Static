export async function adminFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error ?? 'Request failed')
  }
  return data as T
}

export async function adminDelete(url: string) {
  return adminFetch<{ success: boolean }>(url, { method: 'DELETE' })
}
