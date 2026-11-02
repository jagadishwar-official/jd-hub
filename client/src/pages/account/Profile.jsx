
import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { User, Mail } from "lucide-react";

function Profile() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.displayName || "");
    const [message, setMessage] = useState("");

    useEffect(() => {
        setName(user?.displayName || "");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(auth.currentUser, { displayName: name });
            setMessage("Profile updated successfully!");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold text-blue-950">My Profile</h1>
                <p className="mt-2 text-gray-500">View and update your account details.</p>

                <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4 border-b pb-6">
                        <div className="rounded-full bg-blue-100 p-4 text-blue-700">
                            <User size={35} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-blue-950">{user?.displayName || "User"}</h2>
                            <p className="text-gray-500">{user?.email}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <div>
                            <label className="mb-2 block font-semibold text-gray-700">Full Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600" />
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold text-gray-700">Email Address</label>
                            <div className="flex items-center gap-3 rounded-lg border bg-gray-100 px-4 py-3 text-gray-500">
                                <Mail size={19} />
                                <input type="email" value={user?.email || ""} disabled className="w-full bg-transparent outline-none" />
                            </div>
                        </div>

                        {message && <p className="text-sm text-blue-700">{message}</p>}

                        <button type="submit" className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;
