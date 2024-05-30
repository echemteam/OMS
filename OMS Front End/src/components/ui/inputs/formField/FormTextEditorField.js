import React from 'react'
import SunTextEditor from '../SunEditor/SunEditor'
import Label from '../../label/Label';
import ValidationText from '../validation/ValidationText';

const FormTextEditorField = ({
    name,
    placeholder,
    labelName,
    onChange,
    onValidation,
    dataField,
    error,
    formSetting,
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
                    isDisable={formSetting?.isViewOnly || editorProps?.isDisable || false}
                />
            </div>
            <ValidationText error={error || ""} />
        </>
    )
}

export default FormTextEditorField