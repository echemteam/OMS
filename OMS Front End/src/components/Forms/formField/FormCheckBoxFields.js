/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import PropTypes from 'prop-types';
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
FormCheckboxField.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  dataField: PropTypes.string.isRequired,
  onValidation: PropTypes.func,
  checked: PropTypes.bool.isRequired,
  formSetting: PropTypes.shape({
    isViewOnly: PropTypes.bool,
  }),
  error: PropTypes.string,
  overRideProps: PropTypes.shape({
    isDisable: PropTypes.bool,
  }),
  fieldActions: PropTypes.func,
  checkboxProps: PropTypes.object,
};

export default FormCheckboxField;
