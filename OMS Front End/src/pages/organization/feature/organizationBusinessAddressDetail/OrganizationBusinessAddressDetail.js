/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { PhysicalAddressForm } from "./config/PhysicalAddressForm.data";
import PhysicalAddressDetail from "./features/PhysicalAddressDetail";
import { BillToAddressForm } from "./config/BillToAddressForm.data";
import BillToAddressDetail from "./features/BillToAddressDetail";
import { LabAddressForm } from "./config/LabAddressForm.data";
import LabAddressDetail from "./features/LabAddressDetail";
import { WarehouseAddressForm } from "./config/WarehouseAddressForm.data";
import WarehouseAddressDetail from "./features/WarehouseAddressDetail";
import { RegisteredAddressForm } from "./config/RegisteredAddressForm.data";
import RegisteredAddressDetail from "./features/RegisteredAddressDetail";
import Buttons from "../../../../components/ui/button/Buttons";
import { useAddEditBusinessAddressesMutation, useLazyGetOrganizationBusinessAddressesQuery, } from "../../../../app/services/organizationAPI";
import ToastService from "../../../../services/toastService/ToastService";
import { RemitToAddressForm } from "./config/RemitToAddressForm.data";
import RemitToAddressDetail from "./features/RemitToAddressDetail";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import { useSelector } from "react-redux";

const OrganizationBusinessAddressDetail = (isEditablePage) => {
  const physicalAddressRef = useRef();
  const billToAddressRef = useRef();
  const labAddressRef = useRef();
  const warehouseAddressRef = useRef();
  const remitToAddressRef = useRef();
  const registeredAddressRef = useRef();

  const [physicalAddressData] = useState(PhysicalAddressForm);
  const [billToAddressData] = useState(BillToAddressForm);
  const [labAddressData] = useState(LabAddressForm);
  const [warehouseAddressData] = useState(WarehouseAddressForm);
  const [remitToAddressData] = useState(RemitToAddressForm);
  const [registeredAddressData] = useState(RegisteredAddressForm);
  const roles = useSelector((state) => state.auth.roles.roleName);
  const [isButtonDisable, setIsButtonDisable] = useState(false);

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
    let physicalAddressFormData = physicalAddressRef.current.getFormData();
    let billToAddressFormData = billToAddressRef.current.getFormData();
    let labAddressFormData = labAddressRef.current.getFormData();
    let warehouseAddressFormData = warehouseAddressRef.current.getFormData();
    let remitToAddressFormData = remitToAddressRef.current.getFormData();
    let registeredAddressFormData = registeredAddressRef.current.getFormData();

    if (physicalAddressFormData && billToAddressFormData && remitToAddressFormData
      && labAddressFormData && warehouseAddressFormData && registeredAddressFormData) {
      let requestData = {
        physicalAddress: getAddressData(physicalAddressFormData),
        billToAddress: getAddressData(billToAddressFormData),
        labAddress: getAddressData(labAddressFormData),
        warehouseAddress: getAddressData(warehouseAddressFormData),
        registeredAddress: getAddressData(registeredAddressFormData),
        remitToAddress: getAddressData(remitToAddressFormData),

        registeredAddressId: addressIds.registeredAddressId,
        physicalAddressId: addressIds.physicalAddressId,
        billToAddressId: addressIds.billToAddressId,
        labAddressId: addressIds.labAddressId,
        remitToAddressId: addressIds.remitToAddressId,
        organizationBusinessAddressId: addressIds.organizationBusinessAddressId,
        warehouseAddressId: addressIds.warehouseAddressId,
      };
      addEditBusinessAddresses(requestData);
    }
  };

  const getAddressData = (addressFormData) => {
    const extractId = (item, key) => item[key] && typeof item[key] === "object" ? item[key].value : item[key];
    return (addressFormData?.addressId || addressFormData?.addressLine1Id || addressFormData?.addressLine2Id || addressFormData?.cityId ||
      addressFormData?.stateId || addressFormData?.countryId || addressFormData?.zipCode) ?
      {
        addressId: addressFormData?.addressId ?? 0,
        addressLine1: addressFormData?.addressLine1Id || null,
        addressLine2: addressFormData?.addressLine2Id || null,
        cityId: extractId(addressFormData, "cityId") || null,
        stateId: extractId(addressFormData, "stateId") || null,
        countryId: extractId(addressFormData, "countryId") || null,
        zipCode: addressFormData?.zipCode || null,
      }
      : null;
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
      <RegisteredAddressDetail
        isGetOrganizationBusinessAddressesData={isGetOrganizationBusinessAddressesData}
        isGetOrganizationBusinessAddressesSuccess={isGetOrganizationBusinessAddressesSuccess}
        registeredAddressData={registeredAddressData}
        RegisteredAddressForm={RegisteredAddressForm}
        registeredAddressRef={registeredAddressRef}
      />

      <PhysicalAddressDetail
        isGetOrganizationBusinessAddressesData={isGetOrganizationBusinessAddressesData}
        isGetOrganizationBusinessAddressesSuccess={isGetOrganizationBusinessAddressesSuccess}
        physicalAddressData={physicalAddressData}
        PhysicalAddressForm={PhysicalAddressForm}
        physicalAddressRef={physicalAddressRef}
      />

      <BillToAddressDetail
        isGetOrganizationBusinessAddressesData={isGetOrganizationBusinessAddressesData}
        isGetOrganizationBusinessAddressesSuccess={isGetOrganizationBusinessAddressesSuccess}
        billToAddressData={billToAddressData}
        BillToAddressForm={BillToAddressForm}
        billToAddressRef={billToAddressRef}
      />

      <LabAddressDetail
        isGetOrganizationBusinessAddressesData={isGetOrganizationBusinessAddressesData}
        isGetOrganizationBusinessAddressesSuccess={isGetOrganizationBusinessAddressesSuccess}
        labAddressRef={labAddressRef}
        LabAddressForm={LabAddressForm}
        labAddressData={labAddressData}
      />

      <WarehouseAddressDetail
        isGetOrganizationBusinessAddressesData={isGetOrganizationBusinessAddressesData}
        isGetOrganizationBusinessAddressesSuccess={isGetOrganizationBusinessAddressesSuccess}
        warehouseAddressRef={warehouseAddressRef}
        WarehouseAddressForm={WarehouseAddressForm}
        warehouseAddressData={warehouseAddressData}
      />

      <RemitToAddressDetail
        isGetOrganizationBusinessAddressesData={isGetOrganizationBusinessAddressesData}
        isGetOrganizationBusinessAddressesSuccess={isGetOrganizationBusinessAddressesSuccess}
        remitToAddressData={remitToAddressData}
        remitToAddressRef={remitToAddressRef}
        RemitToAddressForm={RemitToAddressForm}
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
