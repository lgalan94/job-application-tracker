import React from 'react';
import { Card } from './Card';
import type { ApplicationStatus, JobApplication } from '../types';
import { STATUS_COLORS } from '../constants';

interface ColumnProps {
  status: ApplicationStatus;
  applications: JobApplication[];
  onDrop: (e: React.DragEvent<HTMLDivElement>, status: ApplicationStatus) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onViewDetails: (app: JobApplication) => void;
}

export const Column: React.FC<ColumnProps> = ({
  status,
  applications,
  onDrop,
  onDragOver,
  onViewDetails,
}) => {
  const { bg, text } = STATUS_COLORS[status];
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop(e, status);
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDragOver(e);
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`rounded-xl p-4 transition-all duration-300 ${
        isDragOver ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
      } ${bg}`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-300 dark:border-gray-700">
        <h2 className={`font-bold text-lg ${text}`}>{status}</h2>
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${bg} ${text}`}>
          {applications.length}
        </span>
      </div>

      {/* Job Cards */}
      <div className="space-y-4 min-h-[200px]">
        {applications.length > 0 ? (
          applications.map((app) => (
            <Card
              key={app._id}
              application={app}
              onViewDetails={() => onViewDetails(app)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <p>Drag cards here</p>
          </div>
        )}
      </div>
    </div>
  );
};
