import React from "react";
import "../../Order.scss";
import CardSection from "../../../../components/ui/card/CardSection";
import Iconify from "../../../../components/ui/iconify/Iconify";
import Tooltip from "../../../../components/ui/tooltip/Tooltip";
const OrderDetails = () => {
  return (
    <div className="order-review-section">
      <div className="row">
        {/* Left Side Section Start */}
        <div className="col-xxl-5 col-lg-5 col-md-5 col-12">
          {/* Order Summery Start */}
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
            // centerBtnOnClick={}
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
          {/* Order Summery End */}

          {/* Order Summery Start */}
          <CardSection cardTitle="Order Information">
            <div className="order-info-list">
              <div className="row">
                <div className="col-xxl-12 col-lg-12 col-md-12 col-12">
                  <div className="order-title">
                    <span>Order Method &nbsp;:&nbsp;</span>
                    <span className="desc">Mail</span>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                  <div className="order-title">
                    <span>Billing Address &nbsp;:&nbsp;</span>
                  </div>
                  <div className="address-card">
                    <div className="title-swap-btn">
                      <span>Chemistry Research Laboratory</span>
                      {/* Address Line 1 */}
                      <span className="swap-btn">
                        {" "}
                        {/* When click on this button to all addresses display on s idebar */}
                        <Iconify
                          icon="icon-park-outline:change"
                          className="swap-icon"
                        />
                      </span>
                    </div>
                    <div className="desc-add-sec">
                      <span>Mansfield Road</span>
                      {/* Address Line 2 */}
                      <span>Oxford</span>
                      {/* Address Line 3 */}
                      <span>United Kingdom, Oxfordshire OX1 3TA</span>
                      {/* Address Line 4 */}
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                  <div className="order-title">
                    <div className="order-title">
                      <span>Shipping Address &nbsp;:&nbsp;</span>
                    </div>
                    <div className="address-card">
                      <div className="title-swap-btn">
                        <span>Chemistry Research Laboratory</span>
                        {/* Address Line 1 */}
                        <span className="swap-btn">
                          {" "}
                          {/* When click on this button to all addresses display on s idebar */}
                          <Iconify
                            icon="icon-park-outline:change"
                            className="swap-icon"
                          />
                        </span>
                      </div>
                      <div className="desc-add-sec">
                        <span>Mansfield Road</span>
                        {/* Address Line 2 */}
                        <span>Oxford</span>
                        {/* Address Line 3 */}
                        <span>United Kingdom, Oxfordshire OX1 3TA</span>
                        {/* Address Line 4 */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardSection>
          {/* Order Summery End */}
        </div>
        {/* Left Side Section End */}
        {/* Right Side Section Start */}
        <div className="col-xxl-7 col-lg-7 col-md-7 col-12">
          <CardSection cardTitle="Order Items"></CardSection>
        </div>
        {/* Right Side Section End */}
      </div>
    </div>
  );
};

export default OrderDetails;
