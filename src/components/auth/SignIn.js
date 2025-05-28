import React, { useState } from 'react';

function SignIn({ onNavigateBack, onSignInSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate an API call with a timeout
    setTimeout(() => {
      // In a real app, you would validate credentials with a backend API
      if (email && password) {
        console.log('Sign In Attempt', { email, password, rememberMe });
        // Call the onSignInSuccess function passed from App.js
        onSignInSuccess();
      } else {
        setError('Please enter both email and password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="signin-container">
      <div className="signin-wrapper">
        <div className="signin-left">
          <div className="signin-content">
            <div className="brand-logo">
              <h1 onClick={onNavigateBack} style={{ cursor: 'pointer' }}>
                <span className="ai-text">AI</span>MediCare
              </h1>
              <button className="back-button" onClick={onNavigateBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Home
              </button>
            </div>
            
            <h2 className="signin-title">Welcome Back</h2>
            <p className="signin-subtitle">Sign in to access AI-powered healthcare services</p>
            
            {error && <div className="error-message">{error}</div>}
            
            <form className="signin-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="you@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <input 
                    type="checkbox" 
                    id="rememberMe" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <a href="#forgot-password" className="forgot-password">Forgot password?</a>
              </div>
              
              <button 
                type="submit" 
                className={`signin-button ${isLoading ? 'loading' : 'pulse-animation'}`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
              
              <div className="divider">
                <span>Or continue with</span>
              </div>
              
              <div className="social-signin">
                <button type="button" className="social-button google">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path>
                    <path d="M15.5 8.5L14 7l1.5-1.5L17 7l-1.5 1.5z"></path>
                    <path d="M8.5 8.5L7 7l1.5-1.5L10 7 8.5 8.5z"></path>
                    <path d="M16 15c-2 1-6 1-8 0"></path>
                  </svg>
                  <span>Google</span>
                </button>
                <button type="button" className="social-button apple">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"></path>
                    <path d="M12 16c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z"></path>
                  </svg>
                  <span>Apple</span>
                </button>
              </div>
              
              <p className="signup-prompt">
                Don't have an account? <a href="#signup">Create an account</a>
              </p>
            </form>
          </div>
        </div>
        
        <div className="signin-right">
          <div className="signin-image">
            <div className="feature-highlight">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 2 17.5v-10a2.5 2.5 0 0 1 5 0v.5a.5.5 0 0 0 1 0v-.5a2.5 2.5 0 1 1 5 0v10a2.5 2.5 0 0 1-5 0v-.5a.5.5 0 0 0-1 0v.5a2.5 2.5 0 1 1-5 0v-5a.5.5 0 0 0-1 0v5a2.5 2.5 0 0 1-4.96.44"></path>
                </svg>
              </div>
              <h3>AI-Powered Diagnosis</h3>
              <p>Get accurate medical assessments in minutes using our advanced AI technology</p>
            </div>
            
            <div className="signin-features">
              <div className="feature-item">
                <div className="feature-check">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>24/7 access to AI diagnosis</span>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Prescriptions verified by MBBS doctors</span>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Seamless delivery from local pharmacies</span>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Secure, private health data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn; 