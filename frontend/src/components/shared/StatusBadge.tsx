import './StatusBadge.css'

type Status =
    | 'upcoming'
    | 'ongoing'
    | 'completed'
    | 'cancelled'
    | 'active'
    | 'General'
    | 'VIP'

interface StatusBadgeProps {
    status: Status
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>
    )
}
