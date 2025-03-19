import { useState } from "react";
import { Ellipsis } from "lucide-react";
import Card from "./Card";

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

interface ColumnProps {
  column: { id: string; title: string; bgColor: string; bgDotColor: string; taskIds: string[] };
  tasks: { [key: string]: Task };
}

const Column = ({ column, tasks }: ColumnProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="h-[80vh] w-80 relative bg-black text-white">
        <div className="header sticky top-0 bg-black p-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex gap-2 items-center font-bold text-[1.2rem]">
            <div className="h-[1rem] w-[1rem] rounded-full " style={{ backgroundColor: column.bgDotColor }}></div>
            {column.id} <span className=" h-[1.5rem] w-[1.5rem] p-[5px] rounded flex justify-center items-center" style={{ backgroundColor: column.bgColor }}>{column.taskIds.length}</span>
          </div>
          <div className="flex gap-2">
            <p>+</p>
            <button>
              <Ellipsis size={22} />
            </button>
          </div>
        </div>
        <div className="body flex flex-col gap-4 p-4 overflow-y-auto no-scrollbar h-[calc(100%-4rem)]">
          {column.taskIds.map((taskId, index) => (
            <div key={taskId} onClick={() => openModal(tasks[taskId])}>
              <Card task={tasks[taskId]} bgColor={column.bgColor} bgDotColor={column.bgDotColor} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedTask && (
        <div className="fixed z-[1000] inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1F2024] text-white p-6 rounded-lg w-[50%]">
            <h2 className="text-lg font-bold">{selectedTask.content}</h2>
            <p className="text-sm text-white">{selectedTask.description}</p>
            <div className="mt-4">
              <p className="flex items-center  gap-[10px]"><strong>Status:</strong>
                <div
                  className="status px-[0.5rem] py-[0.2rem] rounded-[5px]"
                  style={{ backgroundColor: `${column.bgColor}` }}
                >
                  <div className="flex items-center gap-[0.5rem]">
                    <p className="text-[0.9rem]">{selectedTask.status}</p>
                  </div>
                </div></p>
              <p><strong>Assignee:</strong> {selectedTask.assignee}</p>
              <p><strong>Date:</strong> {selectedTask.date}</p>
              <p><strong>Priority:</strong> <span className="px-[0.5rem] py-[0.2rem] rounded-sm text-white" style={{ background: selectedTask.priorityColor }}>{selectedTask.priority}</span></p>
              <p><strong>Comments:</strong> {selectedTask.comments.map((comment: string) => {
                return (
                  <div>
                    <p>{comment}</p>
                  </div>
                )
              })}</p>
              <p><strong>Attachments:</strong> {selectedTask.attachments}</p>
            </div>
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column;
