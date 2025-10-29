
import React from 'react';
import { Column } from './Column';
import type { ApplicationStatus, JobApplication } from '../types';
import { APPLICATION_STATUSES } from '../constants';

interface BoardProps {
  applications: JobApplication[];
  onStatusChange: (id: string, newStatus: ApplicationStatus) => void;
  onViewDetails: (app: JobApplication) => void;
}

export const Board: React.FC<BoardProps> = ({ applications, onStatusChange, onViewDetails }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: ApplicationStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('applicationId');
    if (id) {
      onStatusChange(id, newStatus);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {APPLICATION_STATUSES.map(status => (
        <Column
          key={status}
          status={status}
          applications={applications.filter(app => app.status === status)}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};
