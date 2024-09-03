import React from "react";
import PropTypes from "prop-types"
import CustomDropdown from "./CustomDropdown";

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
          handleInputGroupButton={props.handleInputGroupButton}
        />
      </span>
    </>
  );
};
DropDown.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  isMultiSelect: PropTypes.bool,
  isDisabled: PropTypes.bool,
  dropDownSettings: PropTypes.shape({
    colorMap: PropTypes.object.isRequired,
    textMap: PropTypes.object.isRequired,
    iconMap: PropTypes.object.isRequired
  }),
  inputButtonGroup: PropTypes.shape({
    icon: PropTypes.string,
    buttonText: PropTypes.string,
    isInputButton: PropTypes.bool,
  }),
  handleInputGroupButton: PropTypes.func,
};
export default DropDown;
