import React from 'react'
import Label from '../../label/Label';
const TinyEditor = React.lazy(() => import('../TinyEditor/TinyEditor'));
const ValidationText = React.lazy(() => import('../validation/ValidationText'));

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
                <TinyEditor
                    {...editorProps}
                    placeholder={placeholder}
                    onBlur={handleOnBlur}
                    onTinyMceEditorChange={handleOnChange}
                    isDisable={formSetting?.isViewOnly || editorProps?.isDisable || false}
                />
            </div>
            <ValidationText error={error || ""} />
        </>
    )
}

FormTextEditorField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    labelName: PropTypes.string,
    onChange: PropTypes.func,
    onValidation: PropTypes.func,
    dataField: PropTypes.string.isRequired,
    error: PropTypes.string,
    formSetting: PropTypes.shape({
        isViewOnly: PropTypes.bool
    }),
    editorProps: PropTypes.object
};
export default FormTextEditorField