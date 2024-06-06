import React from "react";
import Select from "react-select";
import "./DropdownSelect.scss";

function DropdownSelect(props) {
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
      />
    </span>
  );
}

export default DropdownSelect;
