import { useState } from 'react'

function ProfileForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    alert('Profile updated successfully!')
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-black">My Profile</h2>
        <p className="text-sm text-slate-600">Update your personal information.</p>

        <div>
          <label className="mb-2 block text-sm font-medium text-black">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your full name" className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black">Phone Number</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black">Address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows="3" placeholder="Enter your address" className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600" />
        </div>

        <button type="submit" className="w-full rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default ProfileForm