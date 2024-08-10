import React from "react";
import PropTypes from 'prop-types';
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

FormRadioButtonField.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onValidation: PropTypes.func,
  dataField: PropTypes.string.isRequired,
  value: PropTypes.string,
  selectedOption: PropTypes.string,
  error: PropTypes.string,
  formSetting: PropTypes.object,
  hasMainTitle: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  })),
};

export default FormRadioButtonField;
