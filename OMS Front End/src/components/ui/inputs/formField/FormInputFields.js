import React, { useState } from "react";
import PropTypes from "prop-types";
const Label = React.lazy(() => import('../../label/Label'));
const Input = React.lazy(() => import('../input/Input'));
const ValidationText = React.lazy(() => import('../validation/ValidationText'));

const FormInputFields = ({
  labelName,
  name,
  onChange,
  onValidation,
  dataField,
  error,
  formSetting,
  ...inputProps
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    if (onChange) {
      if (e.target.type !== 'file') {
        setSelectedFile(null)
        onChange(dataField, e.target.value);
      }
      else if (e.target.files[0]) {
        const fileObj = e.target.files[0];

        setSelectedFile(fileObj)

        // const reader = new FileReader();
        // reader.onload = (event) => {
        //   const fileContent = event.target.result;
        //   onChange(dataField, fileContent)
        // }

        // reader.readAsText(fileObj);

        onChange(dataField, fileObj);
      }
    }
  };

  const handleOnBlur = () => {
    if (onValidation) {
      onValidation(dataField);
    }
  };

  return (
    <>
      <div className="input-label-part">
        {labelName && labelName !== "" && <Label labelName={labelName} for={name} isRequired={inputProps.isRequired} />}
        <Input
          {...inputProps}
          filename={selectedFile}
          onChange={handleInputChange}
          onBlur={handleOnBlur}
          isDisable={formSetting?.isViewOnly || inputProps?.isDisable || false}
        />
      <ValidationText error={error || ""} />
      </div>
    </>
  );
};

FormInputFields.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onValidation: PropTypes.func,
  dataField: PropTypes.string.isRequired,
  error: PropTypes.string,
  formSetting: PropTypes.shape({
    isViewOnly: PropTypes.bool,
  }),
  isDisable: PropTypes.bool,
  isRequired: PropTypes.bool,
};

export default FormInputFields;
