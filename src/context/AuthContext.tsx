import { createContext, useState, useEffect, type ReactNode } from "react";
import api from "../services/api";
import type { AuthContextType, User } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/users/login", { email, password });
      // ✅ Expect backend returns { token, user: { username, email, _id } }
      const { token, user: userInfo } = res.data;

      const userData: User = {
        id: userInfo._id,
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

  const register = async (username: string, email: string, password: string) => {
    try {
      const res = await api.post("/users/register", { username, email, password });
      // ✅ Expect backend returns { token, user: { username, email, _id } }
      const { token, user: userInfo } = res.data;

      const userData: User = {
        id: userInfo._id,
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
