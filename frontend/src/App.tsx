import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider } from './store/StoreContext'
import { AuthProvider } from './store/AuthContext'
import Layout from './components/layout/Layout'
import NotFound from './components/layout/NotFound'
import ProtectedRoute from './components/shared/ProtectedRoute'
import EventsPage from './pages/events/EventsPage'
import EventDetailPage from './pages/events/EventDetailPage'
import TicketsPage from './pages/tickets/TicketsPage'
import AttendeesPage from './pages/attendees/AttendeesPage'
import AttendeeDetailPage from './pages/attendees/AttendeeDetailPage'
import LandingPage from './pages/landing/LandingPage'

function App() {
    return (
        <AuthProvider>
            <StoreProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route index element={<LandingPage />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="events" element={<EventsPage />}>
                                    <Route
                                        path=":id"
                                        element={<EventDetailPage />}
                                    />
                                </Route>
                                <Route
                                    path="tickets"
                                    element={<TicketsPage />}
                                />
                                <Route
                                    path="attendees"
                                    element={<AttendeesPage />}
                                >
                                    <Route
                                        path=":id"
                                        element={<AttendeeDetailPage />}
                                    />
                                </Route>
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </StoreProvider>
        </AuthProvider>
    )
}

export default App
