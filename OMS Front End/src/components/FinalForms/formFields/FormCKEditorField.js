// CKEditorField.js
import React from "react";
import Label from "../ui/label/Label";
import ValidationText from "../ui/validation/ValidationText";
import CKEditorComponent from "../ui/inputs/ckEditor/CKEditor";

const FormCKEditorField = ({
  name,
  placeholder,
  labelName,
  onChange,
  onValidation,
  dataField,
  error,
  formSetting,
  overRideProps,
  isRequired,
  ...editorProps
}) => {
  const handleOnChange = (e) => {
    if (onChange) {
      onChange(dataField, e);
    }
  };

  const handleOnBlur = () => {
    if (onValidation) {
      onValidation(dataField);
    }
  };

  return (
    <div className="ck-editor-sec">
      <div className="input-label-part">
        {labelName && labelName !== "" && (
          <Label labelName={labelName} for={name} isRequired={isRequired} />
        )}
        <CKEditorComponent
          {...editorProps}
          placeholder={placeholder}
          onBlur={handleOnBlur}
          onCKEditorChange={handleOnChange}
          isDisable={
            formSetting?.isViewOnly ||
            editorProps?.isDisable ||
            false ||
            overRideProps?.isDisable
          }
        />
      </div>
      <ValidationText error={error || ""} />
    </div>
  );
};

export default FormCKEditorField;
