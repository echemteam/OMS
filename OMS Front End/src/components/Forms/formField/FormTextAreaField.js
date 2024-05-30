import React from "react";
const TextArea = React.lazy(() => import("../../ui/inputs/textArea/TextArea.js"));

const Label = React.lazy(() => import('../../ui/label/Label'));
const ValidationText = React.lazy(() => import('../../ui/inputs/validation/ValidationText.js'))


const FormTextAreaFields = ({
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
  const handleInputChange = (e) => {
    if (onChange) {
      onChange(dataField, e.target.value);
    }
  };

  const handleOnBlur = () => {
    if (onValidation) {
      onValidation(dataField);
    }
  };

  return (
    <>
      <div className="input-field-sec text-area">
        {inputProps.hasMainTitle ?
          <div className="section-title">
            <h5>{inputProps.hasMainTitle}</h5>
          </div>
          : ""}
        <div className="input-label-part">
          {labelName && labelName !== "" && (
            <Label labelName={labelName} for={name} />
          )}
          <TextArea
            {...inputProps}
            onChange={handleInputChange}
            onBlur={handleOnBlur}
            isDisable={formSetting?.isViewOnly || inputProps?.isDisable || overRideProps?.isDisable}
          />
        </div>
        <ValidationText error={error || ""} />
      </div>
    </>
  );
};

export default FormTextAreaFields;
