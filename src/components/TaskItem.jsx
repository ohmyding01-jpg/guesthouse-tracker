import { useApp } from '../context/AppContext';
import './TaskItem.css';

export default function TaskItem({ task, showStaff = false, staffMap = {} }) {
    const { dispatch } = useApp();

    function handleToggle() {
        dispatch({ type: 'TOGGLE_TASK', payload: { taskId: task.id } });
    }

    const staff = staffMap[task.assignedTo];
    const priorityClass = `task-item--${task.priority}`;

    return (
        <div className={`task-item ${task.completed ? 'task-item--completed' : ''} ${priorityClass}`}>
            <button
                className="task-item__check"
                onClick={handleToggle}
                aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
                <div className={`task-item__checkbox ${task.completed ? 'task-item__checkbox--checked' : ''}`}>
                    {task.completed && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    )}
                </div>
            </button>

            <div className="task-item__content">
                <span className="task-item__description">{task.description}</span>
                <div className="task-item__meta">
                    {task.roomId && <span className="task-item__room">Room {task.roomId.replace('r', '')}</span>}
                    {task.priority === 'urgent' && <span className="task-item__priority-badge">Urgent</span>}
                    {task.priority === 'high' && <span className="task-item__priority-badge task-item__priority-badge--high">High</span>}
                </div>
            </div>

            {showStaff && staff && (
                <div className="task-item__assignee">
                    <span className="task-item__assignee-avatar">{staff.avatar}</span>
                    <span className="task-item__assignee-name">{staff.name.split(' ')[0]}</span>
                </div>
            )}
        </div>
    );
}
