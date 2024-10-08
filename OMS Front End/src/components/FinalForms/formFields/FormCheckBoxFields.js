import React, { lazy, useCallback } from "react";
import PropTypes from 'prop-types';


const Checkbox = lazy(() => import("../ui/inputs/checkBox/CheckBox"));

const FormCheckboxField = ({
  dataField,
  labelName,
  name,
  value,
  formSetting,
  overRideProps,
  fieldSetting,
  onChange,
  fieldActions,
  ...otherProps
}) => {

  const handleCheckboxChange = useCallback((dataField, value) => {
    if (onChange) {
      onChange(dataField, value);
    }
    fieldActions && fieldActions('CB_CHANGE', dataField, value);
  }, [onChange]);

  return (
    <div className="input-field-sec">
      {fieldSetting?.subTittle && (
        <div className="section-title">
          <h5>{fieldSetting.subTittle}</h5>
        </div>
      )}
      <div className="checkbox-label-part">
        <Checkbox
          name={name}
          label={labelName}
          checked={value === 'true' || value === true}
          isdisable={formSetting?.isViewOnly || fieldSetting?.isDisable || overRideProps?.isDisable}
          dataField={dataField}
          onChange={handleCheckboxChange}
          {...fieldSetting}
        />
      </div>
    </div>
  );
};

export default FormCheckboxField;

FormCheckboxField.propTypes = {
  dataField: PropTypes.string.isRequired,
  labelName: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  formSetting: PropTypes.object,
  overRideProps: PropTypes.object,
  fieldSetting: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};