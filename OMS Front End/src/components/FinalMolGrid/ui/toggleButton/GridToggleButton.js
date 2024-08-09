import React from "react";
import PropTypes from "prop-types";
import "./GridToggle.scss";

const GridToggleButton = (props) => {
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

GridToggleButton.propTypes = {
    /**
     * Boolean to determine if the toggle button is checked.
     */
    isChecked: PropTypes.bool.isRequired,
    /**
   * Function to handle change event.
   */
    onChange: PropTypes.func.isRequired,
};

export default GridToggleButton;
