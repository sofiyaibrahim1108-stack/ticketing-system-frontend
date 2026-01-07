import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRole }) {
  const authToken = localStorage.getItem("authToken");
  const role = localStorage.getItem("role")?.toLowerCase();

  // Not logged in
  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch
  if (allowedRole && role !== allowedRole) {
    return role === "admin"
      ? <Navigate to="/admindashboard" replace />
      : <Navigate to="/userdashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
