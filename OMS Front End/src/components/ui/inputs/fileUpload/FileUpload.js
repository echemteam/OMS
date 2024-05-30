/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { TextInputType } from "../../../../data/formControlTypes";
import { Button } from "react-bootstrap";
import "./FileUpload.scss";
import Image from "../../../image/Image";
import { AppIcons } from "../../../../data/appIcons";

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
  isDownloadButton,
  acceptedFiles,
}) => {

  const [fileValue, setFileValue] = useState(null)

  const fileRef = useRef();
  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e);
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

  const handleActionClick = () => {
    onActionClick();
  };

  useEffect(() => {
    if (filename && typeof filename === "object") {
      setFileValue(filename.name || filename.fileName)
    }
    else if (filename) {
      setFileValue(filename)
    }
    else {
      setFileValue(null);
      fileRef.current.value = null;
      handleClearClick();
    }
  }, [filename])

  return (
    <>
      <div className={`form-field custom-file-uploader ${isDisable ? "field-disabled" : ""}`}>
        <input
          ref={fileRef}
          id={name}
          name={name}
          filename={fileValue ? fileValue : null}
          type={type ? type : 'file'}
          className={cssClass}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={onBlur}
          disabled={isDisable}
          accept={acceptedFiles}
        />
        <div className="custom-file-selector-design d-none">
          <Image
            imagePath={AppIcons.Uploaddocumenticon}
            altText="Please Upload File"
          ></Image>

          {fileValue ? <p>{fileValue}</p> : <p>Drag & Drop File Hear</p>}

          {fileValue ? (
            null
          ) : (
            <>
              <p className="or-text">Or</p>
              <div className="theme-button">
                <Button className="theme-button" onClick={handleClearClick}>
                  Browse Files
                </Button>
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
  type: TextInputType.FILE.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  // value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onClear: PropTypes.func,
  cssClass: PropTypes.string,
  isDisable: PropTypes.bool,
};

export default FileUpload;
