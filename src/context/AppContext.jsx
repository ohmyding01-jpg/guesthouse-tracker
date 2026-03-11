import { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
    initialRooms,
    initialStaff,
    initialShifts,
    initialTasks,
} from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY = 'guesthouse-tracker-state';

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.warn('Failed to load state from localStorage:', e);
    }
    return null;
}

function getDefaultState() {
    return {
        rooms: initialRooms,
        staff: initialStaff,
        shifts: initialShifts,
        tasks: initialTasks,
        currentUser: null, // { id, name, role, isAdmin }
    };
}

function getInitialState() {
    const saved = loadState();
    if (saved) {
        // Validate saved state has all required fields
        const defaults = getDefaultState();
        if (
            Array.isArray(saved.rooms) &&
            Array.isArray(saved.staff) &&
            Array.isArray(saved.shifts) &&
            Array.isArray(saved.tasks)
        ) {
            return {
                ...defaults,
                ...saved,
            };
        }
        // Corrupted data — clear and start fresh
        console.warn('Corrupted localStorage data detected, resetting...');
        localStorage.removeItem(STORAGE_KEY);
    }
    return getDefaultState();
}

function appReducer(state, action) {
    switch (action.type) {
        case 'SET_ROOMS':
            return { ...state, rooms: action.payload };

        case 'SET_CURRENT_USER':
            return { ...state, currentUser: action.payload };

        case 'LOGOUT':
            return { ...state, currentUser: null };

        case 'SET_ROOM_STATUS':
            return {
                ...state,
                rooms: (state.rooms || []).map((room) =>
                    room.id === action.payload.roomId
                        ? { ...room, status: action.payload.status }
                        : room
                ),
            };

        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: (state.tasks || []).map((task) =>
                    task.id === action.payload.taskId
                        ? { ...task, completed: !task.completed }
                        : task
                ),
            };

        case 'MARK_ROOM_CLEANED': {
            const now = new Date().toISOString();
            return {
                ...state,
                rooms: (state.rooms || []).map((room) =>
                    room.id === action.payload.roomId
                        ? { ...room, status: 'clean', lastCleaned: now }
                        : room
                ),
                tasks: (state.tasks || []).map((task) =>
                    task.roomId === action.payload.roomId &&
                        task.description.toLowerCase().includes('clean')
                        ? { ...task, completed: true }
                        : task
                ),
            };
        }

        case 'ASSIGN_TASK':
            return {
                ...state,
                rooms: (state.rooms || []).map((room) =>
                    room.id === action.payload.roomId
                        ? { ...room, assignedTo: action.payload.staffId }
                        : room
                ),
            };

        case 'RESET_DATA':
            return {
                ...getDefaultState(),
                currentUser: state.currentUser,
            };

        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, undefined, getInitialState);

    // Persist to localStorage on every state change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Failed to save state:', e);
        }
    }, [state]);

    // Fetch rooms from Supabase on mount
    useEffect(() => {
        const fetchRooms = async () => {
            const { data, error } = await supabase.from('rooms').select('*').order('room_number');
            if (error) {
                console.error('Error fetching rooms:', error);
            } else if (data && data.length > 0) {
                const mappedRooms = data.map(dbRoom => ({
                    id: dbRoom.id.toString(),
                    number: dbRoom.room_number,
                    status: dbRoom.status || 'clean',
                    type: 'Standard',
                    floor: 1,
                    cleaningNotes: dbRoom.cleaning_notes,
                    lastCleaned: dbRoom.created_at
                }));
                dispatch({ type: 'SET_ROOMS', payload: mappedRooms });
            }
        };
        fetchRooms();
    }, []);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
}

export default AppContext;
