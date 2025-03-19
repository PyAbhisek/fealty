"use client";
import userIcon from '../Assests/merge.png';
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import Column from './Column';
import { AppContext } from '../context/contextProvider';
import NewBugPopup from './NewBugPopup';
import Chart from './Chart';
import { BarChart3 } from 'lucide-react';

interface Task {
  id: string;
  content: string;
  description: string;
  status: string;
  assignee: string;
  date: string;
  priority: string;
  priorityColor: string;
  comments: any[];
  attachments: number;
}

interface AppData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

type BoardProps = {
  role: string;
};

const Board = ({ role }: BoardProps) => {
    const context = useContext(AppContext);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [filteredData, setFilteredData] = useState<AppData | null>(null);
    const [dateFilter, setDateFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    
    if (!context) {
        throw new Error("AppContext must be used within a AppContextProvider");
    }
    const { data, setData } = context;

    // Apply filters whenever data or filter states change
    useEffect(() => {
        if (!data) return;
        
        let filteredResult = { ...data } as AppData;
        let filteredTasks = { ...data.tasks };
        
        
        // Filter by date
        if (dateFilter === "today") {
            const today = new Date().toISOString().split('T')[0];
            filteredTasks = Object.fromEntries(
                Object.entries(filteredTasks).filter(([_, task]) => (task as any).date === today)
            );
        } else if (dateFilter === "thisWeek") {
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
            
            filteredTasks = Object.fromEntries(
                Object.entries(filteredTasks).filter(([_, task]) => {
                    const taskDate = new Date((task as any).date);
                    return taskDate >= weekStart && taskDate <= today;
                })
            );
        } else if (dateFilter === "thisMonth") {
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            
            filteredTasks = Object.fromEntries(
                Object.entries(filteredTasks).filter(([_, task]) => {
                    const taskDate = new Date((task as any).date);
                    return taskDate >= monthStart && taskDate <= today;
                })
            );
        }
        
        // Filter by priority
        if (priorityFilter !== "all") {
            filteredTasks = Object.fromEntries(
                Object.entries(filteredTasks).filter(([_, task]) => (task as any).priority === priorityFilter)
            );
        }
        
        // Update column taskIds based on filtered tasks
        const updatedColumns = { ...data.columns };
        Object.keys(updatedColumns).forEach(columnId => {
            updatedColumns[columnId] = {
                ...updatedColumns[columnId],
                taskIds: updatedColumns[columnId].taskIds.filter((taskId: string) => 
                    taskId in filteredTasks
                )
            };
        });
        
        filteredResult.tasks = filteredTasks;
        filteredResult.columns = updatedColumns;
        
        setFilteredData(filteredResult);
    }, [data, dateFilter, priorityFilter]);

    const handleTaskMove = (
        taskId: string,
        sourceColumnId: string,
        targetColumnId: string,
        title: string,
        description: string
    ) => {
        if (!data || !data.tasks[taskId]) return;
        
        // Update the task with new properties
        const updatedTask: Task = {
            ...data.tasks[taskId],
            status: targetColumnId || sourceColumnId,
            content: title,
            description: description
        };

        // Create a copy of the data object
        const newData: AppData = {
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
        if (!data) return;
        
        console.log("Deleting task:", taskId, "from column:", columnId);

        const { [taskId]: deletedTask, ...remainingTasks } = data.tasks;

        const updatedColumns = { ...data.columns };

        if (updatedColumns[columnId]) {
            updatedColumns[columnId] = {
                ...updatedColumns[columnId],
                taskIds: updatedColumns[columnId].taskIds.filter((id: string) => id !== taskId)
            };
        }

        const newData: AppData = {
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
        if (!data) return;
        
        const newTaskId = `task-${Date.now()}`;

        const newTask: Task = {
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

        const newData: AppData = {
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
        <div className="text-white h-[100vh] bg-[#1F2024] flex flex-col items-center">
            <div className="header border-b py-[0.5rem] px-[2rem] border-[white] flex items-center justify-between w-[95%]">
                <div className="Logo text-[2rem] font-bold">
                    Bug Tracker
                </div>
                <div className="utility flex gap-[0.5rem] items-center">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                            <button onClick={() => setIsPopupOpen(true)}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors flex items-center gap-1">
                                <span>+</span> New Bug
                            </button>
                            
                            {/* Dashboard Button */}
                            <button 
                                onClick={() => setIsDashboardOpen(true)}
                                className="px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded-md transition-colors flex items-center gap-1"
                            >
                                <BarChart3 size={16} /> Dashboard
                            </button>
                            
                           
                            
                            {/* Date Filter */}
                            <select 
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="px-3 py-1 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="all">All Dates</option>
                                <option value="today">Today</option>
                                <option value="thisWeek">This Week</option>
                                <option value="thisMonth">This Month</option>
                            </select>
                            
                            {/* Priority Filter */}
                            <select 
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="px-3 py-1 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="all">All Priorities</option>
                                <option value="High">High Priority</option>
                                <option value="Medium">Medium Priority</option>
                                <option value="Low">Low Priority</option>
                            </select>
                        </div>
                    </div>

                    <div className="ml-2">
                        <Image src={userIcon} className="w-[2rem] h-auto rounded-full" alt="User" />
                    </div>
                </div>
            </div>

            <div className="flex gap-[2rem] overflow-x-auto no-scrollbar w-[88%] mt-[2rem] pb-4">
                {data && data.columnOrder.map((columnId: string) => {
                    const column = filteredData ? filteredData.columns[columnId] : data.columns[columnId];
                    if (!column) return null;
                    
                    return (
                        <Column
                            key={column.id}
                            column={column}
                            tasks={filteredData ? filteredData.tasks : data.tasks}
                            columns={filteredData ? filteredData.columns : data.columns}
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
            
            <Chart 
                isOpen={isDashboardOpen}
                onClose={() => setIsDashboardOpen(false)}
                data={data}
            />
        </div>
    );
};

export default Board;