import React, { useState } from "react";
import "../../Order.scss";
import CardSection from "../../../../components/ui/card/CardSection";
import Iconify from "../../../../components/ui/iconify/Iconify";
import Image from "../../../../components/image/Image";
import { AppIcons } from "../../../../data/appIcons";
import { Accordion } from "react-bootstrap";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
const OrderDetails = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const onSidebarClose = () => {
    setIsModelOpen(false);
  };

  const handleToggleModal = () => {
    setIsModelOpen(true);
  };

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
            centerBtnOnClick={handleToggleModal}
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

          {/* Order Information Start */}
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
                      <span className="swap-btn tooltip-div">
                        {" "}
                        {/* When click on this button to all addresses display on s idebar */}
                        <Iconify
                          icon="icon-park-outline:change"
                          className="swap-icon"
                        />
                        <div className="tooltip-show">
                          <p>Change Address</p>
                        </div>
                        <div className="tooltip-arrow-icon"></div>
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
                    <span>Shipping Address &nbsp;:&nbsp;</span>
                  </div>
                  <div className="address-card">
                    <div className="title-swap-btn">
                      <span>Chemistry Research Laboratory</span>
                      {/* Address Line 1 */}
                      <span className="swap-btn tooltip-div">
                        {" "}
                        {/* When click on this button to all addresses display on s idebar */}
                        <Iconify
                          icon="icon-park-outline:change"
                          className="swap-icon"
                        />
                        <div className="tooltip-show">
                          <p>Change Address</p>
                        </div>
                        <div className="tooltip-arrow-icon"></div>
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
              <div className="row mt-2">
                <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                  <div className="order-title">
                    <span>End User &nbsp;:&nbsp;</span>
                  </div>
                  <div className="contact-card">
                    <div className="profile-name-btn">
                      <div className="profile-icon-sec">AM</div>
                      <div className="right-info">
                        <div className="right-name-btn">
                          <div className="user-name">Alex Murphy</div>
                          <div className="btn-sec">
                            <div className="select-icon tooltip-div">
                              <Iconify
                                icon="icon-park-outline:change"
                                className="swap-icon"
                              />
                              <div className="tooltip-show">
                                <p>Change Customer</p>
                              </div>
                              <div className="tooltip-arrow-icon"></div>
                            </div>
                            <div className="info-display tooltip-div">
                              <Iconify icon="ep:info-filled" className="info" />
                              <div className="tooltip-show">
                                <p>Customer Details</p>
                              </div>
                              <div className="tooltip-arrow-icon"></div>
                            </div>
                          </div>
                        </div>
                        <div className="user-details">
                          <div className="email">
                            <Iconify icon="ic:round-email" />
                            <span>alexmurphy@gmail.com</span>
                          </div>
                          <div className="number">
                            <Iconify icon="mingcute:phone-fill" />
                            <span>+91 9173010672</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                  <div className="order-title">
                    <span>Invoice Submission&nbsp;:&nbsp;</span>
                  </div>
                  <div className="contact-card">
                    <div className="profile-name-btn">
                      <div className="profile-icon-sec">AM</div>
                      <div className="right-info">
                        <div className="right-name-btn">
                          <div className="user-name">Alex Murphy</div>
                          <div className="btn-sec">
                            <div className="select-icon tooltip-div">
                              <Iconify
                                icon="icon-park-outline:change"
                                className="swap-icon"
                              />
                              <div className="tooltip-show">
                                <p>Change Customer</p>
                              </div>
                              <div className="tooltip-arrow-icon"></div>
                            </div>
                            <div className="info-display tooltip-div">
                              <Iconify icon="ep:info-filled" className="info" />
                              <div className="tooltip-show">
                                <p>Customer Details</p>
                              </div>
                              <div className="tooltip-arrow-icon"></div>
                            </div>
                          </div>
                        </div>
                        <div className="user-details">
                          <div className="email">
                            <Iconify icon="ic:round-email" />
                            <span>alexmurphy@gmail.com</span>
                          </div>
                          <div className="number">
                            <Iconify icon="mingcute:phone-fill" />
                            <span>+91 9173010672</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-lg-6 col-md-6 col-12 mt-2">
                  <div className="order-title">
                    <span>Purchasing&nbsp;:&nbsp;</span>
                  </div>
                  <div className="contact-card">
                    <div className="profile-name-btn">
                      <div className="profile-icon-sec">AM</div>
                      <div className="right-info">
                        <div className="right-name-btn">
                          <div className="user-name">Alex Murphy</div>
                          <div className="btn-sec">
                            <div className="select-icon tooltip-div">
                              <Iconify
                                icon="icon-park-outline:change"
                                className="swap-icon"
                              />
                              <div className="tooltip-show">
                                <p>Change Customer</p>
                              </div>
                              <div className="tooltip-arrow-icon"></div>
                            </div>
                            <div className="info-display tooltip-div">
                              <Iconify icon="ep:info-filled" className="info" />
                              <div className="tooltip-show">
                                <p>Customer Details</p>
                              </div>
                              <div className="tooltip-arrow-icon"></div>
                            </div>
                          </div>
                        </div>
                        <div className="user-details">
                          <div className="email">
                            <Iconify icon="ic:round-email" />
                            <span>alexmurphy@gmail.com</span>
                          </div>
                          <div className="number">
                            <Iconify icon="mingcute:phone-fill" />
                            <span>+91 9173010672</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardSection>
          {/* Order Information End */}
          {/* Order Document Start */}
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
                        <Image
                          imagePath={AppIcons.PdfIcon}
                          alt="Document Icon"
                        />
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
                        <Image
                          imagePath={AppIcons.PdfIcon}
                          alt="Document Icon"
                        />
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
          {/* Order Document End */}
        </div>
        {/* Left Side Section End */}

        {/* Right Side Section Start */}
        <div className="col-xxl-7 col-lg-7 col-md-7 col-12">
          <div className="order-action-sec">
            <CardSection
              cardTitle="Order Items"
              rightButton={true}
              buttonClassName="outline-theme-btn"
              isIcon={true}
              iconClass="iconamoon:history-bold"
              multipleButton={true}
              isTooltip={true}
              tootipText="History"
              rightButtonArray={[
                {
                  isIcon: true,
                  buttonTypeClassName: "outline-theme-btn",
                  iconClass: "fluent-mdl2:activate-orders",
                  isTooltip: true,
                  tootipText: "Original PO",
                },
                {
                  isIcon: true,
                  buttonTypeClassName: "outline-theme-btn",
                  iconClass: "icon-park-outline:transaction-order",
                  isTooltip: true,
                  tootipText: "Price List",
                },
                {
                  isIcon: true,
                  buttonTypeClassName: "outline-theme-btn",
                  iconClass: "fluent-mdl2:chart",
                  isTooltip: true,
                  tootipText: "Order Status",
                },
              ]}
            ></CardSection>
          </div>
          <div className="order-item-list">
            <CardSection>
              <div className="order-all-item-view">
                <div className="accordian-title">
                  <span>Catalog ID</span>
                  <span>Cas Number</span>
                  <span>Unit Price</span>
                  <span>Pack Size</span>
                  <span>Total Price</span>
                  <span>Status</span>
                </div>
              </div>
              <div className="accordian-desc">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <div className="header-items">
                        <span>Y-2520</span>
                        <span>19679-75-5</span>
                        <span>1X$20</span>
                        <span>2 x 50MG</span>
                        <span>$ 51.75</span>
                        <span>
                          <div className="status-btn complete-bg">Complete</div>
                        </span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="row">
                        <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                          <div className="key-value-se">
                            <span className="key-sec">Name</span>
                            <span className="value-sec">
                              &nbsp;:&nbsp; 2-amino-3 5-dibromobenzaldehyde
                            </span>
                          </div>
                          <div className="key-value-se">
                            <span className="key-sec">MDL Number </span>
                            <span className="value-sec">
                              &nbsp;:&nbsp; 12002452003584
                            </span>
                          </div>
                          <div className="key-value-se">
                            <span className="key-sec">Shipping Add.</span>
                            <div className="value-right-btn">
                              <span className="value-sec add-value">
                                &nbsp;:&nbsp; 2-amino-3 5-dibromobenzaldehyde
                              </span>
                              <span className="right-btn">
                                <span className="info-btn">
                                  <Iconify
                                    icon="ep:info-filled"
                                    className="swap-icon"
                                  />
                                </span>
                                <span className="info-btn tooltip-div">
                                  <Iconify
                                    icon="icon-park-outline:change"
                                    className="swap-icon"
                                  />
                                  <div className="tooltip-show">
                                    <p>Change Address</p>
                                  </div>
                                  <div className="tooltip-arrow-icon"></div>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                          <div className="accordian-right-full-sec">
                            <div className="left-section">
                              <div className="key-value-se">
                                <span className="key-sec">Priority</span>
                                <span className="value-sec">
                                  &nbsp;:&nbsp;{" "}
                                  <span class="status-btn heigh-bg">High</span>
                                </span>
                              </div>
                              <div className="key-value-se">
                                <span className="key-sec">Req-Date</span>
                                <span className="value-sec">
                                  &nbsp;:&nbsp; 10/28/2024
                                </span>
                              </div>
                              <div className="key-value-se">
                                <span className="key-sec">Promise Date</span>
                                <span className="value-sec">
                                  &nbsp;:&nbsp; 11/15/2024
                                </span>
                              </div>
                            </div>
                            <div className="right-action-section">
                              <div class="file-actions">
                                <div className="btn-part pdf-view">
                                  <Iconify
                                    icon="wpf:edit"
                                    className="swap-icon"
                                  />
                                </div>
                                <div className="btn-part dollar-view">
                                  <Iconify
                                    icon="mingcute:refund-dollar-line"
                                    className="swap-icon"
                                  />
                                </div>
                                <div className="btn-part delete-icon">
                                  <Iconify
                                    icon="mi:delete"
                                    className="swap-icon"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <div className="header-items">
                        <span>Y-2520</span>
                        <span>19679-75-5</span>
                        <span>1X$20</span>
                        <span>2 x 50MG</span>
                        <span>$ 51.75</span>
                        <span>
                          <div className="status-btn pending-bg">Pending</div>
                        </span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="row">
                        <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                          <div className="key-value-se">
                            <span className="key-sec">Name</span>
                            <span className="value-sec">
                              &nbsp;:&nbsp; 2-amino-3 5-dibromobenzaldehyde
                            </span>
                          </div>
                          <div className="key-value-se">
                            <span className="key-sec">MDL Number </span>
                            <span className="value-sec">
                              &nbsp;:&nbsp; 12002452003584
                            </span>
                          </div>
                          <div className="key-value-se">
                            <span className="key-sec">Shipping Add.</span>
                            <div className="value-right-btn">
                              <span className="value-sec add-value">
                                &nbsp;:&nbsp; 2-amino-3 5-dibromobenzaldehyde
                              </span>
                              <span className="right-btn">
                                <span className="info-btn">
                                  <Iconify
                                    icon="ep:info-filled"
                                    className="swap-icon"
                                  />
                                </span>
                                <span className="info-btn tooltip-div">
                                  <Iconify
                                    icon="icon-park-outline:change"
                                    className="swap-icon"
                                  />
                                  <div className="tooltip-show">
                                    <p>Change Address</p>
                                  </div>
                                  <div className="tooltip-arrow-icon"></div>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                          <div className="accordian-right-full-sec">
                            <div className="left-section">
                              <div className="key-value-se">
                                <span className="key-sec">Priority</span>
                                <span className="value-sec">
                                  &nbsp;:&nbsp;{" "}
                                  <span class="status-btn heigh-bg">High</span>
                                </span>
                              </div>
                              <div className="key-value-se">
                                <span className="key-sec">Req-Date</span>
                                <span className="value-sec">
                                  &nbsp;:&nbsp; 10/28/2024
                                </span>
                              </div>
                              <div className="key-value-se">
                                <span className="key-sec">Promise Date</span>
                                <span className="value-sec">
                                  &nbsp;:&nbsp; 11/15/2024
                                </span>
                              </div>
                            </div>
                            <div className="right-action-section">
                              <div class="file-actions">
                                <div className="btn-part pdf-view">
                                  <Iconify
                                    icon="wpf:edit"
                                    className="swap-icon"
                                  />
                                </div>
                                <div className="btn-part dollar-view">
                                  <Iconify
                                    icon="mingcute:refund-dollar-line"
                                    className="swap-icon"
                                  />
                                </div>
                                <div className="btn-part delete-icon">
                                  <Iconify
                                    icon="mi:delete"
                                    className="swap-icon"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </CardSection>
          </div>
        </div>
        {/* Right Side Section End */}
        <SidebarModel
          modalTitle="PO PDF"
          contentClass="content-50"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}
          showToggle={true}
        >
          Purchase Order PDF
        </SidebarModel>
      </div>
    </div>
  );
};

export default OrderDetails;
