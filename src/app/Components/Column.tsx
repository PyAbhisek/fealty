import { useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import Card from "./Card";
import TaskModal from "./TaskModal";

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
    attachments: number;
}

interface Column {
    id: string;
    title: string;
    bgColor: string;
    bgDotColor: string;
    taskIds: string[];
}

interface ColumnProps {
    column: Column;
    tasks: { [key: string]: Task };
    columns: { [key: string]: Column };
    onTaskMove: (taskId: string, sourceColumnId: string, targetColumnId: string, title: string, description: string) => void;
    onTaskDelete: (taskId: string, columnId: string) => void;
}

const Column = ({ column, tasks, columns, onTaskMove, onTaskDelete }: ColumnProps) => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localTasks, setLocalTasks] = useState<Task[]>([]);

    useEffect(() => {
        // Update localTasks when taskIds or tasks change
        setLocalTasks(column.taskIds.map((taskId) => tasks[taskId]).filter(Boolean));
    }, [column.taskIds, tasks]); // Watches for changes in tasks or taskIds

    const openModal = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
    };

    const handleStatusChange = (taskId: string, newStatus: string, title: string, description: string) => {
        const currentColumnId = column.id;
        onTaskMove(taskId, currentColumnId, newStatus, title, description);
    };

    const handleDeleteTask = (taskId: string, columnId: string) => {
        onTaskDelete(taskId, columnId);
    };

    return (
        <div>
            <div className="h-[80vh] w-80 relative bg-black text-white">
                <div className="header sticky top-0 bg-black p-4 flex items-center justify-between border-b border-gray-800">
                    <div className="flex gap-2 items-center font-bold text-[1.2rem]">
                        <div
                            className="h-[1rem] w-[1rem] rounded-full"
                            style={{ backgroundColor: column.bgDotColor }}
                        ></div>
                        {column.id}
                        <span
                            className="h-[1.5rem] w-[1.5rem] p-[5px] rounded flex justify-center items-center"
                            style={{ backgroundColor: column.bgColor }}
                        >
                            {localTasks.length}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button className="hover:bg-gray-800 p-1 rounded">+</button>
                        <button className="hover:bg-gray-800 p-1 rounded">
                            <Ellipsis size={22} />
                        </button>
                    </div>
                </div>
                <div className="body flex flex-col gap-4 p-4 overflow-y-auto no-scrollbar h-[calc(100%-4rem)]">
                    {localTasks.map((task, index) => (
                        <div
                            key={task.id}
                            onClick={() => openModal(task)}
                            className="cursor-pointer"
                        >
                            <Card
                                task={task}
                                bgColor={column.bgColor}
                                bgDotColor={column.bgDotColor}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <TaskModal
                task={selectedTask}
                isOpen={isModalOpen}
                onClose={closeModal}
                columns={columns}
                onStatusChange={handleStatusChange}
                onDeleteTask={handleDeleteTask}
            />
        </div>
    );
};

export default Column;
