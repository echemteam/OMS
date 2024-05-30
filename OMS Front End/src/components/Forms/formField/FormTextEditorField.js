import React from 'react'

const SunTextEditor = React.lazy(() => import('../../ui/inputs/SunEditor/SunEditor'));

const Label = React.lazy(() => import('../../ui/label/Label'));
const ValidationText = React.lazy(() => import('../../ui/inputs/validation/ValidationText.js'))


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
                {labelName && labelName !== "" && <Label labelName={labelName} for={name} />}
                <SunTextEditor
                    {...editorProps}
                    placeholder={placeholder}
                    onBlur={handleOnBlur}
                    onChange={handleOnChange}
                    setOptions={{
                        buttonList: [
                            ["undo", "redo"],
                            ["outdent", "indent"],
                            ["font", "fontSize", "formatBlock"],
                            [
                                "bold",
                                "underline",
                                "italic",
                                "strike",
                            ],
                            ["align", "list", "lineHeight"],
                        ],
                        minHeight: "250px",
                        showPathLabel: false,
                    }}
                    isDisable={formSetting?.isViewOnly || editorProps?.isDisable || false || overRideProps?.isDisable}
                />
            </div>
            <ValidationText error={error || ""} />
        </>
    )
}

export default FormTextEditorField