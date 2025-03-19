"use client";
import userIcon from '../Assests/merge.png'
import Image from "next/image";
import { useState } from "react";


type BoardProps = {
    role: string;
  };

const Board = ({ role }: BoardProps) => {
    const [data, setData] = useState();

    return (
        <div className="text-white h-[100vh] bg-[#1F2024] flex flex-col items-center">

            <div className="header border-b  py-[0.5rem] px-[2rem] border-[white] flex items-center justify-between w-[95%]">
                <div className="Logo text-[2rem] font-bold">
                    Bug Tracker
                </div>
                <div className="utility flex gap-[0.5rem]">
                    <input type="text" placeholder="Search for bugs" className="w-[25rem] border py-[.4rem] px-[1rem] rounded-md" />
                    <div ><Image src={userIcon} className="w-[2rem] h-auto" alt="placeholderIcon" /></div>
                </div>
            </div>
            <h1>Welcome, {role === 'developer' ? 'Developer' : 'Manager'}!</h1>
            <div className="flex gap-[2rem] overflow-x-scroll no-scrollbar w-[88%] mt-[2rem]">

               

            </div>
        </div>
    )
}
export default Board

