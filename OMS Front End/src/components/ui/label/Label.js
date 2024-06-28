import React from "react";
import "../inputs/input/Input.scss";

const Label = (props) => {
  return (
    <div className={`"d-flex align-items-center mr-3 input-label-title mb-2" ${props.isLabelRightAligned ? "label-right-title" : ""}`}>
      {props.labelName && props.labelName !== "" ? (
        <label className="input-label">{props.labelName}</label>
      ) : null}
      {/* <span className="validation-star">*</span> */}
    </div>
  );
};

export default Label;
