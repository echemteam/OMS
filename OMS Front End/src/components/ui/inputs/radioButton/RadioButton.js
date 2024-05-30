import React from "react";
import "./RadioButton.scss";

const RadioButton = ({
  name,
  onChange,
  onBlur,
  formSetting,
  options,
  selectedOption,
  radioId,
  isChecked,
  radioName,
  valueName
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
                checked={selectedOption === option.value}
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
            <label htmlFor={valueName} className="radio-label ml-2">{valueName}</label>

          </div>
        )
      }
    </>
  );
}

export default RadioButton;
