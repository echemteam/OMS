/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { TextInputType, NumberValueType } from "../../../../data/formControlTypes";
import { PatternFormat } from 'react-number-format';
import "./Input.scss"
import Image from "../../../image/Image";
import { AppIcons } from "../../../../data/appIcons";

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
  inputButtonGroupConfig,
  handleInputGroupButton,
  handleInputShowInfo,
  inputIcon,
  onKeyPress
}) => {

  const [inputAttributes, setInputAttributes] = useState({});
  const [format, setFormat] = useState(maskFormat)
  const [showPassword, setShowPassword] = useState(false);

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

    let inputValue = e.target.value

    if (type === TextInputType.NUMBER && maxLength) {
      inputValue = inputValue.slice(0, maxLength);
      e.target.value = inputValue;
    }

    if (allowSpace) {
      onChange(e);
    } else {
      e.target.value = e.target.value.trim();
      onChange(e);
    }

    const unMaskedValue = inputValue.replace(/\D/g, '');
    setFormat(unMaskedValue.length >= minValueLength ? extendedFormat : maskFormat);
  };

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
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
      {maskFormat ? (
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
      ) : (
        <>
          <div className={`input-group ${type === TextInputType.PASSWORD ? 'custom-pass-sec' : ''}`}>
            <input
              id={name} value={value}
              name={name} type={showPassword && type === TextInputType.PASSWORD ? TextInputType.TEXT : type}
              className={`${cssClass} ${inputButtonGroupConfig?.isPrimaryButtonVisible ? "inputWithButton" : ""}`}
              placeholder={placeholder} onChange={handleInputChange}
              onKeyUp={onKeyup} onKeyDown={handleKeyDown} onBlur={onBlur}
              onKeyPress={onKeyPress} disabled={isDisable}
              min={min} max={max}{...inputAttributes} />
            <div className="input-group-append">
              {inputButtonGroupConfig?.isPrimaryButtonVisible && (
                <div>
                  <button className="input-button btn theme-button" disabled={!value}
                    type="button" onClick={handleInputGroupButton} >
                    {inputButtonGroupConfig?.primaryButtonText}
                  </button>
                </div>
              )}
              <div className="input-seprate-btn">
                {inputButtonGroupConfig?.infoButtonConfig?.isInfoButtonVisible && (
                  <button className="input-button btn theme-button list-btn-width ml-1 border-fix"
                    disabled={!value} type="button" onClick={handleInputShowInfo} >
                    <i className={`fa ${inputButtonGroupConfig?.infoButtonConfig?.infoButtonIcon}`} />
                    <span className="tooltip-text">
                      {inputButtonGroupConfig?.infoButtonConfig?.infoButtonTooltip}
                    </span>
                  </button>
                )}
              </div>
            </div>
            {type === TextInputType.PASSWORD && (
              <div type="button" className="password-hide-show" onClick={toggleShowPassword}>
                {showPassword ? (
                  <Image imagePath={AppIcons.EyeSlashIcon} altText="Password Hide" />
                ) : (
                  <Image imagePath={AppIcons.EyeIcon} altText="Password Show" />
                )}
              </div>
            )}
            {inputIcon?.isIconShow && (
              <div className="icon-fix">
                <div className="input-icon">
                  <i className={`fa ${inputIcon?.faIcon}`} />
                  <span className="tooltip-text">
                    {inputIcon?.message}
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf([
    TextInputType.TEXT,
    TextInputType.EMAIL,
    TextInputType.PASSWORD,
    TextInputType.NUMBER
  ]).isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onKeyup: PropTypes.func,
  onBlur: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  pattern: PropTypes.instanceOf(RegExp),
  maskFormat: PropTypes.string,
  extendedFormat: PropTypes.string,
  minValueLength: PropTypes.number,
  cssClass: PropTypes.string,
  allowSpace: PropTypes.bool,
  isDisable: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  valueType: PropTypes.oneOf([NumberValueType.INT, NumberValueType.DECIMAL]),
  handleInputGroupButton: PropTypes.func,
  handleInputShowInfo: PropTypes.func,
  inputIcon: PropTypes.shape({
    isIconShow: PropTypes.bool,
    faIcon: PropTypes.string,
    message: PropTypes.string
  })
};

export default Input;