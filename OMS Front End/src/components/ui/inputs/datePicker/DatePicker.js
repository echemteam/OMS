import React from "react";
import PropTypes from "prop-types";

import ReactDatePicker from "react-datepicker";

import "./DateRange.scss";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap-daterangepicker/daterangepicker.css";

// TODO:KP: remove unused vaiable and add disbale and read only

const DatePicker = ({
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

    // const handleBlur = () => {
    //     if (onBlur) {
    //         onBlur()
    //     }
    // };

    return (
        <div className="date-picker">
            <ReactDatePicker
                placeholderText={placeholder}
                selected={selected}
                onChange={(e) => handleButtonClick(e)}
                onBlur={onBlur}
                autoComplete="off"
                disabled={isDisable}
            />
        </div>
    );
};

DatePicker.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func, // Use onClick for handling the button click
    cssClass: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

export default DatePicker;
