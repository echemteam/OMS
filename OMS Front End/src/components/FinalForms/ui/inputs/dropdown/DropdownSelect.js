import React from "react";
import PropTypes from 'prop-types';

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
        menuPortalTarget={document.body}
        menuPosition="absolute"
        menuPlacement="auto"
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
      />
    </span>
  );
}
DropdownSelect.propTypes = {
  // The currently selected value(s) for the dropdown
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),

  // Function to handle changes in the dropdown selection
  handleDropdownChange: PropTypes.func.isRequired,

  // Function to handle blur events for validation
  handleDropdownBlur: PropTypes.func,

  // Array of options for the dropdown
  optionsValue: PropTypes.arrayOf(
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

export default DropdownSelect;
