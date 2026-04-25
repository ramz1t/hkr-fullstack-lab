import { useState, type FormEvent } from 'react'
import type { Attendee, AttendeeFormData } from '../../types'

interface AttendeeFormProps {
    initial?: Attendee
    onSubmit: (data: AttendeeFormData) => Promise<void>
    onCancel: () => void
}

export default function AttendeeForm({
    initial,
    onSubmit,
    onCancel,
}: AttendeeFormProps) {
    const [form, setForm] = useState<AttendeeFormData>({
        name: initial?.name ?? '',
        email: initial?.email ?? '',
        phone: initial?.phone ?? '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handle = (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        onSubmit(form)
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))
    }

    return (
        <form className="form" onSubmit={handle}>
            {error && <p className="form-error">{error}</p>}
            <div className="form-field">
                <label className="form-label" htmlFor="at-name">
                    Name
                </label>
                <input
                    id="at-name"
                    className="form-input"
                    required
                    value={form.name}
                    onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                    }
                />
            </div>
            <div className="form-field">
                <label className="form-label" htmlFor="at-email">
                    Email
                </label>
                <input
                    id="at-email"
                    className="form-input"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                    }
                />
            </div>
            <div className="form-field">
                <label className="form-label" htmlFor="at-phone">
                    Phone
                </label>
                <input
                    id="at-phone"
                    className="form-input"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                />
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
                    {loading
                        ? 'Saving…'
                        : initial
                          ? 'Save changes'
                          : 'Add attendee'}
                </button>
            </div>
        </form>
    )
}
