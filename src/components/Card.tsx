import React, { useState } from 'react';
import type { JobApplication } from '../types';

interface CardProps {
  application: JobApplication;
  onViewDetails: () => void;
}

export const Card: React.FC<CardProps> = ({ application, onViewDetails }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (application._id) e.dataTransfer.setData('applicationId', application._id);
    setIsDragging(true);
  };

  const handleDragEnd = () => setIsDragging(false);

  const formattedDate = application.appliedDate
    ? new Date(application.appliedDate).toLocaleDateString()
    : 'N/A';

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={onViewDetails}
      className={`bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md cursor-pointer border-l-4 border-indigo-500 
        transition-all duration-200 
        hover:shadow-lg hover:-translate-y-1 
        ${isDragging ? 'scale-105 opacity-70 shadow-xl rotate-1' : ''}`}
    >
      <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
        {application.company}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
        {application.title}
      </p>
      <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-2">
        Applied on: {formattedDate}
      </p>
    </div>
  );
};
