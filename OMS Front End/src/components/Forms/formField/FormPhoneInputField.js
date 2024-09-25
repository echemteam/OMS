import React, { Suspense } from "react";
import PropTypes from "prop-types";

const Phone = React.lazy(() => import("../../ui/inputs/phone/Phone.js"));
const Label = React.lazy(() => import('../../ui/label/Label'));
const ValidationText = React.lazy(() => import('../../ui/inputs/validation/ValidationText.js'));


const FormPhoneInputFields = ({
  labelName,
  name,
  onChange,
  onValidation,
  dataField,
  error,
  formSetting,
  overRideProps,
  ...inputProps
}) => {
  const handleInputChange = (phone, phoneDetails) => {
    if (onChange) {
      onChange(dataField, phone);
    }
  };

  const handleOnBlur = () => {
    if (onValidation) {
      onValidation(dataField);
    }
  };

  return (
    <>
      <div className="input-field-sec phone-input">
        {inputProps.hasMainTitle &&
          <div className="section-title">
            <h5>{inputProps.hasMainTitle}</h5>
          </div>
        }
        <div className="input-label-part">
          {labelName && (
            <Suspense fallback={<div>Loading...</div>}>
              <Label labelName={labelName} htmlFor={name} />
            </Suspense>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            <Phone
              {...inputProps}
              onChange={handleInputChange}
              onBlur={handleOnBlur}
              isDisable={formSetting?.isViewOnly || inputProps?.isDisable || overRideProps?.isDisable}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <ValidationText error={error || ""} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

FormPhoneInputFields.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onValidation: PropTypes.func,
  dataField: PropTypes.string.isRequired,
  error: PropTypes.string,
  formSetting: PropTypes.shape({
    isViewOnly: PropTypes.bool
  }),
  overRideProps: PropTypes.shape({
    isDisable: PropTypes.bool
  }),
  inputProps: PropTypes.shape({
    hasMainTitle: PropTypes.string,
    isDisable: PropTypes.bool
  })
};

export default FormPhoneInputFields;
