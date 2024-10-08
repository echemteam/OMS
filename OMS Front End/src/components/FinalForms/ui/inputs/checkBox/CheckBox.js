import React from "react";
import PropTypes from "prop-types";
import "./Checkbox.scss";
import Label from "../../label/Label";

const Checkbox = ({
  name = "",
  label = "",
  checked = false,
  onChange,
  isdisable = false,
  dataField,
  ...fieldSetting
}) => {

  const handleCheckboxChange = (e) => {
    const newValue = e.target.checked;
    if (onChange) {
      onChange(dataField, newValue);
    }
  };

  return (
    <div className="checkbox-part">
      <div className="checkbox">
        <input
          id={name}
          name={name}
          className="form-checkbox"
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          disabled={isdisable}
          {...fieldSetting}
        />
        <label
          htmlFor={name}
          className={`checkbox-label ${isdisable ? "checkbox-disabled" : ""}`}
        ></label>
      </div>
      {label && <Label labelName={label} htmlFor={name} />}
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string, // The name attribute for the checkbox input.
  label: PropTypes.string, // The label text associated with the checkbox.
  checked: PropTypes.bool, // Indicates whether the checkbox is checked or not.
  onChange: PropTypes.func.isRequired, // Function to handle the change event.
  isdisable: PropTypes.bool, // Indicates whether the checkbox is disabled or not.
  dataField: PropTypes.string, // Field name or key associated with the checkbox (if applicable).
};

export default Checkbox;
