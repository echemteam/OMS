import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

const MaskInput = React.lazy(() => import("../ui/inputs/maskInput/MaskInput"));
const Label = React.lazy(() => import("../ui/label/Label"));
const ValidationText = React.lazy(() =>
  import("../ui/validation/ValidationText")
);

const FormMaskingInputField = ({
  keyId,
  dataField,
  labelName,
  name,
  type,
  value,
  error,
  formSetting,
  formData,
  overRideProps,
  isRequired,
  fieldSetting,
  onChange,
  onValidation,
  onBlur,
  ...otherProps
}) => {
  const debouncedOnChange = useCallback(
    debounce((dataField, value) => {
      onChange(dataField, value);
    }, fieldSetting?.debounceTime || 10),
    [onChange]
  );

  const handleInputChange = (value) => {
    if (onChange) {
      debouncedOnChange(dataField, value);
    }
  };

  const handleOnBlur = () => {
    onBlur(dataField);
  };

  return (
    <>
      <div className="input-label-part" key={keyId}>
        {labelName && labelName !== "" && (
          <Label labelName={labelName} htmlFor={name} isRequired={isRequired} />
        )}
        {fieldSetting?.subTitle && (
          <div className="section-title">
            <h5>{fieldSetting.subTitle}</h5>
          </div>
        )}
        <div className="input-top-title">
          <MaskInput
            id={keyId}
            name={name}
            type={type}
            value={value}
            onChange={handleInputChange}
            onBlur={handleOnBlur}
            isDisable={
              formSetting?.isViewOnly ||
              (overRideProps?.isDisable !== false && fieldSetting?.isDisable) ||
              false
            }
            masking={fieldSetting?.masking}
            fieldSetting={fieldSetting}
            {...otherProps}
          />
        </div>
      </div>
      <ValidationText error={error || ""} />
    </>
  );
};

FormMaskingInputField.propTypes = {
  key: PropTypes.string,
  dataField: PropTypes.string.isRequired,
  labelName: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  error: PropTypes.string,
  formSetting: PropTypes.object,
  formData: PropTypes.object,
  overRideProps: PropTypes.object,
  isRequired: PropTypes.bool,
  fieldSetting: PropTypes.object.isRequired, // Required because of masking configurations
  onChange: PropTypes.func.isRequired,
  onValidation: PropTypes.func,
  onBlur: PropTypes.func,
};

export default React.memo(FormMaskingInputField);
