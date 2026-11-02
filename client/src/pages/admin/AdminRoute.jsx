
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminRoute({ children }) {
    const { user, dbUser, loading } = useAuth();

    if (loading) return <p className="p-8 text-center">Loading...</p>;
    if (!user) return <Navigate to="/login" replace />;
    if (!dbUser) return <p className="p-8 text-center">User profile not found.</p>;
    if (dbUser.role !== "admin") return <Navigate to="/unauthorized" replace />;

    return children;
}

export default AdminRoute;
