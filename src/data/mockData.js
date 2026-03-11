// ============================================
// MOCK DATA — Rooms, Staff, Shifts, Tasks
// ============================================

export const ROOM_STATUSES = {
  OCCUPIED: 'occupied',
  NEEDS_CLEANING: 'needs-cleaning',
  CLEAN: 'clean',
  MAINTENANCE: 'maintenance',
};

export const STATUS_CONFIG = {
  [ROOM_STATUSES.OCCUPIED]: {
    label: 'Occupied',
    color: 'var(--color-occupied)',
    bg: 'var(--color-occupied-bg)',
    border: 'var(--color-occupied-border)',
    icon: '🔑',
  },
  [ROOM_STATUSES.NEEDS_CLEANING]: {
    label: 'Needs Cleaning',
    color: 'var(--color-needs-cleaning)',
    bg: 'var(--color-needs-cleaning-bg)',
    border: 'var(--color-needs-cleaning-border)',
    icon: '🧹',
  },
  [ROOM_STATUSES.CLEAN]: {
    label: 'Clean & Ready',
    color: 'var(--color-clean)',
    bg: 'var(--color-clean-bg)',
    border: 'var(--color-clean-border)',
    icon: '✅',
  },
  [ROOM_STATUSES.MAINTENANCE]: {
    label: 'Maintenance',
    color: 'var(--color-maintenance)',
    bg: 'var(--color-maintenance-bg)',
    border: 'var(--color-maintenance-border)',
    icon: '🔧',
  },
};

export const ROOM_TYPES = {
  STANDARD: 'Standard',
  DELUXE: 'Deluxe',
  SUITE: 'Suite',
  FAMILY: 'Family',
};

export const initialRooms = [
  { id: 'r1',  number: '101', floor: 1, type: ROOM_TYPES.STANDARD, status: ROOM_STATUSES.CLEAN,          assignedTo: 's1', lastCleaned: '2026-02-28T10:00:00' },
  { id: 'r2',  number: '102', floor: 1, type: ROOM_TYPES.STANDARD, status: ROOM_STATUSES.OCCUPIED,       assignedTo: 's1', lastCleaned: '2026-02-27T14:00:00' },
  { id: 'r3',  number: '103', floor: 1, type: ROOM_TYPES.DELUXE,   status: ROOM_STATUSES.NEEDS_CLEANING, assignedTo: 's2', lastCleaned: '2026-02-27T11:00:00' },
  { id: 'r4',  number: '104', floor: 1, type: ROOM_TYPES.FAMILY,   status: ROOM_STATUSES.OCCUPIED,       assignedTo: 's2', lastCleaned: '2026-02-26T15:00:00' },
  { id: 'r5',  number: '201', floor: 2, type: ROOM_TYPES.STANDARD, status: ROOM_STATUSES.CLEAN,          assignedTo: 's3', lastCleaned: '2026-02-28T09:30:00' },
  { id: 'r6',  number: '202', floor: 2, type: ROOM_TYPES.DELUXE,   status: ROOM_STATUSES.NEEDS_CLEANING, assignedTo: 's3', lastCleaned: '2026-02-27T10:00:00' },
  { id: 'r7',  number: '203', floor: 2, type: ROOM_TYPES.SUITE,    status: ROOM_STATUSES.MAINTENANCE,    assignedTo: 's4', lastCleaned: '2026-02-25T16:00:00' },
  { id: 'r8',  number: '204', floor: 2, type: ROOM_TYPES.STANDARD, status: ROOM_STATUSES.OCCUPIED,       assignedTo: 's4', lastCleaned: '2026-02-27T13:00:00' },
  { id: 'r9',  number: '301', floor: 3, type: ROOM_TYPES.DELUXE,   status: ROOM_STATUSES.CLEAN,          assignedTo: 's5', lastCleaned: '2026-02-28T08:00:00' },
  { id: 'r10', number: '302', floor: 3, type: ROOM_TYPES.SUITE,    status: ROOM_STATUSES.OCCUPIED,       assignedTo: 's5', lastCleaned: '2026-02-26T12:00:00' },
  { id: 'r11', number: '303', floor: 3, type: ROOM_TYPES.FAMILY,   status: ROOM_STATUSES.NEEDS_CLEANING, assignedTo: 's1', lastCleaned: '2026-02-27T09:00:00' },
  { id: 'r12', number: '304', floor: 3, type: ROOM_TYPES.STANDARD, status: ROOM_STATUSES.CLEAN,          assignedTo: 's2', lastCleaned: '2026-02-28T11:00:00' },
];

export const initialStaff = [
  { id: 's1', name: 'Maria Santos',   role: 'cleaner',    avatar: '👩‍🦱' },
  { id: 's2', name: 'David Kim',      role: 'cleaner',    avatar: '👨' },
  { id: 's3', name: 'Anna Petrov',    role: 'cleaner',    avatar: '👩' },
  { id: 's4', name: 'James Murphy',   role: 'maintenance',avatar: '👨‍🔧' },
  { id: 's5', name: 'Sofia Lopez',    role: 'cleaner',    avatar: '👩‍🦰' },
  { id: 's6', name: 'Liam O\'Brien',  role: 'reception',  avatar: '👨‍💼' },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const initialShifts = [
  { id: 'sh1',  staffId: 's1', day: 'Mon', startTime: '07:00', endTime: '15:00' },
  { id: 'sh2',  staffId: 's1', day: 'Tue', startTime: '07:00', endTime: '15:00' },
  { id: 'sh3',  staffId: 's1', day: 'Wed', startTime: '07:00', endTime: '15:00' },
  { id: 'sh4',  staffId: 's1', day: 'Thu', startTime: '07:00', endTime: '15:00' },
  { id: 'sh5',  staffId: 's1', day: 'Fri', startTime: '07:00', endTime: '15:00' },
  { id: 'sh6',  staffId: 's2', day: 'Mon', startTime: '08:00', endTime: '16:00' },
  { id: 'sh7',  staffId: 's2', day: 'Tue', startTime: '08:00', endTime: '16:00' },
  { id: 'sh8',  staffId: 's2', day: 'Wed', startTime: '08:00', endTime: '16:00' },
  { id: 'sh9',  staffId: 's2', day: 'Sat', startTime: '08:00', endTime: '16:00' },
  { id: 'sh10', staffId: 's2', day: 'Sun', startTime: '08:00', endTime: '16:00' },
  { id: 'sh11', staffId: 's3', day: 'Wed', startTime: '09:00', endTime: '17:00' },
  { id: 'sh12', staffId: 's3', day: 'Thu', startTime: '09:00', endTime: '17:00' },
  { id: 'sh13', staffId: 's3', day: 'Fri', startTime: '09:00', endTime: '17:00' },
  { id: 'sh14', staffId: 's3', day: 'Sat', startTime: '09:00', endTime: '17:00' },
  { id: 'sh15', staffId: 's3', day: 'Sun', startTime: '09:00', endTime: '17:00' },
  { id: 'sh16', staffId: 's4', day: 'Mon', startTime: '08:00', endTime: '16:00' },
  { id: 'sh17', staffId: 's4', day: 'Tue', startTime: '08:00', endTime: '16:00' },
  { id: 'sh18', staffId: 's4', day: 'Thu', startTime: '08:00', endTime: '16:00' },
  { id: 'sh19', staffId: 's4', day: 'Fri', startTime: '08:00', endTime: '16:00' },
  { id: 'sh20', staffId: 's5', day: 'Mon', startTime: '07:00', endTime: '15:00' },
  { id: 'sh21', staffId: 's5', day: 'Tue', startTime: '07:00', endTime: '15:00' },
  { id: 'sh22', staffId: 's5', day: 'Wed', startTime: '07:00', endTime: '15:00' },
  { id: 'sh23', staffId: 's5', day: 'Sat', startTime: '07:00', endTime: '15:00' },
  { id: 'sh24', staffId: 's6', day: 'Mon', startTime: '06:00', endTime: '14:00' },
  { id: 'sh25', staffId: 's6', day: 'Tue', startTime: '06:00', endTime: '14:00' },
  { id: 'sh26', staffId: 's6', day: 'Wed', startTime: '06:00', endTime: '14:00' },
  { id: 'sh27', staffId: 's6', day: 'Thu', startTime: '06:00', endTime: '14:00' },
  { id: 'sh28', staffId: 's6', day: 'Fri', startTime: '06:00', endTime: '14:00' },
];

export const initialTasks = [
  { id: 't1',  roomId: 'r3',  assignedTo: 's2', description: 'Deep clean Room 103',           completed: false, priority: 'high' },
  { id: 't2',  roomId: 'r6',  assignedTo: 's3', description: 'Clean Room 202',                 completed: false, priority: 'high' },
  { id: 't3',  roomId: 'r11', assignedTo: 's1', description: 'Clean Room 303',                 completed: false, priority: 'high' },
  { id: 't4',  roomId: 'r7',  assignedTo: 's4', description: 'Fix AC unit in Room 203',        completed: false, priority: 'urgent' },
  { id: 't5',  roomId: 'r2',  assignedTo: 's1', description: 'Restock minibar in Room 102',    completed: false, priority: 'medium' },
  { id: 't6',  roomId: null,  assignedTo: 's6', description: 'Update guest registry',          completed: false, priority: 'medium' },
  { id: 't7',  roomId: null,  assignedTo: 's2', description: 'Restock linen closet',           completed: true,  priority: 'low' },
  { id: 't8',  roomId: 'r10', assignedTo: 's5', description: 'Replace towels in Room 302',     completed: false, priority: 'medium' },
  { id: 't9',  roomId: null,  assignedTo: 's4', description: 'Check hot water system',         completed: true,  priority: 'high' },
  { id: 't10', roomId: 'r1',  assignedTo: 's1', description: 'Inspect Room 101 for checkout',  completed: false, priority: 'low' },
];

export { DAYS };
