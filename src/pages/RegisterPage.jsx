import React, { useState, useEffect } from "react"; // ✅ Added useEffect
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import { API_URL } from "../config/api";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const navigate = useNavigate(); // ✅ Added for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!acceptTerms) {
      setMessage("⚠️ Please accept the terms and conditions! 😅");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Passwords don't match! 🔐");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters! 🤫");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("✅ Registration successful! 🎉 You can now login.");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAcceptTerms(false);
        
        // ✅ NEW: Auto redirect to login after 5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 5000);
        
      } else {
        setMessage("❌ " + (data.message || "Registration Failed. Try again! 😅"));
      }
    } catch (error) {
      setMessage("❌ Something went wrong! Please try again later 😅");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-purple-50/30 px-4 py-8">
      <div className="w-full max-w-md">
        
        {/* Funny Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 border border-green-200/50 rounded-full mb-3 animate-bounce-slow">
            <span className="text-2xl">🌟</span>
            <span className="text-sm font-medium text-green-700">Join the Cool Club! 🎉</span>
          </div>
          
          <h2 className="text-3xl font-extrabold text-slate-900">
            Create <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">Account</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Let's get you started! It's free... and awesome! 🚀
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">👤</span>
              <input
                type="text"
                placeholder="Your Cool Name (e.g., CodeMaster)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all text-sm"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">✉️</span>
              <input
                type="email"
                placeholder="Your Email (we won't spam you! 🤞)"
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
                placeholder="Password (make it strong! 💪)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all text-sm"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password (don't forget it! 🤯)"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all text-sm"
                required
              />
            </div>

            {/* Password Strength Indicator (Funny) */}
            {password && (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      password.length < 4 ? 'w-1/3 bg-red-500' :
                      password.length < 8 ? 'w-2/3 bg-yellow-500' :
                      'w-full bg-green-500'
                    }`}
                  ></div>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {password.length < 4 ? 'Weak 😅' :
                   password.length < 8 ? 'Medium 💪' :
                   'Strong 🦸'}
                </span>
              </div>
            )}

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="text-xs text-slate-600 leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-indigo-500 hover:text-indigo-600 font-medium">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-indigo-500 hover:text-indigo-600 font-medium">
                  Privacy Policy
                </a>{' '}
                (and I promise to be awesome! 😎)
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-[1.02] text-sm flex items-center justify-center gap-2"
            >
              🎉 Create Account
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white/70 text-slate-400">or sign up with</span>
            </div>
          </div>

          {/* Social Register Buttons */}
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

          {/* Login Link */}
          <p className="text-sm text-slate-500 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 hover:text-indigo-600 font-bold hover:underline transition-all">
              Login Here 🔥
            </Link>
          </p>

          {/* Funny Footer */}
          <div className="mt-4 pt-4 border-t border-slate-200/50 text-center">
            <p className="text-xs text-slate-400">
              🦄 By signing up, you agree to become 10x cooler instantly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;