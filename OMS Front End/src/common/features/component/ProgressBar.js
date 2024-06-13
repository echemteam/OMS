// src/components/ProgressBar.js
import React from 'react';
import './ProgressBar.scss';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${50}%` }}>
        {50 + "%"}
      </div>
    </div>
  );
};

export default ProgressBar;
