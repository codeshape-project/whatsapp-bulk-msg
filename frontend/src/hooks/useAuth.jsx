// import { createContext, useContext, useState } from "react";

// // Simple demo auth: any email/password is accepted. No real validation.
// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("cs_user"));
//     } catch {
//       return null;
//     }
//   });

//   const login = (email, remember = true) => {
//     const u = { email: email || "admin@codeshape.com", name: "Admin Panel", role: "Administrator" };
//     setUser(u);
//     if (remember) localStorage.setItem("cs_user", JSON.stringify(u));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("cs_user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState } from "react";
import { ORGANIZATIONS } from "../data/dummyData";

const AuthContext = createContext(null);
const readUser = () => {
  try { return JSON.parse(localStorage.getItem("cs_user")); } catch { return null; }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);
  const login = (email, remember = true, organizationId = ORGANIZATIONS[0].id) => {
    const organization = ORGANIZATIONS.find((item) => item.id === organizationId) || ORGANIZATIONS[0];
    const u = { email: email || "admin@codeshape.com", name: "Admin Panel", role: "Organization Administrator", organizationId: organization.id, organizationIds: ORGANIZATIONS.map((item) => item.id) };
    setUser(u);
    if (remember) localStorage.setItem("cs_user", JSON.stringify(u));
  };
  const switchOrganization = (organizationId) => {
    if (!user || !user.organizationIds?.includes(organizationId)) return;
    const next = { ...user, organizationId };
    setUser(next);
    localStorage.setItem("cs_user", JSON.stringify(next));
    // Reload the current page so all demo pages re-read organization-scoped state.
    window.dispatchEvent(new CustomEvent("organization-changed", { detail: organizationId }));
  };
  const logout = () => { setUser(null); localStorage.removeItem("cs_user"); };
  const organization = ORGANIZATIONS.find((item) => item.id === user?.organizationId) || ORGANIZATIONS[0];
  return <AuthContext.Provider value={{ user, organization, organizations: ORGANIZATIONS.filter((item) => user?.organizationIds?.includes(item.id)), isAuthenticated: !!user, login, logout, switchOrganization }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
