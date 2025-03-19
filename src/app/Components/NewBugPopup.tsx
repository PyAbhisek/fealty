import { useState } from 'react';

type NewBugPopupProps = {
    onClose: () => void;
    onSubmit: (task: {
        content: string;
        description: string;
        assignee: string;
        priority: string;
        comments: string[];
    }) => void;
};

const NewBugPopup = ({ onClose, onSubmit }: NewBugPopupProps) => {
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState<string[]>([]);

    const handleAddComment = () => {
        if (newComment.trim() === '') return;
        setComments((prev) => [...prev, newComment.trim()]);
        setNewComment('');
    };

    const handleSubmit = () => {
        if (!content || !description || !assignee) return;
        onSubmit({ content, description, assignee, priority, comments });
        onClose(); 
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#1F2024] p-6 rounded-lg w-[50%] max-w-[800px]">
                <h2 className="text-white text-lg font-bold mb-4">New Bug</h2>

                <div className="flex flex-col gap-3">
                  
                    <input
                        type="text"
                        placeholder="Title"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="px-3 py-2 bg-[#2A2C32] mb-6 rounded-md text-white border border-gray-800 focus:outline-none"
                    />
                    
                   
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="px-3 py-2 bg-[#2A2C32] mb-6 rounded-md text-white border border-gray-600 focus:outline-none h-[100px]"
                    />
                    
                  
                    <input
                        type="text"
                        placeholder="Assignee"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        className="px-3 py-2 bg-[#2A2C32] mb-6 rounded-md text-white border border-gray-600 focus:outline-none"
                    />
                    
                    
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="px-3 py-2 bg-[#2A2C32] mb-6 rounded-md text-white border border-gray-600 focus:outline-none"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    
                    <div className="flex flex-col gap-2">
                        <div className="flex mb-6 gap-2">
                            <input
                                type="text"
                                placeholder="Add Comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="px-3 py-2 bg-[#2A2C32]  rounded-md text-white border border-gray-600 focus:outline-none flex-1"
                            />
                            <button
                                onClick={handleAddComment}
                                className="px-3 py-2 bg-green-600 hover:bg-green-500 rounded-md text-white"
                            >
                                Add
                            </button>
                        </div>
                        <div className="max-h-[150px] overflow-y-auto bg-gray-900 p-2 rounded-md">
                            {comments.length > 0 ? (
                                comments.map((comment, index) => (
                                    <div key={index} className="text-white px-3 py-1 bg-[#2A2C32] rounded-md mb-1">
                                        {comment}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No comments yet</p>
                            )}
                        </div>
                    </div>

                    
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={onClose}
                            className="px-3 py-1 bg-gray-600 rounded-md text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-md text-white"
                        >
                            Add Bug
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewBugPopup;
