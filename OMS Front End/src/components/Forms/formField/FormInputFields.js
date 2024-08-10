import React, { useState } from "react";
import PropTypes from 'prop-types';
const Input = React.lazy(() => import("../../ui/inputs/input/Input"));
const Label = React.lazy(() => import("../../ui/label/Label"));
const ValidationText = React.lazy(() =>
  import("../../ui/inputs/validation/ValidationText.js")
);

const FormInputFields = ({
  labelName,
  name,
  onChange,
  onValidation,
  dataField,
  error,
  formSetting,
  changeAction,
  formData,
  overRideProps,
  inputButtonGroup,
  handleInputGroupButton,
  handleInputShowInfo,
  inputField,
  inputIcon,
  inputshowField,
  ...inputProps
}) => {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    if (onChange) {
      if (e.target.type !== "file") {
        setSelectedFile(null);
        let newValue = e.target.value;
        if (inputProps.exemptBoundarySpaces) {
          newValue = newValue.trimStart();
        }
        onChange(dataField, newValue);
        if (inputField) {
          inputField('INPUT_CHANGED', dataField, newValue);
        }
      } else if (e.target.files[0]) {
        const fileObj = e.target.files[0];

        setSelectedFile(fileObj);

        onChange(dataField, fileObj);
      }
    }
  };

  const handleOnBlur = (e) => {
    if (onValidation) {
      onValidation(dataField);
    }
    if (inputProps.exemptBoundarySpaces) {
      let newValue = e.target.value.trim();
      onChange(dataField, newValue);
    }
  };

  return (
    <>
      <div className="input-label-part">
        {labelName && labelName !== "" && (
          <Label labelName={labelName} for={name} isRequired={inputProps.isRequired} {...inputProps} />
        )}

        {inputProps.formSaparateTitle ? (
          <>
            <div className="input-top-title">
              <h5>{inputProps.formSaparateTitle}</h5>
              <Input
                {...inputProps}
                filename={selectedFile}
                onChange={handleInputChange}
                onBlur={handleOnBlur}
                inputButtonGroup={inputButtonGroup}
                inputIcon={inputIcon}
                handleInputGroupButton={handleInputGroupButton}
                handleInputShowInfo={handleInputShowInfo}
                isDisable={
                  formSetting?.isViewOnly ||
                  inputProps?.isDisable ||
                  overRideProps?.isDisable ||
                  false
                }
              />
            </div>
          </>
        ) : (
          <>
            <Input
              {...inputProps}
              filename={selectedFile}
              onChange={handleInputChange}
              onBlur={handleOnBlur}
              inputButtonGroup={inputButtonGroup}
              inputIcon={inputIcon}
              handleInputGroupButton={handleInputGroupButton}
              handleInputShowInfo={handleInputShowInfo}
              isDisable={
                formSetting?.isViewOnly ||
                inputProps?.isDisable ||
                overRideProps?.isDisable ||
                false
              }
            />
          </>
        )}
      </div>
      <ValidationText error={error || ""} />
    </>
  );
};

FormInputFields.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onValidation: PropTypes.func,
  dataField: PropTypes.string.isRequired,
  error: PropTypes.string,
  formSetting: PropTypes.object,
  changeAction: PropTypes.func,
  formData: PropTypes.object,
  overRideProps: PropTypes.object,
  inputButtonGroup: PropTypes.node,
  handleInputGroupButton: PropTypes.func,
  handleInputShowInfo: PropTypes.func,
  inputField: PropTypes.func,
  inputIcon: PropTypes.node,
  inputshowField: PropTypes.bool,
  exemptBoundarySpaces: PropTypes.bool,
  isRequired: PropTypes.bool,
  isDisable: PropTypes.bool,
  formSaparateTitle: PropTypes.string,
   
};
export default FormInputFields;
