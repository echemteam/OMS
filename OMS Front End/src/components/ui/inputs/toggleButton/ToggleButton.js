import React from "react";
import PropTypes from "prop-types"; 
import "./ToggleButton.scss";

function ToggleButton(props) {
  return (
    <>
      <label className="switch">
        <input type="checkbox" checked={props.isChecked}/>
        <span className="slider round"></span>
      </label>
    </>
  );
}
ToggleButton.propTypes = {
  isChecked: PropTypes.bool.isRequired, 
};
export default ToggleButton;
