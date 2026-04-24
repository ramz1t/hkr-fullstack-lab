import { useState, useEffect, useCallback } from 'react'
import type { Attendee, AttendeeFormData } from '../types'
import {
    getAttendees,
    createAttendee,
    updateAttendee,
    deleteAttendee,
} from '../services/attendees'
import AttendeeRow from '../components/attendees/AttendeeRow'
import AttendeeForm from '../components/attendees/AttendeeForm'
import Modal from '../components/shared/Modal'
import EmptyState from '../components/shared/EmptyState'
import './Page.css'

export default function AttendeesPage() {
    const [attendees, setAttendees] = useState<Attendee[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState<Attendee | null>(null)

    const load = useCallback(() => {
        setLoading(true)
        getAttendees()
            .then(setAttendees)
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        load()
    }, [load])

    const handleSubmit = async (data: AttendeeFormData) => {
        if (editing) {
            const updated = await updateAttendee(editing._id, data)
            setAttendees((prev) =>
                prev.map((a) => (a._id === updated._id ? updated : a))
            )
        } else {
            const created = await createAttendee(data)
            setAttendees((prev) => [...prev, created])
        }
        setModalOpen(false)
        setEditing(null)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this attendee?')) return
        await deleteAttendee(id)
        setAttendees((prev) => prev.filter((a) => a._id !== id))
    }

    const openCreate = () => {
        setEditing(null)
        setModalOpen(true)
    }
    const openEdit = (attendee: Attendee) => {
        setEditing(attendee)
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
        setEditing(null)
    }

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Attendees</h1>
                <button className="btn-primary" onClick={openCreate}>
                    + New Attendee
                </button>
            </div>

            {loading && <p className="page-loading">Loading…</p>}
            {error && <p className="page-error">{error}</p>}

            {!loading && !error && attendees.length === 0 && (
                <EmptyState message="No attendees yet. Add the first one!" />
            )}

            {attendees.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendees.map((attendee) => (
                            <AttendeeRow
                                key={attendee._id}
                                attendee={attendee}
                                onEdit={openEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            )}

            {modalOpen && (
                <Modal
                    title={editing ? 'Edit Attendee' : 'New Attendee'}
                    onClose={closeModal}
                >
                    <AttendeeForm
                        initial={editing ?? undefined}
                        onSubmit={handleSubmit}
                        onCancel={closeModal}
                    />
                </Modal>
            )}
        </div>
    )
}
