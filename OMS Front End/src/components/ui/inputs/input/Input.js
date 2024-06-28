/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { TextInputType, NumberValueType } from "../../../../data/formControlTypes";
import { PatternFormat } from 'react-number-format';
import "./Input.scss"

const excptIntSymbol = ["e", "E", "+", "-", "."];
const excptDecimalSymbol = ["e", "E", "+", "-"];

const Input = ({
  type = TextInputType.TEXT,
  name = "",
  placeholder = `Please Enter ${name}`,
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
  inputButtonGroup,
  handleInputGroupButton
}) => {

  const [inputAttributes, setInputAttributes] = useState({});
  const [format, setFormat] = useState(maskFormat)

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

    if (type === TextInputType.NUMBER && valueType === NumberValueType.INT) {
      newAttribute.step = 1;
    }

    setInputAttributes(newAttribute);
  };

  useEffect(() => {
    updateAttributes();
  }, [minLength, maxLength, type, valueType]);

  const handleInputChange = (e) => {
    if (!onChange) return;

    let inputValue = e.target.value;

    if (type === TextInputType.NUMBER && maxLength) {
      inputValue = inputValue.slice(0, maxLength);
      e.target.value = inputValue;
    }

    onChange(e);

    const unMaskedValue = inputValue.replace(/\D/g, '');
    setFormat(unMaskedValue.length >= minValueLength ? extendedFormat : maskFormat);
  };

  const handleKeyDown = (e) => {
    if (!allowSpace && e.keyCode === 32) {
      e.preventDefault();
      return;
    }

    if (type === TextInputType.NUMBER && valueType === NumberValueType.INT && excptIntSymbol.includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (type === TextInputType.NUMBER && valueType === NumberValueType.DECIMAL && excptDecimalSymbol.includes(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <>
      {maskFormat
        ?
        <PatternFormat
          mask="_"
          id={name}
          value={value}
          name={name}
          type={type}
          className={cssClass}
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
        :
        <>
          {inputButtonGroup?.isInputButton ?
            <div class="input-group mb-3">
              <input
                id={name}
                value={value}
                name={name}
                type={type}
                className={`${cssClass} inputWithButton`}
                placeholder={placeholder}
                onChange={handleInputChange}
                onKeyUp={onKeyup}
                onKeyDown={handleKeyDown}
                onBlur={onBlur}
                disabled={isDisable}
                min={min}
                max={max}
                {...inputAttributes} />
              <div class="input-group-append">
                <button className="input-button btn theme-button"
                  disabled={value ? false : true}
                  type="button" onClick={handleInputGroupButton}>{inputButtonGroup?.buttonText}
                </button>
              </div>
            </div>
            :
            <input
              id={name}
              value={value}
              name={name}
              type={type}
              className={cssClass}
              placeholder={placeholder}
              onChange={handleInputChange}
              onKeyUp={onKeyup}
              onKeyDown={handleKeyDown}
              onBlur={onBlur}
              disabled={isDisable}
              min={min}
              max={max}
              {...inputAttributes} />}
        </>
      }

    </>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf([TextInputType.TEXT, TextInputType.EMAIL, TextInputType.PASSWORD, TextInputType.NUMBER]).isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyup: PropTypes.func,
  onBlur: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  pattern: PropTypes.instanceOf(RegExp),
  format: PropTypes.string,
  cssClass: PropTypes.string,
  allowSpace: PropTypes.bool,
  isDisable: PropTypes.bool,
  valueType: PropTypes.oneOf([NumberValueType.INT, NumberValueType.DECIMAL]),
  step: PropTypes.number,
};

export default Input;