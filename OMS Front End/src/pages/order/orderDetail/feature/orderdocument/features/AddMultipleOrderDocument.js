/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import Buttons from "../../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../../components/FinalForms/FormCreator";
import { DocumentMultipleFormData } from "./multipleOrderDocumentConfig.data";
import "../../../../../../common/features/component/Document/Document.scss";
import Iconify from "../../../../../../components/ui/iconify/Iconify";
import NoRecordFound from "../../../../../../components/ui/noRecordFound/NoRecordFound";
import { AppIcons } from "../../../../../../data/appIcons";
import ToastService from "../../../../../../services/toastService/ToastService";
import { ErrorMessage } from "../../../../../../data/appMessages";
import Input from "../../../../../../components/ui/inputs/input/Input";
import { useAddOrderDocumentsMutation } from "../../../../../../app/services/orderAPI";

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

const AddMultipleOrderDocument = ({ orderDetails, onClose, onSuccess }) => {

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

    const handleSave = async () => {
        if (uploadedFiles.length > 0 && attachment.length > 0) {
            const modifyData = uploadedFiles.map((data, index) => {
                const matchingAttachment = attachment.find((att, ind) => ind === index);
                return {
                    ...data,
                    base64File: matchingAttachment ? matchingAttachment.base64Data : null,
                };
            });
            const IsAllDetailExist = modifyData.every((data) => data.documentName && data.base64File && data.documentType !== null);
            if (IsAllDetailExist) {
                const requestData = {
                    orderId: orderDetails.orderId,
                    storagePath: "Order",
                    documentOrderList: modifyData,
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
                documentType: 2,
                extension: fileExtension,
            };
        });
        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleFileRemove = (index) => {
        setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setAttachment((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const formActionHandler = {
        DDL_FILE: handleFileUpload,
    };

    const onFormDataChange = (updatedData) => {
        setAttachment((prevAttachments) => [
            ...prevAttachments,
            ...updatedData?.attachment,
        ]);
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
                    {uploadedFiles.length === 0 ? (
                        <tr>
                            <td colSpan="3">
                                <NoRecordFound />
                            </td>
                        </tr>
                    ) : (
                        uploadedFiles.map((file, index) => (
                            <tr key={index}>
                                <td>
                                    <img
                                        src={getFileIcon(file.extension)}
                                        alt={file.documentName}
                                        className="file-icon"
                                    />
                                </td>
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
