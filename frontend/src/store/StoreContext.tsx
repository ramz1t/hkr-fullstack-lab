import {
    createContext,
    useContext,
    useState,
    useMemo,
    type ReactNode,
} from 'react'
import type { Event, Attendee, Ticket } from '../types'

export interface Collection<T> {
    data: T[]
    set: (data: T[]) => void
    isLoading: boolean
    setLoading: (v: boolean) => void
}

interface Store {
    events: Collection<Event>
    attendees: Collection<Attendee>
    tickets: Collection<Ticket>
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
    const [eventsData, setEventsData] = useState<Event[]>([])
    const [eventsLoading, setEventsLoading] = useState(true)
    const events = useMemo<Collection<Event>>(
        () => ({
            data: eventsData,
            set: setEventsData,
            isLoading: eventsLoading,
            setLoading: setEventsLoading,
        }),
        [eventsData, eventsLoading]
    )

    const [attendeesData, setAttendeesData] = useState<Attendee[]>([])
    const [attendeesLoading, setAttendeesLoading] = useState(true)
    const attendees = useMemo<Collection<Attendee>>(
        () => ({
            data: attendeesData,
            set: setAttendeesData,
            isLoading: attendeesLoading,
            setLoading: setAttendeesLoading,
        }),
        [attendeesData, attendeesLoading]
    )

    const [ticketsData, setTicketsData] = useState<Ticket[]>([])
    const [ticketsLoading, setTicketsLoading] = useState(true)
    const tickets = useMemo<Collection<Ticket>>(
        () => ({
            data: ticketsData,
            set: setTicketsData,
            isLoading: ticketsLoading,
            setLoading: setTicketsLoading,
        }),
        [ticketsData, ticketsLoading]
    )

    const store = useMemo(
        () => ({ events, attendees, tickets }),
        [events, attendees, tickets]
    )

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
    const ctx = useContext(StoreContext)
    if (!ctx) throw new Error('useStore must be used within StoreProvider')
    return ctx
}
