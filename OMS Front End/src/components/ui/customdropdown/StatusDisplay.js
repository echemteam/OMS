import React from "react";

const StatusDisplay = ({ status, isSelected, colorMap, textMap, iconMap }) => {

  const color = isSelected ? "#fff" : (colorMap[status] || "black");
  const iconSrc = iconMap[status] || "";
  const text = textMap[status]?.text || status;

  return (
    <div className="status-container">
      <span className="status-icon" style={{ color }}>
        <img src={iconSrc} alt={status} className="status-image" />
      </span>
      <span className="status-text" style={{ color }}>
        {text}
      </span>
    </div>
  );
};

export default StatusDisplay;
