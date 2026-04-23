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
            <label className="form-label">
                Title *
                <input
                    className="form-input"
                    required
                    value={form.title}
                    onChange={(e) =>
                        setForm((f) => ({ ...f, title: e.target.value }))
                    }
                />
            </label>
            <label className="form-label">
                Description
                <textarea
                    className="form-input"
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                        setForm((f) => ({ ...f, description: e.target.value }))
                    }
                />
            </label>
            <label className="form-label">
                Date *
                <input
                    className="form-input"
                    type="datetime-local"
                    required
                    value={form.date}
                    onChange={(e) =>
                        setForm((f) => ({ ...f, date: e.target.value }))
                    }
                />
            </label>
            <label className="form-label">
                Location
                <input
                    className="form-input"
                    value={form.location}
                    onChange={(e) =>
                        setForm((f) => ({ ...f, location: e.target.value }))
                    }
                />
            </label>
            <label className="form-label">
                Capacity
                <input
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
            </label>
            <label className="form-label">
                Status
                <select
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
            </label>
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
