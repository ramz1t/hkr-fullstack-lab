interface EmptyStateProps {
    message: string
}

export default function EmptyState({ message }: EmptyStateProps) {
    return (
        <div
            style={{
                textAlign: 'center',
                padding: '48px 16px',
                color: 'var(--text)',
            }}
        >
            <p style={{ margin: 0, fontSize: '15px' }}>{message}</p>
        </div>
    )
}
