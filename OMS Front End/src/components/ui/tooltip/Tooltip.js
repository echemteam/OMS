import React from 'react';
import "./Tooltip.scss";
import PropTypes from 'prop-types';
const Tooltip = ({ text }) => {
  return (
    <div className="custom-tooltip">
      <div className="tooltip-arrow"></div>
      <div className="tooltip-content">{text}</div>
    </div>
  );
};
Tooltip.propTypes = {
  text: PropTypes.string, 
};
export default Tooltip;
