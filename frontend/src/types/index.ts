export interface Event {
    _id: string
    title: string
    description?: string
    date: string
    location?: string
    capacity?: number
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
    createdAt: string
    updatedAt: string
}

export interface Attendee {
    _id: string
    name: string
    email: string
    phone?: string
    createdAt: string
    updatedAt: string
}

export interface Ticket {
    _id: string
    event: Event | string
    attendee: Attendee | string
    type: 'General' | 'VIP'
    status: 'active' | 'cancelled'
    createdAt: string
    updatedAt: string
}

export type EventFormData = Omit<Event, '_id' | 'createdAt' | 'updatedAt'>
export type AttendeeFormData = Omit<Attendee, '_id' | 'createdAt' | 'updatedAt'>
export interface TicketFormData {
    event: string
    attendee: string
    type: 'General' | 'VIP'
}
