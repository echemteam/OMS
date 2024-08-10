import React from "react";
import PropTypes from "prop-types";
const Checkbox = React.lazy(() => import("../checkBox/CheckBox"));

const FormCheckboxField = ({
  labelName,
  name,
  onChange,
  dataField,
  checked,
  formSetting,
  ...checkboxProps
}) => {
  const handleCheckboxChange = (e) => {
    if (onChange) {
      onChange(dataField, e.target.checked);
    }
  };


  return (
    <>
      <div className="checkbox-label-part">
        <Checkbox
          {...checkboxProps}
          name={name}
          label={labelName}
          checked={checked}
          onChange={handleCheckboxChange}
          isDisable={formSetting?.isViewOnly || checkboxProps?.isDisable}
        />
      </div>
    </>
  );
};

FormCheckboxField.propTypes = {
  labelName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  dataField: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  formSetting: PropTypes.shape({
    isViewOnly: PropTypes.bool,
  }),
  ...Checkbox.propTypes, 
};
export default FormCheckboxField;
