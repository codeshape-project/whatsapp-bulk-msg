import { createContext, useContext, useState } from "react";

// Simple demo auth: any email/password is accepted. No real validation.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cs_user"));
    } catch {
      return null;
    }
  });

  const login = (email, remember = true) => {
    const u = { email: email || "admin@codeshape.com", name: "Admin Panel", role: "Administrator" };
    setUser(u);
    if (remember) localStorage.setItem("cs_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cs_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
