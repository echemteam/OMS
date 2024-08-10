import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import "./GridDropdown.scss";

const GridDropdown = (props) => {
  const defaultSelectedOption = props.value
    ? props.options?.find((option) => option.value === props.value)
    : null;

  const defaultSelectedOptionMultiSelect = Array.isArray(props.value)
    ? props.options.filter((option) => props.value.includes(option.value))
    : [];

  return (
    <span className="d-inline-block custom-input">
      <Select
        className="custom-checkbox-select"
        // value={props.value}
        value={
          props.isMultiSelect
            ? defaultSelectedOptionMultiSelect
            : defaultSelectedOption
        } // Pass the selected value from the parent component
        onChange={props.onChange}
        onBlur={props.onBlur}
        options={props.options}
        isMulti={props.isMultiSelect}
        placeholder={props.placeholder}
        isDisabled={props.isDropdownDisabled}
      />
    </span>
  );
};
GridDropdown.propTypes = {
  // The currently selected value(s) for the dropdown
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),

  // Function to handle changes in the dropdown selection
  onChange: PropTypes.func.isRequired,

  // Function to handle blur events for validation
  onBlur: PropTypes.func,

  // Array of options for the dropdown
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,

  // Boolean to indicate if multiple selections are allowed
  isMultiSelect: PropTypes.bool,

  // Placeholder text for the dropdown
  placeholder: PropTypes.string,

  // Boolean to disable the dropdown
  isDropdownDisabled: PropTypes.bool,
};

export default GridDropdown;
