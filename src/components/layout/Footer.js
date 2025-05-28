import React from 'react';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <h2>Medico</h2>
            <p>Healthcare that comes to you</p>
          </div>
          
          <div className="footer-newsletter">
            <h3>Stay Connected</h3>
            <p>Get health tips and updates on new features</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="footer-content">
          <div className="footer-section">
            <h3>Company</h3>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#refund">Refund Policy</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Download App</h3>
            <div className="app-buttons">
              <button className="app-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.9 2.318A5.32 5.32 0 0 1 17.9 13a5.32 5.32 0 0 1 0-10.682zm-8.182 2.727a.392.392 0 0 0-.392.392v13.09c0 .217.175.392.392.392h1.437c.217 0 .391-.175.391-.391V5.437a.392.392 0 0 0-.39-.392H9.717zM6.11 8.455a.392.392 0 0 0-.391.39v6.928c0 .216.175.391.391.391h1.438a.392.392 0 0 0 .391-.39V8.845a.392.392 0 0 0-.39-.391H6.109zm-3.607 2.727a.392.392 0 0 0-.391.392v3.81c0 .216.175.39.391.39h1.437a.392.392 0 0 0 .391-.39v-3.81a.392.392 0 0 0-.39-.392H2.502z"/>
                </svg>
                <span>App Store</span>
              </button>
              <button className="app-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 5.371l2.299 1.308-2.412 1.373 2.788 5.112-2.75 1.572-2.786-5.112-5.354 3.05 6.767-7.085 1.448-.218z"/>
                </svg>
                <span>Google Play</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="social-links">
            <a href="#twitter" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#facebook" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#instagram" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
          
          <div className="copyright">
            <p>© {new Date().getFullYear()} Medico. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 