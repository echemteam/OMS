/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { TextInputType } from "../../../../data/formControlTypes";
import "./FileUpload.scss";
import Image from "../../../image/Image";
import { AppIcons } from "../../../../data/appIcons";
import Buttons from "../../button/Buttons";

const FileUpload = ({
  type = TextInputType.FILE,
  name = "",
  placeholder = `Please Enter ${name}`,
  filename,
  onChange,
  onClear,
  onBlur,
  onActionClick,
  cssClass = "input-field",
  isDisable,
  isButtonVisible,
  acceptedFiles,
  isCustomButtonVisible,
  dataField,
  fieldActions,
  isMultiple = false,
  ...inputProps
}) => {
  const [fileValue, setFileValue] = useState(null);

  const fileRef = useRef();
  const handleInputChange = (data) => {
    const files = data.target.files;
    const value = isMultiple
      ? Array.from(files)
          .map((file) => file.name)
          .join(", ")
      : files[0].name;

    onChange(data);

    if (fieldActions && inputProps) {
      fieldActions("DDL_FILE", dataField, value);
    }
  };

  const handleClearClick = () => {
    if (onClear) {
      fileRef.current.value = null;
      setFileValue(null);
      filename = null;
      onClear();
    }
  };

  useEffect(() => {
    if (filename && typeof filename === "object") {
      setFileValue(filename.name || filename.fileName);
    } else if (filename) {
      setFileValue(filename);
    } else {
      setFileValue(null);
      fileRef.current.value = null;
      handleClearClick();
    }
    /** This flag is used for the user is upload the file then clear the fileName.  */
    if (inputProps?.isFileNameCleared) {
      handleClearClick();
    }
  }, [filename]);

  return (
    <>
      <div
        className={`form-field custom-file-uploader ${
          isDisable ? "field-disabled" : ""
        }`}
      >
        <input
          ref={fileRef}
          id={name}
          name={name}
          filename={fileValue ? fileValue : null}
          type={type ? type : "file"}
          className={cssClass}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={onBlur}
          disabled={isDisable}
          accept={acceptedFiles}
          multiple={isMultiple}
        />
        <div className="custom-file-selector-design">
          <Image
            imagePath={AppIcons.Uploaddocumenticon}
            altText="Please Upload File"
          ></Image>
          {/* <Iconify icon="iconamoon:file-document-thin" /> */}

          {fileValue ? (
            <p className="file-name">{fileValue}</p>
          ) : (
            <>
              <div className="drag-drop-txt">
                <p>Drag & Drop Your File</p>
                {acceptedFiles === "" ? (
                  <span className="small-txt">All File Formats we support</span>
                ) : (
                  <span className="small-txt">
                    {acceptedFiles}
                    Formats we support
                  </span>
                )}
              </div>
            </>
          )}

          {fileValue ? null : (
            <>
              <div className="buttons">
                <Buttons
                  textWithIcon={true}
                  imagePath={AppIcons.UploadIcon}
                  buttonTypeClassName="upload-button"
                  buttonText="Upload Manually"
                  onClick={handleClearClick}
                />
              </div>
            </>
          )}
          {isCustomButtonVisible && (
            <>
              <div className="row clear-buttons clear-btn-sec">
                {fileValue && (
                  <Buttons
                    buttonTypeClassName="btn dark-btn"
                    buttonText="Clear"
                    onClick={handleClearClick}
                  />
                )}
              </div>
            </>
          )}
        </div>
        {isButtonVisible && (
          <>
            <div className="row clear-buttons">
              {fileValue && (
                <span className="dark-btn" onClick={handleClearClick}>
                  X
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

FileUpload.propTypes = {
  type: PropTypes.oneOf([TextInputType.FILE]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  filename: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string,
      fileName: PropTypes.string,
    }),
  ]),
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  onBlur: PropTypes.func,
  onActionClick: PropTypes.func,
  cssClass: PropTypes.string,
  isDisable: PropTypes.bool,
  isButtonVisible: PropTypes.bool,
  acceptedFiles: PropTypes.string,
  isCustomButtonVisible: PropTypes.bool,
};
export default FileUpload;
