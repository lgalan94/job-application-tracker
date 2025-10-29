import type { ApplicationStatus } from "./types";

// All valid statuses (matching your backend schema)
export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "Hired",
];

// Tailwind-based colors per status (light + dark mode friendly)
export const STATUS_COLORS: Record<
  ApplicationStatus,
  { bg: string; text: string }
> = {
  Applied: {
    bg: "bg-blue-100 dark:bg-blue-900/50",
    text: "text-blue-800 dark:text-blue-300",
  },
  Interview: {
    bg: "bg-yellow-100 dark:bg-yellow-900/50",
    text: "text-yellow-800 dark:text-yellow-300",
  },
  Offer: {
    bg: "bg-green-100 dark:bg-green-900/50",
    text: "text-green-800 dark:text-green-300",
  },
  Rejected: {
    bg: "bg-red-100 dark:bg-red-900/50",
    text: "text-red-800 dark:text-red-300",
  },
  Hired: {
    bg: "bg-indigo-100 dark:bg-indigo-900/50",
    text: "text-indigo-800 dark:text-indigo-300",
  },
};
