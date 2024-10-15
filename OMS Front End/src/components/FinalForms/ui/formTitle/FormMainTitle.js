import React from "react";
import PropTypes from 'prop-types';
import "./FormMainTitle.scss";

const FormMainTitle = (props) => {
  
  return (
    <div className={`section-title ${props.containerCss}`}>
      <h5 className="main-form-title">{props.formTitle}</h5>
    </div>
  );
};
FormMainTitle.propTypes = {
  // The title text to be displayed
  formTitle: PropTypes.string.isRequired,

  // Additional CSS classes for styling the container
  containerCss: PropTypes.string,
};

export default FormMainTitle;
