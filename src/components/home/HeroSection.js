import React from 'react';
import { EmergencyIcon, AppointmentIcon, CheckupIcon } from '../icons/Icons';

function HeroSection() {
  const options = [
    {
      title: "AI Diagnosis",
      description: "Get instant medical assessment powered by advanced AI algorithms trained on millions of medical records",
      icon: <EmergencyIcon />,
      color: "emergency",
      features: ["Symptom analysis", "Medical history integration", "Initial diagnosis"]
    },
    {
      title: "Doctor Verification",
      description: "AI-generated prescriptions reviewed and approved by certified MBBS doctors within hours",
      icon: <AppointmentIcon />,
      color: "appointment",
      features: ["MBBS verification", "Prescription adjustment", "Medical consultation"]
    },
    {
      title: "Pharmacy Delivery",
      description: "Approved prescriptions sent directly to your local pharmacy for convenient pickup or delivery",
      icon: <CheckupIcon />,
      color: "checkup",
      features: ["Local pharmacy network", "Medication tracking", "Delivery options"]
    }
  ];

  return (
    <section className="services-overview" id="home">
      <div className="container">
        <h2 className="section-title">AI-Powered Healthcare</h2>
        <p className="section-subtitle">Revolutionary medicine combining artificial intelligence with human expertise</p>
        
        <div className="services-grid">
          {options.map((option, index) => (
            <div className={`service-item ${option.color}`} key={index}>
              <div className="service-icon">{option.icon}</div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <ul className="service-features">
                {option.features.map((feature, idx) => (
                  <li key={idx}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href={`#${option.title.toLowerCase().replace(/\s+/g, '-')}`} className="btn-link">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          ))}
        </div>
        
        <div className="trust-indicators">
          <div className="trust-item">
            <span className="count">95%</span>
            <span className="label">Diagnosis Accuracy</span>
          </div>
          <div className="trust-item">
            <span className="count">500+</span>
            <span className="label">MBBS Doctors</span>
          </div>
          <div className="trust-item">
            <span className="count">2500+</span>
            <span className="label">Pharmacy Partners</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection; 