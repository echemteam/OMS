import React from "react";
import PropTypes from "prop-types";
import "../inputs/input/Input.scss";

const Label = (props) => {
  return (
    <div className={`"d-flex align-items-center mr-3 input-label-title mb-2" ${props.isLabelRightAligned ? "label-right-title" : ""}`}>
      {props.labelName && props.labelName !== "" ? (
        <label className="input-label">{props.labelName} 
        {props.labelName.length > 0 && props.isRequired && <span className="validation-star">*</span>} 
        </label>
      ) : null}
      {/* <span className="validation-star">*</span> */}
    </div>
  );
};
Label.propTypes = {
  labelName: PropTypes.string,  
  isLabelRightAligned: PropTypes.bool,  
  isRequired: PropTypes.bool,  
};
export default Label;
