import React from "react";
import PropTypes from 'prop-types';

const ValidationText = (props) => {
    return props.error ? (
        <div className="font-normal validation-text">
            {props.error}
        </div>
    ) : null;
};
ValidationText.propTypes = {
    error: PropTypes.string, // The error message to display
};
export default ValidationText;