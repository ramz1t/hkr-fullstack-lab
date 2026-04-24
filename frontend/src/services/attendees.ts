import { apiFetch } from './api'
import type { Attendee, AttendeeFormData, Ticket } from '../types'

export const getAttendees = () => apiFetch<Attendee[]>('/attendees')

export const getAttendee = (id: string) =>
    apiFetch<Attendee>(`/attendees/${id}`)

export const createAttendee = (data: AttendeeFormData) =>
    apiFetch<Attendee>('/attendees', {
        method: 'POST',
        body: JSON.stringify(data),
    })

export const updateAttendee = (id: string, data: Partial<AttendeeFormData>) =>
    apiFetch<Attendee>(`/attendees/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    })

export const deleteAttendee = (id: string) =>
    apiFetch<Record<string, never>>(`/attendees/${id}`, { method: 'DELETE' })

export const getAttendeeTickets = (id: string) =>
    apiFetch<Ticket[]>(`/attendees/${id}/tickets`)
