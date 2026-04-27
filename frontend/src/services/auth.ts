import { apiFetch } from './api'
import type { User } from '../types'

interface AuthData {
    token: string
    user: User
}

export const login = (email: string, password: string) =>
    apiFetch<AuthData>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })

export const register = (email: string, password: string) =>
    apiFetch<AuthData>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })
