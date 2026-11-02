
import { useState } from "react";
import { Link } from "react-router-dom";

function MoreDropdown() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-1 text-gray-700">
                More <span>⌄</span>
            </button>

            {open && (
                <div className="absolute right-0 top-8 z-50 w-48 rounded-md bg-white p-2 shadow-md">
                    <Link to="/profile" onClick={() => setOpen(false)} className="block rounded-md p-2 hover:bg-gray-100">My Profile</Link>
                    <Link to="/orders" onClick={() => setOpen(false)} className="block rounded-md p-2 hover:bg-gray-100">My Orders</Link>
                    <Link to="/notifications" onClick={() => setOpen(false)} className="block rounded-md p-2 hover:bg-gray-100">Notifications</Link>
                    <Link to="/help" onClick={() => setOpen(false)} className="block rounded-md p-2 hover:bg-gray-100">Help & Support</Link>
                </div>
            )}
        </div>
    );
}

export default MoreDropdown;
