import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./FileUpload.scss";
import { IconButton } from "@mui/material";
import PhotoCamera from '@mui/icons-material/CameraEnhance';
import CloseIcon from '@mui/icons-material/Close';
import ToastService from "../../../../../services/toastService/ToastService";
import Iconify from "../../../../ui/iconify/Iconify";

const FileUpload = ({
  name = "",
  filename,
  onChange,
  onClear,
  acceptedFiles,
  maxSize
}) => {
  const [fileValue, setFileValue] = useState(null);
  const [filePreview, setFilePreview] = useState();
  const fileRef = useRef();

  const handleInputChange = (e) => {

    // Check if file exists and if it's larger than maxSize MB (maxSize * 1024 * 1024 bytes)
    const file = e.target.files[0];
    if (file && file.size > maxSize * 1024 * 1024) {
      ToastService.warning(`File size exceeds ${maxSize} MB. Please select a smaller file.`);
      return;
    }

    if (onChange) {
      onChange(e);
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (_event) => {
      setFilePreview(reader.result);
    };
  };

  const handleClearClick = () => {
    if (onClear) {
      fileRef.current.value = null;
      setFileValue(null);
      onClear();
    }
  };

  useEffect(() => {
    if (filename && typeof filename === "object") {
      setFileValue(filename.name || filename.fileName);
    } else if (filename) {
      setFileValue(filename);
      setFilePreview(filename);
    } else {
      setFileValue(null);
      fileRef.current.value = null;
      handleClearClick();
    }
  }, [filename]);

  return (
    <div className="file-upload-container">
      <input
        ref={fileRef}
        id={name}
        name={name}
        type="file"
        className="file-input"
        onChange={handleInputChange}
        accept={acceptedFiles}
      />
      <div className="upload-box">
        {!fileValue ? (
          <>
            <div className="upload-border">
              <div className="upload-group">
                <div className="upload-icon">
                  <Iconify icon="bi:camera-fill" />
                </div>
                <p className="upload-text">Upload photo</p>
              </div>
            </div>
            <p className="file-info">
              {`Allowed ${acceptedFiles ? "types " + acceptedFiles : "all types"} max size of ${maxSize} Mb`}
            </p>
          </>
        ) : (
          <div className="image-preview">
            <img src={filePreview} alt="Uploaded File" />
            <button className="clear-button" onClick={handleClearClick}>
            <Iconify icon="maki:cross" />
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string,
  filename: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  acceptedFiles: PropTypes.string,
};

export default FileUpload;
