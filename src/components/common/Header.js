import React, { useState } from 'react';

function Header({ onNavigateToSignIn }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="App-header">
      <div className="header-content">
        <div className="logo">
          <h1><span className="ai-text">AI</span>MediCare</h1>
        </div>
        
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#workflow">How It Works</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#interface">AI Platform</a></li>
            <li><a href="#benefits">Benefits</a></li>
          </ul>
        </nav>
        
        <div className="header-cta">
          <button className="login-btn" onClick={onNavigateToSignIn}>Sign In</button>
          <button className="signup-btn">Try AI Diagnosis</button>
        </div>
      </div>
    </header>
  );
}

export default Header; 