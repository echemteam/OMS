/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import Buttons from "../../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import { DocumentMultipleFormData } from "./multipleOrderDocumentConfig.data";
import "../../../../../../common/features/component/Document/Document.scss";
import Iconify from "../../../../../../components/ui/iconify/Iconify";
import NoRecordFound from "../../../../../../components/ui/noRecordFound/NoRecordFound";
import { AppIcons } from "../../../../../../data/appIcons";
import ToastService from "../../../../../../services/toastService/ToastService";
import { ErrorMessage } from "../../../../../../data/appMessages";
import Input from "../../../../../../components/ui/inputs/input/Input";
import { useAddOrderDocumentsMutation } from "../../../../../../app/services/orderAPI";
import { FieldSettingType } from "../../../../../../utils/Enums/commonEnums";
import { setFieldSetting } from "../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";

const getFileIcon = (extension) => {
    switch (extension) {
        case "pdf":
            return AppIcons.PdfIcon;
        case "doc":
        case "docx":
            return AppIcons.DocIcon;
        case "xls":
        case "xlsx":
            return AppIcons.XlsIcon;
        case "ppt":
        case "pptx":
            return AppIcons.PptIcon;
        case "csv":
            return AppIcons.CsvIcon;
        case "zip":
        case "rar":
            return AppIcons.ZipIcon;
        default:
            return AppIcons.defaultFileIcon;
    }
};

const getFileExtension = (filename) => {
    const parts = filename.split(".");
    return parts.length > 1 ? parts.pop().toLowerCase() : "";
};

const AddMultipleOrderDocument = ({
    orderDetails,
    onClose,
    onSuccess,
    isSingleDocument
}) => {
    const ref = useRef();
    const [attachment, setAttachment] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const [add, {
        isLoading: isAddLoading,
        isSuccess: isAddSuccess,
        data: isAddData },] = useAddOrderDocumentsMutation();

    useEffect(() => {
        if (isAddSuccess && isAddData) {
            if (isAddData.errorMessage.includes("exists")) {
                ToastService.warning(isAddData.errorMessage);
                return;
            }
            ToastService.success(isAddData.errorMessage);
            onSuccess();
        }
    }, [isAddSuccess, isAddData]);

    useEffect(() => {
        const manageData = DocumentMultipleFormData;  
        if (isSingleDocument) {
            setFieldSetting(manageData, 'attachment', FieldSettingType.ISMULTIPLE, false);
             setFieldSetting(manageData, 'attachment', FieldSettingType.ISFILENAMECLEARED, false);

        } else {
            setFieldSetting(manageData, 'attachment', FieldSettingType.ISMULTIPLE, true);
             setFieldSetting(manageData, 'attachment', FieldSettingType.ISFILENAMECLEARED, true);

        }
       
    }, [isSingleDocument]);

    const handleSave = async () => {
        if (isSingleDocument && uploadedFiles.length === 0) {
            ToastService.warning("Please Select Document");
            return;
        }
        if (uploadedFiles.length >= 0 && attachment.length >= 0) {
            const modifyData = uploadedFiles.map((data, index) => {
                const matchingAttachment = attachment.find((att, ind) => ind === index);
                return {
                    ...data,
                    base64File: matchingAttachment ? matchingAttachment.base64Data : null,
                };
            });

            if (modifyData.length === 0) {
                ToastService.warning("Please Select Document");
                return;
            }

            const IsAllDetailExist = modifyData.every((data) => data.documentName && data.base64File && data.documentType !== null);
            if (IsAllDetailExist) {
                const requestData = {
                    orderId: orderDetails.orderId,
                    storagePath: "Order",
                    // documentOrderList: modifyData,
                    documentOrderList: isSingleDocument ? [modifyData[0]] : modifyData,
                }
                add(requestData);
            } else {
                ToastService.warning(ErrorMessage.DocumentDetailMissing);
            }
        }
    };

    const handleFileUpload = (value) => {
            const files = value.split(", ");

            const newFiles = files.map((file) => {
            const fileExtension = getFileExtension(file);
            return {
                documentName: file,
                documentType: isSingleDocument ? 0 : 2,
                extension: fileExtension,
            };
        });

        // setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);  
        if (isSingleDocument) {
            setUploadedFiles(newFiles);  
        } else {
            setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);  
        }
    };

    const handleFileRemove = (index) => {
            setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));  
            setAttachment((prevFiles) => prevFiles.filter((_, i) => i !== index));  
    };

    
    const formActionHandler = {
        DDL_FILE: handleFileUpload,
    };

    const onFormDataChange = (updatedData) => {
        const attachmentsArray = Array.isArray(updatedData?.attachment) 
            ? updatedData.attachment 
            : updatedData?.attachment ? [updatedData.attachment] : [];
    
        if (attachmentsArray.length > 0) {
            setAttachment((prevAttachments) => [
                ...prevAttachments,
                ...attachmentsArray,
            ]);
        }
    };
    
    const handleFileNameChange = (index, newName) => {
        setUploadedFiles((prevFiles) =>
            prevFiles.map((file, i) =>
                i === index ? { ...file, name: newName } : file
            )
        );
    };
    
    return (
        <div className="row add-order-doc-se">
            <FormCreator
                config={DocumentMultipleFormData}
                ref={ref}
                onActionChange={formActionHandler}
                onFormDataChange={onFormDataChange}
            />
            <table className="custom-table mt-4">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {console.log('uploadedFiles', uploadedFiles)} */}
                    {uploadedFiles.length === 0 ? (
                        <tr>
                            <td colSpan="3">
                                <NoRecordFound />
                            </td>
                        </tr>
                    ) : (
                        uploadedFiles.map((file, index) =>
                         
                        (
                            <tr key={index}>
                                <td>
                                    <img
                                        src={getFileIcon(file.extension)}
                                        alt={file.documentName}
                                        className="file-icon"
                                    />
                                </td>
                                {/* <td
                  contentEditable="true"
                  onBlur={(e) =>
                    handleFileNameChange(index, e.target.textContent)
                  }
                >
                  {file.name}
                </td> */}
                                 <td>
                                    {" "}
                                    <Input
                                        type="text"
                                        value={file.documentName}
                                        onChange={(e) =>
                                            handleFileNameChange(index, e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleFileRemove(index)}
                                        className="delete-button"
                                    >
                                        {" "}
                                        <Iconify
                                            icon="mingcute:delete-2-line"
                                            className="delete-icon-model"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody> 
            </table>
            <div className="d-flex align-item-end justify-content-end mt-3">
                <Buttons
                    buttonTypeClassName="theme-button"
                    isLoading={isAddLoading}
                    buttonText="Save"
                    onClick={handleSave}
                />
                <Buttons
                    buttonTypeClassName="dark-btn ml-5"
                    buttonText="Cancel"
                    onClick={onClose}
                />
            </div>
        </div>
    );
};

AddMultipleOrderDocument.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AddMultipleOrderDocument;
