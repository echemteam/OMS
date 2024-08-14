import React from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";
import "./CustomDropdown.scss";
import StatusDisplay from "./StatusDisplay";
import formatDate from "../../../lib/formatDate";

const CustomOption = (props) => {
  const { data, isSelected, selectProps } = props;
  const { status, label, date } = data;
  const { colorMap, textMap, iconMap } = selectProps.dropDownSettings;

  return (
    <components.Option {...props}>
      <div className="custom-option">
        <span className="option-label">{label}</span>
        <span className="option-date">{date ? formatDate(date, 'MM/DD/YYYY') : null}</span>
        <StatusDisplay
          status={status}
          isSelected={isSelected}
          colorMap={colorMap}
          textMap={textMap}
          iconMap={iconMap}
        />
      </div>
    </components.Option>
  );
};

function CustomDropdown(props) {
  const { dropDownSettings, inputButtonGroup } = props;
  const base64Icon = inputButtonGroup?.icon;

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
        closeMenuOnSelect={!props.isMultiSelect}
        components={{ Option: CustomOption }}
        dropDownSettings={dropDownSettings}
      />

      {inputButtonGroup?.isInputButton && (
        <button
          className="select-button"
          disabled={!props.value}
          type="button"
          onClick={props.handleInputGroupButton}
        >
          {base64Icon && (
            <img
              src={base64Icon}
              alt="icon"
              className="input-button-icon"
            />
          )}
          {inputButtonGroup.buttonText}
        </button>
      )}
    </span>
  );
}

CustomDropdown.propTypes = {
  dropDownSettings: PropTypes.shape({
    colorMap: PropTypes.object,
    textMap: PropTypes.object,
    iconMap: PropTypes.object
  }).isRequired,
  inputButtonGroup: PropTypes.shape({
    icon: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    isInputButton: PropTypes.bool.isRequired
  }),
  handleInputGroupButton: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  handleDropdownChange: PropTypes.func.isRequired,
  handleDropdownBlur: PropTypes.func,
  optionsValue: PropTypes.array,
  isMultiSelect: PropTypes.bool,
  placeholder: PropTypes.string,
  isDropdownDisabled: PropTypes.bool
};
export default CustomDropdown;
