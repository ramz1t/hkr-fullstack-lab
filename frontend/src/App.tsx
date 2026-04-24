import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import NotFound from './components/layout/NotFound'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import TicketsPage from './pages/TicketsPage'
import AttendeesPage from './pages/AttendeesPage'
import AttendeeDetailPage from './pages/AttendeeDetailPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={'homepage'} />
                    <Route path="events" element={<EventsPage />} />
                    <Route path="events/:id" element={<EventDetailPage />} />
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
    )
}

export default App
