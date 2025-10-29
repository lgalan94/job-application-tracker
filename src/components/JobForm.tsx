import React, { useState, useEffect } from 'react';
import type { JobApplication } from '../types';
import { APPLICATION_STATUSES } from '../constants';
import { TrashIcon } from './icons/TrashIcon';

interface JobFormProps {
  application?: JobApplication | null;
  onSave: (application: JobApplication) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export const JobForm: React.FC<JobFormProps> = ({
  application,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Omit<JobApplication, '_id'>>({
    company: '',
    title: '',
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Applied', // ✅ use string literal instead of enum
    url: '',
    notes: '',
    resumeUsed: '',
    tags: [],
    user: '',
  });

  useEffect(() => {
    if (application) {
      setFormData({
        ...application,
        appliedDate: application.appliedDate
          ? new Date(application.appliedDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        tags: application.tags || [],
      });
    }
  }, [application]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'tags' ? value.split(',').map((tag) => tag.trim()) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApplication: JobApplication = {
      _id: application?._id, // ✅ keep undefined for new ones
      ...formData,
    };
    onSave(newApplication);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {application ? 'Edit Job' : 'Add New Job'}
      </h2>

      {/* Company */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Company
        </label>
        <input
          type="text"
          name="company"
          id="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Job Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
        />
      </div>

      {/* Date + Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="appliedDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Applied Date
          </label>
          <input
            type="date"
            name="appliedDate"
            id="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md"
          >
            {APPLICATION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* URL */}
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Job Posting URL
        </label>
        <input
          type="url"
          name="url"
          id="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://..."
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
        />
      </div>

      {/* Resume Used */}
      <div>
        <label
          htmlFor="resumeUsed"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Resume Used
        </label>
        <input
          type="text"
          name="resumeUsed"
          id="resumeUsed"
          value={formData.resumeUsed}
          onChange={handleChange}
          placeholder="e.g., Resume_V2.pdf"
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
        />
      </div>

      {/* Tags */}
      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Tags (comma separated)
        </label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={(formData.tags ?? []).join(', ')}
          onChange={handleChange}
          placeholder="e.g., remote, frontend, urgent"
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
        />
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
