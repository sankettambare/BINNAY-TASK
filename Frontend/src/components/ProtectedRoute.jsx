import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, role } = useContext(AuthContext);

  if (!token || role !== "admin") return <Navigate to="/login" />;
  return children;
}
