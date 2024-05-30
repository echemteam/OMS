import React, { useState } from "react";
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
      </div>
      <ValidationText error={error || ""} />
    </>
  );
};

export default FormInputFields;
