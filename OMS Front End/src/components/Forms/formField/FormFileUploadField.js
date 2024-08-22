/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwalAlert from "../../../services/swalService/SwalService";
import FileUpload from "../../ui/inputs/fileUpload/FileUpload";
const Label = React.lazy(() => import("../../ui/label/Label"));
const ValidationText = React.lazy(() =>
  import("../../ui/inputs/validation/ValidationText.js")
);

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
  isRequired,
  fileFormate,
  ...inputProps
}) => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { info } = SwalAlert();

  const isValidFileType = (fileName, acceptedFileType) => {
    if (acceptedFileType.length === 0) {
      return true;
    }
    const fileExt = fileName.split(".").pop().toLowerCase();
    return acceptedFileType.includes(`.${fileExt}`);
  };

  const handleInputChange = (e) => {
    if (onChange) {
      if (e.target.type !== "file") {
        setSelectedFile(null);
        onChange(dataField, e.target.value);
      } else if (e.target.files[0]) {
        const fileObj = e.target.files[0];
        setSelectedFile(fileObj);

        const acceptedExtensions = inputProps.acceptedFiles
          ? inputProps.acceptedFiles.split(",").map((ext) => ext.trim())
          : [];

      if (!isValidFileType(fileObj.name, acceptedExtensions)) {
        info(
          "File Type doesn't match",
          `Please select file with extension ${acceptedExtensions}`
        );
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
          onChange(dataField, newFileObject);
        };

        reader.readAsDataURL(fileObj);

        // onChange(dataField, fileObj);
      }
    }
  };

  const handleClearFile = () => {
    if (fieldActions) {
      fieldActions("CLEAR");
    }
    setSelectedFile(null);
    setButtonVisible(false);
    inputProps.value = null;
  };

  const handleActionClick = () => {
    if (fieldActions) {
      const data = {
        contractInputFile: inputProps.value,
      };
      fieldActions("DOWNLOAD", data);
    }
  };

  const handleOnBlur = () => {
    if (onValidation) {
      onValidation(dataField);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
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
          <Label labelName={labelName} for={name} isRequired={isRequired} />
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
          acceptedFiles={inputProps.acceptedFiles}
          fileFormate={fileFormate}
          dataField={dataField}
          fieldActions={fieldActions}
          {...inputProps}
        />
      </div>
      <ValidationText error={error || ""} />
    </>
  );
};

FormFileUploadField.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string.isRequired,
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
  fieldActions: PropTypes.func,
  isRequired: PropTypes.bool,
  fileFormate: PropTypes.string,
  acceptedFiles: PropTypes.string,
  isDownloadable: PropTypes.bool,
  isDisable: PropTypes.bool,
};

export default FormFileUploadField;
