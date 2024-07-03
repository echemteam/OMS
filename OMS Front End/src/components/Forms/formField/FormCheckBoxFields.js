import React, { useEffect } from "react";
import Checkbox from "../../ui/inputs/checkBox/CheckBox";
import ValidationText from "../../ui/inputs/validation/ValidationText";

const FormCheckboxField = ({
  labelName,
  name,
  onChange,
  dataField,
  onValidation,
  checked,
  formSetting,
  error,
  overRideProps,
  fieldActions,
  ...checkboxProps
}) => {
  const handleCheckboxChange = (dataField, value) => {
    if (onChange) {
      onChange(dataField, value);
    }
    if (fieldActions) {
      fieldActions('CHECK_CHANGE', dataField, value);
    }
  };

  useEffect(() => {
    if (onValidation) {
      onValidation(dataField);
    }
  }, [checked]);


  return (
    <>
      <div className="input-field-sec">
        {checkboxProps.hasMainTitle ?
          <div className="section-title">
            <h5>{checkboxProps.hasMainTitle}</h5>
          </div>
          : ""}
        <div className="checkbox-label-part mb-2">
          <Checkbox
            name={name}
            label={labelName}
            checked={checked}
            onChange={handleCheckboxChange}
            isDisable={formSetting?.isViewOnly || checkboxProps?.isDisable || overRideProps?.isDisable}
            dataField={dataField}
            {...checkboxProps}
            showColomns={true}
          />
        </div>
        <ValidationText error={error || ""} />
      </div>
    </>
  );
};

export default FormCheckboxField;
