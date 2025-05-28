import React, { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="App-header">
      <div className="header-content">
        <div className="logo">
          <h1>Medico</h1>
        </div>
        
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#how-it-works">How it Works</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#benefits">Benefits</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        
        <div className="header-cta">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </header>
  );
}

export default Header; 