import { useState, type FormEvent } from 'react'
import type { Attendee, TicketFormData } from '../../types'

interface TicketFormProps {
    eventId: string
    attendees: Attendee[]
    onSubmit: (data: TicketFormData) => Promise<void>
    onCancel: () => void
}

export default function TicketForm({
    eventId,
    attendees,
    onSubmit,
    onCancel,
}: TicketFormProps) {
    const [search, setSearch] = useState('')
    const [selectedAttendee, setSelectedAttendee] = useState('')
    const [type, setType] = useState<'General' | 'VIP'>('General')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const filtered = attendees.filter(
        (a) =>
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.email.toLowerCase().includes(search.toLowerCase())
    )

    const handle = (e: FormEvent) => {
        e.preventDefault()
        if (!selectedAttendee) {
            setError('Please select an attendee.')
            return
        }
        setError('')
        setLoading(true)
        onSubmit({
            event: eventId,
            attendee: selectedAttendee,
            type,
        })
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))
    }

    return (
        <form className="form" onSubmit={handle}>
            {error && <p className="form-error">{error}</p>}

            <div className="form-field">
                <label className="form-label" htmlFor="tk-search">
                    Search attendee
                </label>
                <input
                    id="tk-search"
                    className="form-input"
                    placeholder="Filter by name or email…"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setSelectedAttendee('')
                    }}
                />
            </div>

            <div className="form-field">
                <label className="form-label" htmlFor="tk-attendee">
                    Attendee
                </label>
                <select
                    id="tk-attendee"
                    className="form-input"
                    required
                    value={selectedAttendee}
                    onChange={(e) => setSelectedAttendee(e.target.value)}
                >
                    <option value="">— select —</option>
                    {filtered.map((a) => (
                        <option key={a._id} value={a._id}>
                            {a.name} ({a.email})
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-field">
                <label className="form-label" htmlFor="tk-type">
                    Ticket type
                </label>
                <select
                    id="tk-type"
                    className="form-input"
                    value={type}
                    onChange={(e) =>
                        setType(e.target.value as 'General' | 'VIP')
                    }
                >
                    <option value="General">General</option>
                    <option value="VIP">VIP</option>
                </select>
            </div>

            <div className="form-actions">
                <button type="button" className="btn-ghost" onClick={onCancel}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Registering…' : 'Register'}
                </button>
            </div>
        </form>
    )
}
