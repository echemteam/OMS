import React from "react";
import PropTypes from 'prop-types';
import DropdownSelect from "./DropdownSelect"

const DropDown = (props) => {


  const defaultSelectedOption = props.value ? props.options?.find(option => option.value === props.value) : null;

  const defaultSelectedOptionMultiSelect = Array.isArray(props.value) ?
    props.options.filter(option => props.value.includes(option.value)) : [];

  return (
    
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
    
  );
}
DropDown.propTypes = {
  // Placeholder text for the dropdown
  placeholder: PropTypes.string,

  // Boolean to indicate if multiple selections are allowed
  isMultiSelect: PropTypes.bool,

  // Array of options for the dropdown
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,

  // Currently selected value(s) for the dropdown
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),

  // Function to handle changes in the dropdown selection
  onChange: PropTypes.func,

  // Function to handle blur events for validation
  onBlur: PropTypes.func,

  // Boolean to disable the dropdown
  isDisabled: PropTypes.bool,
};

export default DropDown