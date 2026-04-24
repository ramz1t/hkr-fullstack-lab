import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                EventPlanner
            </Link>
            <ul className="navbar-links">
                <li>
                    <NavLink
                        to="/events"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Events
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/attendees"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Attendees
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/tickets"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Tickets
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
