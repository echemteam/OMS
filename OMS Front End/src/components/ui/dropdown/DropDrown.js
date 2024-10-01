import React from "react";
import PropTypes from "prop-types";
import DropdownSelect from "./DropdownSelect"

const DropDown = (props) => {

  let defaultSelectedOption = props.value ? props.options?.find(option => option.value === props.value) : null;

  if (!defaultSelectedOption) {
    defaultSelectedOption = props.value ? props.options?.find(option => option.label === props.value) : null;
  }

  const defaultSelectedOptionMultiSelect = Array.isArray(props.value) ?
    props.options.filter(option => props.value.includes(option.value)) : [];

  return (
    <>
      <span className="d-inline-block w-100">
        <DropdownSelect
          placeholder={props.placeholder}
          isMultiSelect={props.isMultiSelect}
          optionsValue={props.options} // Define selectValue according to your needs
          value={props.isMultiSelect ? defaultSelectedOptionMultiSelect : defaultSelectedOption} // Pass the selected value from the parent component
          handleDropdownChange={props.onChange} // Handle dropdown value change
          handleDropdownBlur={props.onBlur}
          isDropdownDisabled={props.isDisabled}
          inputButtonGroup={props.inputButtonGroup}
          handleInputGroupButton={props.handleInputGroupButton}
        />
      </span>
    </>
  );
}

DropDown.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([  
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  isMultiSelect: PropTypes.bool,
  isDisabled: PropTypes.bool,
  inputButtonGroup: PropTypes.shape({
    icon: PropTypes.string,
    buttonText: PropTypes.string,
    isInputButton: PropTypes.bool,
  }),
  handleInputGroupButton: PropTypes.func,
};

export default DropDown