import React, { useEffect, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";

const OrderDocument = ({ orderDetails }) => {

  const [documentDetails, setDocumentDetails] = useState(null);

  useEffect(() => {
    if (orderDetails?.orderDocumentList) {
      setDocumentDetails(orderDetails.orderDocumentList);
    }
  }, [orderDetails]);

  return (
    <div>
      <CardSection
        cardTitle="Order Documents"
        rightButton={true}
        buttonClassName="theme-button"
        isIcon={true}
        iconClass="heroicons-solid:plus"
      // titleButtonClick={}
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
                      <div className="btn-part delete-icon">
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
  );
};

export default OrderDocument;
