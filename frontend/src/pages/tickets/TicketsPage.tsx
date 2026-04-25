import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Attendee, Event } from '../../types'
import { getTickets, updateTicket } from '../../services/tickets'
import { useStore } from '../../store/StoreContext'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'
import '../Page.css'

export default function TicketsPage() {
    const { tickets } = useStore()
    const [error, setError] = useState('')

    useEffect(() => {
        getTickets()
            .then(tickets.set)
            .catch((err: Error) => setError(err.message))
            .finally(() => tickets.setLoading(false))
    }, [])

    const handleCancel = async (id: string) => {
        if (!confirm('Cancel this ticket?')) return
        const updated = await updateTicket(id, { status: 'cancelled' })
        tickets.set(
            tickets.data.map((t) => (t._id === updated._id ? updated : t))
        )
    }

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">
                    All Tickets ({tickets.data.length})
                </h1>
            </div>

            {tickets.isLoading && <p className="page-loading">Loading…</p>}
            {error && <p className="page-error">{error}</p>}

            {!tickets.isLoading && !error && tickets.data.length === 0 && (
                <EmptyState message="No tickets yet. Register attendees from an event page." />
            )}

            {tickets.data.length > 0 && (
                <div className="table-wrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Attendee</th>
                                <th>Event</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.data.map((ticket) => {
                                const attendee = ticket.attendee as Attendee
                                const event = ticket.event as Event
                                return (
                                    <tr key={ticket._id}>
                                        <td>{ticket._id}</td>
                                        <td>
                                            {attendee?._id ? (
                                                <Link
                                                    to={`/attendees/${attendee._id}`}
                                                    className="table-link"
                                                >
                                                    {attendee.name}
                                                </Link>
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                        <td>
                                            {event?._id ? (
                                                <Link
                                                    to={`/events/${event._id}`}
                                                    className="table-link"
                                                >
                                                    {event.title}
                                                </Link>
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                        <td>
                                            <StatusBadge status={ticket.type} />
                                        </td>
                                        <td>
                                            <StatusBadge
                                                status={ticket.status}
                                            />
                                        </td>
                                        <td className="table-actions">
                                            {ticket.status === 'active' && (
                                                <button
                                                    className="btn-ghost btn-sm btn-danger"
                                                    onClick={() =>
                                                        handleCancel(ticket._id)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
