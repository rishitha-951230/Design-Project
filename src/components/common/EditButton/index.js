import React from 'react';

function EditButton({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="p-2 text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
      title="Edit task"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
  );
}

export default EditButton; 