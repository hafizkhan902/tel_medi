import React from 'react';
import { BlogIcon, LiveRepIcon } from '../icons/Icons';

function BottomNav() {
  return (
    <footer className="bottom-nav">
      <div className="nav-option">
        <button className="nav-button">
          <span className="nav-icon"><BlogIcon /></span>
          Blog
        </button>
      </div>
      <div className="nav-option">
        <button className="nav-button live">
          <span className="nav-icon"><LiveRepIcon /></span>
          Live Representative
        </button>
      </div>
    </footer>
  );
}

export default BottomNav; 