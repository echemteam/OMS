import React from "react";
import PropTypes from "prop-types";

import ReactDatePicker from "react-datepicker";

import "./GridDatePicker.scss";
import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap-daterangepicker/daterangepicker.css";

const GridDatePicker = ({
    name,
    label,
    selected,
    onChange,
    placeholder,
    onBlur,
    isDisable
}) => {
    const handleButtonClick = (e) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="date-picker">
            <ReactDatePicker
                name={name}
                placeholderText={placeholder}
                label={label}
                // value={selected}
                selected={selected}
                onChange={(e) => handleButtonClick(e)}
                onBlur={onBlur}
                autoComplete="off"
                disabled={isDisable}
            />
        </div>
    );
};

GridDatePicker.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func, // Use onClick for handling the button click
    // cssClass: PropTypes.string,
    placeholder: PropTypes.string,
    isDisable: PropTypes.bool,
};

export default GridDatePicker;
