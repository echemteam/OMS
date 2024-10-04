import React, { useEffect, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";
import AddMultipleOrderDocument from "./features/AddMultipleOrderDocument";

const OrderDocument = ({ orderDetails, onRefreshOrderDetails }) => {

  const [documentDetails, setDocumentDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (orderDetails?.orderDocumentList) {
      setDocumentDetails(orderDetails.orderDocumentList);
    }
  }, [orderDetails]);

  const handleSuccess = () => {
    handleCloseDocumentModel()
    if (onRefreshOrderDetails) {
      onRefreshOrderDetails()
    }
  }

  const handleCloseDocumentModel = () => {
    setIsModalOpen(false)
  }

  const handleAddDocumentClick = () => {
    setIsModalOpen(true);
  }

  const handleDeleteDocumentClick = () => { }

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
              {documentDetails?.map((doc) => (
                <div className="col-12">
                  <div className="document-view-sec">
                    <div class="file-item">
                      <div className="left-sec">
                        <Image imagePath={AppIcons.PdfIcon} alt="Document Icon" />
                        <div class="file-name">
                          {doc.documentName}
                        </div>
                      </div>
                      <div class="file-actions">
                        <div className="btn-part pdf-view">
                          <Iconify
                            icon="icomoon-free:file-pdf"
                            className="swap-icon"
                          />
                        </div>
                        <div onClick={handleDeleteDocumentClick} className="btn-part delete-icon">
                          <Iconify icon="mi:delete" className="swap-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
