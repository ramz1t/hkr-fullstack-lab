const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

interface ApiResponse<T> {
    success: boolean
    data: T
    message?: string
}

export async function apiFetch<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    })

    const json: ApiResponse<T> = await res.json()

    if (!res.ok) {
        throw new Error(json.message ?? `Request failed: ${res.status}`)
    }

    return json.data
}
