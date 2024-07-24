/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
//** Lib's */
import "./ImagesUpload.scss";
import Image from "../../../image/Image";
import Buttons from "../../button/Buttons";
import { AppIcons } from "../../../../data/appIcons";
import { TextInputType } from "../../../../data/formControlTypes";

const ImageUpload = ({
    type = TextInputType.FILE,
    name = "",
    placeholder = `Please Enter ${name}`,
    filename,
    onChange,
    onClear,
    onBlur,
    cssClass = "input-field",
    isDisable,
    isButtonVisible,
    acceptedFiles,
    isCustomButtonVisible
}) => {

    const imageRef = useRef();
    const [imagePreview, setImagePreview] = useState();

    const handleInputChange = (e) => {
        if (onChange) {
            onChange(e);
        }
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (_event) => {
            setImagePreview(reader.result);
        };
    };

    const handleClearClick = () => {
        if (onClear) {
            imageRef.current.value = null;
            filename = null;
            setImagePreview(null); // Clear file preview image
            onClear();
        }
    };

    useEffect(() => {
        if (filename && filename.base64Data) {
            setImagePreview(filename.base64Data);
        } else {
            imageRef.current.value = null;
            setImagePreview(null);
            handleClearClick();
        }
    }, [filename]);

    return (
        <>
            <div className={`form-field custom-file-uploader ${isDisable ? "field-disabled" : ""}`}>
                <input
                    ref={imageRef}
                    id={name}
                    name={name}
                    filename={imagePreview ? imagePreview : null}
                    type={type ? type : "file"}
                    className={cssClass}
                    placeholder={placeholder}
                    onChange={handleInputChange}
                    onBlur={onBlur}
                    disabled={isDisable}
                    accept={acceptedFiles}
                />
                <div className="custom-file-selector-design">
                    {!imagePreview ? <Image imagePath={AppIcons.Uploaddocumenticon} altText="Please Upload File"></Image> : null}
                    {imagePreview ?
                        <img src={imagePreview} alt="Uploaded File" />
                        :
                        <div className="drag-drop-txt">
                            <p>Drag & Drop Your Image</p>
                            {acceptedFiles === "" ?
                                <span className="small-txt">All File Formats we support</span>
                                :
                                <span className="small-txt">
                                    {acceptedFiles}
                                    Formats we support
                                </span>
                            }
                        </div>
                    }
                    {isCustomButtonVisible && (
                        <div className="row clear-buttons clear-btn-sec">
                            {imagePreview && (
                                <Buttons
                                    buttonTypeClassName="btn dark-btn"
                                    buttonText="Clear"
                                    onClick={handleClearClick}
                                />
                            )}
                        </div>
                    )}
                </div>
                {isButtonVisible && (
                    <>
                        <div className="row clear-buttons">
                            {imagePreview && (
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

ImageUpload.propTypes = {
    type: TextInputType.FILE.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onClear: PropTypes.func,
    cssClass: PropTypes.string,
    isDisable: PropTypes.bool,
};

export default ImageUpload;