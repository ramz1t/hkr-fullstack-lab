import { Link } from 'react-router-dom'
import type { Ticket, Attendee } from '../../types'
import StatusBadge from '../shared/StatusBadge'

interface TicketRowProps {
    ticket: Ticket
    onCancel: (id: string) => void
    onDelete: (id: string) => void
}

export default function TicketRow({
    ticket,
    onCancel,
    onDelete,
}: TicketRowProps) {
    const attendee = ticket.attendee as Attendee

    return (
        <tr>
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
                {attendee?.email && (
                    <span
                        style={{
                            display: 'block',
                            fontSize: '12px',
                            color: 'var(--text)',
                        }}
                    >
                        {attendee.email}
                    </span>
                )}
            </td>
            <td>
                <StatusBadge status={ticket.type} />
            </td>
            <td>
                <StatusBadge status={ticket.status} />
            </td>
            <td className="table-actions">
                {ticket.status === 'active' && (
                    <button
                        className="btn-ghost btn-sm btn-danger"
                        onClick={() => onCancel(ticket._id)}
                    >
                        Cancel
                    </button>
                )}
                <button
                    className="btn-ghost btn-sm btn-danger"
                    onClick={() => onDelete(ticket._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}
