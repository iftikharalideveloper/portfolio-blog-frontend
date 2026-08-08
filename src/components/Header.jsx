import React from 'react';
import { useState } from 'react';

function Header() {
    //Mobile Menu Toggle (Header Mein)
    const [isMenuOpen, setisMenuOpen] = useState(false);
  return (
    <header>
      <h1>Iftikhar Ali's Portfolio</h1>
      <button onClick={ () => setisMenuOpen(!isMenuOpen)}>Menu</button>
      {
        isMenuOpen && (
      <nav>
        <a href="/">Home</a>
        <a href="/projects">Projects</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
      </nav>
        )}
    </header>
  )
}

export default Header;
