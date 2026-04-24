import { Link } from 'react-router-dom'
import type { Attendee } from '../../types'
import './AttendeeRow.css'

interface AttendeeRowProps {
    attendee: Attendee
    onEdit: (attendee: Attendee) => void
    onDelete: (id: string) => void
}

export default function AttendeeRow({
    attendee,
    onEdit,
    onDelete,
}: AttendeeRowProps) {
    return (
        <tr>
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
                    onClick={() => onEdit(attendee)}
                >
                    Edit
                </button>
                <button
                    className="btn-ghost btn-sm btn-danger"
                    onClick={() => onDelete(attendee._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}
