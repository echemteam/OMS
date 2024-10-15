import React, { useCallback } from "react";
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker CSS
const DatePicker = React.lazy(() =>
  import("../ui/inputs/datePicker/DatePicker")
);

const Label = React.lazy(() => import("../ui/label/Label"));
const ValidationText = React.lazy(() =>
  import("../ui/validation/ValidationText.js")
);

const FormDatePickerFields = ({
  dataField,
  labelName,
  name,
  value,
  error,
  formSetting,
  overRideProps,
  isRequired,
  fieldSetting,
  onChange,
  onBlur,
  ...otherProps
}) => {

  

  const handleDateChange = useCallback((date) => {
    if (onChange) {
      onChange(dataField, date);
    }
  }, [onChange, dataField]);

  const handleOnBlur = () => {
    onBlur(dataField)
  };


  return (
    <div className="date-picker-label-part">
      <div className="input-label-part">
        {labelName && (
          <Label labelName={labelName} isRequired={isRequired} />
        )}
      </div>
      {fieldSetting?.subTitle && (
        <div className="section-title">
          <h5>{fieldSetting.subTitle}</h5>
        </div>
      )}
      <div className="input-date-sec">
        <DatePicker
          label={labelName}
          id={name}
          selected={value}
          name={name}
          placeholder={fieldSetting?.placeholder}
          className="datepicker-field"
          onChange={handleDateChange}
          onBlur={handleOnBlur}
          isDisabled={
            formSetting?.isViewOnly ||
            fieldSetting?.isDisable ||
            overRideProps?.isDisable
          }
          datePickerConfig={fieldSetting.dateConfig}
          {...otherProps}
        />
        <ValidationText error={error || ""} />
      </div>
    </div>
  );
};

export default FormDatePickerFields;
FormDatePickerFields.propTypes = {
  dataField: PropTypes.string.isRequired,
  labelName: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  error: PropTypes.string,
  formSetting: PropTypes.shape({
    isViewOnly: PropTypes.bool,
  }),
  overRideProps: PropTypes.shape({
    isDisable: PropTypes.bool,
  }),
  isRequired: PropTypes.bool,
  fieldSetting: PropTypes.shape({
    subTitle: PropTypes.string,
    placeholder: PropTypes.string,
    isDisable: PropTypes.bool,
  }),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
