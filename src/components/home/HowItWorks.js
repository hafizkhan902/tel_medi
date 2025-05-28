import React from 'react';

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Create an account',
      description: 'Sign up in less than 2 minutes with your basic information',
      icon: 'user'
    },
    {
      number: '02',
      title: 'Find the right care',
      description: 'Choose from emergency assistance, specialist appointments, or routine checkups',
      icon: 'search'
    },
    {
      number: '03',
      title: 'Connect with doctors',
      description: 'Video call, audio call, or chat with certified healthcare professionals',
      icon: 'video'
    },
    {
      number: '04',
      title: 'Get treatment',
      description: 'Receive prescriptions, referrals, and follow-up care digitally',
      icon: 'clipboard'
    }
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Simple Process</span>
          <h2 className="section-title">How Medico Works</h2>
          <p className="section-description">
            Get the care you need in four simple steps, all from the comfort of your home
          </p>
        </div>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step-card" key={step.number}>
              <div className="step-icon">
                {step.icon === 'user' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )}
                {step.icon === 'search' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                )}
                {step.icon === 'video' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                )}
                {step.icon === 'clipboard' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                )}
              </div>
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cta-container">
          <button className="cta-button">Get Started Now</button>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks; 