import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Attendee, Ticket, Event } from '../types'
import { getAttendee, getAttendeeTickets } from '../services/attendees'
import StatusBadge from '../components/shared/StatusBadge'
import EmptyState from '../components/shared/EmptyState'
import './Page.css'

export default function AttendeeDetailPage() {
    const { id } = useParams<{ id: string }>()
    const [attendee, setAttendee] = useState<Attendee | null>(null)
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const load = useCallback(() => {
        if (!id) return
        setLoading(true)
        Promise.all([getAttendee(id), getAttendeeTickets(id)])
            .then(([att, tix]) => {
                setAttendee(att)
                setTickets(tix)
            })
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    useEffect(() => {
        load()
    }, [load])

    if (loading) return <p className="page-loading">Loading…</p>
    if (error) return <p className="page-error">{error}</p>
    if (!attendee) return null

    return (
        <div>
            <div className="page-header">
                <Link to="/attendees" className="back-link">
                    {'<'} Attendees
                </Link>
            </div>

            <div className="detail-hero">
                <h1 className="page-title">{attendee.name}</h1>
                <div className="detail-meta">
                    <span>{attendee.email}</span>
                    {attendee.phone && <span>{attendee.phone}</span>}
                </div>
            </div>

            <div className="section-header">
                <h2 className="section-title">
                    Ticket History ({tickets.length})
                </h2>
            </div>

            {tickets.length === 0 ? (
                <EmptyState message="No tickets registered yet." />
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => {
                            const ev = ticket.event as Event
                            const dateStr = ev?.date
                                ? new Date(ev.date).toLocaleDateString(
                                      'en-SE',
                                      {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric',
                                      }
                                  )
                                : '—'
                            return (
                                <tr key={ticket._id}>
                                    <td>
                                        {ev?._id ? (
                                            <Link
                                                to={`/events/${ev._id}`}
                                                className="table-link"
                                            >
                                                {ev.title}
                                            </Link>
                                        ) : (
                                            '—'
                                        )}
                                    </td>
                                    <td>{dateStr}</td>
                                    <td>
                                        <StatusBadge status={ticket.type} />
                                    </td>
                                    <td>
                                        <StatusBadge status={ticket.status} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}
