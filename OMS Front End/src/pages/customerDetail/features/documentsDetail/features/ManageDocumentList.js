import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";
import ToastService from "../../../../../services/toastService/ToastService";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
import { documentTransformData } from "../../../../../utils/TransformData/TransformAPIData";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import SwalAlert from "../../../../../services/swalService/SwalService";
import { useDeleteCustomerDocumentsByIdMutation, useLazyDownloadCustomerDocumentQuery, useLazyGetCustomerDocumentsByIdQuery } from "../../../../../app/services/documentAPI";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";


const ManageDocumentList = forwardRef(({ childRef }) => {

    //** State */
    const { confirm } = SwalAlert();
    const { customerId } = useContext(BasicDetailContext);
    const [documentListData, setDocumentListData] = useState([]);
    const [isDataList, setIsDataList] = useState(false);

    //** API Call's */
    const [Delete, { isSuccess: isDeleteSucess, data: isDeleteData }] = useDeleteCustomerDocumentsByIdMutation();
    const [getList, { isFetching: isListFetching, isSuccess: isListSucess, data: isListData }] = useLazyGetCustomerDocumentsByIdQuery();
    const [Downalod, { isFetching: isDownalodFetching, isSuccess: isDownalodSucess, data: isDownalodData }] = useLazyDownloadCustomerDocumentQuery();

    //** UseEffect */
    useEffect(() => {
        customerId && getList(customerId);
    }, [])

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
            customerId && getList(customerId);
        }
    }, [isDeleteSucess, isDownalodData]);

    //** Handle Change's */
    const handleDownload = (name) => {
        let request = {
            folderName: 'Customer',
            customerId: customerId,
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
        customerId && getList(customerId);
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
                                                                <span className="action-icon" onClick={() => handleDownload(data.attachment)} >
                                                                    <Image imagePath={AppIcons.DownloadIcon} alt="Download Icon" />
                                                                </span>
                                                                <span className="action-icon" onClick={() => handleDelete(data.customerDocumentId)} >
                                                                    <Image imagePath={AppIcons.deleteIcon} alt="Delete Icon" />
                                                                </span>
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
