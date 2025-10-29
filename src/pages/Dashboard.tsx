import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Board } from "../components/Board";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { JobForm } from "../components/JobForm";
import { JobDetails } from "../components/JobDetails";
import type { JobApplication, ApplicationStatus } from "../types";
import { useAuth } from "../hooks/useAuth"; // ✅ Uses your AuthContext

const API_URL = "http://localhost:4002/api/job-applications/";

const Dashboard: React.FC = () => {
  const { user, token, logout } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] =
    useState<JobApplication | null>(null);
  const [viewingApplication, setViewingApplication] =
    useState<JobApplication | null>(null);

  // ✅ Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };
    if (token) fetchApplications();
  }, [token]);

  // ✅ Modal Controls
  const openAddModal = () => {
    setEditingApplication(null);
    setViewingApplication(null);
    setIsModalOpen(true);
  };

  const openEditModal = (app: JobApplication) => {
    setViewingApplication(null);
    setEditingApplication(app);
    setIsModalOpen(true);
  };

  const openViewModal = (app: JobApplication) => {
    setEditingApplication(null);
    setViewingApplication(app);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingApplication(null);
    setViewingApplication(null);
  };

  // ✅ Create or Update
  const handleSaveApplication = async (app: JobApplication) => {
    try {
      if (editingApplication?._id) {
        const res = await axios.put(`${API_URL}${editingApplication._id}`, app, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications((prev) =>
          prev.map((a) => (a._id === res.data._id ? res.data : a))
        );
      } else {
        const res = await axios.post(API_URL, app, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications((prev) => [...prev, res.data]);
      }
      closeModal();
    } catch (err) {
      console.error("Error saving application:", err);
    }
  };

  // ✅ Delete
  const handleDeleteApplication = async (id: string) => {
    try {
      await axios.delete(`${API_URL}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications((prev) => prev.filter((a) => a._id !== id));
      closeModal();
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  // ✅ Drag-and-drop Status Update
  const handleStatusChange = useCallback(
    async (id: string, newStatus: ApplicationStatus) => {
      try {
        const job = applications.find((a) => a._id === id);
        if (!job) return;

        const updated = { ...job, status: newStatus };
        const res = await axios.put(`${API_URL}${id}`, updated, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setApplications((prev) =>
          prev.map((a) => (a._id === id ? res.data : a))
        );
      } catch (err) {
        console.error("Error updating status:", err);
      }
    },
    [applications, token]
  );

  return (
    <>
      <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900">
      <Header onAddNew={openAddModal} user={user} onLogout={logout} />

      <main className="p-4 sm:p-6 lg:p-8">
        <Board
          applications={applications}
          onStatusChange={handleStatusChange}
          onViewDetails={openViewModal}
        />
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {viewingApplication ? (
          <JobDetails
            application={viewingApplication}
            onEdit={() => openEditModal(viewingApplication)}
            onDelete={() => handleDeleteApplication(viewingApplication._id!)}
            onClose={closeModal}
          />
        ) : (
          <JobForm
            application={editingApplication}
            onSave={handleSaveApplication}
            onCancel={closeModal}
            onDelete={
              editingApplication
                ? () => handleDeleteApplication(editingApplication._id!)
                : undefined
            }
          />
        )}
      </Modal>
    </div>
    <Footer />
    </>
  );
};

export default Dashboard;
