import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    type ReactNode,
} from 'react'
import type { User } from '../types'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

interface AuthState {
    user: User | null
    token: string | null
}

interface AuthContextValue extends AuthState {
    signIn: (user: User, token: string) => void
    signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadInitial(): AuthState {
    try {
        const token = localStorage.getItem(TOKEN_KEY)
        const raw = localStorage.getItem(USER_KEY)
        if (token && raw) return { token, user: JSON.parse(raw) as User }
    } catch {
        // ignore corrupted storage
    }
    return { token: null, user: null }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>(loadInitial)

    const signIn = useCallback((user: User, token: string) => {
        localStorage.setItem(TOKEN_KEY, token)
        localStorage.setItem(USER_KEY, JSON.stringify(user))
        setState({ user, token })
    }, [])

    const signOut = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        setState({ user: null, token: null })
    }, [])

    const value = useMemo(
        () => ({ ...state, signIn, signOut }),
        [state, signIn, signOut]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
