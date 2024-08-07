import React from 'react';
import "./Tooltip.scss";

const Tooltip = ({ text }) => {
  return (
    <div className="custom-tooltip">
      <div className="tooltip-arrow"></div>
      <div className="tooltip-content">{text}</div>
    </div>
  );
};

export default Tooltip;
