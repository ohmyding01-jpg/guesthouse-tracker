import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import RoomCard from '../components/RoomCard';
import TaskItem from '../components/TaskItem';
import { STATUS_CONFIG, ROOM_STATUSES, DAYS } from '../data/mockData';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const { state } = useApp();

    const staffMap = useMemo(() => {
        const map = {};
        state.staff.forEach((s) => (map[s.id] = s));
        return map;
    }, [state.staff]);

    // Stats
    const statusCounts = useMemo(() => {
        const counts = {};
        Object.values(ROOM_STATUSES).forEach((s) => (counts[s] = 0));
        state.rooms.forEach((r) => counts[r.status]++);
        return counts;
    }, [state.rooms]);

    const taskStats = useMemo(() => {
        const total = state.tasks.length;
        const completed = state.tasks.filter((t) => t.completed).length;
        return { total, completed, pending: total - completed };
    }, [state.tasks]);

    // Today (Sat for the demo)
    const today = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

    const todayShifts = useMemo(() => {
        return state.shifts.filter((sh) => sh.day === today);
    }, [state.shifts, today]);

    return (
        <div className="admin">
            {/* Overview Stats */}
            <section className="admin__section animate-in">
                <h2 className="admin__section-title">
                    <span className="admin__section-icon">📊</span>
                    Overview
                </h2>
                <div className="admin__stats">
                    {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                        <div
                            key={status}
                            className="admin__stat-card"
                            style={{
                                '--stat-color': config.color,
                                '--stat-bg': config.bg,
                                '--stat-border': config.border,
                            }}
                        >
                            <div className="admin__stat-icon">{config.icon}</div>
                            <div className="admin__stat-count">{statusCounts[status]}</div>
                            <div className="admin__stat-label">{config.label}</div>
                        </div>
                    ))}
                    <div
                        className="admin__stat-card"
                        style={{
                            '--stat-color': 'var(--color-primary)',
                            '--stat-bg': 'var(--color-primary-bg)',
                            '--stat-border': 'rgba(99,102,241,0.3)',
                        }}
                    >
                        <div className="admin__stat-icon">✅</div>
                        <div className="admin__stat-count">{taskStats.completed}/{taskStats.total}</div>
                        <div className="admin__stat-label">Tasks Done</div>
                    </div>
                </div>
            </section>

            {/* Room Board */}
            <section className="admin__section animate-in stagger-2">
                <h2 className="admin__section-title">
                    <span className="admin__section-icon">🏠</span>
                    Room Status
                </h2>
                <div className="admin__room-grid">
                    {state.rooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            staffMap={staffMap}
                            editable={true}
                            compact={true}
                        />
                    ))}
                </div>
            </section>

            {/* Today's Tasks */}
            <section className="admin__section animate-in stagger-3">
                <h2 className="admin__section-title">
                    <span className="admin__section-icon">📋</span>
                    Today's Tasks
                    <span className="admin__section-badge">{taskStats.pending} pending</span>
                </h2>
                <div className="admin__tasks">
                    {state.tasks
                        .sort((a, b) => {
                            if (a.completed !== b.completed) return a.completed ? 1 : -1;
                            const priority = { urgent: 0, high: 1, medium: 2, low: 3 };
                            return (priority[a.priority] || 3) - (priority[b.priority] || 3);
                        })
                        .map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                showStaff={true}
                                staffMap={staffMap}
                            />
                        ))}
                </div>
            </section>

            {/* Weekly Schedule */}
            <section className="admin__section animate-in stagger-4">
                <h2 className="admin__section-title">
                    <span className="admin__section-icon">📅</span>
                    Weekly Schedule
                </h2>
                <div className="admin__schedule-wrapper">
                    <table className="admin__schedule">
                        <thead>
                            <tr>
                                <th>Staff</th>
                                {DAYS.map((d) => (
                                    <th key={d} className={d === today ? 'admin__schedule-today' : ''}>
                                        {d}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {state.staff.map((member) => (
                                <tr key={member.id}>
                                    <td className="admin__schedule-staff">
                                        <span className="admin__schedule-avatar">{member.avatar}</span>
                                        <span>{member.name.split(' ')[0]}</span>
                                    </td>
                                    {DAYS.map((day) => {
                                        const shift = state.shifts.find(
                                            (sh) => sh.staffId === member.id && sh.day === day
                                        );
                                        return (
                                            <td
                                                key={day}
                                                className={`admin__schedule-cell ${shift ? 'admin__schedule-cell--on' : ''} ${day === today ? 'admin__schedule-today' : ''}`}
                                            >
                                                {shift ? (
                                                    <div className="admin__schedule-shift">
                                                        <span>{shift.startTime}</span>
                                                        <span className="admin__schedule-dash">–</span>
                                                        <span>{shift.endTime}</span>
                                                    </div>
                                                ) : (
                                                    <span className="admin__schedule-off">—</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
