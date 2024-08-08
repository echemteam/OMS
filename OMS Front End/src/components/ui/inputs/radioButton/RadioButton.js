import React from "react";
import PropTypes from "prop-types";
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

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  formSetting: PropTypes.shape({
    isViewOnly: PropTypes.bool
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      optionClass: PropTypes.string,
      isDisable: PropTypes.bool
    })
  ),
  selectedOption: PropTypes.string,
  radioId: PropTypes.string,
  isChecked: PropTypes.bool,
  radioName: PropTypes.string,
  valueName: PropTypes.string
};

export default RadioButton;
