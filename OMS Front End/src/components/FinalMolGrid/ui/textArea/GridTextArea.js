import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./GridTextArea.scss";
/**
 * TextArea component for rendering a multi-line text input field.
 * Utilizes Material-UI's TextField component with additional custom attributes.
 *
 * @param {string} name - The name of the textarea field.
 * @param {string} placeholder - Placeholder text for the textarea.
 * @param {string} value - Current value of the textarea.
 * @param {function} onChange - Callback function to handle input change events.
 * @param {number} textareaRows - Number of rows for the textarea.
 * @param {number} textareaCols - Number of columns for the textarea.
 * @param {function} onBlur - Callback function to handle blur events.
 * @param {number} minLength - Minimum length of the input.
 * @param {number} maxLength - Maximum length of the input.
 * @param {boolean} isDisable - Flag to disable the textarea.
 * @param {boolean} isReadOnly - Flag to make the textarea read-only.
 * @param {string} error - Error message to display for validation.
 */

const GridTextArea = ({
  name = "",
  placeholder = `Please Enter ${name}`,
  value,
  onChange,
  textareaRows,
  textareaCols,
  onBlur,
  minLength,
  maxLength,
  isDisable,
  isReadOnly,
  error,
}) => {
  const [inputAttributes, setInputAttributes] = useState({});

  const updateAttributes = () => {
    const newAttribute = { ...inputAttributes };

    if (minLength) {
      newAttribute.minLength = minLength;
    }

    if (maxLength) {
      newAttribute.maxLength = maxLength;
    }

    if (isReadOnly) {
      newAttribute.readOnly = isReadOnly;
    }
    setInputAttributes(newAttribute);
  };

  useEffect(() => {
    updateAttributes();
  }, [minLength, maxLength]);

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="text-area">
      <TextField
        className="text-area-input"
        label={placeholder}
        value={value}
        onChange={handleInputChange}
        rows={textareaRows}
        multiline
        variant="outlined"
        onBlur={onBlur}
        disabled={isDisable}
        InputProps={{ disableUnderline: true }}
        {...inputAttributes}
      />
      <textarea
        className="text-area-input"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        rows={textareaRows}
        cols={textareaCols}
        onBlur={onBlur}
        disabled={isDisable}
        {...inputAttributes}
      />
    </div>
  );
};

// Define PropTypes for the component
GridTextArea.propTypes = {
  name: PropTypes.string, // Name of the textarea field
  placeholder: PropTypes.string, // Placeholder text for the textarea
  value: PropTypes.string, // Current value of the textarea
  onChange: PropTypes.func, // Callback function to handle input changes
  textareaRows: PropTypes.number, // Number of rows for the textarea
  textareaCols: PropTypes.number, // Number of columns for the textarea (optional)
  onBlur: PropTypes.func, // Callback function to handle blur events
  minLength: PropTypes.number, // Minimum length of the input
  maxLength: PropTypes.number, // Maximum length of the input
  isDisable: PropTypes.bool, // Flag to disable the textarea
  isReadOnly: PropTypes.bool, // Flag to make the textarea read-only
  error: PropTypes.string, // Error message for validation
};

export default GridTextArea;
