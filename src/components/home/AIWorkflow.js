import React from 'react';

function AIWorkflow() {
  return (
    <section className="ai-workflow-section" id="workflow">
      <div className="container">
        <div className="section-header centered workflow-header">
          <span className="section-tag">How It Works</span>
          <h2 className="section-title workflow-title">AI-Powered Healthcare Journey</h2>
          <p className="section-description">
            Our revolutionary platform combines the precision of artificial intelligence with human medical expertise to deliver faster, more accurate healthcare
          </p>
        </div>
        
        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-connector"></div>
            <div className="step-number">1</div>
            <div className="step-content">
              <h3 className="step-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                Symptom Input
              </h3>
              <p className="step-description">Enter your symptoms, upload relevant images, and provide your medical history through our user-friendly interface or mobile app.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="step-connector"></div>
            <div className="step-number">2</div>
            <div className="step-content">
              <h3 className="step-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 2 17.5v-10a2.5 2.5 0 0 1 5 0v.5a.5.5 0 0 0 1 0v-.5a2.5 2.5 0 1 1 5 0v10a2.5 2.5 0 0 1-5 0v-.5a.5.5 0 0 0-1 0v.5a2.5 2.5 0 1 1-5 0v-5a.5.5 0 0 0-1 0v5a2.5 2.5 0 0 1-4.96.44"></path>
                </svg>
                AI Diagnosis
              </h3>
              <p className="step-description">Our advanced AI analyzes your symptoms against millions of medical data points to generate a preliminary diagnosis with 95% accuracy in minutes.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="step-connector"></div>
            <div className="step-number">3</div>
            <div className="step-content">
              <h3 className="step-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"></path>
                  <path d="M9 22v-4h6v4"></path>
                  <path d="M10 6h4"></path>
                  <path d="M10 10h4"></path>
                  <path d="M10 14h4"></path>
                </svg>
                Prescription Creation
              </h3>
              <p className="step-description">Based on the diagnosis, our AI system generates a personalized prescription considering your medical history, allergies, and current medications.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="step-connector"></div>
            <div className="step-number">4</div>
            <div className="step-content">
              <h3 className="step-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 12.5a4 4 0 1 0 8 0 4 4 0 1 0-8 0z"></path>
                  <path d="M12 12v-4a4 4 0 0 1 4-4h1a3 3 0 0 1 3 3v1a2 2 0 0 1-2 2 2 2 0 0 1-2-2V8"></path>
                </svg>
                Doctor Review
              </h3>
              <p className="step-description">A certified MBBS doctor reviews the AI-generated diagnosis and prescription, making any necessary adjustments before approving the final recommendation.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3 className="step-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3h6v4H9zM9 7l3 13 3-13"></path>
                </svg>
                Pharmacy Delivery
              </h3>
              <p className="step-description">Upon doctor approval, your prescription is sent to your nearest partner pharmacy for medication dispensing, with options for pickup or home delivery.</p>
            </div>
          </div>
        </div>
        
        <div className="ai-stats">
          <div className="ai-stat">
            <span className="stat-value">3 min</span>
            <span className="stat-label">Average Diagnosis Time</span>
          </div>
          <div className="ai-stat">
            <span className="stat-value">95%</span>
            <span className="stat-label">AI Diagnostic Accuracy</span>
          </div>
          <div className="ai-stat">
            <span className="stat-value">2 hrs</span>
            <span className="stat-label">Typical Doctor Review Time</span>
          </div>
          <div className="ai-stat">
            <span className="stat-value">5000+</span>
            <span className="stat-label">Medical Conditions Recognized</span>
          </div>
        </div>
        
        <div className="cta-container">
          <button className="cta-button pulse-animation">Experience AI Diagnosis Now</button>
        </div>
      </div>
    </section>
  );
}

export default AIWorkflow; 