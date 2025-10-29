import React from 'react';
import type { JobApplication, ApplicationStatus } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { STATUS_COLORS } from '../constants';

interface JobDetailsProps {
  application: JobApplication;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const JobDetails: React.FC<JobDetailsProps> = ({ application, onEdit, onDelete, onClose }) => {
  const status = application.status as ApplicationStatus;
  const { bg, text } = STATUS_COLORS[status] || {
    bg: 'bg-gray-100 dark:bg-gray-700',
    text: 'text-gray-800 dark:text-gray-300',
  };

  const formattedNotes = application.notes?.replace(/\n/g, '<br />');
  const formattedDate = application.appliedDate
    ? new Date(application.appliedDate).toLocaleDateString()
    : 'N/A';

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{application.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">{application.company}</p>
          <div className="mt-2 flex items-center gap-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bg} ${text}`}>
              {application.status}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Applied on: {formattedDate}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-full"
          >
            <EditIcon className="w-5 h-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {application.url && (
        <div>
          <a
            href={application.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View Job Posting
          </a>
        </div>
      )}

      {application.resumeUsed && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Resume Used:</strong> {application.resumeUsed}
        </p>
      )}

      {application.tags && application.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {application.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {application.notes && (
        <div className="prose prose-sm dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <h3 className="text-base font-semibold !mt-0">Notes</h3>
          <p className="!mt-2" dangerouslySetInnerHTML={{ __html: formattedNotes || '' }} />
        </div>
      )}

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow-sm hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};
