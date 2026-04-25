import { useState, useEffect, useRef } from 'react'
import { Outlet, useMatch } from 'react-router-dom'
import type { EventFormData } from '../../types'
import { getEvents, createEvent } from '../../services/events'
import { useStore } from '../../store/StoreContext'
import EventCard from '../../components/events/EventCard'
import EventForm from '../../components/events/EventForm'
import Modal from '../../components/shared/Modal'
import EmptyState from '../../components/shared/EmptyState'
import '../Page.css'

const EVENT_STATUSES = [
    'upcoming',
    'ongoing',
    'completed',
    'cancelled',
] as const

export default function EventsPage() {
    const { events } = useStore()
    const match = useMatch('/events/:id')
    const selectedId = match?.params?.id
    const [error, setError] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const fetchEvents = (q: { search: string; status: string }) => {
        events.setLoading(true)
        getEvents({
            search: q.search || undefined,
            status: q.status || undefined,
        })
            .then(events.set)
            .catch((err: Error) => setError(err.message))
            .finally(() => events.setLoading(false))
    }

    useEffect(() => {
        fetchEvents({ search, status })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearchChange = (value: string) => {
        setSearch(value)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            fetchEvents({ search: value, status })
        }, 350)
    }

    const handleStatusChange = (value: string) => {
        setStatus(value)
        fetchEvents({ search, status: value })
    }

    const handleSubmit = async (data: EventFormData) => {
        const created = await createEvent(data)
        events.set([...events.data, created])
        setModalOpen(false)
    }

    const openCreate = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Events ({events.data.length})</h1>
                <button className="btn-primary" onClick={openCreate}>
                    New Event
                </button>
            </div>

            <div className="filter-bar">
                <input
                    className="form-input filter-search"
                    type="search"
                    placeholder="Search events…"
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
                <select
                    className="form-input filter-status"
                    value={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                >
                    <option value="">All statuses</option>
                    {EVENT_STATUSES.map((s) => (
                        <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div className={`split-layout${selectedId ? ' has-detail' : ''}`}>
                <div className="split-list">
                    {events.isLoading ? (
                        <p className="page-loading">Loading…</p>
                    ) : error ? (
                        <p className="page-error">{error}</p>
                    ) : events.data.length === 0 ? (
                        <EmptyState message="No events yet. Create your first one!" />
                    ) : (
                        <div className="card-grid">
                            {events.data.map((event) => (
                                <EventCard
                                    key={event._id}
                                    event={event}
                                    isSelected={event._id === selectedId}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="split-detail">
                    <Outlet />
                </div>
            </div>

            {modalOpen && (
                <Modal title="New Event" onClose={closeModal}>
                    <EventForm onSubmit={handleSubmit} onCancel={closeModal} />
                </Modal>
            )}
        </div>
    )
}
