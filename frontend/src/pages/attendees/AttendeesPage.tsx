import { useState, useEffect } from 'react'
import { Outlet, useMatch } from 'react-router-dom'
import type { AttendeeFormData } from '../../types'
import { getAttendees, createAttendee } from '../../services/attendees'
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

    useEffect(() => {
        getAttendees()
            .then(attendees.set)
            .catch((err: Error) => setError(err.message))
            .finally(() => attendees.setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (data: AttendeeFormData) => {
        const created = await createAttendee(data)
        attendees.set([...attendees.data, created])
        setModalOpen(false)
    }

    const openCreate = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

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
                    {attendees.isLoading ? (
                        <p className="page-loading">Loading…</p>
                    ) : error ? (
                        <p className="page-error">{error}</p>
                    ) : attendees.data.length === 0 ? (
                        <EmptyState message="No attendees yet. Add the first one!" />
                    ) : (
                        <div className="table-wrap">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
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
                <Modal title="New Attendee" onClose={closeModal}>
                    <AttendeeForm
                        onSubmit={handleSubmit}
                        onCancel={closeModal}
                    />
                </Modal>
            )}
        </div>
    )
}
