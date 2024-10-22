import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const Label = React.lazy(() => import("../ui/label/Label"));
const FileUpload = React.lazy(() => import("../ui/inputs/fileUpload/FileUpload"));
const ValidationText = React.lazy(() => import("../ui/validation/ValidationText.js"));


/**
 * A form field component for handling file uploads with validation and action handling.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.labelName] - The label for the file upload field.
 * @param {string} [props.name] - The name attribute for the file input.
 * @param {Function} [props.onChange] - Callback function when file is selected or input value changes.
 * @param {Function} [props.onValidation] - Callback function for field validation.
 * @param {string} [props.dataField] - Data field identifier for the file input.
 * @param {string} [props.error] - Error message to display.
 * @param {Object} [props.formSetting] - Settings for the form, such as view-only mode.
 * @param {Object} [props.overRideProps] - Properties to override default behavior.
 * @param {Function} [props.fieldActions] - Callback function for handling field actions (e.g., clear, download).
 * @param {Object} [props.inputProps] - Additional props passed to the FileUpload component.
 */

const FormFileUploadField = ({
    labelName,
    name,
    onChange,
    onValidation,
    dataField,
    error,
    formSetting,
    overRideProps,
    fieldActions,
    ...inputProps
}) => {
    const [buttonVisible, setButtonVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    /**
    * Handles file input changes and updates the state and parent component.
    *
    * @param {Event} e - The input change event.
    */
    const handleInputChange = (e) => {
        if (onChange) {
            if (e.target.type !== "file") {
                setSelectedFile(null);
                onChange(dataField, e.target.value);
            } else if (e.target.files[0]) {
                const fileObj = e.target.files[0];
                setSelectedFile(fileObj);

                const reader = new FileReader();
                reader.onload = (event) => {
                    const fileContent = event.target.result;
                    const newFileObject = {
                        fileName: fileObj.name,
                        base64Data: fileContent,
                    };
                    onChange(dataField, newFileObject);
                };

                reader.readAsDataURL(fileObj);
            }
        }
    };

    /**
     * Clears the selected file and triggers the clear action.
     */
    const handleClearFile = () => {
        if (fieldActions) {
            fieldActions("CLEAR");
        }
        setSelectedFile(null);
        setButtonVisible(false);
        inputProps.value = null;
    };

    /**
     * Handles the action click, such as downloading the file.
     */
    const handleActionClick = () => {
        if (fieldActions) {
            const data = {
                contractInputFile: inputProps.value,
            };
            fieldActions("DOWNLOAD", data);
        }
    };

    /**
     * Handles the blur event for validation.
     */
    const handleOnBlur = () => {
        if (onValidation) {
            onValidation(dataField);
        }
    };

    useEffect(() => {
        setButtonVisible(!!selectedFile);
    }, [selectedFile]);

    useEffect(() => {
        if (inputProps.value) {
            setSelectedFile(inputProps.value);
        } else {
            setSelectedFile(null);
            inputProps.isDownloadable = false;
        }
    }, [inputProps.value]);

    return (
        <>
            <div className="input-label-part">
                {labelName && labelName !== "" && (
                    <Label labelName={labelName} for={name}isRequired={inputProps.isRequired} />
                )}
                <FileUpload
                    onClear={handleClearFile}
                    filename={selectedFile}
                    onChange={handleInputChange}
                    onActionClick={handleActionClick}
                    onBlur={handleOnBlur}
                    isButtonVisible={buttonVisible}
                    isDisable={
                        formSetting?.isViewOnly ||
                        inputProps?.isDisable ||
                        false ||
                        overRideProps?.isDisable
                    }
                    isDownloadButton={inputProps.isDownloadable}
                    acceptedFiles={inputProps.fieldSetting.acceptedFiles}
                    maxSize={inputProps.fieldSetting.maxSize}
                    imageUpload={inputProps.imageUpload}
                />
            </div>
            <ValidationText error={error || ""} />
        </>
    );
};

FormFileUploadField.propTypes = {
    labelName: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onValidation: PropTypes.func,
    dataField: PropTypes.string.isRequired,
    error: PropTypes.string,
    formSetting: PropTypes.shape({
        isViewOnly: PropTypes.bool
    }),
    overRideProps: PropTypes.shape({
        isDisable: PropTypes.bool
    }),
    fieldActions: PropTypes.func,
    inputProps: PropTypes.shape({
        value: PropTypes.any,
        isDownloadable: PropTypes.bool,
        acceptedFiles: PropTypes.arrayOf(PropTypes.string),
        imageUpload: PropTypes.bool,
        isDisable: PropTypes.bool,
    })
};


export default FormFileUploadField;
