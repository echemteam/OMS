import React, { useEffect, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import { AppIcons } from "../../../../../data/appIcons";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import OrderInfoAddressModel from "./feature/OrderInfoAddressModel";

const OrderInformation = ({ orderDetails }) => {

  const [orderInfo, setOrderInfo] = useState(null);
  const [orderAddressDetails, setOrderAddressDetails] = useState(null);

  const [isModelOpenShippingAddress, setIsModelOpenShippingAddress] = useState(false);

  const onSidebarCloseShippingAddress = () => {
    setIsModelOpenShippingAddress(false);
  };

  const handleToggleModalShippingAddress = () => {
    setIsModelOpenShippingAddress(true);
  };

  useEffect(() => {
    if (orderDetails) {
      setOrderInfo(orderDetails);

      if (orderDetails.orderAddressInformation) {
        const { billingAddress, shippingAddress } = orderDetails.orderAddressInformation;

        const addressArray = [billingAddress, shippingAddress];

        setOrderAddressDetails(addressArray);
      }
    }
  }, [orderDetails]);

  return (
    <div>
      <CardSection cardTitle="Order Information">
        <div className="order-info-list">
          <div className="row">
            <div className="col-xxl-12 col-lg-12 col-md-12 col-12">
              <div className="order-title">
                <span>Order Method &nbsp;:&nbsp;</span>
                {/* <span className="desc">Mail</span> */}
                <span className="desc">{orderInfo?.orderMethod}</span>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            {orderAddressDetails?.map((address) => (
              <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                <div className="order-title">
                  <span>{address.type} Address &nbsp;:&nbsp;</span>
                </div>
                <div className="address-card">
                  <div className="title-swap-btn">
                    <span>{address.addressLine1}</span>
                    <span
                      className="swap-btn tooltip-div"
                      onClick={handleToggleModalShippingAddress}
                    >
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
                    <span>{address?.addressLine2}</span>
                    <span>{address?.cityName}, {address.stateCode ? address.stateCode : address.stateName}{" "} {address?.zipCode}</span>
                    <span>{address?.countryName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div div className="row mt-2" >
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
