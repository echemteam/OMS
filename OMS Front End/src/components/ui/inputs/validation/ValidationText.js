import React from "react";
import PropTypes from "prop-types"; 
const ValidationText = (props) => {
  return props.error ? (
    <div className="font-normal validation-text mt-1">
      {props.error}
    </div>
  ) : null;
};
ValidationText.propTypes = {
  error: PropTypes.string,  
};
export default ValidationText;
