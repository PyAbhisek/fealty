import { useState, useEffect } from "react";
import { X, MessageSquare } from "lucide-react";

interface Task {
    id: string;
    content: string;
    description: string;
    status: string;
    assignee: string;
    date: string;
    priority: string;
    priorityColor: string;
    comments: string[];
}

interface Column {
    id: string;
    title: string;
    bgColor: string;
    bgDotColor: string;
    taskIds: string[];
}

interface TaskModalProps {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
    columns: { [key: string]: Column };
    onStatusChange: (taskId: string, newStatus: string, newTitle: string, newDescription: string) => void;
}

const TaskModal = ({ task, isOpen, onClose, columns, onStatusChange }: TaskModalProps) => {
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [status, setStatus] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        if (task) {
            setStatus(task.status);
            setTitle(task.content);
            setDescription(task.description);
        }
    }, [task]);

    if (!isOpen || !task) return null;

    const handleDropDown = (columnId: string) => {
        setStatus(columnId);
        setIsStatusDropdownOpen(false);
    };

    const handleSaveChanges = () => {
        onStatusChange(task.id, status, title, description);
        onClose();
    };

    return (
        <div className="fixed z-[1000] inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-[#1F2024] text-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold">{task.id}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <textarea
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-4 bg-[#2A2C32] rounded-lg border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={2}
                        />
                    </div>

                    {/* Description - now editable */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-4 bg-[#2A2C32] rounded-lg border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                            rows={4}
                        />
                    </div>

                    {/* Task Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Assignee</label>
                            <div className="p-3 bg-[#2A2C32] rounded-lg border border-gray-700">
                                {task.assignee}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Due Date</label>
                            <div className="p-3 bg-[#2A2C32] rounded-lg border border-gray-700">
                                {task.date}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Priority</label>
                            <div className="p-3 bg-[#2A2C32] rounded-lg border border-gray-700">
                                <span
                                    className="px-2 py-1 rounded text-xs font-medium"
                                    style={{ backgroundColor: task.priorityColor }}
                                >
                                    {task.priority}
                                </span>
                            </div>
                        </div>
                        {/* Status Dropdown */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <div className="relative">
                                <button
                                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                    className="flex items-center justify-between w-full p-3 bg-[#2A2C32] rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{status}</span>
                                    </div>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>

                                {isStatusDropdownOpen && (
                                    <div className="absolute mt-1 w-full bg-[#2A2C32] rounded-lg shadow-lg border border-gray-700 z-10">
                                        {Object.values(columns).map((column) => (
                                            <button
                                                key={column.id}
                                                onClick={() => handleDropDown(column.id)}
                                                className="flex items-center gap-2 w-full px-4 py-3 text-left hover:bg-[#3A3C42] transition-colors"
                                            >
                                                <span>{column.id}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Comments */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            <div className="flex items-center gap-2">
                                <MessageSquare size={16} />
                                <span>Comments ({task.comments.length})</span>
                            </div>
                        </label>
                        <div className="bg-[#2A2C32] rounded-lg border border-gray-700 divide-y divide-gray-700">
                            {task.comments.length > 0 ? (
                                task.comments.map((comment, index) => (
                                    <div key={index} className="p-4">
                                        <p className="text-gray-300">{comment}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-gray-500">No comments yet</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end p-6 border-t border-gray-800">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg mr-2">
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveChanges}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;