import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider } from './store/StoreContext'
import Layout from './components/layout/Layout'
import NotFound from './components/layout/NotFound'
import EventsPage from './pages/events/EventsPage'
import EventDetailPage from './pages/events/EventDetailPage'
import TicketsPage from './pages/tickets/TicketsPage'
import AttendeesPage from './pages/attendees/AttendeesPage'
import AttendeeDetailPage from './pages/attendees/AttendeeDetailPage'
import LandingPage from './pages/landing/LandingPage'

function App() {
    return (
        <StoreProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<LandingPage />} />
                        <Route path="events" element={<EventsPage />} />
                        <Route
                            path="events/:id"
                            element={<EventDetailPage />}
                        />
                        <Route path="tickets" element={<TicketsPage />} />
                        <Route path="attendees" element={<AttendeesPage />} />
                        <Route
                            path="attendees/:id"
                            element={<AttendeeDetailPage />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </StoreProvider>
    )
}

export default App
