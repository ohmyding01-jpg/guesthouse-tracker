import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Login.css';

export default function Login() {
    const { state, dispatch } = useApp();
    const navigate = useNavigate();
    const [hoveredId, setHoveredId] = useState(null);

    function selectAdmin() {
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: { id: 'admin', name: 'Manager', role: 'admin', isAdmin: true },
        });
        navigate('/admin');
    }

    function selectStaff(staffMember) {
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: { id: staffMember.id, name: staffMember.name, role: staffMember.role, isAdmin: false },
        });
        navigate('/staff');
    }

    return (
        <div className="login">
            <div className="login__bg">
                <div className="login__bg-gradient" />
                <div className="login__bg-dots" />
            </div>

            <div className="login__container">
                <div className="login__header animate-in">
                    <div className="login__logo">
                        <span className="login__logo-icon">🏨</span>
                    </div>
                    <h1 className="login__title">GuestHouse <span>Tracker</span></h1>
                    <p className="login__subtitle">Staff & Operations Management</p>
                </div>

                <div className="login__section animate-in stagger-2">
                    <h2 className="login__section-title">Sign in as Admin</h2>
                    <button className="login__admin-btn" onClick={selectAdmin}>
                        <div className="login__admin-icon">👔</div>
                        <div className="login__admin-info">
                            <span className="login__admin-label">Manager / Owner</span>
                            <span className="login__admin-desc">Full dashboard access</span>
                        </div>
                        <span className="login__arrow">→</span>
                    </button>
                </div>

                <div className="login__divider animate-in stagger-3">
                    <span>or sign in as staff</span>
                </div>

                <div className="login__section animate-in stagger-4">
                    <h2 className="login__section-title">Select Staff Member</h2>
                    <div className="login__staff-grid">
                        {state.staff.map((member, idx) => (
                            <button
                                key={member.id}
                                className={`login__staff-card stagger-${idx + 1}`}
                                onClick={() => selectStaff(member)}
                                onMouseEnter={() => setHoveredId(member.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <span className="login__staff-avatar">{member.avatar}</span>
                                <span className="login__staff-name">{member.name}</span>
                                <span className="login__staff-role">{member.role}</span>
                                {hoveredId === member.id && <span className="login__staff-arrow">→</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
