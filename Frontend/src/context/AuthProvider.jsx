import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: null,
    role: null,
    loading: true,
  });

  // 🔹 Initialize auth ONCE
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuth({
      token,
      role,
      loading: false,
    });
  }, []);

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setAuth({
      token,
      role,
      loading: false,
    });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({
      token: null,
      role: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: auth.token,
        role: auth.role,
        loading: auth.loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
