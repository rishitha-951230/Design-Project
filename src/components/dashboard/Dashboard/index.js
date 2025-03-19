import React, { useState } from 'react';

function Dashboard({ tasks }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  
  const metrics = {
    totalTasks: {
      value: tasks.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    completedTasks: {
      value: tasks.filter(task => task.completed).length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    todaysTasks: {
      value: tasks.filter(task => task.dueDate === today).length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    todaysCompleted: {
      value: tasks.filter(task => task.dueDate === today && task.completed).length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        </svg>
      )
    },
    highPriority: {
      value: tasks.filter(task => task.priority === 'high').length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    overdueTasks: {
      value: tasks.filter(task => task.dueDate && !task.completed && new Date(task.dueDate) < new Date(today)).length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  };

  const MetricCard = ({ title, data, color }) => (
    <div className={`transform transition-all duration-200 hover:scale-105 
      bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-sm rounded-xl p-6 
      shadow-lg hover:shadow-xl ${color}`}>
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${color.replace('border-l-4', 'bg-opacity-10')} ${color.replace('border-l-4 border-', 'bg-')}`}>
          {data.icon}
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-800">{data.value}</p>
          <p className="text-sm text-gray-500 mt-1">{title}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="h-1 w-full bg-gray-200 rounded-full">
          <div 
            className={`h-1 rounded-full ${color.replace('border-l-4 border-', 'bg-')}`}
            style={{ width: `${(data.value / Math.max(tasks.length, 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-white/90 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
      >
        <div className="flex items-center space-x-2">
          <svg 
            className={`w-5 h-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-700">Dashboard Metrics</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{tasks.length} total tasks</span>
          <span>•</span>
          <span>{metrics.completedTasks.value} completed</span>
        </div>
      </button>

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-500 ease-in-out
        ${isExpanded ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <MetricCard 
          title="Today's Tasks" 
          data={metrics.todaysTasks}
          color="border-l-4 border-blue-500"
        />
        <MetricCard 
          title="Today's Completed" 
          data={metrics.todaysCompleted}
          color="border-l-4 border-green-500"
        />
        <MetricCard 
          title="High Priority" 
          data={metrics.highPriority}
          color="border-l-4 border-red-500"
        />
        <MetricCard 
          title="Total Tasks" 
          data={metrics.totalTasks}
          color="border-l-4 border-purple-500"
        />
        <MetricCard 
          title="Total Completed" 
          data={metrics.completedTasks}
          color="border-l-4 border-emerald-500"
        />
        <MetricCard 
          title="Overdue Tasks" 
          data={metrics.overdueTasks}
          color="border-l-4 border-orange-500"
        />
      </div>
    </div>
  );
}

export default Dashboard; 