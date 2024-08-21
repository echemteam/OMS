/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwalAlert from "../../../../services/swalService/SwalService";

const Label = React.lazy(() => import('../../label/Label'));
const FileUpload = React.lazy(() => import("../fileUpload/FileUpload"));
const ValidationText = React.lazy(() => import('../validation/ValidationText'));

const FormFileUploadField = ({
    labelName,
    name,
    onChange,
    onValidation,
    dataField,
    error,
    formSetting,
    fieldActions,
    ...inputProps
}) => {

    const [buttonVisible, setButtonVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const { info } = SwalAlert();

    const isValidFileType = (fileName, acceptedFileType) => {
        const fileExt = fileName.split('.').pop().toLowerCase();
        return acceptedFileType.includes(`.${fileExt}`);
    }

    const handleInputChange = (e) => {
        if (onChange) {
            if (e.target.type !== 'file') {
                setSelectedFile(null)
                onChange(dataField, e.target.value);
            }

            else if (e.target.files[0]) {

                const fileObj = e.target.files[0];
                setSelectedFile(fileObj);

                const acceptedExtensions = inputProps.acceptedFiles.split(',').map(ext => ext.trim());

                if (!isValidFileType(fileObj.name, acceptedExtensions)) {
                    info("File Type doesn't match", `Please select file with extension ${acceptedExtensions}`);
                    setSelectedFile(null);
                    inputProps.value = null;
                    handleClearFile();
                    return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    const fileContent = event.target.result;
                    const newFileObject = {
                        fileName: fileObj.name,
                        base64Data: fileContent,
                    };
                    onChange(dataField, newFileObject)
                }

                reader.readAsDataURL(fileObj);

                // onChange(dataField, fileObj);
            }
        }
    };

    const handleClearFile = () => {
        if (fieldActions) {
            fieldActions('CLEAR');
        }
        setSelectedFile(null);
        setButtonVisible(false);
        inputProps.value = null;
    }

    const handleActionClick = () => {
        if (fieldActions) {
            const data = {
                contractInputFile: inputProps.value
            }
            fieldActions('DOWNLOAD', data);
        }
    }

    const handleOnBlur = () => {
        if (onValidation) {
            onValidation(dataField);
        }
    };

    useEffect(() => {
        if (selectedFile) {
            setButtonVisible(true)
        }
        else {
            setButtonVisible(false)
        }
    }, [selectedFile])

    useEffect(() => {
        if (inputProps.value) {
            setSelectedFile(inputProps.value)
        }
        else {
            setSelectedFile(null)
            inputProps.isDownloadable = false
        }
    }, [inputProps.value])

    return (
        <>
            <div className="input-label-part">
                {labelName && labelName !== "" && <Label labelName={labelName} for={name} isRequired={inputProps.isRequired} />}
                <FileUpload
                    onClear={handleClearFile}
                    filename={selectedFile}
                    onChange={handleInputChange}
                    onActionClick={handleActionClick}
                    onBlur={handleOnBlur}
                    isButtonVisible={buttonVisible}
                    isDisable={formSetting?.isViewOnly || inputProps?.isDisable || false}
                    isDownloadButton={inputProps.isDownloadable}
                    acceptedFiles={inputProps.acceptedFiles}
                />
            <ValidationText error={error || ""} />
            </div>
        </>
    )
}
FormFileUploadField.propTypes = {
    labelName: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onValidation: PropTypes.func,
    dataField: PropTypes.string.isRequired,
    error: PropTypes.string,
    formSetting: PropTypes.shape({
        isViewOnly: PropTypes.bool,
    }),
    fieldActions: PropTypes.func,
    acceptedFiles: PropTypes.string,
    isDownloadable: PropTypes.bool,
    isDisable: PropTypes.bool,
    isRequired: PropTypes.bool,
};
export default FormFileUploadField;