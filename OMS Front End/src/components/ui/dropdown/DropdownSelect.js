import React from "react";
import Select from "react-select";
import "./DropdownSelect.scss";

function DropdownSelect(props) {
  const { inputButtonGroup } = props;
  const base64Icon = inputButtonGroup?.icon;

  return (
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

      {inputButtonGroup?.isInputButton && (
        <button
          className="select-button"
          disabled={!props.value}
          type="button"
          onClick={inputButtonGroup.handleInputGroupButton}
        >
          {base64Icon && (
            <img src={base64Icon} alt="icon" className="input-button-icon" />
          )}
          {inputButtonGroup.buttonText}
        </button>
      )}
    </span>
  );
}

export default DropdownSelect;
