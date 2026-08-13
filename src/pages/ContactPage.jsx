import { useState, useEffect } from "react";
import { API_URL } from "../config/api";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusType, setStatusType] = useState("");

  // Auto-hide status message after 5 seconds
  useEffect(() => {
    if (statusMsg) {
      const timer = setTimeout(() => {
        setStatusMsg("");
        setStatusType("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !messageText.trim()) {
      setStatusMsg("Please fill in all fields.");
      setStatusType("error");
      return;
    }

    setIsSubmitting(true);
    setStatusMsg("");
    setStatusType("");

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message: messageText }),
      });

      const data = await response.json();

      if (data.success) {
        setStatusMsg("✅ Message sent successfully!");
        setStatusType("success");
        setName("");
        setEmail("");
        setMessageText("");
      } else {
        setStatusMsg("❌ Failed to send. Try again.");
        setStatusType("error");
      }
    } catch (error) {
      setStatusMsg("❌ Something went wrong.");
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-6">
      <div className="w-full max-w-4xl">
        
        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Left Side - Info */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-200/50 rounded-full mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-xs font-medium text-indigo-700">Contact</span>
            </div>
            
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Get in <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              Have a question or want to work together?
            </p>
            
            {/* Quick Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-slate-600 justify-center md:justify-start">
                <span className="text-lg">📧</span>
                <span>hello@iftikhar.dev</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 justify-center md:justify-start">
                <span className="text-lg">🐙</span>
                <span>github.com/iftikharali</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 justify-center md:justify-start">
                <span className="text-lg">📍</span>
                <span>Available for Freelance</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-5">
            
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name Input */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">👤</span>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all text-sm"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">✉️</span>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all text-sm"
                  required
                />
              </div>

              {/* Message Input */}
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">💬</span>
                <textarea
                  placeholder="Your Message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={3}
                  className="w-full pl-9 pr-3 py-2 bg-white/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all resize-none text-sm"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  '✉️ Send Message'
                )}
              </button>
            </form>

            {/* Status Message - Auto Hide */}
            {statusMsg && (
              <div 
                className={`mt-3 p-2.5 rounded-lg text-sm flex items-center gap-2 animate-fade-in ${
                  statusType === 'success' 
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                    : statusType === 'error'
                    ? 'bg-red-50 border border-red-200 text-red-700'
                    : 'bg-slate-50 border border-slate-200 text-slate-700'
                }`}
              >
                <span className="text-sm flex-shrink-0">{statusType === 'success' ? '✅' : '⚠️'}</span>
                <p className="flex-1">{statusMsg}</p>
                <button 
                  onClick={() => { setStatusMsg(""); setStatusType(""); }}
                  className="text-xs opacity-50 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;