import React, { use, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  //Mobile Menu Toggle (Header Mein)
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (token){
      return setIsLoggedIn(true);
    }
  },[]);

  const handleLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <header>
      <h1>Iftikhar Ali's Portfolio</h1>
      <button onClick={() => setisMenuOpen(!isMenuOpen)}>Menu</button>
      {isMenuOpen && (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          { isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
          <Link to="/register">Register</Link>
          <Link to={"/login"}>Login</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
