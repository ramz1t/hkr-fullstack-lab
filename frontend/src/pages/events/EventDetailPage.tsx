import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Event, Ticket, Attendee, TicketFormData } from '../../types'
import { getEvent } from '../../services/events'
import { getEventTickets } from '../../services/events'
import { getAttendees } from '../../services/attendees'
import { createTicket, updateTicket } from '../../services/tickets'
import StatusBadge from '../../components/shared/StatusBadge'
import Modal from '../../components/shared/Modal'
import EmptyState from '../../components/shared/EmptyState'
import TicketRow from '../../components/tickets/TicketRow'
import TicketForm from '../../components/tickets/TicketForm'
import '../Page.css'

export default function EventDetailPage() {
    const { id } = useParams<{ id: string }>()
    const [event, setEvent] = useState<Event | null>(null)
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [attendees, setAttendees] = useState<Attendee[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const load = useCallback(() => {
        if (!id) return
        setLoading(true)
        Promise.all([getEvent(id), getEventTickets(id), getAttendees()])
            .then(([ev, tix, atts]) => {
                setEvent(ev)
                setTickets(tix)
                setAttendees(atts)
            })
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    useEffect(() => {
        load()
    }, [load])

    const handleRegister = async (data: TicketFormData) => {
        const ticket = await createTicket(data)
        const att = attendees.find((a) => a._id === data.attendee)
        setTickets((prev) => [
            ...prev,
            {
                ...ticket,
                attendee: att ?? data.attendee,
                event: event ?? data.event,
            },
        ])
        setModalOpen(false)
    }

    const handleCancel = async (ticketId: string) => {
        if (!confirm('Cancel this ticket?')) return
        const updated = await updateTicket(ticketId, { status: 'cancelled' })
        setTickets((prev) =>
            prev.map((t) => (t._id === updated._id ? updated : t))
        )
    }

    if (loading) return <p className="page-loading">Loading…</p>
    if (error) return <p className="page-error">{error}</p>
    if (!event) return null

    const dateStr = new Date(event.date).toLocaleDateString('en-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })

    return (
        <div>
            <div className="page-header">
                <Link to="/events" className="back-link">
                    {'<'} Events
                </Link>
            </div>

            <div className="detail-hero">
                <StatusBadge status={event.status} />
                <h1 className="page-title">{event.title}</h1>
                {event.description && (
                    <p className="detail-desc">{event.description}</p>
                )}
                <div className="detail-meta">
                    <span>{dateStr}</span>
                    {event.location && <span>{event.location}</span>}
                    {event.capacity != null && (
                        <span>Capacity: {event.capacity}</span>
                    )}
                </div>
            </div>

            <div className="section-header">
                <h2 className="section-title">
                    Registered Attendees ({tickets.length})
                </h2>
                <button
                    className="btn-primary"
                    onClick={() => setModalOpen(true)}
                >
                    + Register Attendee
                </button>
            </div>

            {tickets.length === 0 ? (
                <EmptyState message="No attendees registered yet." />
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Attendee</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <TicketRow
                                key={ticket._id}
                                ticket={ticket}
                                onCancel={handleCancel}
                            />
                        ))}
                    </tbody>
                </table>
            )}

            {modalOpen && (
                <Modal
                    title="Register Attendee"
                    onClose={() => setModalOpen(false)}
                >
                    <TicketForm
                        eventId={id!}
                        attendees={attendees}
                        onSubmit={handleRegister}
                        onCancel={() => setModalOpen(false)}
                    />
                </Modal>
            )}
        </div>
    )
}
