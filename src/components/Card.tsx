import React from 'react';
import type { JobApplication } from '../types';

interface CardProps {
  application: JobApplication;
  onViewDetails: () => void;
}

export const Card: React.FC<CardProps> = ({ application, onViewDetails }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Always use backend _id for drag data (MongoDB)
    if (application._id) {
      e.dataTransfer.setData('applicationId', application._id);
    }
  };

  const formattedDate = application.appliedDate
    ? new Date(application.appliedDate).toLocaleDateString()
    : 'N/A';

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={onViewDetails}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-l-4 border-indigo-500"
    >
      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
        {application.company}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{application.title}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Applied on: {formattedDate}
      </p>
    </div>
  );
};
