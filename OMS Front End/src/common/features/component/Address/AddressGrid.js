/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
//** Lib's */
import { AppIcons } from "../../../../data/appIcons";
import CardSection from "../../../../components/ui/card/CardSection";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { addressFormData } from "./config/AddressForm.data";
import RenderTabs from "../../../../components/ui/tabs/RenderTabs";
import { useLazyGetAllAddressTypesQuery } from "../../../../app/services/addressAPI";
import { modifyAddressType } from "../../../../utils/TransformData/TransformAPIData";
import PropTypes from 'prop-types';
//** Compoent's */
const AddEditAddress = React.lazy(() => import("./feature/AddEditAddress"));
const AddressDetailCard = React.lazy(() =>
  import("./feature/AddressDetailCard")
);

const AddressGrid = ({
  keyId,
  isSupplier,
  isEditablePage,
  SecurityKey,
  getAddresssByCustomerId,
  updateAddress,
  addAddress,
  getAddresssById,
  deleteAddress,
  customerStatusId
}) => {
  //** States */
  const editRef = useRef();
  const getByIdRef = useRef();
  const { formSetting } = addressFormData;
  const [editMode, setEditMode] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [tabAddressType, setTabAddressType] = useState([]);

  const [
    getAllAddressTypes,
    { isSuccess: isGetAllAddressTypesSucess, data: allGetAllAddressTypesData },
  ] = useLazyGetAllAddressTypesQuery();


  //** Use Effect */
  useEffect(() => {
    if (isEditablePage) {
      if (SecurityKey) {
        const hasAddPermission = hasFunctionalPermission(SecurityKey.ADD);
        const hasEditPermission = hasFunctionalPermission(SecurityKey.EDIT);
        if (hasAddPermission) {
          if (hasAddPermission.hasAccess === true) {
            setButtonVisible(true);
          } else {
            setButtonVisible(false);
          }
        }
        if (hasEditPermission && formSetting) {
          if (editMode) {
            if (hasEditPermission.isViewOnly === true) {
              formSetting.isViewOnly = true;
              setIsButtonDisable(true);
            } else {
              formSetting.isViewOnly = false;
              setIsButtonDisable(false);
            }
          } else if (!editMode) {
            if (hasAddPermission.hasAccess === true) {
              formSetting.isViewOnly = false;
              setIsButtonDisable(false);
            }
            if (hasEditPermission && hasEditPermission.isViewOnly === true) {
              setShowEditIcon(true);
            } else if (hasEditPermission.isEditable === true) {
              setShowEditIcon(true);
            } else {
              setShowEditIcon(false);
            }
          }
        }
      }
    }
  }, [isEditablePage, isSupplier, SecurityKey, editMode]);

  useEffect(() => {
    getAllAddressTypes();
  }, [keyId]);

  useEffect(() => {
    if (isGetAllAddressTypesSucess && allGetAllAddressTypesData) {
      setTabAddressType(modifyAddressType(allGetAllAddressTypesData));
    }
  }, [isGetAllAddressTypesSucess, allGetAllAddressTypesData]);

  //** Handle Changes */
  const handleToggleModal = () => {
    setEditMode(false);
    setIsModelOpen(true);
  };
  const handleEditAddress = (data) => {
    setIsModelOpen(true);
    setEditMode(true);
    if (editRef.current) {
      editRef.current.callChildEditFunction(data?.addressId);
    }
  };
  const onSidebarClose = () => {
    setIsModelOpen(false);
    setEditMode(false);
    if (getByIdRef.current) {
      getByIdRef.current.callChildFunction();
    }
  };

  const components = [
    (addressTypeId) => (
      <div className="mt-2">
        <AddressDetailCard
          keyId={keyId}
          getAddresssByCustomerId={getAddresssByCustomerId}
          onHandleEditAddress={handleEditAddress}
          showEditIcon={showEditIcon}
          getByIdRef={getByIdRef}
          selectedAddressTypeId={addressTypeId}
          deleteAddress={deleteAddress}
          customerStatusId={customerStatusId}
          isModelOpen={isModelOpen}
          isSupplier={isSupplier}
        />
      </div>
    ),

    (addressTypeId) => (
      <div className="mt-2">
        <AddressDetailCard
          keyId={keyId}
          getAddresssByCustomerId={getAddresssByCustomerId}
          onHandleEditAddress={handleEditAddress}
          showEditIcon={showEditIcon}
          getByIdRef={getByIdRef}
          selectedAddressTypeId={addressTypeId}
          deleteAddress={deleteAddress}
          customerStatusId={customerStatusId}
          isModelOpen={isModelOpen}
          isSupplier={isSupplier}
        />
      </div>
    ),

    (addressTypeId) => (
      <div className="mt-2">
        <AddressDetailCard
          keyId={keyId}
          getAddresssByCustomerId={getAddresssByCustomerId}
          onHandleEditAddress={handleEditAddress}
          showEditIcon={showEditIcon}
          getByIdRef={getByIdRef}
          selectedAddressTypeId={addressTypeId}
          deleteAddress={deleteAddress}
          customerStatusId={customerStatusId}
          isModelOpen={isModelOpen}
          isSupplier={isSupplier}
        />
      </div>
    ),

    (addressTypeId) => (
      <div className="mt-2">
        <AddressDetailCard
          keyId={keyId}
          getAddresssByCustomerId={getAddresssByCustomerId}
          onHandleEditAddress={handleEditAddress}
          showEditIcon={showEditIcon}
          getByIdRef={getByIdRef}
          selectedAddressTypeId={addressTypeId}
          deleteAddress={deleteAddress}
          customerStatusId={customerStatusId}
          isModelOpen={isModelOpen}
          isSupplier={isSupplier}
        />
      </div>
    ),

    (addressTypeId) => (
      <div className="mt-2">
        <AddressDetailCard
          keyId={keyId}
          getAddresssByCustomerId={getAddresssByCustomerId}
          onHandleEditAddress={handleEditAddress}
          showEditIcon={showEditIcon}
          getByIdRef={getByIdRef}
          selectedAddressTypeId={addressTypeId}
          deleteAddress={deleteAddress}
          customerStatusId={customerStatusId}
          isModelOpen={isModelOpen}
          isSupplier={isSupplier}
        />
      </div>
    ),
  ];


  const filteredTabs = tabAddressType?.filter(item => isSupplier ? item.isForSuppliers : item.isForCustomers);

  const tabs = filteredTabs?.map((data, index) => {
    const component = components[index] ? components[index]([data.addressTypeId]) : <div className="mt-2">Default Tab</div>;
    return {
      sMenuItemCaption: data.type,
      component
    };
  });

  return (
    //<React.Fragment>
    <div className="address-main-card-sec vertical-tab-card">
      <CardSection
        cardTitle="Address"
        buttonClassName="theme-button"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={buttonVisible ? true : false}

        buttonText="Add"
        titleButtonClick={handleToggleModal}
      >
        <div className="vertical-tab-inner">
          <RenderTabs tabs={tabs} isCollapse={true} />
        </div>
      </CardSection>
      <div className="address-model">
        <SidebarModel
          modalTitle={editMode ? "Update Address" : "Add Address"}
          contentClass="content-35"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}
        >
          <AddEditAddress
            isOrderManage={false}
            isEditablePage={isEditablePage}
            editRef={editRef}
            isSupplier={isSupplier}
            isModelOpen={isModelOpen}
            editMode={editMode}
            keyId={keyId}
            isButtonDisable={isButtonDisable}
            updateAddress={updateAddress}
            addAddress={addAddress}
            getAddresssById={getAddresssById}
            onSidebarClose={onSidebarClose}
            getAddressTypeIdOrder={null}
            orderCustomerId={null}
            customerStatusId={customerStatusId}
          />
        </SidebarModel>
      </div>
    </div>
    //</React.Fragment>
  );
};

AddressGrid.propTypes = {
  keyId: PropTypes.number.isRequired,
  isSupplier: PropTypes.bool.isRequired,
  isEditablePage: PropTypes.bool.isRequired,
  SecurityKey: PropTypes.shape({
    ADD: PropTypes.string,
    EDIT: PropTypes.string,
  }),
  getAddresssByCustomerId: PropTypes.func.isRequired,
  updateAddress: PropTypes.func.isRequired,
  addAddress: PropTypes.func.isRequired,
  deleteAddress: PropTypes.func.isRequired,
  getAddresssById: PropTypes.func.isRequired,
};
export default AddressGrid;
