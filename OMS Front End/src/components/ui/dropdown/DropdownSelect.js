import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "./DropdownSelect.scss";

function DropdownSelect(props) {
  const base64Icon = props.inputButtonGroup?.icon;

  return (
    (props.inputButtonGroup?.isInputButton) ?
      <>
        <span className="d-inline-block custom-input">
          <Select
            className="custom-checkbox-select"
            value={props.value}
            onChange={props.handleDropdownChange}
            onBlur={props.handleDropdownBlur}
            options={props.optionsValue}
            isMulti={props.isMultiSelect}
            placeholder={props.placeholder}
            isDisabled={props.isDropdownDisabled}
            closeMenuOnSelect={props.isMultiSelect ? false : true}
          />

          {props.inputButtonGroup?.isInputButton && (
            <button
              className="select-button"
              type="button"
              onClick={() => props.handleInputGroupButton(props.inputButtonGroup?.GetByID)}
            >
              {base64Icon && (
                <img src={base64Icon} alt="icon" className="input-button-icon" />
              )}
              {props.inputButtonGroup.buttonText}
            </button>
          )}
        </span>
      </>
      :
      <>
        <span className="d-inline-block custom-input">
          <Select
            className="custom-checkbox-select"
            value={props.value}
            onChange={props.handleDropdownChange}
            onBlur={props.handleDropdownBlur}
            options={props.optionsValue}
            isMulti={props.isMultiSelect}
            placeholder={props.placeholder}
            isDisabled={props.isDropdownDisabled}
            closeMenuOnSelect={props.isMultiSelect ? false : true}
          />
        </span>
      </>
  );
}

DropdownSelect.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  optionsValue: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  handleDropdownChange: PropTypes.func.isRequired,
  handleDropdownBlur: PropTypes.func,
  placeholder: PropTypes.string,
  isMultiSelect: PropTypes.bool,
  isDropdownDisabled: PropTypes.bool,
  inputButtonGroup: PropTypes.shape({
    icon: PropTypes.string,
    buttonText: PropTypes.string,
    isInputButton: PropTypes.bool,
    GetByID: PropTypes.string,
  }),
  handleInputGroupButton: PropTypes.func,
};

export default DropdownSelect;
