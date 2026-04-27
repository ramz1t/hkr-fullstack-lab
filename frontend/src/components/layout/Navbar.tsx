import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import './Navbar.css'

export default function Navbar() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const handleUserClick = () => {
        if (window.confirm('Do you want to logout?')) {
            signOut()
            navigate('/')
        }
    }

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
            {user && (
                <button
                    className="navbar-user"
                    onClick={handleUserClick}
                    type="button"
                >
                    {user.email}
                </button>
            )}
        </nav>
    )
}
