import React from 'react';

function OptionCard({ title, description, buttonText, buttonClass, icon }) {
  return (
    <div className="option-card">
      {icon && <div className="option-icon">{icon}</div>}
      <h2>{title}</h2>
      <p>{description}</p>
      <button className={`option-button ${buttonClass}`}>{buttonText}</button>
    </div>
  );
}

export default OptionCard; 