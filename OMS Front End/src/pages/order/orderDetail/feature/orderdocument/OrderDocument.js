import React, { useEffect, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";
import AddMultipleOrderDocument from "./features/AddMultipleOrderDocument";

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

const OrderDocument = ({ orderDetails, onRefreshOrderDetails }) => {
  const [documentDetails, setDocumentDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (orderDetails?.orderDocumentList) {
      setDocumentDetails(orderDetails.orderDocumentList);
    }
  }, [orderDetails]);

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

  const handleViewClick = () => {};

  const handleDeleteDocumentClick = () => {};

  return (
    <>
      <div>
        <CardSection
          cardTitle="Order Documents"
          rightButton={true}
          buttonClassName="theme-button"
          isIcon={true}
          iconClass="heroicons-solid:plus"
          titleButtonClick={handleAddDocumentClick}
        >
          <div className="document-list">
            <div className="row">
              {documentDetails?.map((doc) => {
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
                        <div className="file-actions">
                          <div
                            onClick={handleViewClick}
                            className="btn-part pdf-view"
                          >
                            <Iconify
                              icon="icomoon-free:file-pdf"
                              className="swap-icon"
                            />
                          </div>
                          <div
                            onClick={handleDeleteDocumentClick}
                            className="btn-part delete-icon"
                          >
                            <Iconify icon="mi:delete" className="swap-icon" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
    </>
  );
};

export default OrderDocument;
