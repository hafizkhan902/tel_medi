import React from 'react';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <h2><span className="ai-text">AI</span>MediCare</h2>
            <p>Revolutionizing healthcare with AI diagnosis, doctor verification, and pharmacy integration</p>
          </div>
          
          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <p>Get the latest in AI healthcare innovations</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-content">
          <div className="footer-section">
            <h3>AI Platform</h3>
            <ul className="footer-links">
              <li><a href="#workflow">How It Works</a></li>
              <li><a href="#interface">AI Diagnosis</a></li>
              <li><a href="#services">Doctor Verification</a></li>
              <li><a href="#services">Pharmacy Delivery</a></li>
              <li><a href="#benefits">Technology Benefits</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Medical Services</h3>
            <ul className="footer-links">
              <li><a href="#services">Primary Care</a></li>
              <li><a href="#services">Chronic Disease Management</a></li>
              <li><a href="#services">Prescription Services</a></li>
              <li><a href="#services">Medical Records AI</a></li>
              <li><a href="#services">Health Analysis</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Company</h3>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">AI Research</a></li>
              <li><a href="#">Medical Team</a></li>
              <li><a href="#">Pharmacy Partners</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Download App</h3>
            <div className="app-buttons">
              <button className="app-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"></path>
                  <path d="M16 19h6"></path>
                  <path d="M19 16v6"></path>
                </svg>
                App Store
              </button>
              <button className="app-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Google Play
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="social-links">
            <a href="#" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
          
          <div className="copyright">
            <p>&copy; 2023 AIMediCare. All rights reserved. | Powered by Advanced Medical AI</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 