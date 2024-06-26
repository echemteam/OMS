import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import ToastService from "../../../../../services/toastService/ToastService";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
import { documentTransformData } from "../../../../../utils/TransformData/TransformAPIData";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
//** Service's */
import SwalAlert from "../../../../../services/swalService/SwalService";


const ManageDocumentList = forwardRef(({ mainId, downloadDocument, deleteDocumentsById, getDocumentsById, childRef, SecurityKey, isEditablePage }) => {

    //** State */
    const { confirm } = SwalAlert();
    const [documentListData, setDocumentListData] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(true);
    const [showDownalodButton, setShowDownalodButton] = useState(true);

    //** API Call's */
    const [Delete, { isSuccess: isDeleteSucess, data: isDeleteData }] = deleteDocumentsById();
    const [getList, { isFetching: isListFetching, isSuccess: isListSucess, data: isListData }] = getDocumentsById();
    const [Downalod, { isFetching: isDownalodFetching, isSuccess: isDownalodSucess, data: isDownalodData }] = downloadDocument();

    //** UseEffect */
    useEffect(() => {
        mainId && getList(mainId);
    }, []);

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
            const modifyData = documentTransformData(isListData);
            setDocumentListData(modifyData);
        }
    }, [isListSucess, isListData, isListFetching]);

    useEffect(() => {
        if (!isDownalodFetching && isDownalodSucess && isDownalodData) {
            var file = new Blob([isDownalodData.fileData], {
                type: isDownalodData?.fileData.type,
            });
            URL.createObjectURL(file);
            window.open(URL.createObjectURL(file), "_blank");
        }
    }, [isDownalodFetching, isDownalodSucess, isDownalodData]);

    useEffect(() => {
        if (isDeleteSucess && isDeleteData) {
            ToastService.success(isDeleteData.errorMessage);
            onGetData();
        }
    }, [isDeleteSucess, isDownalodData]);

    //** Handle Change's */
    const handleDownload = (name) => {
        let request = {
            folderName: 'Customer',
            mainId: mainId,
            fileName: name
        }
        Downalod(request);
    };
    const handleDelete = (customerDocumentId) => {
        confirm("Delete?",
            "Are you sure you want to Delete?",
            "Delete", "Cancel"
        ).then((confirmed) => {
            if (confirmed) {
                Delete(customerDocumentId);
            }
        });
    };

    const onGetData = () => {
        mainId && getList(mainId);
    };

    //** Use Imperative Handle  */
    useImperativeHandle(childRef, () => ({
        callChildFunction: onGetData
    }));

    return (
        <div className="document-list-sec">
            <div className="document-listing">
                <div className="row">
                    {!isListFetching ?
                        documentListData && Object.values(documentListData).some(arr => Array.isArray(arr) && arr.length > 0) ?
                            < React.Fragment >
                                {
                                    Object.entries(documentListData).map(([type, items], index) => (
                                        <React.Fragment key={index}>
                                            <div className="col-md-6 col-12">
                                                {items.map((data, childIndex) => (
                                                    <div className="documents" key={childIndex}>
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
                                                                {showDeleteButton ?
                                                                    <span className="action-icon" onClick={() => handleDownload(data.attachment)} >
                                                                        <Image imagePath={AppIcons.DownloadIcon} alt="Download Icon" />
                                                                    </span>
                                                                    : null}
                                                                {showDownalodButton ?
                                                                    <span className="action-icon" onClick={() => handleDelete(data.customerDocumentId)} >
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
        </div >
    );
});

export default ManageDocumentList;
