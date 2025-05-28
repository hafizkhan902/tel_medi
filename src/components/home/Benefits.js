import React from 'react';

function Benefits() {
  const benefits = [
    {
      title: 'Faster Diagnosis',
      description: 'AI analyzes symptoms and medical history in seconds, providing preliminary diagnosis without long wait times',
      icon: 'clock'
    },
    {
      title: 'Superior Accuracy', 
      description: 'Our AI system trained on millions of medical records achieves 95% diagnostic accuracy, exceeding many standard practices',
      icon: 'shield'
    },
    {
      title: 'Doctor-AI Collaboration',
      description: 'Combines AI precision with human medical expertise ensuring optimal treatment recommendations',
      icon: 'dollar'
    },
    {
      title: 'Enhanced Privacy',
      description: 'End-to-end encrypted platform with HIPAA compliance and advanced security measures protecting your health data',
      icon: 'lock'
    }
  ];

  return (
    <section className="benefits-section" id="benefits">
      <div className="container">
        <div className="benefits-header">
          <div className="benefits-text">
            <span className="section-tag">AI Healthcare Advantages</span>
            <h2 className="section-title">Revolutionizing Patient Care</h2>
            <p className="section-description">
              Our AI-powered healthcare platform delivers faster diagnoses, higher accuracy, and seamless prescription fulfillment through your local pharmacy
            </p>
            <a href="#signup" className="btn primary-btn">Start Your AI Consultation</a>
          </div>
          
          <div className="benefits-image">
            <div className="placeholder-image"></div>
          </div>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div className="benefit-card" key={index}>
              <div className="benefit-icon">
                {benefit.icon === 'clock' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                )}
                {benefit.icon === 'dollar' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                )}
                {benefit.icon === 'shield' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                  </svg>
                )}
                {benefit.icon === 'lock' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    <path d="M12 16a1 1 0 0 0 0-2 1 1 0 0 0 0 2z"></path>
                  </svg>
                )}
              </div>
              
              <div className="benefit-content">
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="testimonial">
          <div className="quote-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
              <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z"></path>
            </svg>
          </div>
          <blockquote>
            I was skeptical about AI diagnosis at first, but it caught an early sign of diabetes that my previous doctor had missed. The AI system analyzed my symptoms and history, created a treatment plan that was approved by a doctor within hours, and sent my prescription to the pharmacy just blocks from my home. The entire process took less than a day!
          </blockquote>
          <div className="testimonial-author">
            <div className="author-avatar"></div>
            <div className="author-info">
              <p className="author-name">Michael Chen</p>
              <p className="author-title">Using AI Healthcare since 2023</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits; 