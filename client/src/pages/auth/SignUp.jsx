
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import API_URL from "../../config/api";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });

      const token = await userCredential.user.getIdToken();

      const response = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Account created successfully!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 p-8 sm:p-12 text-white flex flex-col justify-between">
          <div className="absolute -right-16 top-24 h-64 w-64 rounded-full border-[35px] border-white/10"></div>
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-yellow-400"></div>

          <a href="/" className="relative z-10 text-3xl font-bold">JD<span className="text-yellow-400">Hub</span></a>

          <div className="relative z-10 my-12">
            <span className="inline-block rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm">Your shopping adventure starts here</span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-bold leading-tight">Find things<br />you'll <span className="text-yellow-400">love.</span></h1>
            <p className="mt-5 max-w-sm text-blue-100 leading-7">Discover your favorites, save special finds, and enjoy a shopping experience made just for you.</p>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4">
              <div className="rounded-xl bg-yellow-400 p-3 text-3xl">🛍️</div>
              <div>
                <h3 className="font-bold">A little treat for you</h3>
                <p className="mt-1 text-sm text-blue-100">Great finds are waiting to be discovered.</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3 text-sm">
              <span className="rounded-full bg-white/10 px-4 py-2">♡ Wishlist</span>
              <span className="rounded-full bg-yellow-400/20 px-4 py-2 text-yellow-300">✦ Special offers</span>
            </div>
          </div>

          <p className="relative z-10 text-sm text-blue-200">Shop your way. Love every find.</p>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Get started today</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Create account<span className="text-yellow-500">.</span></h2>
            <p className="mt-3 mb-7 text-sm leading-6 text-gray-500">Join JD Hub and make your next shopping trip special.</p>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-700">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" required className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-700">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-700">Password</label>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold text-gray-700">Confirm Password</label>
              <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter your password again" required className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>

            <label className="mb-4 flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} className="h-4 w-4 accent-blue-700" />
              Show passwords
            </label>

            <label className="mb-5 flex items-start gap-2 text-xs leading-5 text-gray-500">
              <input type="checkbox" required className="mt-1 h-4 w-4 accent-blue-700" />
              <span>I agree to the <a href="#" className="font-semibold text-blue-700 hover:underline">Terms & Conditions</a> and Privacy Policy.</span>
            </label>

            <button type="submit" className="w-full rounded-xl bg-yellow-400 py-3.5 font-bold text-blue-950 transition hover:bg-yellow-300 hover:shadow-lg">Create My Account →</button>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <button type="button" onClick={() => alert("Google sign-in is not connected yet.")} className="w-full rounded-xl border border-gray-200 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-blue-50">Continue with Google</button>

            <p className="mt-6 text-center text-sm text-gray-500">Already have an account? <a href="/login" className="font-bold text-blue-700 hover:underline">Sign in</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
