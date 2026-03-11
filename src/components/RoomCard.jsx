import { useApp } from '../context/AppContext';
import { STATUS_CONFIG, ROOM_STATUSES } from '../data/mockData';
import './RoomCard.css';

const STATUS_ORDER = [
    ROOM_STATUSES.OCCUPIED,
    ROOM_STATUSES.NEEDS_CLEANING,
    ROOM_STATUSES.CLEAN,
    ROOM_STATUSES.MAINTENANCE,
];

export default function RoomCard({ room, staffMap, editable = false, compact = false }) {
    const { dispatch } = useApp();
    const config = STATUS_CONFIG[room.status];
    const staff = staffMap?.[room.assignedTo];

    function cycleStatus() {
        if (!editable) return;
        const currentIdx = STATUS_ORDER.indexOf(room.status);
        const nextIdx = (currentIdx + 1) % STATUS_ORDER.length;
        dispatch({
            type: 'SET_ROOM_STATUS',
            payload: { roomId: room.id, status: STATUS_ORDER[nextIdx] },
        });
    }

    return (
        <div
            className={`room-card ${compact ? 'room-card--compact' : ''} ${editable ? 'room-card--editable' : ''}`}
            style={{
                '--status-color': config.color,
                '--status-bg': config.bg,
                '--status-border': config.border,
            }}
            onClick={cycleStatus}
            role={editable ? 'button' : undefined}
            tabIndex={editable ? 0 : undefined}
            onKeyDown={(e) => e.key === 'Enter' && cycleStatus()}
        >
            <div className="room-card__status-indicator" />
            <div className="room-card__header">
                <span className="room-card__number">{room.number}</span>
                <span className="room-card__type">{room.type}</span>
            </div>
            <div className="room-card__status-badge">
                <span className="room-card__status-icon">{config.icon}</span>
                <span className="room-card__status-label">{config.label}</span>
            </div>
            {!compact && staff && (
                <div className="room-card__staff">
                    <span className="room-card__staff-avatar">{staff.avatar}</span>
                    <span className="room-card__staff-name">{staff.name}</span>
                </div>
            )}
            {!compact && (
                <div className="room-card__floor">Floor {room.floor}</div>
            )}
            {editable && (
                <div className="room-card__tap-hint">Tap to change</div>
            )}
        </div>
    );
}
