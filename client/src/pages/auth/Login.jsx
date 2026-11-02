
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import axios from "axios";
import API_URL from "../../config/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      await axios.post(`${API_URL}/api/users/login`, {}, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
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
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">Welcome back to JD Hub</span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">Your favorites<br />are waiting<span className="text-yellow-400">.</span></h1>
            <p className="mt-5 max-w-sm leading-7 text-blue-100">Sign in to discover new deals, revisit your wishlist, and find more of the things you love.</p>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4">
              <div className="rounded-xl bg-yellow-400 p-3 text-3xl">🛒</div>
              <div>
                <h3 className="font-bold">Good to see you again!</h3>
                <p className="mt-1 text-sm text-blue-100">Your next great find is waiting.</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3 text-sm">
              <span className="rounded-full bg-white/10 px-4 py-2">♡ Your wishlist</span>
              <span className="rounded-full bg-yellow-400/20 px-4 py-2 text-yellow-300">✦ Great deals</span>
            </div>
          </div>

          <p className="relative z-10 text-sm text-blue-200">Shop your way. Love every find.</p>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Welcome back</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Sign in<span className="text-yellow-500">.</span></h2>
            <p className="mt-3 mb-8 text-sm leading-6 text-gray-500">Enter your details to continue shopping with JD Hub.</p>

            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-700">Password</label>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>

            <div className="mb-7 flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} className="h-4 w-4 accent-blue-700" />
                Show password
              </label>
              <a href="/forgot-password" className="font-semibold text-blue-700 hover:underline">Forgot password?</a>
            </div>

            <label className="mb-6 flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 accent-blue-700" />
              Remember me
            </label>

            <button type="submit" className="w-full rounded-xl bg-yellow-400 py-3.5 font-bold text-blue-950 transition hover:bg-yellow-300 hover:shadow-lg">Sign In →</button>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <button type="button" onClick={() => alert("Google sign-in is not connected yet.")} className="w-full rounded-xl border border-gray-200 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-blue-50">Continue with Google</button>

            <p className="mt-6 text-center text-sm text-gray-500">Don't have an account? <a href="/Signup" className="font-bold text-blue-700 hover:underline">Create account</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
