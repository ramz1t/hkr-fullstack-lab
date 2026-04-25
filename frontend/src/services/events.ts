import { apiFetch } from './api'
import type { Event, EventFormData, Ticket } from '../types'

export interface EventsQuery {
    status?: string
    search?: string
}

export const getEvents = (query?: EventsQuery) =>
    apiFetch<Event[]>('/events', {
        params: query as Record<string, string | undefined>,
    })

export const getEvent = (id: string) => apiFetch<Event>(`/events/${id}`)

export const createEvent = (data: EventFormData) =>
    apiFetch<Event>('/events', { method: 'POST', body: JSON.stringify(data) })

export const updateEvent = (id: string, data: Partial<EventFormData>) =>
    apiFetch<Event>(`/events/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    })

export const deleteEvent = (id: string) =>
    apiFetch<Record<string, never>>(`/events/${id}`, { method: 'DELETE' })

export const getEventTickets = (id: string) =>
    apiFetch<Ticket[]>(`/events/${id}/tickets`)
