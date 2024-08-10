import React from 'react';
import PropTypes from 'prop-types';
import './GridRadioButton.scss';

/**
 * RadioButton component for rendering a single radio button option.
 *
 * @param {string} name - The name of the radio group.
 * @param {function} onChange - Callback function to handle change events.
 * @param {string} radioId - The ID of the radio button.
 * @param {boolean} isChecked - Whether the radio button is checked.
 * @param {string} valueName - The value of the radio button.
 */
const GridRadioButton = ({ name, onChange, radioId, isChecked, valueName }) => {

    const handleRadioChange = (e) => {
        e.preventDefault();
        const selectedValue = e.target.value;
        if (onChange) {
            onChange(selectedValue);
        }
    };

    return (
        <div className="radio">
            <input
                id={radioId}
                type="radio"
                className="form-radio"
                name={name}
                checked={isChecked}
                value={valueName}
                onChange={handleRadioChange}
            />
            <label htmlFor={radioId} className="radio-label">{valueName}</label>
        </div>
    );
};

// Define PropTypes for the component
GridRadioButton.propTypes = {
    name: PropTypes.string.isRequired, // The name of the radio group
    onChange: PropTypes.func, // Callback function to handle change events
    radioId: PropTypes.string, // ID for the single radio button
    isChecked: PropTypes.bool, // Whether the single radio button is checked
    valueName: PropTypes.string.isRequired // Value for the single radio button
};

export default GridRadioButton;
