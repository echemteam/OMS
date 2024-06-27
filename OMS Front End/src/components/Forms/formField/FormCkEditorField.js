// CKEditorField.js
import React from "react";
import Label from "../../ui/label/Label";
import ValidationText from "../../ui/inputs/validation/ValidationText";
import CKEditorComponent from "../../ui/inputs/ckEditor/CkEditor";

const CKEditorField = ({
    name,
    placeholder,
    labelName,
    onChange,
    onValidation,
    dataField,
    error,
    formSetting,
    overRideProps,
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
        <>
            <div className="input-label-part">
                {labelName && labelName !== "" && <Label labelName={labelName} for={name} />}
                <CKEditorComponent
                    {...editorProps}
                    placeholder={placeholder}
                    onBlur={handleOnBlur}
                    onCKEditorChange={handleOnChange}
                    isDisable={formSetting?.isViewOnly || editorProps?.isDisable || false || overRideProps?.isDisable}
                />
            </div>
            <div className="mt-2">
                <ValidationText error={error || ""} />
            </div>
        </>
    );
};

export default CKEditorField;
