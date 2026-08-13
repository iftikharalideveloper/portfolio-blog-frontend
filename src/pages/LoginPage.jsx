import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);

      if (data.success) {
        login(data.token, data.user);
        setMessage("✅ Login Successful! 🎉");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage("❌ " + (data.message || "Login failed. Try again! 😅"));
      }
    } catch (error) {
      setMessage(`❌ Something went wrong! Please try again: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-8">
      <div className="w-full max-w-md">
        
        {/* Funny Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-200/50 rounded-full mb-3 animate-bounce-slow">
            <span className="text-2xl">👋</span>
            <span className="text-sm font-medium text-yellow-700">Hey You! Welcome Back!</span>
          </div>
          
          <h2 className="text-3xl font-extrabold text-slate-900">
            Welcome <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Back</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            We missed you! Login and let's build something awesome 🚀
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">✉️</span>
              <input
                type="email"
                placeholder="Your Email (e.g., cool@coder.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all text-sm"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔐</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (don't tell anyone! 🤫)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-xs text-indigo-500 hover:text-indigo-600 font-medium transition-colors">
                Forgot Password? 😅
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-[1.02] text-sm flex items-center justify-center gap-2"
            >
              🚀 Login
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white/70 text-slate-400">or login with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 bg-white/80 border border-slate-200 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all duration-300 hover:scale-105 text-sm font-medium text-slate-700">
              <span className="text-xl">🔴</span> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 bg-white/80 border border-slate-200 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 text-sm font-medium text-slate-700">
              <span className="text-xl">🐙</span> GitHub
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 bg-white/80 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 text-sm font-medium text-slate-700">
              <span className="text-xl">💼</span> LinkedIn
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-xl text-sm flex items-center gap-2 ${
              message.includes("✅") 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              <span className="text-lg">{message.includes("✅") ? '🎉' : '😅'}</span>
              <p>{message}</p>
            </div>
          )}

          {/* Register Link */}
          <p className="text-sm text-slate-500 mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-500 hover:text-indigo-600 font-bold hover:underline transition-all">
              Register Now 🎯
            </Link>
          </p>

          {/* Funny Footer */}
          <div className="mt-4 pt-4 border-t border-slate-200/50 text-center">
            <p className="text-xs text-slate-400">
              🔥 We promise we won't share your password with anyone... except maybe Santa 🎅
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;