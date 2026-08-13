import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  //Mobile Menu Toggle (Header Mein)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // useEffect(()=>{
  //   const token = localStorage.getItem("token");
  //   if (token){
  //     return setIsLoggedIn(true);
  //   }
  // },[]);

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    // setIsLoggedIn(false);
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Iftikhar Ali<span className="text-indigo-400">.dev</span>
        </Link>
        {/* Back/Forward Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-indigo-500 transition"
            title="Go Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <p className="text-red-200">/</p>
          <button
            onClick={() => navigate(1)}
            className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-indigo-500 transition"
            title="Go Forward"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {/* back/forward button finished */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>

        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-slate-900 md:bg-transparent gap-6 px-6 py-4 md:p-0 items-center`}
        >
          <Link to="/" className="hover:text-indigo-400 transition">
            Home
          </Link>
          <Link to="/projects" className="hover:text-indigo-400 transition">
            Projects
          </Link>
          <Link to="/blog" className="hover:text-indigo-400 transition">
            Blog
          </Link>
          <Link to="/contact" className="hover:text-indigo-400 transition">
            Contact
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/admin"
                className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="border border-slate-600 hover:border-red-400 hover:text-red-400 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-400 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
