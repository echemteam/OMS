/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
//** Lib's */

import Image from "../../../../../components/image/Image";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import {
  documentTransformData,
  supplierDocumentTransformData,
} from "../../../../../utils/TransformData/TransformAPIData";
//** Service's */
import SwalAlert from "../../../../../services/swalService/SwalService";
import ToastService from "../../../../../services/toastService/ToastService";

// import CenterModel from "../../../../../components/ui/centerModel/CenterModel";
import { ModulePathName } from "../../../../../utils/Enums/commonEnums";
import FileViewer from "react-file-viewer";
import PropTypes from "prop-types";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import formatDate from "../../../../../lib/formatDate";
// import { ModulePathName } from "../../../../../utils/Enums/commonEnums";

const DocumentList = forwardRef(
  ({
    keyId,
    isSupplier,
    downloadDocument,
    deleteDocumentsById,
    getDocumentsById,
    childRef,
    SecurityKey,
    isEditablePage,
    isArchive,
  }) => {
    //** State */
    const { confirm } = SwalAlert();
    const [documentListData, setDocumentListData] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(true);
    const [showDownalodButton, setShowDownalodButton] = useState(true);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [getFileType, setGetFileType] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [downloadFileName, setDownloadFileName] = useState();

    const [Delete, { isSuccess: isDeleteSucess, data: isDeleteData }] =
      deleteDocumentsById();

    /**
     * This hook dynamically sets the API call based on the module (customer or supplier).
     * The API endpoint and parameters are configured within the SupplierDocumentDetail OR CustomerDocumentDetail component.
     */
    // const [Delete, { isSuccess: isDeleteSucess, data: isDeleteData }] =
    //   deleteDocumentsById();
    const [
      getList,
      { isFetching: isListFetching, isSuccess: isListSucess, data: isListData },
    ] = getDocumentsById();

    const [
      Downalod,
      {
        isFetching: isDownalodFetching,
        isSuccess: isDownalodSucess,
        data: isDownalodData,
      },
    ] = downloadDocument();

    //** UseEffect */
    useEffect(() => {
      onGetData();
    }, [keyId, isArchive]);

    useEffect(() => {
      if (isEditablePage && SecurityKey) {
        const hasDeletePermission = hasFunctionalPermission(SecurityKey.DELETE);
        const hasDownalodPermission = hasFunctionalPermission(
          SecurityKey.DOWNALOD
        );

        if (hasDeletePermission) {
          if (hasDeletePermission.hasAccess === true) {
            setShowDeleteButton(true);
          } else {
            setShowDeleteButton(false);
          }
        }
        if (hasDownalodPermission) {
          if (hasDownalodPermission.hasAccess === true) {
            setShowDownalodButton(true);
          } else {
            setShowDownalodButton(false);
          }
        }
      }
    }, [isEditablePage, SecurityKey]);

    useEffect(() => {
      if (isListSucess && isListData && !isListFetching) {
        let modifyData = isSupplier
          ? supplierDocumentTransformData(isListData)
          : documentTransformData(isListData);

        // Ensure modifyData is an array
        if (!Array.isArray(modifyData)) {
          modifyData = Object.values(modifyData).flat();
        }

        // Filter documents based on isArchive flag

        const filteredData = modifyData.filter(
          (doc) => doc.isArchive === isArchive
        );
        setDocumentListData(filteredData);

        // Detect file types
        const detectedFileTypes = new Set();
        filteredData.forEach((item) => {
          const fileType = determineFileType(item.attachment);
          if (["pdf", "csv", "docx", "xlsx"].includes(fileType)) {
            detectedFileTypes.add(fileType);
          }
        });

        setGetFileType(Array.from(detectedFileTypes));
      }
    }, [isListSucess, isListData, isListFetching, isArchive]);

    useEffect(() => {
      if (!isDownalodFetching && isDownalodSucess && isDownalodData) {
        const fileData = isDownalodData.fileData;
        const blob = new Blob([fileData], { type: fileData.type });
        const fileURL = URL.createObjectURL(blob);

        if (actionType === "download") {
          const link = document.createElement("a");
          link.href = fileURL;
          link.download = downloadFileName;
          document.body.appendChild(link);
          link.click();
          link.remove();
          URL.revokeObjectURL(fileURL);
        } else if (actionType === "view") {
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

    const handleDocumentAction = (action, fileName, name) => {
      setDownloadFileName(name);
      setSelectedDocument(null);
      setIsModalOpen(false);
      setActionType(action);

      let request = {
        folderName: isSupplier
          ? ModulePathName.SUPPLIER
          : ModulePathName.CUSTOMER,
        keyId: keyId,
        fileName: fileName,
      };

      if (action === "download" || action === "view") {
        Downalod(request);
      }
    };

    const handleDelete = (documentId) => {
      confirm(
        "Delete?",
        "Are you sure you want to Delete?",
        "Delete",
        "Cancel"
      ).then((confirmed) => {
        if (confirmed) {
          Delete(documentId);
        }
      });
    };

    const determineFileType = (fileName) => {
      const extension = fileName.split(".").pop().toLowerCase();
      switch (extension) {
        case "pdf":
          return "pdf";
        case "docx":
          return "docx";
        case "ppt":
        case "pptx":
          return "pptx";
        case "xlsx":
          return "xlsx";
        case "csv":
          return "csv";
        case "xls":
          return "xls";
        case "doc":
          return "doc";
        default:
          return null;
      }
    };

    const onGetData = () => {
      keyId && getList(keyId);
    };

    useImperativeHandle(childRef, () => ({
      callChildFunction: onGetData,
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
            {!isListFetching ? (
              documentListData.length > 0 ? (
                documentListData.map((data) => (
                  <div
                    className="col-xl-4 col-lg-4 col-md-6 col-12"
                    key={data.customerDocumentId}
                  >
                    <div className="documents">
                      <div className="left-icons">
                        <Image
                          imagePath={data.documentIcon}
                          alt="Document Icon"
                        />
                      </div>
                      <div className="right-desc">
                        <div className="doc-details">
                          <div className="document-typename">{data.type}</div>
                          <div className="document-name">{data.name}</div>
                          <div className="document-type">{data.attachment}</div>
                          <div className="document-type">
                            {formatDate(data.createdAt, "MM/DD/YYYY hh:mm A")}
                          </div>
                        </div>
                        <div className="document-action">
                          {getFileType.length > 0 &&
                            ["pdf", "csv", "docx", "xlsx"].includes(
                              determineFileType(data.attachment)
                            ) && (
                              <span
                                className="action-icon"
                                onClick={() =>
                                  handleDocumentAction("view", data.attachment)
                                }
                              >
                                <Iconify icon="lets-icons:view-light" />
                              </span>
                            )}

                          {showDownalodButton && (
                            <span
                              className="action-icon"
                              onClick={() =>
                                handleDocumentAction(
                                  "download",
                                  data.attachment,
                                  data.name
                                )
                              }
                            >
                              <Iconify icon="uil:folder-download" />
                            </span>
                          )}
                          {isArchive
                            ? null
                            : showDeleteButton && (
                              <span
                                className="action-icon"
                                onClick={() =>
                                  handleDelete(
                                    isSupplier
                                      ? data.supplierDocumentId
                                      : data.customerDocumentId
                                  )
                                }
                              >
                                <Iconify
                                  icon="mingcute:delete-2-line"
                                  className="delete-icon"
                                />
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <NoRecordFound />
              )
            ) : (
              <DataLoader />
            )}
          </div>
        </div>

           <SidebarModel
                isOpen={isModalOpen}
                contentClass="content-65"
                modalTitle="File Preview"
                onClose={handleToggleModal}
            >
                <div className="model-height-fix">
                    {selectedDocument && getFileType ? (
                        getFileType === "pdf" ? (
                            <div>
                                <iframe
                                    src={selectedDocument}
                                    title="PDF Preview"
                                    style={{ width: '100%', height: '200%' }}  
                                />
                            </div>
                        ) : (
                            <FileViewer
                                fileType={getFileType}
                                filePath={selectedDocument}
                                onError={(error) => console.error("Error:", error)}
                            />
                        )
                    ) : null}
                </div>
            </SidebarModel>
      </div>
    );
  }
);

DocumentList.propTypes = {
  keyId: PropTypes.number.isRequired,
  isSupplier: PropTypes.bool.isRequired,
  downloadDocument: PropTypes.func.isRequired,
  deleteDocumentsById: PropTypes.func.isRequired,
  getDocumentsById: PropTypes.func.isRequired,
  childRef: PropTypes.object.isRequired,
  SecurityKey: PropTypes.object.isRequired,
  isEditablePage: PropTypes.bool.isRequired,
  isArchive: PropTypes.bool.isRequired,
};

export default DocumentList;
