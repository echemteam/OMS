import React, { useEffect, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import { AppIcons } from "../../../../../data/appIcons";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import OrderInfoAddressModel from "./feature/OrderInfoAddressModel";
import UserDetailsModel from "./feature/UserDetailsModel";
import UserCardDetail from "./feature/UserCardDetail";

const OrderInformation = ({ orderDetails }) => {
  const [orderInfo, setOrderInfo] = useState(null);
  const [orderAddressDetails, setOrderAddressDetails] = useState(null);
  const [orderContactDetails, setOrderContactDetails] = useState(null);

  const [isModelOpenShippingAddress, setIsModelOpenShippingAddress] =
    useState(false);
  const [isModelOpenUsers, setIsModelOpenUsers] = useState(false);

  const onSidebarCloseShippingAddress = () => {
    setIsModelOpenShippingAddress(false);
  };

  const handleToggleModalShippingAddress = () => {
    setIsModelOpenShippingAddress(true);
  };

  const onSidebarCloseUsers = () => {
    setIsModelOpenUsers(false);
  };

  const handleToggleModalUsers = (contact, index) => {
    setIsModelOpenUsers(true);
  };

  useEffect(() => {
    if (orderDetails) {
      setOrderInfo(orderDetails);

      if (orderDetails.orderAddressInformation) {
        const { billingAddress, shippingAddress } =
          orderDetails.orderAddressInformation;
        const addressArray = [billingAddress, shippingAddress];
        setOrderAddressDetails(addressArray);
      }
      if (orderDetails.orderContactList) {
        setOrderContactDetails(orderDetails.orderContactList);
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
          {/* Address Details */}
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
                    <span>
                      {address?.cityName},{" "}
                      {address.stateCode
                        ? address.stateCode
                        : address.stateName}{" "}
                      {address?.zipCode}
                    </span>
                    <span>{address?.countryName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <div className="row mt-2">
            {orderContactDetails?.map((contact, index) => (
              <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                <div className="order-title">
                  <span>{contact?.contactType} &nbsp;:&nbsp;</span>
                </div>

                <UserCardDetail
                  contact={contact}
                  index={index}
                  // handleToggleModalUsers={handleToggleModalUsers}
                  handleToggleModalUsers={handleToggleModalUsers}

                />
              </div>
            ))}
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

      <SidebarModel
        modalTitle="Change Users"
        contentClass="content-50"
        onClose={onSidebarCloseUsers}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpenUsers}
      >
        Contact card
      </SidebarModel>
    </div>
  );
};

export default OrderInformation;
