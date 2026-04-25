import { useState, useEffect } from 'react'
import { Outlet, useMatch } from 'react-router-dom'
import type { Attendee, AttendeeFormData } from '../../types'
import {
    getAttendees,
    createAttendee,
    updateAttendee,
    deleteAttendee,
} from '../../services/attendees'
import { useStore } from '../../store/StoreContext'
import AttendeeRow from '../../components/attendees/AttendeeRow'
import AttendeeForm from '../../components/attendees/AttendeeForm'
import Modal from '../../components/shared/Modal'
import EmptyState from '../../components/shared/EmptyState'
import '../Page.css'

export default function AttendeesPage() {
    const { attendees } = useStore()
    const match = useMatch('/attendees/:id')
    const selectedId = match?.params?.id
    const [error, setError] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState<Attendee | null>(null)

    useEffect(() => {
        getAttendees()
            .then(attendees.set)
            .catch((err: Error) => setError(err.message))
            .finally(() => attendees.setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (data: AttendeeFormData) => {
        if (editing) {
            const updated = await updateAttendee(editing._id, data)
            attendees.set(
                attendees.data.map((a) => (a._id === updated._id ? updated : a))
            )
        } else {
            const created = await createAttendee(data)
            attendees.set([...attendees.data, created])
        }
        setModalOpen(false)
        setEditing(null)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this attendee?')) return
        await deleteAttendee(id)
        attendees.set(attendees.data.filter((a) => a._id !== id))
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
                <h1 className="page-title">
                    Attendees ({attendees.data.length})
                </h1>
                <button className="btn-primary" onClick={openCreate}>
                    New Attendee
                </button>
            </div>

            <div className={`split-layout${selectedId ? ' has-detail' : ''}`}>
                <div className="split-list">
                    {attendees.isLoading && (
                        <p className="page-loading">Loading…</p>
                    )}
                    {error && <p className="page-error">{error}</p>}

                    {!attendees.isLoading &&
                        !error &&
                        attendees.data.length === 0 && (
                            <EmptyState message="No attendees yet. Add the first one!" />
                        )}
                    {attendees.data.length > 0 && (
                        <div className="table-wrap">
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
                                    {attendees.data.map((attendee) => (
                                        <AttendeeRow
                                            key={attendee._id}
                                            attendee={attendee}
                                            isSelected={
                                                attendee._id === selectedId
                                            }
                                            onEdit={openEdit}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="split-detail">
                    <Outlet />
                </div>
            </div>

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
