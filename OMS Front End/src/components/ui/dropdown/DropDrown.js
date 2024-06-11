import React from "react";
import DropdownSelect from "./DropdownSelect"

const DropDown = (props) => {

  const defaultSelectedOption = props.value ? props.options?.find(option => option.value === props.value) : null;

  const defaultSelectedOptionMultiSelect = Array.isArray(props.value) ?
    props.options.filter(option => props.value.includes(option.value)) : [];

  return (
    <>
      <span className="d-inline-block custom-input">
        <DropdownSelect
          placeholder={props.placeholder}
          isMultiSelect={props.isMultiSelect}
          optionsValue={props.options} // Define selectValue according to your needs
          value={props.isMultiSelect ? defaultSelectedOptionMultiSelect : defaultSelectedOption} // Pass the selected value from the parent component
          handleDropdownChange={props.onChange} // Handle dropdown value change
          handleDropdownBlur={props.onBlur}
          isDropdownDisabled={props.isDisabled}
        />
      </span>
    </>
  );
}

export default DropDown