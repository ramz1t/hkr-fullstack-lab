import { useNavigate } from 'react-router-dom'
import type { Attendee } from '../../types'
import './AttendeeRow.css'

interface AttendeeRowProps {
    attendee: Attendee
    isSelected?: boolean
}

export default function AttendeeRow({
    attendee,
    isSelected,
}: AttendeeRowProps) {
    const navigate = useNavigate()
    return (
        <tr
            className={isSelected ? 'selected' : ''}
            onClick={() => navigate(`/attendees/${attendee._id}`)}
            style={{ cursor: 'pointer' }}
        >
            <td>{attendee.name}</td>
            <td>{attendee.email}</td>
            <td>{attendee.phone ?? '—'}</td>
        </tr>
    )
}
