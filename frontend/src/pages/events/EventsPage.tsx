import { useState, useEffect } from 'react'
import type { Event, EventFormData } from '../../types'
import {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} from '../../services/events'
import { useStore } from '../../store/StoreContext'
import EventCard from '../../components/events/EventCard'
import EventForm from '../../components/events/EventForm'
import Modal from '../../components/shared/Modal'
import EmptyState from '../../components/shared/EmptyState'
import '../Page.css'

export default function EventsPage() {
    const { events } = useStore()
    const [error, setError] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState<Event | null>(null)

    useEffect(() => {
        getEvents()
            .then(events.set)
            .catch((err: Error) => setError(err.message))
            .finally(() => events.setLoading(false))
    }, [])

    const handleSubmit = async (data: EventFormData) => {
        if (editing) {
            const updated = await updateEvent(editing._id, data)
            events.set(
                events.data.map((e) => (e._id === updated._id ? updated : e))
            )
        } else {
            const created = await createEvent(data)
            events.set([...events.data, created])
        }
        setModalOpen(false)
        setEditing(null)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this event?')) return
        await deleteEvent(id)
        events.set(events.data.filter((e) => e._id !== id))
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

            {events.isLoading && <p className="page-loading">Loading…</p>}
            {error && <p className="page-error">{error}</p>}

            {!events.isLoading && !error && events.data.length === 0 && (
                <EmptyState message="No events yet. Create your first one!" />
            )}

            <div className="card-grid">
                {events.data.map((event) => (
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
