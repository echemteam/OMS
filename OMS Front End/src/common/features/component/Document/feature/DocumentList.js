/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { documentTransformData, supplierDocumentTransformData } from "../../../../../utils/TransformData/TransformAPIData";
//** Service's */
import SwalAlert from "../../../../../services/swalService/SwalService";
import ToastService from "../../../../../services/toastService/ToastService";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";
import { ModulePathName } from "../../../../../utils/Enums/commonEnums";
import FileViewer from 'react-file-viewer';
import PropTypes from 'prop-types';

const DocumentList = forwardRef(({ keyId, isSupplier, downloadDocument, deleteDocumentsById, getDocumentsById, childRef, SecurityKey, isEditablePage }) => {

    //** State */
    const { confirm } = SwalAlert();
    const [documentListData, setDocumentListData] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(true);
    const [showDownalodButton, setShowDownalodButton] = useState(true);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [getFileType, setGetFileType] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState(null);

    /**
     * This hook dynamically sets the API call based on the module (customer or supplier).
     * The API endpoint and parameters are configured within the SupplierDocumentDetail OR CustomerDocumentDetail component.
    */
    const [Delete, { isSuccess: isDeleteSucess, data: isDeleteData }] = deleteDocumentsById();
    const [getList, { isFetching: isListFetching, isSuccess: isListSucess, data: isListData }] = getDocumentsById();
    const [Downalod, { isFetching: isDownalodFetching, isSuccess: isDownalodSucess, data: isDownalodData }] = downloadDocument();

    //** UseEffect */
    useEffect(() => {
        onGetData();
    }, [keyId]);

    useEffect(() => {
        if (isEditablePage && SecurityKey) {
            const hasDeletePermission = hasFunctionalPermission(SecurityKey.DELETE);
            const hasDownalodPermission = hasFunctionalPermission(SecurityKey.DOWNALOD);
            if (hasDeletePermission) {
                if (hasDeletePermission.hasAccess === true) {
                    setShowDeleteButton(true);
                }
                else {
                    setShowDeleteButton(false);
                }
            }
            if (hasDownalodPermission) {
                if (hasDownalodPermission.hasAccess === true) {
                    setShowDownalodButton(true);
                }
                else {
                    setShowDownalodButton(false);
                }
            }
        }
    }, [isEditablePage, SecurityKey]);

    useEffect(() => {
        if (isListSucess && isListData && !isListFetching) {
            const modifyData = isSupplier ? supplierDocumentTransformData(isListData) : documentTransformData(isListData);
            setDocumentListData(modifyData);
            let detectedFileTypes = new Set();

            Object.values(modifyData).forEach((items) => {
                items.forEach((item) => {
                    const fileType = determineFileType(item.attachment);
                    if (["pdf", "csv", "docx", "xlsx"].includes(fileType)) {
                        detectedFileTypes.add(fileType);
                    }
                });
            });

            if (detectedFileTypes.size > 0) {
                setGetFileType(Array.from(detectedFileTypes));
            } else {
                setGetFileType([]);
            }
        }
    }, [isListSucess, isListData, isListFetching]);

    useEffect(() => {
        if (!isDownalodFetching && isDownalodSucess && isDownalodData) {
            const fileData = isDownalodData.fileData;
            const blob = new Blob([fileData], { type: fileData.type });
            const fileURL = URL.createObjectURL(blob);

            if (actionType === 'download') {
                const link = document.createElement('a');
                link.href = fileURL;
                link.download = isDownalodData.fileName;
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(fileURL);
            } else if (actionType === 'view') {
                setSelectedDocument(fileURL);
                setIsModalOpen(true);
                setGetFileType(determineFileType(isDownalodData.fileName));
            }
        }
    }, [isDownalodFetching, isDownalodSucess, isDownalodData]);

    useEffect(() => {
        if (isDeleteSucess && isDeleteData) {
            ToastService.success(isDeleteData.errorMessage);
            onGetData();
        }
    }, [isDeleteSucess, isDeleteData]);

    const handleDocumentAction = (action, fileName) => {
        setSelectedDocument(null);
        setIsModalOpen(false);
        setActionType(action);

        let request = {
            folderName: isSupplier ? ModulePathName.Supplier : ModulePathName.Customer,
            keyId: keyId,
            fileName: fileName
        };

        if (action === 'download' || action === 'view') {
            Downalod(request);
        }
    };

    const handleDelete = (documentId) => {
        confirm("Delete?",
            "Are you sure you want to Delete?",
            "Delete", "Cancel"
        ).then((confirmed) => {
            if (confirmed) {
                Delete(documentId);
            }
        });
    };

    const determineFileType = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf': return 'pdf';
            case 'docx': return 'docx';
            case 'ppt':
            case 'pptx': return 'pptx';
            case 'xlsx': return 'xlsx';
            case 'csv': return 'csv';
            case 'xls': return 'xls';
            case 'doc': return 'doc';
            default: return null;
        }
    };

    const onGetData = () => {
        keyId && getList(keyId);
    };

    //** Use Imperative Handle  */
    useImperativeHandle(childRef, () => ({
        callChildFunction: onGetData
    }));

    const handleToggleModal = () => {
        setIsModalOpen(false);
        setSelectedDocument(null);
        setActionType(null);
    };

    return (
        <div className="document-list-sec">
            <div className="document-listing">
                <div className="row">
                    {!isListFetching ?
                        documentListData && Object.values(documentListData).some(arr => Array.isArray(arr) && arr.length > 0) ?
                            <React.Fragment>
                                {
                                    Object.entries(documentListData).map(([type, items], index) => (
                                        <React.Fragment key={index}>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                                {items.map((data ) => (
                                                    <div className="documents" key={data.customerDocumentId}>
                                                        <div className="left-icons">
                                                            <Image imagePath={data.documentIcon} alt="Document Icon" />
                                                        </div>
                                                        <div className="right-desc">
                                                            <div className="doc-details">
                                                                <div className="document-typename">{type}</div>
                                                                <div className="document-name">{data.name}</div>
                                                                <div className="document-type">{data.attachment}</div>
                                                            </div>
                                                            <div className="document-action">
                                                                {
                                                                    getFileType && getFileType.length > 0 &&
                                                                    (["pdf", "csv", "docx", "xlsx"].includes(determineFileType(data.attachment))) &&
                                                                    <span className="action-icon" onClick={() => handleDocumentAction('view', data.attachment)}>
                                                                        <Image imagePath={AppIcons.EyeIcon} alt="View Icon" />
                                                                    </span>
                                                                }

                                                                {showDownalodButton ?
                                                                    <span className="action-icon" onClick={() => handleDocumentAction('download', data.attachment)} >
                                                                        <Image imagePath={AppIcons.DownloadIcon} alt="Download Icon" />
                                                                    </span>
                                                                    : null}
                                                                {showDeleteButton ?
                                                                    <span className="action-icon" onClick={() => handleDelete(isSupplier ? data.supplierDocumentId : data.customerDocumentId)} >
                                                                        <Image imagePath={AppIcons.deleteIcon} alt="Delete Icon" />
                                                                    </span>
                                                                    : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </React.Fragment>
                                    ))
                                }
                            </React.Fragment>
                            : <NoRecordFound />
                        : <DataLoader />}
                </div>
            </div>
            <CenterModel showModal={isModalOpen} handleToggleModal={handleToggleModal}
                modalTitle="File Preview" modelSizeClass="w-40">
                <div className="model-hight-fix">
                    {selectedDocument && getFileType &&
                        <FileViewer
                            fileType={getFileType}
                            filePath={selectedDocument}
                            onError={(error) => console.error("Error:", error)}
                        />
                    }
                </div>
            </CenterModel>
        </div>
    );
});

DocumentList.propTypes = {
    keyId: PropTypes.number.isRequired,
    isSupplier: PropTypes.bool.isRequired,
    downloadDocument: PropTypes.func.isRequired,
    deleteDocumentsById: PropTypes.func.isRequired,
    getDocumentsById: PropTypes.func.isRequired,
    childRef: PropTypes.object.isRequired,
    SecurityKey: PropTypes.shape({
        DELETE: PropTypes.string,
        DOWNALOD: PropTypes.string
    }),
    isEditablePage: PropTypes.bool.isRequired
};

export default DocumentList;
