import React, { useCallback } from "react";
import debounce from "lodash.debounce";

const Label = React.lazy(() => import("../ui/label/Label"));
const TextArea = React.lazy(() => import("../ui/inputs/textArea/TextArea"));
const ValidationText = React.lazy(() =>
  import("../ui/validation/ValidationText")
);

const FormTextAreaFields = ({
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
    debounce(
      (field, value) => {
        if (onChange) {
          onChange(field, value);
        }
      },
      fieldSetting?.debounceTime ? fieldSetting?.debounceTime : 10
    ),
    [onChange]
  );

  const handleInputChange = (e) => {
    debouncedOnChange(dataField, e.target.value);
  };

  const handleOnBlur = () => {
    onBlur(dataField);
  };

  return (
    <div className="input-field-sec" key={keyId}>
      {fieldSetting?.subTitle ? (
        <div className="section-title">
          <h5>{fieldSetting.subTitle}</h5>
        </div>
      ) : (
        ""
      )}
      <div className="input-label-part">
        {labelName && labelName !== "" && (
          <Label labelName={labelName} for={name} isRequired={isRequired} />
        )}
        <TextArea
          {...fieldSetting}
          name={name}
          key={keyId}
          value={value}
          onChange={handleInputChange}
          onBlur={handleOnBlur}
          isDisable={
            formSetting?.isViewOnly ||
            fieldSetting?.isDisable ||
            overRideProps?.isDisable
          }
          readOnly={fieldSetting?.isReadOnly}
        />
      </div>
        <ValidationText error={error || ""} />
    </div>
  );
};

export default FormTextAreaFields;
