import React from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";

const OrderDocument = () => {
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
            <div className="col-12">
              <div className="document-view-sec">
                <div class="file-item">
                  <div className="left-sec">
                    <Image imagePath={AppIcons.PdfIcon} alt="Document Icon" />
                    <div class="file-name">
                      Christopher_Nolan_price_list_ABCV_1232341.pdf
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
            <div className="col-12">
              <div className="document-view-sec">
                <div class="file-item">
                  <div className="left-sec">
                    <Image imagePath={AppIcons.PdfIcon} alt="Document Icon" />
                    <div class="file-name">
                      Christopher_Nolan_price_list_ABCV_1232341.pdf
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
          </div>
        </div>
      </CardSection>
    </div>
  );
};

export default OrderDocument;
