import React, { useState, useEffect } from "react";
import Image from "../../../image/Image";
import { AppIcons } from "../../../../data/appIcons";
import "./EditableDropdown.scss";
import PropTypes from "prop-types";

const Input = React.lazy(() => import("../../inputs/input/Input"));
const Dropdown = React.lazy(() => import("../../dropdown/DropDrown"));

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
  dropdownAction,
  isDependDropdown,
  ...inputProps
}) => {


  const [isInputField, setIsInputField] = useState(isText);

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e, 'input');
    }
  };

  useEffect(() => {
    if (value === null || value === "") {
      setIsInputField(false);
    }
  }, [value])

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

  const handleInputFields = () => {
    setIsInputField(!isInputField);
    if (dropdownAction) {
      dropdownAction("DA_CHANGED", dataField, !isInputField);
    }
  }

  // const handleInputFields = (dataField, isInputField) => {
  //   setIsInputField(!isInputField);
  //   // if (isDependDropdown.dataField === dataField) {

  //   // }
  //   if (dropdownAction) {
  //     dropdownAction("DA_CHANGED", dataField, !isInputField);
  //   }
  // }

  return (
    <div className="custom-dropdown">
      {console.log('isInputField =>', isInputField)}
      {console.log('isText =>', isText, dataField)}
      {console.log('inputProps.isDisable =>', inputProps.isDisable)}
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
            value={value ? value.text : ""}
            isDisable={formSetting?.isViewOnly || inputProps?.isDisable || false}
            {...inputProps}
          />
        )}
      </div>
      <div
        className="button-sec"
        //onClick={() => handleInputFields(dataField, isInputField)}
        onClick={() => handleInputFields()}
      >
        <div title={!isInputField ? "Edit" : "Cancel"}>
          <Image
            imagePath={!isInputField ? AppIcons.PencilIcon : AppIcons.CancelIcon}
            altText={!isInputField ? "cancel" : "edit"}
          ></Image>
        </div>
        {/* <div className="save-btn" title={!isInputField ? "Save" : ""}>
          {!isInputField ? (
            <Image imagePath={AppIcons.DoneIcon} altText={"Save"}></Image>
          ) : (
            ""
          )}
        </div> */}
      </div>
    </div>
  );
};

EditableDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  dataField: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  formSetting: PropTypes.shape({
    isViewOnly: PropTypes.bool
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  placeholder: PropTypes.string,
  fieldActions: PropTypes.func,
  isMultiSelect: PropTypes.bool,
  isText: PropTypes.bool
};

export default EditableDropdown;
