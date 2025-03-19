import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { X } from 'lucide-react';

const chart = ({ isOpen, onClose, data }) => {
  const [trendData, setTrendData] = useState([]);
  
  useEffect(() => {
    if (!data || !data.tasks) return;
    
    // Process data to create daily trend
    const processData = () => {
      // Extract all dates from tasks
      const allDates = Object.values(data.tasks).map(task => task.date);
      
      // Sort dates and find the earliest and latest
      const sortedDates = [...new Set(allDates)].sort();
      if (sortedDates.length === 0) return [];
      
      const startDate = new Date(sortedDates[0]);
      const endDate = new Date(sortedDates[sortedDates.length - 1]);
      
      // Generate all dates between start and end
      const dateRange = [];
      const currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        dateRange.push(new Date(currentDate).toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      // Count tasks per day and by status
      return dateRange.map(date => {
        const tasksForDate = Object.values(data.tasks).filter(task => {
          return new Date(task.date) <= new Date(date);
        });
        
        const pending = tasksForDate.filter(task => task.status === 'Pending' || task.status === 'pending').length;
        const inProgress = tasksForDate.filter(task => task.status === 'In Progress' || task.status === 'in-progress').length;
        const review = tasksForDate.filter(task => task.status === 'Review' || task.status === 'review').length;
        const done = tasksForDate.filter(task => task.status === 'Done' || task.status === 'done').length;
        
        return {
          date,
          'Pending': pending,
          'In Progress': inProgress,
          'Review': review, 
          'Done': done,
        };
      });
    };
    
    setTrendData(processData());
  }, [data]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Bug Tracking Dashboard</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Concurrent Tasks Trend</h3>
          <div className="bg-gray-900 rounded-lg p-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#ccc' }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth()+1}/${date.getDate()}`;
                  }}
                />
                <YAxis tick={{ fill: '#ccc' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#333', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
               
                <Line type="monotone" dataKey="Pending" stroke="#FFC107" strokeWidth={2} />
                <Line type="monotone" dataKey="In Progress" stroke="#1EA0EC" strokeWidth={2} />
                <Line type="monotone" dataKey="Review" stroke="#FF5722" strokeWidth={2} />
                <Line type="monotone" dataKey="Done" stroke="#28A745" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(data.columns).map(([id, column]) => (
            <div 
              key={id}
              className="rounded-lg p-4"
              style={{ backgroundColor: column.bgColor }}
            >
              <div className="flex items-center mb-2">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: column.bgDotColor }}
                ></div>
                <h4 className="font-semibold text-white">{column.title}</h4>
              </div>
              <p className="text-2xl font-bold text-white">{column.taskIds.length}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default chart;