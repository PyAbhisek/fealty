"use client";
import userIcon from '../Assests/merge.png';
import Image from "next/image";
import { useContext, useState } from "react";
import Column from './Column';
import { AppContext } from '../context/contextProvider';
import NewBugPopup from './NewBugPopup';

type BoardProps = {
    role: string;
};

const Board = ({ role }: BoardProps) => {
    const context = useContext(AppContext);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    if (!context) {
        throw new Error("AppContext must be used within a AppContextProvider");
    }
    const { data, setData } = context;

    const handleTaskMove = (
        taskId: string,
        sourceColumnId: keyof typeof data.columns,
        targetColumnId: string,
        title: string,
        description: string
    ) => {

        // Update the task with new properties
        const updatedTask = {
            ...data.tasks[taskId],
            status: targetColumnId || sourceColumnId,
            content: title,
            description: description
        };

        // Create a copy of the data object
        const newData = {
            ...data,
            tasks: {
                ...data.tasks,
                [taskId]: updatedTask,
            }
        };

        // Only update columns if the status actually changed
        if (sourceColumnId !== targetColumnId) {
            if (data.columns[sourceColumnId] && data.columns[targetColumnId]) {
                newData.columns = {
                    ...data.columns,
                    [sourceColumnId]: {
                        ...data.columns[sourceColumnId],
                        taskIds: data.columns[sourceColumnId].taskIds.filter((id: string) => id !== taskId),
                    },
                    [targetColumnId]: {
                        ...data.columns[targetColumnId],
                        taskIds: data.columns[targetColumnId].taskIds.includes(taskId)
                            ? data.columns[targetColumnId].taskIds
                            : [...data.columns[targetColumnId].taskIds, taskId],
                    },
                };
            }
        }

        setData(newData);
    };

    const handleTaskDelete = (taskId: string, columnId: string) => {
        console.log("Deleting task:", taskId, "from column:", columnId);


        const { [taskId]: deletedTask, ...remainingTasks } = data.tasks;


        const updatedColumns = { ...data.columns };

        if (updatedColumns[columnId]) {
            updatedColumns[columnId] = {
                ...updatedColumns[columnId],
                taskIds: updatedColumns[columnId].taskIds.filter((id: string) => id !== taskId)
            };
        }

        const newData = {
            ...data,
            tasks: remainingTasks,
            columns: updatedColumns
        };
        setData(newData);
    };


    const handleAddTask = (task: {
        content: string;
        description: string;
        assignee: string;
        priority: string;
    }) => {
        const newTaskId = `task-${Date.now()}`;

        const newTask = {
            id: newTaskId,
            content: task.content,
            description: task.description,
            status: "pending",
            assignee: task.assignee,
            date: new Date().toISOString().split('T')[0],
            priority: task.priority,
            priorityColor: task.priority === "High"
                ? "rgb(220, 53, 69)"
                : task.priority === "Medium"
                    ? "rgb(255, 153, 51)"
                    : "rgb(29, 77, 45)",
            comments: [],
            attachments: 0
        };

        const newData = {
            ...data,
            tasks: {
                ...data.tasks,
                [newTaskId]: newTask,
            },
            columns: {
                ...data.columns,
                pending: {
                    ...data.columns.pending,
                    taskIds: [...data.columns.pending.taskIds, newTaskId],
                },
            },
        };

        setData(newData);
    };

    return (
        <div className="text-white h-[100vh] bg-[#1F2024] flex flex-col  items-center">
            <div className="header border-b py-[0.5rem] px-[2rem] border-[white] flex items-center justify-between w-[95%]">
                <div className="Logo text-[2rem] font-bold">
                    Bug Tracker
                </div>
                <div className="utility flex gap-[0.5rem] items-center">
                    <div className="flex items-center justify-between ">
                        <div className="flex gap-2">
                            <button    onClick={() => setIsPopupOpen(true)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors flex items-center gap-1">
                                <span>+</span> New Bug
                            </button>
                            <select className="px-3 py-1 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500">
                                <option value="all">All Bugs</option>
                                <option value="my">My Bugs</option>
                                <option value="unassigned">Unassigned</option>
                            </select>
                        </div>
                    </div>

                    <input
                        type="text"
                        placeholder="Search for bugs"
                        className="w-[25rem] border py-[.4rem] px-[1rem] rounded-md bg-transparent border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <div className="ml-2">
                        <Image src={userIcon} className="w-[2rem] h-auto rounded-full" alt="User" />
                    </div>
                </div>
            </div>



            <div className="flex gap-[2rem] overflow-x-auto no-scrollbar w-[88%] mt-[2rem] pb-4">
                {data.columnOrder.map((columnId: any) => {
                    const column = data.columns[columnId];
                    return (
                        <Column
                            key={column.id}
                            column={column}
                            tasks={data.tasks}
                            columns={data.columns}
                            onTaskMove={handleTaskMove}
                            onTaskDelete={handleTaskDelete}
                        />
                    );
                })}
            </div>

            {isPopupOpen && (
                <NewBugPopup
                    onClose={() => setIsPopupOpen(false)}
                    onSubmit={handleAddTask}
                />
            )}
        </div>



    );
};

export default Board;