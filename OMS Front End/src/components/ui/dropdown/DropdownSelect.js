import React from "react";
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

export default DropdownSelect;
