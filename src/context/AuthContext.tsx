import React, { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useData } from "./DataContext";

interface AuthContextType {
  isAuthenticated: boolean;
  adminEmail: string | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AUTH_KEY = "classic_crush_admin_session";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useData();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(`${AUTH_KEY}_email`) || (sessionStorage.getItem(AUTH_KEY) === "true" ? settings.email : null);
    } catch {
      return null;
    }
  });

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const targetEmail = settings.email.trim().toLowerCase();

    if (cleanEmail === targetEmail && password === settings.passwordHash) {
      setIsAuthenticated(true);
      setAdminEmail(cleanEmail);
      try {
        sessionStorage.setItem(AUTH_KEY, "true");
        sessionStorage.setItem(`${AUTH_KEY}_email`, cleanEmail);
      } catch {}
      return { success: true };
    }

    return { success: false, error: "Invalid email or password. Please verify your credentials." };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminEmail(null);
    try {
      sessionStorage.removeItem(AUTH_KEY);
      sessionStorage.removeItem(`${AUTH_KEY}_email`);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
