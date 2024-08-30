import React from "react";
import PropTypes from "prop-types";
import "./GridCheckbox.scss";

const GridCheckbox = ({
  name = "",
  checked,
  onChange,
  disabled,
  dataField,
  isStaticCheckBox,
  cssClass = "checkbox-part",
}) => {
  const handleCheckboxChange = (e) => {
    const newValue = e.target.checked;
    if (onChange) {
      onChange(dataField, newValue);
    }
  };

  const handleStaticCheckboxChange = (event) => {
    onChange(dataField, event.target.checked);
  };

  return (
    // <div className="checkbox-part">
    //   <div className="checkbox">
    //     <input
    //       id={name}
    //       name={name}
    //       type="checkbox"
    //       checked={checked}
    //       disabled={disabled}
    //       className="form-checkbox"
    //       onChange={handleCheckboxChange}
    //     />
    //   </div>
    // </div>
    <div className="checkbox">
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="form-checkbox"
        onChange={isStaticCheckBox ? handleStaticCheckboxChange : handleCheckboxChange}
      />
      <label
        htmlFor={name}
        className={"checkbox-label  checkbox-disable"}
      ></label>
    </div>
  );
};

GridCheckbox.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool, // Add this line
  dataField: PropTypes.string, // Add this line
  cssClass: PropTypes.string,
};

export default GridCheckbox;
