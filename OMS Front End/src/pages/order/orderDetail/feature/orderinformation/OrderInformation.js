import React, { useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import { AppIcons } from "../../../../../data/appIcons";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import OrderInfoAddressModel from "./feature/OrderInfoAddressModel";

const OrderInformation = () => {
  const [isModelOpenShippingAddress, setIsModelOpenShippingAddress] =
    useState(false);

  const onSidebarCloseShippingAddress = () => {
    setIsModelOpenShippingAddress(false);
  };

  const handleToggleModalShippingAddress = () => {
    setIsModelOpenShippingAddress(true);
  };

  return (
    <div>
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
                  <span
                    className="swap-btn tooltip-div"
                    onClick={handleToggleModalShippingAddress}
                  >
                    {" "}
                    {/* When click on this button to all addresses display on sidebar */}
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
                  <span
                    className="swap-btn tooltip-div"
                    onClick={handleToggleModalShippingAddress}
                  >
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
      <SidebarModel
        modalTitle="Change Shipping Address"
        contentClass="content-50"
        onClose={onSidebarCloseShippingAddress}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpenShippingAddress}
      >
        <OrderInfoAddressModel />
      </SidebarModel>
    </div>
  );
};

export default OrderInformation;
