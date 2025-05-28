import React from 'react';

function Services() {
  const services = [
    {
      title: 'AI-Powered Diagnosis',
      description: 'Advanced machine learning algorithms analyze symptoms and medical history to provide accurate preliminary diagnosis.',
      icon: 'brain',
      highlight: 'Core technology'
    },
    {
      title: 'Prescription Generation',
      description: 'AI creates personalized medication recommendations based on diagnosis, medical history, and current health status.',
      icon: 'pill'
    },
    {
      title: 'MBBS Verification',
      description: 'Licensed doctors review AI-generated prescriptions, make adjustments if needed, and provide final approval.',
      icon: 'stethoscope',
      highlight: 'Human expertise'
    },
    {
      title: 'Pharmacy Integration',
      description: 'Seamless connection with local pharmacies for quick medication fulfillment with delivery or pickup options.',
      icon: 'flask'
    },
    {
      title: 'Medical Records AI',
      description: 'Intelligent system that analyzes your health history to provide personalized care recommendations and preventive alerts.',
      icon: 'heart'
    },
    {
      title: 'Chronic Disease Monitoring',
      description: 'AI-powered tracking of chronic conditions with predictive insights and personalized management suggestions.',
      icon: 'child'
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header centered">
          <span className="section-tag">AI Medical Platform</span>
          <h2 className="section-title">The Future of Healthcare is Here</h2>
          <p className="section-description">
            Combining artificial intelligence with human medical expertise for faster, more accurate care
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              {service.highlight && (
                <div className="service-highlight">{service.highlight}</div>
              )}
              <div className="service-icon">
                {service.icon === 'stethoscope' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 12.5a4 4 0 1 0 8 0 4 4 0 1 0-8 0z"></path>
                    <path d="M12 12v-4a4 4 0 0 1 4-4h1a3 3 0 0 1 3 3v1a2 2 0 0 1-2 2 2 2 0 0 1-2-2V8"></path>
                  </svg>
                )}
                {service.icon === 'brain' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 2 17.5v-10a2.5 2.5 0 0 1 5 0v.5a.5.5 0 0 0 1 0v-.5a2.5 2.5 0 1 1 5 0v10a2.5 2.5 0 0 1-5 0v-.5a.5.5 0 0 0-1 0v.5a2.5 2.5 0 1 1-5 0v-5a.5.5 0 0 0-1 0v5a2.5 2.5 0 0 1-4.96.44"></path>
                  </svg>
                )}
                {service.icon === 'child' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                    <path d="M6 9h.01"></path>
                    <path d="M18 9h.01"></path>
                    <path d="M12 3c4.971 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-9c-1.193 0 -2.338 -.422 -3.182 -1.172c-.844 -.75 -1.318 -1.768 -1.318 -2.828c0 -4.418 4.029 -8 9 -8z"></path>
                  </svg>
                )}
                {service.icon === 'heart' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                )}
                {service.icon === 'pill' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5H7a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h7m4-8h-3M1 19l3 3 3-3M6 11v.01M2 8v.01M4 15v.01"></path>
                    <path d="M20 8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2Z"></path>
                  </svg>
                )}
                {service.icon === 'flask' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 3h6v4H9zM9 7l3 13 3-13"></path>
                  </svg>
                )}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <a href="#" className="btn-link service-link">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          ))}
        </div>
        
        <div className="service-cta">
          <p>Experience our AI-powered healthcare system</p>
          <button className="btn outline-btn">Get Your AI Diagnosis Now</button>
        </div>
      </div>
    </section>
  );
}

export default Services; 