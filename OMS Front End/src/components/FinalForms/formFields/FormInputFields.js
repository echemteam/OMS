import React, { useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce"; // Correct import

const Input = React.lazy(() => import("../ui/inputs/input/Input"));
const Label = React.lazy(() => import("../ui/label/Label"));
const ValidationText = React.lazy(() =>
  import("../ui/validation/ValidationText")
);

const FormInputFields = ({
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
  //TODO : Vaibhav: passed it isReadonly on override and write the code for it.
  // w

  const debouncedOnChange = useCallback(
    debounce(
      (dataField, value) => {
        onChange(dataField, value);
      },
      fieldSetting?.debounceTime ? fieldSetting?.debounceTime : 10
    ), // Adjust the delay as needed
    [onChange]
  );

  const handleInputChange = (e) => {
    if (onChange) {
      if (e.target.type !== "file") {
        debouncedOnChange(dataField, e.target.value);
      }
    }
  };

  const handleOnBlur = () => {
    onBlur(dataField);
  };
  //  isDisable={formSetting?.isViewOnly || (overRideProps?.isDisable !== undefined ? overRideProps?.isDisable : fieldSetting?.isDisable) || false}

  return (
    <>
      <div className="input-label-part">
        {labelName && labelName !== "" && (
          <Label labelName={labelName} htmlFor={name} isRequired={isRequired} />
        )}
        {fieldSetting?.subTitle ? (
          <div className={`"section-title" `}>
            <h5>{fieldSetting.subTitle}</h5>
          </div>
        ) : (
          ""
        )}
        <div className="input-top-title">
          <Input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={handleInputChange}
            onBlur={handleOnBlur}
            isdisable={
              formSetting?.isViewOnly ||
              (overRideProps?.isDisable !== undefined
                ? overRideProps?.isDisable
                : fieldSetting?.isDisable) ||
              false
            }
            isreadonly={
              formSetting?.isReadOnly ||
              (overRideProps?.isReadOnly !== undefined
                ? overRideProps?.isReadOnly
                : fieldSetting?.isReadOnly) ||
              false
            }
            {...fieldSetting}
          />
        </div>
      </div>
      <ValidationText error={error || ""} />
    </>
  );
};

FormInputFields.propTypes = {
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
  fieldSetting: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onValidation: PropTypes.func,
  onBlur: PropTypes.func,
};

export default React.memo(FormInputFields);
