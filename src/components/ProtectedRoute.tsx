import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type React from "react";

interface ProtectedProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedProps) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
