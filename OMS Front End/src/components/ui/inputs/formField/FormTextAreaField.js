import React from "react";
const Label = React.lazy(() => import('../../label/Label'));
const TextArea = React.lazy(() => import('../textArea/TextArea.js'));
const ValidationText = React.lazy(() => import('../validation/ValidationText'));

const FormTextAreaFields = ({
    labelName,
    name,
    onChange,
    onValidation,
    dataField,
    error,
    formSetting,
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
            <div className="input-label-part">
                {labelName && labelName !== "" && <Label labelName={labelName} for={name} isRequired={inputProps.isRequired} />}
                <TextArea {...inputProps} onChange={handleInputChange} onBlur={handleOnBlur} isDisable={formSetting?.isViewOnly || inputProps?.isDisable} />
            </div>
            <ValidationText error={error || ""} />
        </>
    );
};

export default FormTextAreaFields;
