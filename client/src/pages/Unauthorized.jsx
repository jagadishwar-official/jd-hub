
import { useNavigate } from "react-router-dom";

function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
                <div className="mb-4 text-6xl">🔒</div>
                <h1 className="text-3xl font-bold text-blue-950">Access Denied</h1>
                <p className="mt-3 text-gray-600">Sorry! You don't have permission to access this page.</p>
                <button onClick={() => navigate("/")} className="mt-6 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800">Back to Home</button>
            </div>
        </div>
    );
}

export default Unauthorized;
