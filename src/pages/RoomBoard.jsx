import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import RoomCard from '../components/RoomCard';
import { ROOM_STATUSES, STATUS_CONFIG } from '../data/mockData';
import './RoomBoard.css';

const FILTERS = [
    { key: 'all', label: 'All Rooms', icon: '🏠' },
    { key: ROOM_STATUSES.CLEAN, label: 'Clean', icon: '✅' },
    { key: ROOM_STATUSES.OCCUPIED, label: 'Occupied', icon: '🔑' },
    { key: ROOM_STATUSES.NEEDS_CLEANING, label: 'Needs Cleaning', icon: '🧹' },
    { key: ROOM_STATUSES.MAINTENANCE, label: 'Maintenance', icon: '🔧' },
];

export default function RoomBoard() {
    const { state } = useApp();
    const [filter, setFilter] = useState('all');
    const isAdmin = state.currentUser?.isAdmin;

    const staffMap = useMemo(() => {
        const map = {};
        state.staff.forEach((s) => (map[s.id] = s));
        return map;
    }, [state.staff]);

    const filteredRooms = useMemo(() => {
        if (filter === 'all') return state.rooms;
        return state.rooms.filter((r) => r.status === filter);
    }, [state.rooms, filter]);

    // Floor groups
    const floors = useMemo(() => {
        const groups = {};
        filteredRooms.forEach((room) => {
            if (!groups[room.floor]) groups[room.floor] = [];
            groups[room.floor].push(room);
        });
        return Object.entries(groups).sort(([a], [b]) => Number(a) - Number(b));
    }, [filteredRooms]);

    return (
        <div className="room-board">
            <div className="room-board__header animate-in">
                <h1 className="room-board__title">Room Status Board</h1>
                <p className="room-board__sub">{state.rooms.length} rooms across {new Set(state.rooms.map(r => r.floor)).size} floors</p>
            </div>

            {/* Filters */}
            <div className="room-board__filters animate-in stagger-1">
                {FILTERS.map((f) => {
                    const count = f.key === 'all'
                        ? state.rooms.length
                        : state.rooms.filter((r) => r.status === f.key).length;
                    return (
                        <button
                            key={f.key}
                            className={`room-board__filter ${filter === f.key ? 'room-board__filter--active' : ''}`}
                            onClick={() => setFilter(f.key)}
                            style={
                                f.key !== 'all' && STATUS_CONFIG[f.key]
                                    ? { '--filter-color': STATUS_CONFIG[f.key].color, '--filter-bg': STATUS_CONFIG[f.key].bg }
                                    : {}
                            }
                        >
                            <span className="room-board__filter-icon">{f.icon}</span>
                            <span className="room-board__filter-label">{f.label}</span>
                            <span className="room-board__filter-count">{count}</span>
                        </button>
                    );
                })}
            </div>

            {/* Rooms by floor */}
            {floors.map(([floor, rooms], idx) => (
                <section key={floor} className={`room-board__floor animate-in stagger-${Math.min(idx + 2, 6)}`}>
                    <h2 className="room-board__floor-title">Floor {floor}</h2>
                    <div className="room-board__grid">
                        {rooms.map((room) => (
                            <RoomCard
                                key={room.id}
                                room={room}
                                staffMap={staffMap}
                                editable={isAdmin}
                            />
                        ))}
                    </div>
                </section>
            ))}

            {filteredRooms.length === 0 && (
                <div className="room-board__empty animate-in">
                    <span>🔍</span>
                    <p>No rooms match the current filter</p>
                </div>
            )}
        </div>
    );
}
