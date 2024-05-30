/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./TextArea.scss"

const TextArea = ({
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

    // if (isDisable) {
    //   newAttribute.disabled = isDisable;
    // }

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
}

export default TextArea;
