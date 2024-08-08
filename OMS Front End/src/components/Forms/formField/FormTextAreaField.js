import React from "react";
import PropTypes from "prop-types";
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

FormTextAreaFields.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onValidation: PropTypes.func,
  dataField: PropTypes.string.isRequired,
  error: PropTypes.string,
  formSetting: PropTypes.shape({
    isViewOnly: PropTypes.bool,
  }),
  overRideProps: PropTypes.shape({
    isDisable: PropTypes.bool,
  }),
  inputProps: PropTypes.object,
};

export default FormTextAreaFields;
