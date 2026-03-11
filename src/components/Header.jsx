import { useApp } from '../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const { state, dispatch } = useApp();
    const navigate = useNavigate();
    const location = useLocation();
    const user = state.currentUser;

    function handleLogout() {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    }

    if (!user) return null;

    const navItems = user.isAdmin
        ? [
            { path: '/admin', label: 'Dashboard', icon: '📊' },
            { path: '/rooms', label: 'Rooms', icon: '🏠' },
        ]
        : [
            { path: '/staff', label: 'My Day', icon: '📋' },
            { path: '/rooms', label: 'Rooms', icon: '🏠' },
        ];

    return (
        <header className="header glass-strong">
            <div className="header__brand">
                <div className="header__logo">
                    <span className="header__logo-icon">🏨</span>
                </div>
                <div className="header__titles">
                    <h1 className="header__title">GuestHouse</h1>
                    <span className="header__subtitle">Tracker</span>
                </div>
            </div>

            <nav className="header__nav">
                {navItems.map((item) => (
                    <button
                        key={item.path}
                        className={`header__nav-item ${location.pathname === item.path ? 'header__nav-item--active' : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        <span className="header__nav-icon">{item.icon}</span>
                        <span className="header__nav-label">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="header__user">
                <div className="header__user-info">
                    <span className="header__user-avatar">{user.isAdmin ? '👔' : state.staff.find(s => s.id === user.id)?.avatar || '👤'}</span>
                    <div className="header__user-details">
                        <span className="header__user-name">{user.name}</span>
                        <span className="header__user-role">{user.isAdmin ? 'Admin' : user.role}</span>
                    </div>
                </div>
                <button className="header__logout" onClick={handleLogout} title="Switch User">
                    ↩
                </button>
            </div>
        </header>
    );
}
