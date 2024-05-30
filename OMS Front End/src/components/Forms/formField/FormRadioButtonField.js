import React from "react";

const RadioButton = React.lazy(() =>
  import("../../ui/inputs/radioButton/RadioButton")
);

const Label = React.lazy(() => import("../../ui/label/Label"));
const ValidationText = React.lazy(() =>
  import("../../ui/inputs/validation/ValidationText.js")
);

const FormRadioButtonField = ({
  labelName,
  name,
  onChange,
  onValidation,
  dataField,
  value,
  selectedOption,
  error,
  formSetting,
  ...radioProps
}) => {
  const handleRadioChange = (event) => {
    if (onChange) {
      onChange(dataField, event.target.value);
    }
  };

  const handleOnBlur = () => {
    if (onValidation) {
      onValidation(dataField);
    }
  };

  return (
    <>
      <div className="input-field-sec">
        {radioProps.hasMainTitle ? (
          <div className="section-title">
            <h5>{radioProps.hasMainTitle}</h5>
          </div>
        ) : (
          ""
        )}
        <div className="radio-label-part">
          {labelName && labelName !== "" && (
            <Label labelName={labelName} for={name} />
          )}
          <div className="radio-label-sec">
            <RadioButton
              name={name}
              onChange={handleRadioChange}
              onBlur={handleOnBlur}
              dataField={dataField}
              error={radioProps?.error}
              formSetting={formSetting}
              options={radioProps?.options}
              selectedOption={selectedOption}
              {...radioProps}
            />
          </div>
        </div>
        <ValidationText error={error || ""} />
      </div>
    </>
  );
};

export default FormRadioButtonField;
