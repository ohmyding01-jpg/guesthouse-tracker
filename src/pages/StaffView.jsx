import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { STATUS_CONFIG, ROOM_STATUSES, DAYS } from '../data/mockData';
import './StaffView.css';

export default function StaffView() {
    const { state, dispatch } = useApp();
    const userId = state.currentUser?.id;

    const staffMember = useMemo(
        () => state.staff.find((s) => s.id === userId),
        [state.staff, userId]
    );

    // Get today's day name
    const today = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

    // This week's shifts
    const myShifts = useMemo(
        () => state.shifts.filter((sh) => sh.staffId === userId),
        [state.shifts, userId]
    );

    // My assigned rooms
    const myRooms = useMemo(
        () => state.rooms.filter((r) => r.assignedTo === userId),
        [state.rooms, userId]
    );

    // My tasks
    const myTasks = useMemo(
        () => state.tasks.filter((t) => t.assignedTo === userId),
        [state.tasks, userId]
    );

    const pendingTasks = myTasks.filter((t) => !t.completed);
    const completedTasks = myTasks.filter((t) => t.completed);

    function handleMarkCleaned(roomId) {
        dispatch({ type: 'MARK_ROOM_CLEANED', payload: { roomId } });
    }

    function handleToggleTask(taskId) {
        dispatch({ type: 'TOGGLE_TASK', payload: { taskId } });
    }

    if (!staffMember) return null;

    return (
        <div className="staff">
            {/* Greeting */}
            <div className="staff__greeting animate-in">
                <span className="staff__greeting-avatar">{staffMember.avatar}</span>
                <div>
                    <h1 className="staff__greeting-name">Hey, {staffMember.name.split(' ')[0]}!</h1>
                    <p className="staff__greeting-sub">Here's your day at a glance</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="staff__quick-stats animate-in stagger-1">
                <div className="staff__quick-stat">
                    <span className="staff__quick-stat-num">{myRooms.length}</span>
                    <span className="staff__quick-stat-label">Rooms Assigned</span>
                </div>
                <div className="staff__quick-stat staff__quick-stat--pending">
                    <span className="staff__quick-stat-num">{pendingTasks.length}</span>
                    <span className="staff__quick-stat-label">Tasks Pending</span>
                </div>
                <div className="staff__quick-stat staff__quick-stat--done">
                    <span className="staff__quick-stat-num">{completedTasks.length}</span>
                    <span className="staff__quick-stat-label">Done</span>
                </div>
            </div>

            {/* Shifts */}
            <section className="staff__section animate-in stagger-2">
                <h2 className="staff__section-title">
                    <span>📅</span> My Shifts This Week
                </h2>
                <div className="staff__shifts">
                    {DAYS.map((day) => {
                        const shift = myShifts.find((sh) => sh.day === day);
                        const isToday = day === today;
                        return (
                            <div
                                key={day}
                                className={`staff__shift-card ${shift ? 'staff__shift-card--on' : ''} ${isToday ? 'staff__shift-card--today' : ''}`}
                            >
                                <span className="staff__shift-day">{day}</span>
                                {shift ? (
                                    <span className="staff__shift-time">
                                        {shift.startTime}–{shift.endTime}
                                    </span>
                                ) : (
                                    <span className="staff__shift-off">Off</span>
                                )}
                                {isToday && <span className="staff__shift-today-badge">Today</span>}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* My Rooms */}
            <section className="staff__section animate-in stagger-3">
                <h2 className="staff__section-title">
                    <span>🏠</span> My Rooms Today
                </h2>
                <div className="staff__rooms">
                    {myRooms.map((room) => {
                        const config = STATUS_CONFIG[room.status];
                        const needsCleaning = room.status === ROOM_STATUSES.NEEDS_CLEANING;
                        const isClean = room.status === ROOM_STATUSES.CLEAN;

                        return (
                            <div
                                key={room.id}
                                className="staff__room-card"
                                style={{
                                    '--room-color': config.color,
                                    '--room-bg': config.bg,
                                    '--room-border': config.border,
                                }}
                            >
                                <div className="staff__room-header">
                                    <div className="staff__room-number-row">
                                        <span className="staff__room-number">{room.number}</span>
                                        <span className="staff__room-type">{room.type}</span>
                                    </div>
                                    <div className="staff__room-status">
                                        <span className="staff__room-status-icon">{config.icon}</span>
                                        <span className="staff__room-status-label">{config.label}</span>
                                    </div>
                                </div>

                                {needsCleaning && (
                                    <button
                                        className="staff__room-clean-btn"
                                        onClick={() => handleMarkCleaned(room.id)}
                                    >
                                        <span className="staff__room-clean-icon">✨</span>
                                        Mark as Cleaned
                                    </button>
                                )}

                                {isClean && (
                                    <div className="staff__room-done">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        All good!
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* My Tasks */}
            <section className="staff__section animate-in stagger-4">
                <h2 className="staff__section-title">
                    <span>📋</span> My Tasks
                    {pendingTasks.length > 0 && (
                        <span className="staff__section-count">{pendingTasks.length}</span>
                    )}
                </h2>
                <div className="staff__tasks">
                    {myTasks
                        .sort((a, b) => {
                            if (a.completed !== b.completed) return a.completed ? 1 : -1;
                            return 0;
                        })
                        .map((task) => (
                            <button
                                key={task.id}
                                className={`staff__task-card ${task.completed ? 'staff__task-card--completed' : ''}`}
                                onClick={() => handleToggleTask(task.id)}
                            >
                                <div className={`staff__task-checkbox ${task.completed ? 'staff__task-checkbox--checked' : ''}`}>
                                    {task.completed && (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    )}
                                </div>
                                <div className="staff__task-content">
                                    <span className="staff__task-description">{task.description}</span>
                                    {task.priority === 'urgent' && (
                                        <span className="staff__task-priority">🔴 Urgent</span>
                                    )}
                                    {task.priority === 'high' && (
                                        <span className="staff__task-priority staff__task-priority--high">🟠 High</span>
                                    )}
                                </div>
                            </button>
                        ))}
                    {myTasks.length === 0 && (
                        <div className="staff__empty">
                            <span>🎉</span>
                            <p>No tasks assigned. Enjoy your day!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
