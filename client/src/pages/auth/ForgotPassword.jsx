
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Password reset request submitted!");
  }

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        <div className="bg-gradient-to-br from-blue-950 to-blue-600 p-8 sm:p-12 text-white flex flex-col justify-center">
          <a href="/" className="text-3xl font-bold">JD<span className="text-yellow-400">Hub</span></a>

          <h1 className="mt-12 text-4xl sm:text-5xl font-bold leading-tight">Forgot your<br /><span className="text-yellow-400">password?</span></h1>
          <p className="mt-5 max-w-sm text-blue-100 leading-7">Don't worry! Enter your email and follow the steps to get back to shopping with JD Hub.</p>

          <div className="mt-8 rounded-2xl bg-blue-800 p-5 flex items-center gap-4">
            <div className="rounded-xl bg-yellow-400 p-3 text-3xl">🔐</div>
            <div>
              <h3 className="font-semibold">Your account matters</h3>
              <p className="mt-1 text-sm text-blue-100">Let's help you get back in.</p>
            </div>
          </div>

          <div className="mt-8 h-2 w-24 rounded-full bg-yellow-400"></div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Account recovery</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Reset Password<span className="text-yellow-500">.</span></h2>
            <p className="mt-4 mb-8 text-sm leading-6 text-gray-500">Enter the email address you used to create your account. We'll help you reset your password.</p>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>

            <button type="submit" className="w-full rounded-xl bg-yellow-400 py-3.5 font-bold text-blue-950 transition hover:bg-yellow-300">Send Reset Link →</button>

            <p className="mt-7 text-center text-sm text-gray-500">Remember your password? <a href="/login" className="font-bold text-blue-700 hover:underline">Sign in</a></p>
            <p className="mt-4 text-center text-sm"><a href="/Signup" className="font-semibold text-gray-600 hover:text-blue-700">Create a new account</a></p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;
