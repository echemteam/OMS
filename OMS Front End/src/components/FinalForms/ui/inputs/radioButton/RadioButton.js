import React from "react";
import "./RadioButton.scss";
import PropTypes from 'prop-types';

/**
 * RadioButton component for rendering radio button options.
 *
 * @param {string} name - The name of the radio group.
 * @param {function} onChange - Callback function to handle change events.
 * @param {function} onBlur - Callback function to handle blur events.
 * @param {object} formSetting - Configuration object for form settings.
 * @param {Array} options - Array of radio button options.
 * @param {string} selectedOption - The currently selected option value.
 * @param {string} radioId - The ID of the radio button (for single radio button).
 * @param {boolean} isChecked - Whether the single radio button is checked.
 * @param {string} radioName - The name of the single radio button (for single radio button).
 * @param {string} valueName - The value of the single radio button (for single radio button).
 */
const RadioButton = ({
  name,
  onChange,
  onBlur,
  formSetting,
  options,
  value,
  radioId,
  isChecked,
  radioName,
  valueName,
  ...fieldSetting
}) => {

  const handleRadioChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      {options
        ? (
          options.map((option) => (
            <div className={`radio-buttons ${option.optionClass}`} key={option.value}>
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={handleRadioChange}
                onBlur={onBlur}
                disabled={formSetting?.isViewOnly || option.isDisable || false}
              />
            <label className="radio-label ml-2" htmlFor={`${name}-${option.value}`}>{option.label}</label>
            </div>
          ))
        )
        : (
          <div className="radio">
            <input
              id={radioId}
              type="radio"
              className="form-radio"
              name={radioName}
              checked={isChecked}
              value={valueName}
              onChange={onChange}
            />
          <label htmlFor={radioId} className="radio-label">{valueName}</label>

          </div>
        )
      }
    </>
  );
}
// Define PropTypes for the component
RadioButton.propTypes = {
  name: PropTypes.string.isRequired, // The name of the radio group
  onChange: PropTypes.func, // Callback function to handle change events
  onBlur: PropTypes.func, // Callback function to handle blur events
  formSetting: PropTypes.shape({
    isViewOnly: PropTypes.bool // Configuration for form settings
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired, // Value of the radio option
      label: PropTypes.string.isRequired, // Label for the radio option
      optionClass: PropTypes.string, // Additional class for styling
      isDisable: PropTypes.bool // Flag to disable the option
    })
  ),
  selectedOption: PropTypes.string, // The currently selected option value
  radioId: PropTypes.string, // ID for the single radio button
  isChecked: PropTypes.bool, // Whether the single radio button is checked
  radioName: PropTypes.string, // Name for the single radio button
  valueName: PropTypes.string // Value for the single radio button
};

export default RadioButton;
