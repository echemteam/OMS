import React from "react";
import PropTypes from "prop-types";
const FormMainTitle = (props) => {
  
  return (
    <div className={`section-title ${props.containerCss}`}>
      <h5>{props.formTitle}</h5>
    </div>
  );
};
FormMainTitle.propTypes = {
  formTitle: PropTypes.string,
  containerCss: PropTypes.string, 
};

export default FormMainTitle;
