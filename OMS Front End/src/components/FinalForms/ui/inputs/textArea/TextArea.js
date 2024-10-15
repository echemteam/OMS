import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TextArea.scss";

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
 * @param {boolean} isDisabled - Flag to disable the textarea.
 * @param {boolean} isReadOnly - Flag to make the textarea read-only.
 * @param {string} error - Error message to display for validation.
 * @param {number} maxLength - Maximum length of the input.
 */

const TextArea = ({
  name = "",
  placeholder = `Please Enter ${name}`,
  value = "",
  onChange,
  textareaRows = 5,
  textareaCols,
  onBlur,
  isDisabled = false,
  isReadOnly = false,
  maxLength,
  ...rest
}) => {
  const [currentLength, setCurrentLength] = useState(value.length);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Enforce maxLength by trimming the input value
    if (maxLength && inputValue.length > maxLength) {
      return;
    }

    setCurrentLength(inputValue.length);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="text-area">
      <textarea
        className="text-area-input"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handleChange}
        rows={textareaRows}
        cols={textareaCols}
        onBlur={onBlur}
        disabled={isDisabled}
        readOnly={isReadOnly}
        {...rest}
      />
      {rest.showTextLength ?
        <div className="text-area-length-info">
          <span>Current Length: {currentLength}</span>
          {maxLength && <span> / Max Length: {maxLength}</span>}
        </div>
        : null
      }
    </div>
  );
};

// Define PropTypes for the component
TextArea.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  textareaRows: PropTypes.number,
  textareaCols: PropTypes.number,
  onBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default TextArea;
