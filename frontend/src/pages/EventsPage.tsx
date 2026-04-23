import { useState, useEffect, useCallback } from 'react'
import type { Event, EventFormData } from '../types'
import {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} from '../services/events'
import EventCard from '../components/events/EventCard'
import EventForm from '../components/events/EventForm'
import Modal from '../components/shared/Modal'
import EmptyState from '../components/shared/EmptyState'
import './Page.css'

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState<Event | null>(null)

    const load = useCallback(() => {
        setLoading(true)
        getEvents()
            .then(setEvents)
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        load()
    }, [load])

    const handleSubmit = async (data: EventFormData) => {
        if (editing) {
            const updated = await updateEvent(editing._id, data)
            setEvents((prev) =>
                prev.map((e) => (e._id === updated._id ? updated : e))
            )
        } else {
            const created = await createEvent(data)
            setEvents((prev) => [...prev, created])
        }
        setModalOpen(false)
        setEditing(null)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this event?')) return
        await deleteEvent(id)
        setEvents((prev) => prev.filter((e) => e._id !== id))
    }

    const openCreate = () => {
        setEditing(null)
        setModalOpen(true)
    }
    const openEdit = (event: Event) => {
        setEditing(event)
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
        setEditing(null)
    }

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Events</h1>
                <button className="btn-primary" onClick={openCreate}>
                    + New Event
                </button>
            </div>

            {loading && <p className="page-loading">Loading…</p>}
            {error && <p className="page-error">{error}</p>}

            {!loading && !error && events.length === 0 && (
                <EmptyState message="No events yet. Create your first one!" />
            )}

            <div className="card-grid">
                {events.map((event) => (
                    <EventCard
                        key={event._id}
                        event={event}
                        onEdit={openEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {modalOpen && (
                <Modal
                    title={editing ? 'Edit Event' : 'New Event'}
                    onClose={closeModal}
                >
                    <EventForm
                        initial={editing ?? undefined}
                        onSubmit={handleSubmit}
                        onCancel={closeModal}
                    />
                </Modal>
            )}
        </div>
    )
}
