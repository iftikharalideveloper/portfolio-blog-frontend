import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  //Mobile Menu Toggle (Header Mein)
  const [isMenuOpen, setisMenuOpen] = useState(false);
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
        </nav>
      )}
    </header>
  );
}

export default Header;
