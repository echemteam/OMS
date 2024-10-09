import React, { useEffect, useState, useImperativeHandle, useRef } from "react";
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
import { useAddEditContactMutation, useLazyGetCustomerContactByContactIdQuery } from "../../../../../app/services/contactAPI";
import AddEditContact from "../../../../../common/features/component/Contact/feature/AddEditContact";


const OrderInformation = ({ orderDetails, orderItemShippingAddRef }) => {
  const editRef = useRef();
  const [orderInfo, setOrderInfo] = useState(null);
  const [orderAddressDetails, setOrderAddressDetails] = useState(null);
  const [orderContactDetails, setOrderContactDetails] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [contactTypeId, setContactTypeId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [addressContactType, setAddressContactType] = useState("");
  const [isModelOpenShippingAddress, setIsModelOpenShippingAddress] = useState(false);
  const [isModelOpenUpdateAddress, setIsModelOpenUpdateAddress] = useState(false);
  const [isModelOpenModelUserModel, setIsModelOpenUserModel] = useState(false);
  const [isUpdateContact, setIsUpdateContact] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null)
  const [defaultId, setDefaultId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [orderContactId, setOrderContactId] = useState(null)
  const [orderItemId, setOrderItemId] = useState(0);

  const onSidebarCloseShippingAddress = () => {
    setIsModelOpenShippingAddress(false);
    setAddressContactType("");
    setDefaultId("");
    setOrderItemId(0);
  };

  const handleToggleModalShippingAddress = (type, addressId, orderItemId) => {
    setOrderItemId(orderItemId);
    setIsModelOpenShippingAddress(true);
    setAddressContactType(type);
    setDefaultId(addressId);

  };

  useImperativeHandle(orderItemShippingAddRef, () => ({
    handleToggleModalShippingAddress
  }))

  const onSidebarCloseUpdateAddress = () => {
    setIsModelOpenUpdateAddress(false);
    setEditMode(false);
    setIsModelOpenShippingAddress(true);
    setOrderItemId(0);
  };

  const handleUpdateAddress = (selectedAddressId) => {

    setIsModelOpenShippingAddress(false);
    setEditMode(true);
    setIsModelOpenUpdateAddress(true);
    if (editRef.current) {
      editRef.current.callChildEditFunction(selectedAddressId);
    }
  };
  const handleAddClick = () => {
    setIsModelOpenShippingAddress(false);
    setEditMode(false);
    setIsModelOpenUpdateAddress(true);
  };

  const handleAddContact = () => {
    setIsModelOpenUserModel(false);
    setEditMode(false);
    setIsUpdateContact(true);
  }
  const onSidebarCloseUserModel = () => {
    setIsModelOpenUserModel(false);
    setAddressContactType("");
    setDefaultId("");
  };
  const handleToggleModalUserModel = (typrId, type, contactId, orderContactId) => {
    setContactTypeId(typrId);
    setIsModelOpenUserModel(true);
    setAddressContactType(type);
    setDefaultId(contactId);
    setOrderContactId(orderContactId);
  };

  const handleUpdateContact = () => {

    setIsModelOpenUserModel(false);
    setIsUpdateContact(true);
    setIsEdit(true);
    // if (editRef.current) {
    //   editRef.current.callEditFunction(selectedContactId);
    // }
  }

  const onSidebarCloseUpdateContact = () => {
    setIsUpdateContact(false);
    setIsEdit(false);
    setIsModelOpenUserModel(true);
  };

  useEffect(() => {
    if (orderDetails) {
      setOrderInfo(orderDetails);
      setCustomerId(orderDetails.customerId);

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

  const onGetContactId = (id) => {
    setSelectedContactId(id);
  }

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
                          handleToggleModalShippingAddress(address.type, address.addressId)
                        }
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
                    handleToggleModalUsers={() =>
                      handleToggleModalUserModel(contact?.contactTypeId, contact.contactType, contact.contactId, contact.orderContactId)}
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
        <OrderInfoAddressModel
          onSidebarCloseUpdateAddress={onSidebarCloseUpdateAddress}
          onUpdate={handleUpdateAddress}
          handleAddClick={handleAddClick}
          onSidebarCloseShippingAddress={onSidebarCloseShippingAddress}
          onGetData={onGetData}
          orderDetails={orderDetails}
          addressContactType={addressContactType}
          customerId={customerId}
          defaultId={defaultId}
          orderItemId={orderItemId}
        />
      </SidebarModel>
      {isModelOpenUpdateAddress ? (
        <SidebarModel
          modalTitle={`${editMode ? "Update" : "Add"} Address`}
          contentClass="content-50"
          onClose={onSidebarCloseUpdateAddress}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpenUpdateAddress}
        >
          <AddEditAddress
            editMode={editMode}
            editRef={editRef}
            selectedAddressId={selectedAddressId}
            isModelOpenUpdateAddress={isModelOpenUpdateAddress}
            keyId={customerId}
            updateAddress={useUpdateAddAddressMutation}
            addAddress={useAddAddressMutation}
            getAddresssById={useLazyGetCustomerAddresssByAddressIdQuery}
            onSidebarClose={onSidebarCloseUpdateAddress}
          />
        </SidebarModel>
      ) : null}
      {isModelOpenModelUserModel ?
        <SidebarModel
          modalTitle="Update Users"
          contentClass="content-50"
          onClose={onSidebarCloseUserModel}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpenModelUserModel}
        >
          <UsercardModel
            orderContactId={orderContactId}
            onGetContactId={onGetContactId}
            onUpdate={handleUpdateContact}
            orderDetails={orderDetails}
            contactTypeId={contactTypeId}
            handleAddContact={handleAddContact}
            selectedContactId={selectedContactId}
            addressContactType={addressContactType}
            setSelectedContactId={setSelectedContactId}
            onSidebarCloseUserModel={onSidebarCloseUserModel}
            customerId={customerId}
            defaultId={defaultId} />
        </SidebarModel>
        : null
      }
      {isUpdateContact ?
        <SidebarModel
          modalTitle="Add/Edit Contact"
          contentClass="content-40"
          onClose={onSidebarCloseUpdateContact}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isUpdateContact}
        >
          <AddEditContact
            editRef={editRef}
            addEditContactMutation={useAddEditContactMutation}
            customerId={customerId}
            getContactById={useLazyGetCustomerContactByContactIdQuery}
            isUpdateContact={isUpdateContact}
            selectedContactId={selectedContactId}
            isEdit={isEdit}
            onSidebarClose={onSidebarCloseUpdateContact}

          />
        </SidebarModel>
        : null}
    </div>
  );
};

export default OrderInformation;
