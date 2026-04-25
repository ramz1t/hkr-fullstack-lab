import { Link, useNavigate } from 'react-router-dom'
import type { Attendee } from '../../types'
import './AttendeeRow.css'

interface AttendeeRowProps {
    attendee: Attendee
    isSelected?: boolean
    onEdit: (attendee: Attendee) => void
    onDelete: (id: string) => void
}

export default function AttendeeRow({
    attendee,
    isSelected,
    onEdit,
    onDelete,
}: AttendeeRowProps) {
    const navigate = useNavigate()
    return (
        <tr
            className={isSelected ? 'selected' : ''}
            onClick={() => navigate(`/attendees/${attendee._id}`)}
            style={{ cursor: 'pointer' }}
        >
            <td>
                <Link to={`/attendees/${attendee._id}`} className="table-link">
                    {attendee.name}
                </Link>
            </td>
            <td>{attendee.email}</td>
            <td>{attendee.phone ?? '—'}</td>
            <td className="table-actions">
                <button
                    className="btn-ghost btn-sm"
                    onClick={(e) => {
                        e.stopPropagation()
                        onEdit(attendee)
                    }}
                >
                    Edit
                </button>
                <button
                    className="btn-ghost btn-sm btn-danger"
                    onClick={(e) => {
                        e.stopPropagation()
                        onDelete(attendee._id)
                    }}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}
