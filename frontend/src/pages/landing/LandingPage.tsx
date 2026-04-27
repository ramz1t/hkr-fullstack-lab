import AuthForm from './AuthForms'
import { useAuth } from '../../store/AuthContext'
import './LandingPage.css'

const stack = [
    { label: 'React 19', detail: 'UI library' },
    { label: 'TypeScript', detail: 'Static typing across the frontend' },
    { label: 'Vite', detail: 'Dev server and production bundler' },
    {
        label: 'React Router v7',
        detail: 'Client-side routing with nested layouts',
    },
    { label: 'Node.js + Express 5', detail: 'REST API server' },
    { label: 'Mongoose 9', detail: 'ODM for schema validation and queries' },
    { label: 'MongoDB Atlas', detail: 'Cloud-hosted database' },
    {
        label: 'Vercel',
        detail: 'Serverless deployment for both frontend and backend',
    },
]

const features = [
    {
        title: '1. Events',
        desc: 'Create, edit, and delete events with title, date, location, capacity and status.',
    },
    {
        title: '2. Attendees',
        desc: 'Manage attendees with name, email and phone.',
    },
    {
        title: '3. Tickets',
        desc: 'Register attendees to events as General or VIP. Cancel registrations individually.',
    },
]

const solutions = [
    {
        title: 'ObjectId validation middleware',
        desc: 'A shared validateId middleware runs before every /:id route and returns 404 immediately if the param is not a valid MongoDB ObjectId — preventing Mongoose CastError 500s.',
    },
    {
        title: 'Structured validation errors',
        desc: 'The central error handler maps Mongoose ValidationError fields to a clean { errors: { field: message } } shape and returns 400. Duplicate-key violations (unique email) are also caught and returned as 400.',
    },
    {
        title: 'Serverless-compatible DB connection',
        desc: 'Mongoose connection is cached on the global object so warm Vercel function instances reuse the existing connection instead of reconnecting on every request.',
    },
]

export default function LandingPage() {
    const { user } = useAuth()
    if (!user) return <AuthForm />
    return (
        <div className="landing">
            <section className="landing-hero">
                <h1 className="landing-title">
                    HKR DA219B VT26 Fullstack Development Lab
                </h1>
            </section>

            <section className="landing-section">
                <h2>Features</h2>
                <div className="landing-grid">
                    {features.map((f) => (
                        <div key={f.title} className="landing-card">
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="landing-section">
                <h2>Tech stack</h2>
                <div className="landing-list">
                    {stack.map((s) => (
                        <div key={s.label} className="landing-list-item">
                            <span className="landing-list-label">
                                {s.label}
                            </span>
                            <span className="landing-list-detail">
                                {s.detail}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="landing-section">
                <h2>Technical solutions</h2>
                <div className="landing-list">
                    {solutions.map((s) => (
                        <div key={s.title} className="landing-list-item">
                            <span className="landing-list-label">
                                {s.title}
                            </span>
                            <span className="landing-list-detail">
                                {s.desc}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
