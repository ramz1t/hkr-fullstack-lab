import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import { login, register } from '../../services/auth'
import './AuthForms.css'

export default function AuthForm() {
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = (location.state as { from?: string } | null)?.from ?? '/events'
    const [tab, setTab] = useState<'login' | 'register'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const fn = tab === 'login' ? login : register
            const data = await fn(email, password)
            signIn(data.user, data.token)
            navigate(from, { replace: true })
        } catch (err: unknown) {
            setError(
                err instanceof Error ? err.message : 'Something went wrong'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="landing">
            <section className="landing-hero">
                <h1 className="landing-title">
                    HKR DA219B VT26 Fullstack Development Lab
                </h1>
            </section>

            <section className="landing-section">
                <div className="auth-box">
                    <div className="auth-tabs">
                        <button
                            className={`auth-tab${tab === 'login' ? ' active' : ''}`}
                            onClick={() => {
                                setTab('login')
                                setError('')
                            }}
                            type="button"
                        >
                            Login
                        </button>
                        <button
                            className={`auth-tab${tab === 'register' ? ' active' : ''}`}
                            onClick={() => {
                                setTab('register')
                                setError('')
                            }}
                            type="button"
                        >
                            Register
                        </button>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="auth-email">Email</label>
                            <input
                                id="auth-email"
                                className="form-input"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="auth-password">Password</label>
                            <input
                                id="auth-password"
                                className="form-input"
                                type="password"
                                required
                                autoComplete={
                                    tab === 'login'
                                        ? 'current-password'
                                        : 'new-password'
                                }
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="form-error">{error}</p>}
                        <button
                            className="btn-primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? 'Please wait…'
                                : tab === 'login'
                                  ? 'Login'
                                  : 'Create account'}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}
