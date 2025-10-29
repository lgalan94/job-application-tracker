import { createContext, useState, useEffect, type ReactNode } from "react";
import api from "../services/api";
import type { AuthContextType, User } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const token = user?.token || null;

  // ✅ Login user
  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/users/login", { email, password });
      // Backend expected response: { token, user: { _id, name, email } }
      const { token, user: userInfo } = res.data;

      const userData: User = {
        _id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
        token,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err;
    }
  };

  // ✅ Register new user
  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await api.post("/users/register", { name, email, password });
      const { token, user: userInfo } = res.data;

      const userData: User = {
        _id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
        token,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err: any) {
      console.error("Registration failed:", err.response?.data || err.message);
      throw err;
    }
  };

  // ✅ Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ✅ Auto-restore user session on app load
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
