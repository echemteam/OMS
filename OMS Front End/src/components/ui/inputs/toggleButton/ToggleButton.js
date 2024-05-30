import React from "react";
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

export default ToggleButton;
