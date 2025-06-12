
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem("access-token");

  if (loading) return <div>Loading...</div>;

  if (user && token) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
