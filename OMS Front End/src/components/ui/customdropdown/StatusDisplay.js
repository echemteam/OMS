import React from "react";
import PropTypes from "prop-types";

const StatusDisplay = ({ status, isSelected, colorMap, textMap, iconMap }) => {

  const color = isSelected ? "#fff" : (colorMap[status] || "black");
  const iconSrc = iconMap[status] || "";
  const text = textMap[status]?.text || status;

  return (
    <div className="status-container">
      {iconSrc && (
        <span className="status-icon" style={{ color }}>
          <img src={iconSrc} alt={status} className="status-image" />
        </span>
      )}
      {text && (
        <span className="status-text" style={{ color }}>
          {text}
        </span>
      )}
    </div>
  );
};
StatusDisplay.propTypes = {
  status: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
};
export default StatusDisplay;
