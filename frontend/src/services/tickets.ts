import { apiFetch } from './api'
import type { Ticket, TicketFormData } from '../types'

export const getTickets = () => apiFetch<Ticket[]>('/tickets')

export const getTicket = (id: string) => apiFetch<Ticket>(`/tickets/${id}`)

export const createTicket = (data: TicketFormData) =>
    apiFetch<Ticket>('/tickets', { method: 'POST', body: JSON.stringify(data) })

export const updateTicket = (
    id: string,
    data: Partial<TicketFormData> & { status?: 'active' | 'cancelled' }
) =>
    apiFetch<Ticket>(`/tickets/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    })

export const deleteTicket = (id: string) =>
    apiFetch<Record<string, never>>(`/tickets/${id}`, { method: 'DELETE' })
