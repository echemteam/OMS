import React, { useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../../../data/appIcons";
import CustomerDetailsModel from "./feature/CustomerDetailsModel";

const OrderSummary = () => {
  const [isModelOpenPDF, setIsModelOpenPDF] = useState(false);

  const handleToggleModalPDF = () => {
    setIsModelOpenPDF(true);
  };

  const onSidebarClosePDF = () => {
    setIsModelOpenPDF(false);
  };

  return (
    <div>
      <CardSection
        cardTitle="Order Summary"
        rightButton={true}
        buttonClassName="theme-button"
        isIcon={true}
        iconClass="wpf:edit"
        // titleButtonClick={}
        isCenterTile={true}
        CenterTitleTxt="AA123152"
        CenterBtnIcon="icomoon-free:file-pdf"
        centerBtnTitle="Purchase Order Details"
        centerBtnOnClick={handleToggleModalPDF}
      >
        <div className="order-summery-list">
          <div className="row">
            <div className="col-xxl-7 xol-xl-7 xol-lg-6 col-md-6 col-12">
              <div className="desc-section">
                <div className="key-icon-part">
                  <Iconify icon="jam:user" className="open-bar" />
                  <span>Cust. Name</span>
                </div>
                <div className="desc-detail">
                  &nbsp;:&nbsp;<span>Arcus Bioscience Inc.</span>
                  <div className="info-icon">
                    <Iconify icon="ep:info-filled" className="info" />
                    {/* Customer Detail Model Start */}
                    <CustomerDetailsModel />
                    {/* Customer Detail Model End */}
                  </div>
                </div>
              </div>
              <div className="desc-section">
                <div className="key-icon-part">
                  <Iconify icon="jam:users" className="open-bar" />
                  <span>Sub-Cust. Name</span>
                </div>
                <div className="desc-detail">
                  &nbsp;:&nbsp;<span>Exelixis Inc.</span>
                  <div className="info-icon">
                    <Iconify icon="ep:info-filled" className="info" />
                    {/* Customer Detail Model Start */}
                    <CustomerDetailsModel />
                    {/* Customer Detail Model End */}
                  </div>
                </div>
              </div>
              <div className="desc-section">
                <div className="key-icon-part">
                  <Iconify
                    icon="material-symbols:quick-reference-outline-rounded"
                    className="open-bar"
                  />
                  <span>Reference No</span>
                </div>
                <div className="desc-detail">
                  &nbsp;:&nbsp;<span>123-654</span>
                </div>
              </div>
            </div>
            <div className="col-xxl-5 xol-xl-5 xol-lg-6 col-md-6 col-12">
              <div className="desc-section right-status-sec">
                <div className="key-icon-part">
                  <Iconify icon="f7:status" className="open-bar" />
                  <span>Status</span>
                </div>
                <div className="desc-detail">
                  &nbsp;:&nbsp;
                  <span className="status pending">Pending</span>
                </div>
              </div>
              <div className="desc-section right-status-sec">
                <div className="key-icon-part">
                  <Iconify icon="f7:status" className="open-bar" />
                  <span>Sub-Status</span>
                </div>
                <div className="desc-detail">
                  &nbsp;:&nbsp;
                  <span className="status in-transit">In Transit</span>
                </div>
              </div>
              <div className="desc-section right-status-sec">
                <div className="key-icon-part">
                  <Iconify icon="uil:calender" className="open-bar" />
                  <span>Received Date</span>
                </div>
                <div className="desc-detail">
                  &nbsp;:&nbsp;<span>26 Oct 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardSection>
      <SidebarModel
        modalTitle="PO PDF"
        contentClass="content-50"
        onClose={onSidebarClosePDF}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpenPDF}
        showToggle={true}
      >
        Purchase Order PDF
      </SidebarModel>
    </div>
  );
};

export default OrderSummary;
