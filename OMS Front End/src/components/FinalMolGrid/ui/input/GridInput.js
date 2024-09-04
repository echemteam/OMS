/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  TextInputType,
  NumberValueType,
} from "../../libs/data/formControlTypes";
import { PatternFormat } from "react-number-format";
import "./GridInput.scss";

const excptIntSymbol = ["e", "E", "+", "-", "."];
const excptDecimalSymbol = ["e", "E", "+", "-"];
/**
 * A customizable input component that supports various input types, formatting, and validation.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.type - The type of input field (e.g., text, number).
 * @param {string} [props.name=""] - The name attribute for the input field.
 * @param {string} [props.placeholder=`${name}`] - The placeholder text for the input field.
 * @param {string|number} props.value - The value of the input field.
 * @param {number} [props.min] - The minimum value (for number inputs).
 * @param {number} [props.max] - The maximum value (for number inputs).
 * @param {Function} props.onChange - Callback function when input value changes.
 * @param {Function} [props.onKeyup] - Callback function when a key is released.
 * @param {Function} [props.onBlur] - Callback function when the input loses focus.
 * @param {number} [props.minLength] - The minimum length of the input.
 * @param {number} [props.maxLength] - The maximum length of the input.
 * @param {string} [props.cssClass="input-field"] - CSS class for styling the input.
 * @param {boolean} [props.allowSpace=true] - Whether to allow spaces in the input.
 * @param {string} [props.valueType] - The type of value (e.g., integer, decimal) for number inputs.
 * @param {boolean} [props.isDisable] - Whether the input is disabled.
 * @param {boolean} [props.isReadOnly] - Whether the input is read-only.
 * @param {RegExp} [props.pattern] - Regular expression pattern for validation.
 * @param {string} [props.maskFormat] - Format for the input mask.
 * @param {string} [props.extendedFormat] - Format for extended mask.
 * @param {number} [props.minValueLength] - Minimum length required to switch to extended format.
 */
const GridInput = ({
  type = TextInputType.TEXT,
  name = "",
  placeholder = `${name}`,
  value,
  min,
  max,
  onChange,
  onKeyup,
  onBlur,
  minLength,
  maxLength,
  cssClass = "input-field",
  allowSpace = true,
  valueType,
  isDisable,
  isReadOnly,
  pattern,
  maskFormat,
  extendedFormat,
  minValueLength,
  hasError,
}) => {

  const errorIconClass = type === TextInputType.NUMBER ? 'error-icon-number' : 'error-icon';

  const [inputAttributes, setInputAttributes] = useState({});
  const [format, setFormat] = useState(maskFormat);

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

    if (type === TextInputType.NUMBER && valueType === NumberValueType.INT) {
      newAttribute.step = 1;
    }

    setInputAttributes(newAttribute);
  };

  useEffect(() => {
    updateAttributes();
  }, [minLength, maxLength, type, valueType]);

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e);
      const unMaskedValue = e.target.value.replace(/\D/g, "");
      setFormat(
        unMaskedValue.length >= minValueLength ? extendedFormat : maskFormat
      );
    }
  };

  const handleKeyDown = (e) => {
    if (!allowSpace && e.keyCode === 32) {
      e.preventDefault();
      return;
    }

    if (
      type === TextInputType.NUMBER &&
      valueType === NumberValueType.INT &&
      excptIntSymbol.includes(e.key)
    ) {
      e.preventDefault();
      return;
    }

    if (
      type === TextInputType.NUMBER &&
      valueType === NumberValueType.DECIMAL &&
      excptDecimalSymbol.includes(e.key)
    ) {
      e.preventDefault();
    }
  };
  return (
    <>
    
    <div className={`input-wrapper ${hasError ? 'input-error' : ''}`}>
      {maskFormat ? (
        <PatternFormat
          mask="_"
          id={name}
          value={value}
          name={name}
          type={type}
          className={`${cssClass} ${hasError ? 'error-border' : ''}`}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyUp={onKeyup}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          disabled={isDisable}
          format={format}
          pattern={pattern}
          {...inputAttributes}
        />
      ) : (
        <input
          id={name}
          value={value}
          name={name}
          type={type}
          className={`${cssClass} ${hasError ? 'error-border' : ''}`}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyUp={onKeyup}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          disabled={isDisable}
          min={min}
          max={max}
          {...inputAttributes}
        />
      )}
      {hasError && <div className={`${errorIconClass}`}>!</div>}
    </div>
      
    </>
    
  );
};

GridInput.propTypes = {
  type: PropTypes.oneOf([
    TextInputType.TEXT,
    TextInputType.EMAIL,
    TextInputType.PASSWORD,
    TextInputType.NUMBER,
  ]).isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  minValueLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onKeyup: PropTypes.func,
  onBlur: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  pattern: PropTypes.instanceOf(RegExp),
  maskFormat: PropTypes.string,
  extendedFormat: PropTypes.string,
  cssClass: PropTypes.string,
  allowSpace: PropTypes.bool,
  isDisable: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  valueType: PropTypes.oneOf([NumberValueType.INT, NumberValueType.DECIMAL]),
  step: PropTypes.number,
};

export default GridInput;
