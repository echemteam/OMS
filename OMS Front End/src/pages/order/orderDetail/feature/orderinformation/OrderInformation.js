import React, { useEffect, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import { AppIcons } from "../../../../../data/appIcons";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import OrderInfoAddressModel from "./feature/OrderInfoAddressModel";
import UserCardDetail from "./feature/UserCardDetail";
import UsercardModel from "./feature/UsercardModel";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import { useAddAddressMutation, useLazyGetCustomerAddresssByAddressIdQuery, useUpdateAddAddressMutation } from "../../../../../app/services/addressAPI";
import AddEditAddress from "../../../../../common/features/component/Address/feature/AddEditAddress";

const OrderInformation = ({ orderDetails }) => {
  const [orderInfo, setOrderInfo] = useState(null);
  const [orderAddressDetails, setOrderAddressDetails] = useState(null);
  const [orderContactDetails, setOrderContactDetails] = useState(null);
  const [selectedAddressId,setSelectedAddressId]=useState(null);
  const [editMode,setEditMode]=useState(false);
  const [customerId,setCustomerId]=useState(null);
  const [addressContactType,setAddressContactType]=useState("");
  const [isModelOpenShippingAddress, setIsModelOpenShippingAddress] =
    useState(false);
  const [isModelOpenUpdateAddress, setIsModelOpenUpdateAddress] =
    useState(false);
  const [isModelOpenModelUserModel, setIsModelOpenUserModel] = useState(false);
  
  const onSidebarCloseShippingAddress = () => {
    setIsModelOpenShippingAddress(false);
    setAddressContactType("");
  };

  const handleToggleModalShippingAddress = (type) => {
   
    setIsModelOpenShippingAddress(true);
    setAddressContactType(type);
    
  };

  const onSidebarCloseUpdateAddress = () => {
    setIsModelOpenUpdateAddress(false);
    setEditMode(false);
    setIsModelOpenShippingAddress(true);
  };

  const handleUpdateAddress = () => {

    setIsModelOpenShippingAddress(false);
    setEditMode(true);
    setIsModelOpenUpdateAddress(true);
  };
const handleAddClick=()=>{
  setIsModelOpenShippingAddress(false);
  setEditMode(false);
    setIsModelOpenUpdateAddress(true);
   
}
  const onSidebarCloseUserModel = () => {
    setIsModelOpenUserModel(false);
  };
  const handleToggleModalUserModel = () => {
    setIsModelOpenUserModel(true);
  };
  useEffect(() => {
    if (orderDetails) {
      setOrderInfo(orderDetails);
      setCustomerId(orderDetails.customerId)

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

  const onGetData = (id) => {
    setSelectedAddressId(id);
 
  };

  return (
    <div>
      <CardSection cardTitle="Order Information">
        {orderDetails ? (
          <div className="order-info-list">
            <div className="row">
              <div className="col-xxl-12 col-lg-12 col-md-12 col-12">
                <div className="order-title">
                  <span>Order Method &nbsp;:&nbsp;</span>
                  <span className="desc">{orderInfo?.orderMethod}</span>
                </div>
              </div>
            </div>
            {/* Address Details */}
            <div className="row mt-2">
              {orderAddressDetails?.map((address) => (
                <div
                  className="col-xxl-6 col-lg-6 col-md-6 col-12"
                  key={address.type}
                >
                  <div className="order-title">
                    <span>{address.type} Address &nbsp;:&nbsp;</span>
                  </div>
                  <div className="address-card">
                    <div className="title-swap-btn">
                      <span>{address.addressLine1}</span>
                      <span
                        className="swap-btn tooltip-div"
                        onClick={() =>
                          handleToggleModalShippingAddress(address.type)}
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
                <div className="col-xxl-6 col-lg-6 col-md-6 col-12" key={index}>
                  <div className="order-title">
                    <span>{contact?.contactType} &nbsp;:&nbsp;</span>
                  </div>
                  {/* 
                <UserCardDetail
                  contact={contact}
                  index={index}
                  handleToggleModalUsers={handleToggleModalShippingAddress}
                /> */}
                  <UserCardDetail
                    contact={contact}
                    index={index}
                    handleToggleModalUsers={handleToggleModalUserModel}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <DataLoader />
        )}
      </CardSection>
      <SidebarModel
        modalTitle={`Change ${addressContactType} Address`}
        contentClass="content-50"
        onClose={onSidebarCloseShippingAddress}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpenShippingAddress}
      >
        <OrderInfoAddressModel onSidebarCloseUpdateAddress={onSidebarCloseUpdateAddress} onUpdate={handleUpdateAddress} handleAddClick={handleAddClick} onGetData={onGetData}orderDetails={orderDetails}  addressContactType={addressContactType} customerId={customerId}/>
      </SidebarModel>
    {isModelOpenUpdateAddress ?(
      <SidebarModel
        modalTitle={`${editMode ? "Update" : "Add"} Address`}
        contentClass="content-50"
        onClose={onSidebarCloseUpdateAddress}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpenUpdateAddress}
      >
          <AddEditAddress
          editMode={editMode}
          selectedAddressId={selectedAddressId}
          isModelOpenUpdateAddress={isModelOpenUpdateAddress}
          keyId={customerId}
          updateAddress={useUpdateAddAddressMutation}
          addAddress={useAddAddressMutation}
          getAddresssById={useLazyGetCustomerAddresssByAddressIdQuery}
          onSidebarClose={onSidebarCloseUpdateAddress}
        />
      </SidebarModel>)
      :null
}
      <SidebarModel
        modalTitle="Update Users"
        contentClass="content-50"
        onClose={onSidebarCloseUserModel}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpenModelUserModel}
      >
        <UsercardModel />
      </SidebarModel>
    </div>
  );
};

export default OrderInformation;
