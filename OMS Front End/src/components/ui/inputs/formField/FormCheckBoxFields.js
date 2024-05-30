import React from "react";
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

export default FormCheckboxField;
