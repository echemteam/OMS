/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";
import AddMultipleOrderDocument from "./features/AddMultipleOrderDocument";
import { useLazyDownloadDocumentQuery } from "../../../../../app/services/orderAPI";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import FileViewer from "react-file-viewer";
import { useDeleteOrderDocuementByIdMutation } from "../../../../../app/services/orderAPI";
import ToastService from "../../../../../services/toastService/ToastService";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import SwalAlert from "../../../../../services/swalService/SwalService";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";

const getFileExtension = (filename) => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
};

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

const OrderDocument = ({
  orderDetails,
  onRefreshOrderDetails,
  isOrderDetailsFetching,
}) => {
  const [documentDetails, setDocumentDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getFileType, setGetFileType] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModelOpenPDF, setIsModelOpenPDF] = useState(false);

  const { confirm } = SwalAlert();
  const [deleteOrderDocument, { isSuccess: isDeleteSuccess, data: isDeleteData }] = useDeleteOrderDocuementByIdMutation();

  const [Downalod, { isFetching: isDownalodFetching, isSuccess: isDownalodSucess, data: isDownalodData, }] = useLazyDownloadDocumentQuery();
  useEffect(() => {
    if (orderDetails?.orderDocumentList) {
      setDocumentDetails(orderDetails.orderDocumentList);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (isDeleteSuccess && isDeleteData) {
      ToastService.success(isDeleteData.errorMessage);
      handleSuccess();
    }
  }, [isDeleteSuccess, isDeleteData]);

  const handleSuccess = () => {
    handleCloseDocumentModel();
    if (onRefreshOrderDetails) {
      onRefreshOrderDetails();
    }
  };

  const handleCloseDocumentModel = () => {
    setIsModalOpen(false);
  };

  const handleAddDocumentClick = () => {
    setIsModalOpen(true);
  };

  const handleDocumentAction = (fileName) => {
    setSelectedDocument(null);
    let request = {
      folderName: "Order",
      keyId: orderDetails?.orderId,
      fileName: fileName,
    };

    Downalod(request);
  };

  const onSidebarClosePDF = () => {
    setIsModelOpenPDF(false);
    setSelectedDocument(null);
  };

  useEffect(() => {
    if (!isDownalodFetching && isDownalodSucess && isDownalodData) {
      const fileData = isDownalodData.fileData;
      const blob = new Blob([fileData], { type: fileData.type });
      const fileURL = URL.createObjectURL(blob);
      setSelectedDocument(fileURL);
      setIsModelOpenPDF(true);
      setGetFileType(determineFileType(isDownalodData.fileName));
    }
  }, [isDownalodFetching, isDownalodSucess, isDownalodData]);


  const handleDeleteDocumentClick = (orderDocumentId) => {
    confirm(
      "Delete?", "Are you sure you want to Delete?",
      "Delete", "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        deleteOrderDocument(orderDocumentId);
      }
    });

  };

  return (
    <>
      <div>
        <CardSection cardTitle="Order Documents" rightButton={true}
          buttonClassName="theme-button" isIcon={true}
          iconClass="heroicons-solid:plus" titleButtonClick={handleAddDocumentClick}>
          <div className="document-list">
            <div className="row">
              {!isOrderDetailsFetching ?
                <>
                  {documentDetails && documentDetails.length > 0 ? (
                    <>
                      {documentDetails?.map((doc) => {
                        if (doc.documentName) { // Check if documentName is not null or undefined
                          const extension = getFileExtension(doc.documentName);
                          const fileIcon = getFileIcon(extension);

                          return (
                            <div className="col-12" key={doc.documentName}>
                              <div className="document-view-sec">
                                <div className="file-item">
                                  <div className="left-sec">
                                    <Image imagePath={fileIcon} alt="Document Icon" />{" "}
                                    {/* Dynamic icon */}
                                    <div className="file-name">{doc.documentName}</div>
                                  </div>
                                  <div className="file-actions order-document">
                                    <div
                                      onClick={() => handleDocumentAction(doc.documentName)}
                                      className="btn-part pdf-view"
                                      title="View Order Document"
                                    >
                                      {!isDownalodFetching ? (
                                        <Iconify icon="icomoon-free:file-pdf" className="swap-icon" />
                                      ) : (
                                        <Iconify icon="mdi:loading" />
                                      )}
                                    </div>
                                    <div
                                      onClick={() => handleDeleteDocumentClick(doc.orderDocumentId)}
                                      className="btn-part delete-icon"
                                    >
                                      <Iconify icon="mi:delete" className="swap-icon" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null; // Return null if documentName is null or undefined
                      })}
                    </>
                  ) : (
                    <NoRecordFound />
                  )}
                </>
                : <DataLoader />}
            </div>
          </div>
        </CardSection>
      </div>

      <CenterModel
        showModal={isModalOpen}
        handleToggleModal={handleCloseDocumentModel}
        modalTitle="Add Multiple Order Document"
        modelSizeClass="w-50s"
      >
        <AddMultipleOrderDocument
          orderDetails={orderDetails}
          onClose={handleCloseDocumentModel}
          onSuccess={handleSuccess}
        />
      </CenterModel>

      <SidebarModel
        modalTitle="PO PDF"
        contentClass="content-50"
        onClose={onSidebarClosePDF}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpenPDF}
        showToggle={true}
      >
        <div className="model-height-fix doc-view">
          {selectedDocument && getFileType ? (
            getFileType === "pdf" ? (
              <div className="pdf-iframe">
                <iframe
                  src={selectedDocument}
                  title="PDF Preview"
                  style={{ width: "100%", height: "200%" }}
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
    </>
  );
};

export default OrderDocument;
