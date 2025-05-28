import React from 'react';

function AIInterface() {
  return (
    <section className="ai-interface-section" id="interface">
      <div className="container">
        <div className="section-header centered">
          <span className="section-tag">AI Platform Preview</span>
          <h2 className="section-title">Experience Next-Gen Medical Care</h2>
          <p className="section-description">
            Our intuitive AI diagnostic interface makes getting medical help as simple as describing your symptoms
          </p>
        </div>
        
        <div className="interface-preview">
          <div className="interface-tabs">
            <button className="tab-button active">Symptom Analysis</button>
            <button className="tab-button">AI Diagnosis</button>
            <button className="tab-button">Doctor Review</button>
            <button className="tab-button">Prescription</button>
          </div>
          
          <div className="interface-content">
            <div className="interface-sidebar">
              <div className="user-profile">
                <div className="avatar-placeholder"></div>
                <div className="user-info">
                  <h3>Patient Dashboard</h3>
                  <p>Medical ID: #12345</p>
                </div>
              </div>
              
              <ul className="sidebar-menu">
                <li className="menu-item active">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Dashboard</span>
                </li>
                <li className="menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Medical Profile</span>
                </li>
                <li className="menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 2 17.5v-10a2.5 2.5 0 0 1 5 0v.5a.5.5 0 0 0 1 0v-.5a2.5 2.5 0 1 1 5 0v10a2.5 2.5 0 0 1-5 0v-.5a.5.5 0 0 0-1 0v.5a2.5 2.5 0 1 1-5 0v-5a.5.5 0 0 0-1 0v5a2.5 2.5 0 0 1-4.96.44"></path>
                  </svg>
                  <span>AI Diagnoses</span>
                </li>
                <li className="menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5H7a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h7m4-8h-3M1 19l3 3 3-3M6 11v.01M2 8v.01M4 15v.01"></path>
                    <path d="M20 8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2Z"></path>
                  </svg>
                  <span>Prescriptions</span>
                </li>
                <li className="menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" y1="22" x2="4" y2="15"></line>
                  </svg>
                  <span>Medical History</span>
                </li>
              </ul>
            </div>
            
            <div className="interface-main">
              <div className="interface-header">
                <h3>AI Symptom Analysis</h3>
                <div className="ai-status">
                  <span className="status-dot active"></span>
                  <span>AI Assistant Active</span>
                </div>
              </div>
              
              <div className="symptom-chat">
                <div className="chat-message ai">
                  <div className="message-avatar ai-avatar"></div>
                  <div className="message-content">
                    <p>Hello! I'm your AI Medical Assistant. What symptoms are you experiencing today?</p>
                  </div>
                </div>
                
                <div className="chat-message user">
                  <div className="message-content">
                    <p>I've had a headache for the past 3 days, and I feel nauseous in the morning.</p>
                  </div>
                  <div className="message-avatar user-avatar"></div>
                </div>
                
                <div className="chat-message ai">
                  <div className="message-avatar ai-avatar"></div>
                  <div className="message-content">
                    <p>I understand you're experiencing a headache for 3 days with morning nausea. Could you tell me if you're experiencing any other symptoms like sensitivity to light, dizziness, or fever?</p>
                  </div>
                </div>
                
                <div className="chat-message user">
                  <div className="message-content">
                    <p>Yes, I'm sensitive to bright lights and sometimes feel dizzy when I stand up quickly.</p>
                  </div>
                  <div className="message-avatar user-avatar"></div>
                </div>
                
                <div className="chat-message ai analyzing">
                  <div className="message-avatar ai-avatar"></div>
                  <div className="message-content">
                    <p>Analyzing your symptoms... <span className="typing-indicator"></span></p>
                  </div>
                </div>
              </div>
              
              <div className="chat-input">
                <input type="text" placeholder="Describe any additional symptoms..." />
                <button className="send-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
              
              <div className="ai-diagnostic-status">
                <div className="status-item">
                  <span className="status-label">Symptom Analysis:</span>
                  <span className="status-value">In Progress (75%)</span>
                  <div className="progress-bar">
                    <div className="progress" style={{width: '75%'}}></div>
                  </div>
                </div>
                <div className="status-item">
                  <span className="status-label">Potential Diagnoses:</span>
                  <span className="status-value">3 identified</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Doctor Review:</span>
                  <span className="status-value">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="interface-features">
          <div className="feature-item">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17" y1="15" x2="9" y2="15"></line>
              </svg>
            </div>
            <h3>Smart Symptom Analysis</h3>
            <p>Our AI adapts its questions based on your responses to quickly narrow down potential conditions.</p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <h3>Real-time Doctor Chat</h3>
            <p>Once AI generates a diagnosis, connect instantly with an MBBS doctor for verification and questions.</p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12" y2="18"></line>
              </svg>
            </div>
            <h3>Mobile Prescription</h3>
            <p>Receive your approved prescription digitally and choose your preferred local pharmacy for fulfillment.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIInterface; 