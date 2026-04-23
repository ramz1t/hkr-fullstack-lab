import { Link } from 'react-router-dom'
import type { Event } from '../../types'
import StatusBadge from '../shared/StatusBadge'
import './EventCard.css'

interface EventCardProps {
    event: Event
    ticketCount?: number
    onEdit: (event: Event) => void
    onDelete: (id: string) => void
}

export default function EventCard({
    event,
    ticketCount,
    onEdit,
    onDelete,
}: EventCardProps) {
    const dateStr = new Date(event.date).toLocaleDateString('en-SE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })

    return (
        <div className="event-card">
            <div className="event-card-header">
                <StatusBadge status={event.status} />
                <div className="event-card-actions">
                    <button className="btn-ghost" onClick={() => onEdit(event)}>
                        Edit
                    </button>
                    <button
                        className="btn-ghost btn-danger"
                        onClick={() => onDelete(event._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <Link to={`/events/${event._id}`} className="event-card-title">
                {event.title}
            </Link>
            {event.description && (
                <p className="event-card-desc">{event.description}</p>
            )}
            <div className="event-card-meta">
                {event.location && <span>{event.location}</span>}
                <span>{dateStr}</span>
                {event.capacity != null && (
                    <span>Capacity: {event.capacity}</span>
                )}
                {ticketCount != null && <span>{ticketCount} tickets</span>}
            </div>
        </div>
    )
}
