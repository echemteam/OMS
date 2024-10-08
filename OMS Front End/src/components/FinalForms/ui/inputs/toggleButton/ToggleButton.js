import React from "react";
import PropTypes from "prop-types";
import "./ToggleButton.scss";

function ToggleButton(props) {
  return (
    
      <label className="switch">
<input
        type="checkbox"
        id="toggle-button"
        checked={props.isChecked}
        onChange={props.onChange}
      />
              <span className="slider round"></span>
      </label>
    
  );
}

ToggleButton.propTypes = {
  /**
   * Boolean to determine if the toggle button is checked.
   */
  isChecked: PropTypes.bool.isRequired,
    /**
   * Function to handle change event.
   */
  onChange: PropTypes.func.isRequired,
};

export default ToggleButton;
