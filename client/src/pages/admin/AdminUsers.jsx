
import { useState } from "react";

function AdminUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "Arun Kumar", email: "arun@gmail.com", role: "Customer", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya@gmail.com", role: "Customer", status: "Active" },
    { id: 3, name: "Rahul Kumar", email: "rahul@gmail.com", role: "Customer", status: "Blocked" },
    { id: 4, name: "Sneha R", email: "sneha@gmail.com", role: "Admin", status: "Active" },
  ]);

  function changeStatus(id) {
    setUsers(users.map((user) => user.id === id ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" } : user));
  }

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-700">JD Hub / Admin</p>
            <h1 className="mt-2 text-3xl font-bold text-blue-950">Users Management</h1>
            <p className="mt-2 text-gray-500">Manage your customers and their accounts.</p>
          </div>
          <div className="rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white">Admin Dashboard</div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-950">{users.length}</h2>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Active Users</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">{users.filter((user) => user.status === "Active").length}</h2>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Blocked Users</p>
            <h2 className="mt-2 text-3xl font-bold text-red-500">{users.filter((user) => user.status === "Blocked").length}</h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-5">
            <div>
              <h2 className="text-xl font-bold text-blue-950">All Users</h2>
              <p className="mt-1 text-sm text-gray-500">View and manage registered accounts.</p>
            </div>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or email..." className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:w-72" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-blue-50 text-blue-950">
                <tr>
                  <th className="px-5 py-4 font-semibold">User</th>
                  <th className="px-5 py-4 font-semibold">Role</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-blue-50/50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="mt-1 text-gray-500">{user.email}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{user.role}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{user.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => changeStatus(user.id)} className={`rounded-lg px-4 py-2 text-xs font-semibold ${user.status === "Active" ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-700 hover:bg-green-100"}`}>{user.status === "Active" ? "Block" : "Unblock"}</button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && <tr><td colSpan="4" className="px-5 py-10 text-center text-gray-500">No users found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminUsers;
