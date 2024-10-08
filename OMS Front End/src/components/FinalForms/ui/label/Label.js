import React from "react";
import PropTypes from 'prop-types';

import "../inputs/input/Input.scss";

const Label = (props) => {
  return (
    <div className="input-label-title">
      {props.labelName && props.labelName !== "" ? (
        <label className="input-label" for={props.htmlFor}>
          {props.labelName}
          {props.labelName.length > 0 && props.isRequired && <span className="validation-star">*</span>}
        </label>
      ) : null}

    </div>
  );
};
Label.propTypes = {
  labelName: PropTypes.string, // The text to display as the label
};
export default Label;
