import { useState, type FormEvent } from 'react'
import type { Event, EventFormData } from '../../types'
import './EventForm.css'

interface EventFormProps {
    initial?: Event
    onSubmit: (data: EventFormData) => Promise<void>
    onCancel: () => void
}

const STATUSES = ['upcoming', 'ongoing', 'completed', 'cancelled'] as const

export default function EventForm({
    initial,
    onSubmit,
    onCancel,
}: EventFormProps) {
    const [form, setForm] = useState<EventFormData>({
        title: initial?.title ?? '',
        description: initial?.description ?? '',
        date: initial?.date ? initial.date.slice(0, 16) : '',
        location: initial?.location ?? '',
        capacity: initial?.capacity ?? ('' as unknown as number),
        status: initial?.status ?? 'upcoming',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handle = (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        onSubmit({
            ...form,
            capacity: form.capacity ? Number(form.capacity) : undefined,
        })
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))
    }

    return (
        <form className="form" onSubmit={handle}>
            {error && <p className="form-error">{error}</p>}
            <div className="form-field">
                <label className="form-label" htmlFor="ev-title">
                    Title
                </label>
                <input
                    id="ev-title"
                    className="form-input"
                    required
                    value={form.title}
                    onChange={(e) =>
                        setForm((f) => ({ ...f, title: e.target.value }))
                    }
                />
            </div>
            <div className="form-field">
                <label className="form-label" htmlFor="ev-description">
                    Description
                </label>
                <textarea
                    id="ev-description"
                    className="form-input"
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                        setForm((f) => ({ ...f, description: e.target.value }))
                    }
                />
            </div>
            <div className="form-field">
                <label className="form-label" htmlFor="ev-date">
                    Date
                </label>
                <input
                    id="ev-date"
                    className="form-input"
                    type="datetime-local"
                    required
                    value={form.date}
                    onChange={(e) =>
                        setForm((f) => ({ ...f, date: e.target.value }))
                    }
                />
            </div>
            <div className="form-field">
                <label className="form-label" htmlFor="ev-location">
                    Location
                </label>
                <input
                    id="ev-location"
                    className="form-input"
                    value={form.location}
                    onChange={(e) =>
                        setForm((f) => ({ ...f, location: e.target.value }))
                    }
                />
            </div>
            <div className="form-field">
                <label className="form-label" htmlFor="ev-capacity">
                    Capacity
                </label>
                <input
                    id="ev-capacity"
                    className="form-input"
                    type="number"
                    min={0}
                    value={form.capacity ?? ''}
                    onChange={(e) =>
                        setForm((f) => ({
                            ...f,
                            capacity: e.target.value as unknown as number,
                        }))
                    }
                />
            </div>
            <div className="form-field">
                <label className="form-label" htmlFor="ev-status">
                    Status
                </label>
                <select
                    id="ev-status"
                    className="form-input"
                    value={form.status}
                    onChange={(e) =>
                        setForm((f) => ({
                            ...f,
                            status: e.target.value as EventFormData['status'],
                        }))
                    }
                >
                    {STATUSES.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
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
                    {loading
                        ? 'Saving…'
                        : initial
                          ? 'Save changes'
                          : 'Create event'}
                </button>
            </div>
        </form>
    )
}
