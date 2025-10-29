import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Board } from "../components/Board";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { JobForm } from "../components/JobForm";
import { JobDetails } from "../components/JobDetails";
import { PlusIcon } from "../components/icons/PlusIcon";
import { useAuth } from "../hooks/useAuth";
import type { JobApplication, ApplicationStatus } from "../types";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../services/jobApi";

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
        const data = await getJobs();
        setApplications(data);
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

  // ✅ Create or Update Job
  const handleSaveApplication = async (app: JobApplication) => {
    try {
      if (editingApplication?._id) {
        const updated = await updateJob(editingApplication._id, app);
        setApplications((prev) =>
          prev.map((a) => (a._id === updated._id ? updated : a))
        );
      } else {
        const newJob = await createJob(app);
        setApplications((prev) => [...prev, newJob]);
      }
      closeModal();
    } catch (err) {
      console.error("Error saving application:", err);
    }
  };

  // ✅ Delete Job
  const handleDeleteApplication = async (id: string) => {
    try {
      await deleteJob(id);
      setApplications((prev) => prev.filter((a) => a._id !== id));
      closeModal();
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  // ✅ Handle Drag-and-Drop Status Change
  const handleStatusChange = useCallback(
    async (id: string, newStatus: ApplicationStatus) => {
      try {
        const job = applications.find((a) => a._id === id);
        if (!job) return;

        const updated = await updateJob(id, { ...job, status: newStatus });
        setApplications((prev) =>
          prev.map((a) => (a._id === id ? updated : a))
        );
      } catch (err) {
        console.error("Error updating status:", err);
      }
    },
    [applications]
  );

  return (
    <>
      <motion.div
        className="min-h-screen mt-10 font-sans text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Header user={user} onLogout={logout} />

        <motion.main
          className="p-4 sm:p-6 lg:p-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Add Button */}
          <motion.div
            className="flex justify-end my-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <motion.button
              onClick={openAddModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <PlusIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Add Application</span>
              <span className="inline sm:hidden">New</span>
            </motion.button>
          </motion.div>

          {/* Job Board */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            <Board
              applications={applications}
              onStatusChange={handleStatusChange}
              onViewDetails={openViewModal}
            />
          </motion.div>
        </motion.main>

        {/* Modal Animation */}
        <AnimatePresence>
          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {viewingApplication ? (
                  <JobDetails
                    application={viewingApplication}
                    onEdit={() => openEditModal(viewingApplication)}
                    onDelete={() =>
                      handleDeleteApplication(viewingApplication._id!)
                    }
                    onClose={closeModal}
                  />
                ) : (
                  <JobForm
                    application={editingApplication}
                    onSave={handleSaveApplication}
                    onCancel={closeModal}
                    onDelete={
                      editingApplication
                        ? () =>
                            handleDeleteApplication(editingApplication._id!)
                        : undefined
                    }
                  />
                )}
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>
      </motion.div>

      <Footer />
    </>
  );
};

export default Dashboard;
