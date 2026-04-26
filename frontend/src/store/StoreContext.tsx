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

function useCollection<T>(): Collection<T> {
    const [data, setData] = useState<T[]>([])
    const [isLoading, setLoading] = useState(true)
    return useMemo(
        () => ({ data, set: setData, isLoading, setLoading }),
        [data, isLoading]
    )
}

interface Store {
    events: Collection<Event>
    attendees: Collection<Attendee>
    tickets: Collection<Ticket>
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
    const events = useCollection<Event>()
    const attendees = useCollection<Attendee>()
    const tickets = useCollection<Ticket>()

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
