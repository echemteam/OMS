import React from "react";
import Select, { components } from "react-select";
import "./CustomDropdown.scss";
import StatusDisplay from "./StatusDisplay";

const CustomOption = (props) => {
  const { data, isSelected, selectProps } = props;
  const { status, label } = data;
  const { colorMap, textMap, iconMap } = selectProps.dropDownSettings;


  console.log("CustomOption props:", props);

  return (
    <components.Option {...props}>
      <div className="custom-option">
        <span className="option-label">{label}</span>
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
  const { dropDownSettings } = props;

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
    </span>
  );
}

export default CustomDropdown;
