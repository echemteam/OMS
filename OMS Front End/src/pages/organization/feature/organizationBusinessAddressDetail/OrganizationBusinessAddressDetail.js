/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
//** Config's */
import { LabAddressForm } from "./config/LabAddressForm.data";
import Buttons from "../../../../components/ui/button/Buttons";
import { BillToAddressForm } from "./config/BillToAddressForm.data";
import { RemitToAddressForm } from "./config/RemitToAddressForm.data";
import { PhysicalAddressForm } from "./config/PhysicalAddressForm.data";
import { WarehouseAddressForm } from "./config/WarehouseAddressForm.data";
import { RegisteredAddressForm } from "./config/RegisteredAddressForm.data";
//** Lib's */
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
//** Component's */
import DynamicAddressForm from "../../../../common/features/component/ConfigurableAddressForm/DynamicAddressForm";
//** Service's */
import ToastService from "../../../../services/toastService/ToastService";
import { useAddEditBusinessAddressesMutation, useLazyGetOrganizationBusinessAddressesQuery, } from "../../../../app/services/organizationAPI";

const OrganizationBusinessAddressDetail = (isEditablePage) => {

  const labAddressRef = useRef();
  const billToAddressRef = useRef();
  const remitToAddressRef = useRef();
  const physicalAddressRef = useRef();
  const warehouseAddressRef = useRef();
  const registeredAddressRef = useRef();

  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const roles = useSelector((state) => state.auth.roles.roleName);

  useEffect(() => {
    const setFormSettingsForAll = (isViewOnly) => {
      PhysicalAddressForm.formSetting.isViewOnly = isViewOnly;
      BillToAddressForm.formSetting.isViewOnly = isViewOnly;
      LabAddressForm.formSetting.isViewOnly = isViewOnly;
      WarehouseAddressForm.formSetting.isViewOnly = isViewOnly;
      RemitToAddressForm.formSetting.isViewOnly = isViewOnly;
      RegisteredAddressForm.formSetting.isViewOnly = isViewOnly;
    };

    if (isEditablePage) {
      if (roles?.includes("Admin")) {
        setIsButtonDisable(false);
        setFormSettingsForAll(false);
      } else {
        setIsButtonDisable(true);
        setFormSettingsForAll(true);
      }
    }
  }, [isEditablePage, roles]);

  const [addressIds, setAddressIds] = useState({
    registeredAddressId: 0,
    organizationBusinessAddressId: 0,
    physicalAddressId: 0,
    billToAddressId: 0,
    labAddressId: 0,
    remitToAddressId: 0,
    warehouseAddressId: 0,
  });

  const [
    addEditBusinessAddresses,
    {
      isLoading: isAddEditBusinessAddressLoading,
      isSuccess: isAddEditBusinessAddressSuccess,
      data: isAddEditBusinessAddressData,
    },
  ] = useAddEditBusinessAddressesMutation();

  const [
    getOrganizationBusinessAddresses,
    {
      isFetching: isGetOrganizationBusinessAddressesFetching,
      isSuccess: isGetOrganizationBusinessAddressesSuccess,
      data: isGetOrganizationBusinessAddressesData,
    },
  ] = useLazyGetOrganizationBusinessAddressesQuery();

  useEffect(() => {
    getOrganizationBusinessAddresses();
  }, []);

  useEffect(() => {
    if (
      !isGetOrganizationBusinessAddressesFetching &&
      isGetOrganizationBusinessAddressesSuccess &&
      isGetOrganizationBusinessAddressesData
    ) {
      if (isGetOrganizationBusinessAddressesData) {
        setAddressIds({
          organizationBusinessAddressId:
            isGetOrganizationBusinessAddressesData.organizationBusinessAddressId,
          physicalAddressId:
            isGetOrganizationBusinessAddressesData.physicalAddressId,
          billToAddressId:
            isGetOrganizationBusinessAddressesData.billToAddressId,
          labAddressId: isGetOrganizationBusinessAddressesData.labAddressId,
          warehouseAddressId:
            isGetOrganizationBusinessAddressesData.warehouseAddressId,
          remitToAddressId:
            isGetOrganizationBusinessAddressesData.remitToAddressId,
          registeredAddressId:
            isGetOrganizationBusinessAddressesData.registeredAddressId,
        });
      }
    }
  }, [
    isGetOrganizationBusinessAddressesFetching,
    isGetOrganizationBusinessAddressesSuccess,
    isGetOrganizationBusinessAddressesData,
  ]);

  useEffect(() => {
    if (isAddEditBusinessAddressSuccess && isAddEditBusinessAddressData) {
      ToastService.success(isAddEditBusinessAddressData.errorMessage);
      getOrganizationBusinessAddresses();
    }
  }, [isAddEditBusinessAddressSuccess, isAddEditBusinessAddressData]);

  const handleAddEditBusinessAddress = () => {
    let registeredAddressFormData = registeredAddressRef.current.getFormData();
    let physicalAddressFormData = physicalAddressRef.current.getFormData();
    let billToAddressFormData = billToAddressRef.current.getFormData();
    let labAddressFormData = labAddressRef.current.getFormData();
    let warehouseAddressFormData = warehouseAddressRef.current.getFormData();
    let remitToAddressFormData = remitToAddressRef.current.getFormData();

    if (physicalAddressFormData && billToAddressFormData && remitToAddressFormData && labAddressFormData
      && warehouseAddressFormData && registeredAddressFormData) {
      const extractId = (item, key) => item[key] && typeof item[key] === "object" ? item[key].value : item[key];
      let requestData = {
        physicalAddress: {
          addressId: physicalAddressFormData.addressId ?? 0,
          addressLine1: physicalAddressFormData.addressLine1Id,
          addressLine2: physicalAddressFormData.addressLine2Id,
          cityId: extractId(physicalAddressFormData, "cityId"),
          stateId: extractId(physicalAddressFormData, "stateId"),
          countryId: extractId(physicalAddressFormData, "countryId"),
          zipCode: physicalAddressFormData.zipCode,
        },
        billToAddress: {
          addressId: billToAddressFormData.addressId ?? 0,
          addressLine1: billToAddressFormData.addressLine1Id,
          addressLine2: billToAddressFormData.addressLine2Id,
          cityId: extractId(billToAddressFormData, "cityId"),
          stateId: extractId(billToAddressFormData, "stateId"),
          countryId: extractId(billToAddressFormData, "countryId"),
          zipCode: billToAddressFormData.zipCode,
        },
        labAddress: {
          addressId: labAddressFormData.addressId ?? 0,
          addressLine1: labAddressFormData.addressLine1Id,
          addressLine2: labAddressFormData.addressLine2Id,
          cityId: extractId(labAddressFormData, "cityId"),
          stateId: extractId(labAddressFormData, "stateId"),
          countryId: extractId(labAddressFormData, "countryId"),
          zipCode: labAddressFormData.zipCode,
        },
        warehouseAddress: {
          addressId: warehouseAddressFormData.addressId ?? 0,
          addressLine1: warehouseAddressFormData.addressLine1Id,
          addressLine2: warehouseAddressFormData.addressLine2Id,
          cityId: extractId(warehouseAddressFormData, "cityId"),
          stateId: extractId(warehouseAddressFormData, "stateId"),
          countryId: extractId(warehouseAddressFormData, "countryId"),
          zipCode: warehouseAddressFormData.zipCode,
        },
        registeredAddress: {
          addressId: registeredAddressFormData.addressId ?? 0,
          addressLine1: registeredAddressFormData.addressLine1Id,
          addressLine2: registeredAddressFormData.addressLine2Id,
          cityId: extractId(registeredAddressFormData, "cityId"),
          stateId: extractId(registeredAddressFormData, "stateId"),
          countryId: extractId(registeredAddressFormData, "countryId"),
          zipCode: registeredAddressFormData.zipCode,
        },
        remitToAddress: {
          addressId: remitToAddressFormData.addressId ?? 0,
          addressLine1: remitToAddressFormData.addressLine1Id,
          addressLine2: remitToAddressFormData.addressLine2Id,
          cityId: extractId(remitToAddressFormData, "cityId"),
          stateId: extractId(remitToAddressFormData, "stateId"),
          countryId: extractId(remitToAddressFormData, "countryId"),
          zipCode: remitToAddressFormData.zipCode,
        },
        registeredAddressId: addressIds.registeredAddressId,
        organizationBusinessAddressId: addressIds.organizationBusinessAddressId,
        physicalAddressId: addressIds.physicalAddressId,
        billToAddressId: addressIds.billToAddressId,
        labAddressId: addressIds.labAddressId,
        remitToAddressId: addressIds.remitToAddressId,
        warehouseAddressId: addressIds.warehouseAddressId,
      };
      addEditBusinessAddresses(requestData);
    }
  };

  if (isGetOrganizationBusinessAddressesFetching) {
    return (
      <div>
        <DataLoader />
      </div>
    ); // Replace with a proper loading spinner or component
  }

  return (
    <div>
      {/* <h4 className="organization-tab-title">Business Address</h4> */}
      <DynamicAddressForm
        cardTitle="Registered Address"
        ref={registeredAddressRef}
        isGetAddressDetailsSuccess={isGetOrganizationBusinessAddressesSuccess}
        isGetAddressDetails={isGetOrganizationBusinessAddressesData?.registeredAddress}
        formConfig={RegisteredAddressForm}
      />
      <DynamicAddressForm
        cardTitle="Physical Address"
        ref={physicalAddressRef}
        isGetAddressDetailsSuccess={isGetOrganizationBusinessAddressesSuccess}
        isGetAddressDetails={isGetOrganizationBusinessAddressesData?.physicalAddress}
        formConfig={PhysicalAddressForm}
      />
      <DynamicAddressForm
        cardTitle="BillTo Address"
        ref={billToAddressRef}
        isGetAddressDetailsSuccess={isGetOrganizationBusinessAddressesSuccess}
        isGetAddressDetails={isGetOrganizationBusinessAddressesData?.billToAddress}
        formConfig={BillToAddressForm}
      />
      <DynamicAddressForm
        cardTitle="Lab Address"
        ref={labAddressRef}
        isGetAddressDetailsSuccess={isGetOrganizationBusinessAddressesSuccess}
        isGetAddressDetails={isGetOrganizationBusinessAddressesData?.labAddress}
        formConfig={LabAddressForm}
      />
      <DynamicAddressForm
        cardTitle="Warehouse Address"
        ref={warehouseAddressRef}
        isGetAddressDetailsSuccess={isGetOrganizationBusinessAddressesSuccess}
        isGetAddressDetails={isGetOrganizationBusinessAddressesData?.warehouseAddress}
        formConfig={WarehouseAddressForm}
      />
      <DynamicAddressForm
        cardTitle="RemitTo Address"
        ref={remitToAddressRef}
        isGetAddressDetailsSuccess={isGetOrganizationBusinessAddressesSuccess}
        isGetAddressDetails={isGetOrganizationBusinessAddressesData?.remitToAddress}
        formConfig={RemitToAddressForm}
      />

      {isEditablePage ?
        <div className="col-md-12">
          <div className="d-flex align-item-end justify-content-end">
            <Buttons
              buttonTypeClassName="theme-button mr-2"
              buttonText="Save"
              isLoading={isAddEditBusinessAddressLoading}
              onClick={handleAddEditBusinessAddress}
              isDisable={isButtonDisable}
            />
          </div>
        </div>
        : null}
    </div>
  );
};
OrganizationBusinessAddressDetail.propTypes = {
  registeredAddressData: PropTypes.object,
  RegisteredAddressForm: PropTypes.object,
  registeredAddressRef: PropTypes.object,
  physicalAddressData: PropTypes.object,
  PhysicalAddressForm: PropTypes.object,
  physicalAddressRef: PropTypes.object,
  billToAddressData: PropTypes.object,
  BillToAddressForm: PropTypes.object,
  billToAddressRef: PropTypes.object,
  labAddressData: PropTypes.object,
  LabAddressForm: PropTypes.object,
  labAddressRef: PropTypes.object,
  warehouseAddressData: PropTypes.object,
  WarehouseAddressForm: PropTypes.object,
  warehouseAddressRef: PropTypes.object,
  remitToAddressData: PropTypes.object,
  remitToAddressRef: PropTypes.object,
  isAddEditBusinessAddressLoading: PropTypes.bool,
  handleAddEditBusinessAddress: PropTypes.func,
  addEditBusinessAddresses: PropTypes.func,
  addressIds: PropTypes.object,
};

export default OrganizationBusinessAddressDetail;
