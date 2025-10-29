// =============================
// 👤 AUTH TYPES
// =============================
export interface User {
  _id?: string;
  name: string;
  email: string;
  token?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

// =============================
// 💼 JOB TYPES
// =============================

// ✅ Matches your Mongoose model enum
export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Hired";

export interface JobApplication {
  _id?: string;
  user: string; // user ID reference
  company: string;
  title: string;
  status: ApplicationStatus;
  appliedDate?: string; // ISO date from backend
  url?: string;
  notes?: string;
  resumeUsed?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}
