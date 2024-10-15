import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Image from "../../../../image/Image";
import { AppIcons } from "../../../../../data/appIcons";
import "./EditableDropdown.scss";


const Input = React.lazy(() => import("../input/Input"));
const Dropdown = React.lazy(() => import("../dropdown/DropDown"));

const EditableDropdown = ({
  onChange,
  onBlur,
  dataField,
  value,
  formSetting,
  options,
  placeholder,
  fieldActions,
  isMultiSelect,
  isText,
  ...inputProps
}) => {


  const [isInputField, setIsInputField] = useState(isText);

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e, 'input');
    }
  };

  useEffect(()=>{
    if(value === null || value === "")
    {
      setIsInputField(false);
    }
},[value])

  const handleChange = (selectedOption) => {
    if (onChange) {
      if (isMultiSelect) {
        const selectedValues = selectedOption.map((option) => option.value);
        onChange(dataField, 'dropdown', selectedValues);
      } else {
        onChange(dataField, "dropdown", selectedOption);
        if (fieldActions) {
          fieldActions("DDL_CHANGED", dataField, selectedOption);
        }
      }
    }
  };

  const handleOnBlur = (e) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  

  return (
    <div className="custom-dropdown">
      <div className="input-sec">
        {!isInputField ? (
          <Dropdown
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleOnBlur}
            options={options}
            value={value}
            isMultiSelect={isMultiSelect}
            isDisabled={formSetting?.isViewOnly || inputProps.isDisable}
            {...inputProps}
          />
        ) : (
          <Input
            placeholder={placeholder}
            onChange={handleInputChange}
            onBlur={handleOnBlur}
            value={value?value.text:""}
            isDisable={formSetting?.isViewOnly || inputProps?.isDisable || false}
            {...inputProps}
          />
        )}
      </div>
      <div   role="button"
        className="button-sec"
        onClick={() => setIsInputField(!isInputField)}
      >
        <div title={!isInputField ? "Edit" : "Cancel"}>
          <Image
            imagePath={!isInputField ? AppIcons.PencilIcon : AppIcons.CancelIcon}
            altText={!isInputField ? "cancel" : "edit"}
          ></Image>
        </div>
      </div>
    </div>
  );
};

EditableDropdown.propTypes = {
  /**
   * Callback function when the input or dropdown value changes.
   */
  onChange: PropTypes.func,

  /**
   * Callback function when the input or dropdown loses focus.
   */
  onBlur: PropTypes.func,

  /**
   * The data field associated with the component.
   */
  dataField: PropTypes.string,

  /**
   * Current value of the input or dropdown.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),

  /**
   * Settings for the form.
   */
  formSetting: PropTypes.shape({
    isViewOnly: PropTypes.bool
  }),

  /**
   * Options for the dropdown.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),

  /**
   * Placeholder text for the input or dropdown.
   */
  placeholder: PropTypes.string,

  /**
   * Function for handling field actions (e.g., "DDL_CHANGED").
   */
  fieldActions: PropTypes.func,

  /**
   * Boolean to enable multi-select functionality for the dropdown.
   */
  isMultiSelect: PropTypes.bool,

  /**
   * Boolean to determine if the input field should be shown.
   */
  isText: PropTypes.bool,

  /**
   * Additional props to pass to the Input or Dropdown component.
   */
  inputProps: PropTypes.object
};


export default EditableDropdown;
