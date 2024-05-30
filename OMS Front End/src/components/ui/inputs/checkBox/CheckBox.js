import React from "react";
import PropTypes from "prop-types";
import "./Checkbox.scss";
import Label from "../../label/Label";

const Checkbox = ({
  name = "",
  label = "",
  checked,
  onChange,
  isDisable,
  dataField,
  cssClass = "checkbox-field",
}) => {


  const handleCheckboxChange = (e) => {
    const newValue = e.target.checked;
    if (onChange) {
      onChange(dataField, newValue);
    }
  };

  // TODO : check my comments
  return (
    
    <div className="checkbox-part">
      <div className="checkbox">
        <input
          name={name}
          className="form-checkbox"
          type="checkbox"
          id={name}
          checked={checked}
          onChange={handleCheckboxChange}
          disabled={isDisable}
        />
        <label htmlFor={name} className="checkbox-label"></label>
      </div>
      {label && label !== "" && <Label labelName={label} for={name} />}
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  cssClass: PropTypes.string,
};

export default Checkbox;
