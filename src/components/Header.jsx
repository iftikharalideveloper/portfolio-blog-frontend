import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Get user role from database
  const getUserRole = () => {
    if (!user) return 'User';
    
    // Direct role check from database
    if (user.role) {
      return user.role === 'admin' ? 'Admin' : 'User';
    }
    
    // Fallback checks
    if (user.isAdmin) return 'Admin';
    if (user.email === 'admin@example.com') return 'Admin';
    
    return 'User';
  };

  // Get user initials
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name.charAt(0).toUpperCase();
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user?.name) return 'User';
    return user.name;
  };

  // Check if user is admin
  const isAdmin = () => {
    return getUserRole() === 'Admin';
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-2xl sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - "IA" Text */}
          <Link 
            to="/" 
            className="group flex items-center gap-2 relative"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-extrabold text-xl">IA</span>
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight">
                Iftikhar Ali
              </span>
              <span className="text-indigo-400 font-bold text-xl">.dev</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </div>
          </Link>

          {/* Navigation Buttons + Desktop Menu */}
          <div className="flex items-center gap-4">
            {/* Back/Forward Buttons */}
            <div className="hidden sm:flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10">
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                title="Go Back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="w-px h-6 bg-white/10"></div>
              <button
                onClick={() => navigate(1)}
                className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                title="Go Forward"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation - With Active Link Highlight */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { to: "/", label: "Home" },
                { to: "/projects", label: "Projects" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact" },
              ].map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 group ${
                      active 
                        ? "text-white bg-white/10" 
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300 ${
                      active ? "w-4/5" : "w-0 group-hover:w-4/5"
                    }`}></span>
                  </Link>
                );
              })}
            </nav>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3 ml-2">
              {isLoggedIn ? (
                <>
                  {/* User Name + Role Display */}
                  <div className="flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      isAdmin() 
                        ? 'bg-gradient-to-br from-red-500 to-pink-600' 
                        : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                    }`}>
                      {getUserInitials()}
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm text-white font-medium">
                        {getUserDisplayName()}
                      </span>
                      <span className={`text-xs font-semibold ${
                        isAdmin() 
                          ? 'text-red-400' 
                          : 'text-indigo-400'
                      }`}>
                        {isAdmin() ? '👑 Admin' : '👤 User'}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/admin"
                    className={`relative overflow-hidden group px-5 py-2.5 font-medium rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 ${
                      isActive('/admin') 
                        ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white" 
                        : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    }`}
                  >
                    <span className="relative z-10">Dashboard</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 text-slate-300 hover:text-red-400 font-medium rounded-xl border border-slate-700 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-5 py-2.5 font-medium rounded-xl transition-all duration-300 ${
                      isActive('/login') 
                        ? "text-white bg-white/10" 
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`px-5 py-2.5 font-medium rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 ${
                      isActive('/register') 
                        ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white" 
                        : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    }`}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span 
                  className={`h-0.5 bg-white rounded-full transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span 
                  className={`h-0.5 bg-white rounded-full transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span 
                  className={`h-0.5 bg-white rounded-full transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[650px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 pb-6 pt-2 border-t border-white/10">
            {/* User Info in Mobile Menu - With Name + Role */}
            {isLoggedIn && user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-white/5 rounded-xl border border-white/10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${
                  isAdmin() 
                    ? 'bg-gradient-to-br from-red-500 to-pink-600' 
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                }`}>
                  {getUserInitials()}
                </div>
                <div>
                  <p className="text-white font-semibold">{getUserDisplayName()}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                  <span className={`text-xs font-semibold ${
                    isAdmin() ? 'text-red-400' : 'text-indigo-400'
                  }`}>
                    {isAdmin() ? '👑 Admin' : '👤 User'}
                  </span>
                </div>
              </div>
            )}

            {[
              { to: "/", label: "🏠 Home" },
              { to: "/projects", label: "🚀 Projects" },
              { to: "/blog", label: "📝 Blog" },
              { to: "/contact", label: "📫 Contact" },
            ].map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 font-medium rounded-xl transition-all duration-300 ${
                    active 
                      ? "text-white bg-white/10" 
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            
            <div className="h-px bg-white/10 my-2"></div>
            
            {isLoggedIn ? (
              <>
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 font-medium rounded-xl text-center shadow-lg shadow-indigo-500/25 ${
                    isActive('/admin') 
                      ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white" 
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-3 text-slate-300 hover:text-red-400 font-medium rounded-xl border border-slate-700 hover:border-red-500/50 text-center transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 font-medium rounded-xl transition-all duration-300 ${
                    isActive('/login') 
                      ? "text-white bg-white/10" 
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 font-medium rounded-xl text-center shadow-lg shadow-indigo-500/25 ${
                    isActive('/register') 
                      ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white" 
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  }`}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;