import React from "react";
import CustomDropdown from "./CustomDropdown";
import { options } from "./data";

const DropDown = (props) => {

  let defaultSelectedOption = props.value
    ? props.options?.find((option) => option.value === props.value)
    : null;

  if (!defaultSelectedOption) {
    defaultSelectedOption = props.value
      ? props.options?.find((option) => option.label === props.value)
      : null;
  }

  const defaultSelectedOptionMultiSelect = Array.isArray(props.value)
    ? props.options.filter((option) => props.value.includes(option.value))
    : [];
 
  return (
    <>
      <span className="d-inline-block custom-input">
        <CustomDropdown
          placeholder={props.placeholder}
          isMultiSelect={props.isMultiSelect}
          optionsValue={props.options}
          value={
            props.isMultiSelect
              ? defaultSelectedOptionMultiSelect
              : defaultSelectedOption
          }
          handleDropdownChange={props.onChange}
          handleDropdownBlur={props.onBlur}
          isDropdownDisabled={props.isDisabled}
          dropDownSettings={props.dropDownSettings}
          inputButtonGroup={props.inputButtonGroup}
        />
      </span>
    </>
  );
};

export default DropDown;
