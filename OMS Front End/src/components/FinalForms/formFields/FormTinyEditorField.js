import React from 'react'


const Label = React.lazy(() => import('../ui/label/Label'));
const TinyEditor = React.lazy(() => import('../ui/inputs/TinyEditor/TinyEditor'));
const ValidationText = React.lazy(() => ('../ui/validation/ValidationText'));

const FormTextEditorField = ({
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
                {labelName && labelName !== "" && <Label labelName={labelName} for={name} isRequired={editorProps.isRequired} />}
                <TinyEditor
                    {...editorProps}
                    placeholder={placeholder}
                    onBlur={handleOnBlur}
                    onTinyMceEditorChange={handleOnChange}
                    isDisable={formSetting?.isViewOnly || editorProps?.isDisable || false || overRideProps?.isDisable}
                />
            </div>
            <ValidationText error={error || ""} />
        </>
    )
}

export default FormTextEditorField