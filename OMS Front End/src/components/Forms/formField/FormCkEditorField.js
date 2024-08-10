// CKEditorField.js
import React from "react";
import Label from "../../ui/label/Label";
import ValidationText from "../../ui/inputs/validation/ValidationText";
import CKEditorComponent from "../../ui/inputs/ckEditor/CkEditor";
import PropTypes from 'prop-types'; 

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
        <>
            <div className="input-label-part">
                {labelName && labelName !== "" && <Label labelName={labelName} for={name} isRequired={isRequired} />}
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
CKEditorField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    labelName: PropTypes.string,
    onChange: PropTypes.func,
    onValidation: PropTypes.func,
    dataField: PropTypes.string.isRequired,
    error: PropTypes.string,
    formSetting: PropTypes.shape({
        isViewOnly: PropTypes.bool,
    }),
    overRideProps: PropTypes.shape({
        isDisable: PropTypes.bool,
    }),
    isRequired: PropTypes.bool,
    editorProps: PropTypes.object,
};
export default CKEditorField;
