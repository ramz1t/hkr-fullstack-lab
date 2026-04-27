const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const TOKEN_KEY = 'auth_token'

interface ApiResponse<T> {
    success: boolean
    data: T
    message?: string
}

interface ApiFetchOptions extends RequestInit {
    params?: Record<string, string | undefined>
}

export async function apiFetch<T>(
    path: string,
    options?: ApiFetchOptions
): Promise<T> {
    const { params, ...init } = options ?? {}
    let url = `${BASE_URL}${path}`
    if (params) {
        const qs = new URLSearchParams(
            Object.entries(params).filter(
                (e): e is [string, string] => e[1] !== undefined
            )
        ).toString()
        if (qs) url += `?${qs}`
    }
    const token = localStorage.getItem(TOKEN_KEY)
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...init.headers,
        },
        ...init,
    })

    const json: ApiResponse<T> = await res.json()

    if (!res.ok) {
        throw new Error(json.message ?? `Request failed: ${res.status}`)
    }

    return json.data
}
