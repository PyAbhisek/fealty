"use client";
import userIcon from '../Assests/merge.png';
import Image from "next/image";
import { useContext, useState } from "react";
import Column from './Column';
import { AppContext } from '../context/contextProvider';

type BoardProps = {
    role: string;
};

const Board = ({ role }: BoardProps) => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("AppContext must be used within a AppContextProvider");
    }
    const {data,setData} = context
;

    const handleTaskMove = (
        taskId: string,
        sourceColumnId: keyof typeof data.columns,
        targetColumnId: string
    ) => {
        console.log(taskId, sourceColumnId, targetColumnId, data, data.tasks[taskId].status);
    
        const updatedTask = {
            ...data.tasks[taskId],
            status: targetColumnId, 
        };
       
        console.log(updatedTask,"updatedTask")
        const newColumns = {
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
        console.log(newColumns,"newcol")
    
        const newData = {
            ...data,
            tasks: {
                ...data.tasks,
                [taskId]: updatedTask,
            },
            columns: newColumns,
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

            <div className="flex items-center justify-between w-[88%] mt-4">
                <h1 className="text-xl font-bold">Welcome, {role === 'developer' ? 'Developer' : 'Manager'}!</h1>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors flex items-center gap-1">
                        <span>+</span> New Bug
                    </button>
                    <select className="px-3 py-1 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500">
                        <option value="all">All Bugs</option>
                        <option value="my">My Bugs</option>
                        <option value="unassigned">Unassigned</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-[2rem] overflow-x-auto no-scrollbar w-[88%] mt-[2rem] pb-4">
                {data.columnOrder.map((columnId:any) => {
                    const column = data.columns[columnId];
                    return (
                        <Column
                            key={column.id}
                            column={column}
                            tasks={data.tasks}
                            columns={data.columns}
                            onTaskMove={handleTaskMove}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Board;