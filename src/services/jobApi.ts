
import api from "./api"; 

export const getJobs = async () => {
  const res = await api.get("/job-applications");
  return res.data;
};

export const getJobById = async (id: string) => {
  const res = await api.get(`/job-applications/${id}`);
  return res.data;
};

export const createJob = async (jobData: any) => {
  const res = await api.post("/job-applications", jobData);
  return res.data;
};

export const updateJob = async (id: string, jobData: any) => {
  const res = await api.put(`/job-applications/${id}`, jobData);
  return res.data;
};

export const deleteJob = async (id: string) => {
  const res = await api.delete(`/job-applications/${id}`);
  return res.data;
};
