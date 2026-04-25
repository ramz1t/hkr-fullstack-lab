import { Link, useNavigate } from 'react-router-dom'
import type { Event } from '../../types'
import StatusBadge from '../shared/StatusBadge'
import './EventCard.css'

interface EventCardProps {
    event: Event
    ticketCount?: number
    isSelected?: boolean
}

export default function EventCard({
    event,
    ticketCount,
    isSelected,
}: EventCardProps) {
    const navigate = useNavigate()
    const dateStr = new Date(event.date).toLocaleDateString('en-SE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })

    return (
        <div
            className={`event-card${isSelected ? ' selected' : ''}`}
            onClick={() => navigate(`/events/${event._id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
                e.key === 'Enter' && navigate(`/events/${event._id}`)
            }
        >
            <div className="event-card-header">
                <StatusBadge status={event.status} />
            </div>
            <Link to={`/events/${event._id}`} className="event-card-title">
                {event.title}
            </Link>
            <p className="event-card-desc">{event.description}</p>
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
