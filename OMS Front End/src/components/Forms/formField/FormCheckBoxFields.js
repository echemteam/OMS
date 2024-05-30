import React from "react";
import Checkbox from "../../ui/inputs/checkBox/CheckBox";

const FormCheckboxField = ({
  labelName,
  name,
  onChange,
  dataField,
  checked,
  formSetting,
  overRideProps,
  ...checkboxProps
}) => {
  const handleCheckboxChange = (dataField, value) => {
    if (onChange) {
      onChange(dataField, value);
    }
  };

  return (
    <>
      <div className="input-field-sec">
        {checkboxProps.hasMainTitle ?
          <div className="section-title">
            <h5>{checkboxProps.hasMainTitle}</h5>
          </div>
          : ""}
        <div className="checkbox-label-part">
          <Checkbox
            name={name}
            label={labelName}
            checked={checked}
            onChange={handleCheckboxChange}
            isDisable={formSetting?.isViewOnly || checkboxProps?.isDisable || overRideProps?.isDisable}
            dataField={dataField}
            {...checkboxProps}
          />
        </div>
      </div>
    </>
  );
};

export default FormCheckboxField;
