import React, { useEffect, useRef, useState } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import { addressFormData } from "./features/config/AddressForm.data";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import AddressCard from "./features/AddressCard";
import {
  useAddAddressMutation,
  useLazyGetAddresssByCustomerIdQuery,
  useLazyGetAllAddressTypesQuery,
  useLazyGetAllCitiesQuery,
  useLazyGetAllStatesQuery,
  useUpdateAddAddressMutation,
} from "../../../../app/services/addressAPI";
import { useLazyGetAllCountriesQuery } from "../../../../app/services/basicdetailAPI";
import ToastService from "../../../../services/toastService/ToastService";
import { useContext } from "react";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { securityKey } from "../../../../data/SecurityKey";

const AddressDetail = (props) => {
  const userFormRef = useRef();
  const [isModelOpen, setisModelOpen] = useState(false);
  const [formData, setFormData] = useState(addressFormData);
  // const [selectedState, setSelectedState] = useState(null);
  // const [selectedCity, setSelectedCity] = useState(null);
  const [addressData, setAddressData] = useState();
  const [updateSetData, setUpdateSetData] = useState();
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] =
    useState(false);

  const { customerId } = useContext(BasicDetailContext);

  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  useEffect(() => {
    if (props.isEditablePage) {
      const { formSetting } = addressFormData;
      const hasAddPermission = hasFunctionalPermission(
        securityKey.ADDCUSTOMERADDRESS
      );
      const hasEditPermission = hasFunctionalPermission(
        securityKey.EDITCUSTOMERADDRESS
      );

      if (hasAddPermission) {
        if (hasAddPermission.hasAccess === true) {
          setButtonVisible(true);
        } else {
          setButtonVisible(false);
        }
      }
      if (hasEditPermission && formSetting) {
        if (updateSetData) {
          if (hasEditPermission.isViewOnly === true) {
            formSetting.isViewOnly = true;
            setIsButtonDisable(true);
          } else {
            formSetting.isViewOnly = false;
            setIsButtonDisable(false);
          }
        } else if (!updateSetData) {
          if (hasAddPermission.hasAccess === true) {
            formSetting.isViewOnly = false;
            setIsButtonDisable(false);
          }
        }
      }
    }
  }, [updateSetData, props.isEditablePage]);

  const [
    getAllAddressTypes,
    {
      isFetching: isGetAllAddressTypesFetching,
      isSuccess: isGetAllAddressTypesSucess,
      data: allGetAllAddressTypesData,
    },
  ] = useLazyGetAllAddressTypesQuery();

  const [
    getAllCountries,
    {
      isFetching: isGetAllCountriesFetching,
      isSuccess: isGetAllCountriesSucess,
      data: allGetAllCountriesData,
    },
  ] = useLazyGetAllCountriesQuery();

  const [
    getAllStates,
    {
      isFetching: isGetAllStatesFetching,
      isSuccess: isGetAllStatesSucess,
      data: allGetAllStatesData,
    },
  ] = useLazyGetAllStatesQuery();

  const [
    getAllCities,
    {
      isFetching: isGetAllCitiesFetching,
      isSuccess: isGetAllCitiesSucess,
      data: allGetAllCitiesData,
    },
  ] = useLazyGetAllCitiesQuery();

  const [
    addAddress,
    {
      isLoading: isAddAddressLoading,
      isSuccess: isAddAddressSuccess,
      data: isAddAddressData,
    },
  ] = useAddAddressMutation();

  const [
    updateAddAddress,
    {
      isLoading: isUpdateAddAddressLoading,
      isSuccess: isUpdateAddAddressSuccess,
      data: isUpdateAddAddressData,
    },
  ] = useUpdateAddAddressMutation();

  const [
    getAddresssByCustomerId,
    {
      isFetching: isGetAddresssByCustomerIdFetching,
      isSuccess: isGetAddresssByCustomerId,
      data: GetAddresssByCustomerIdData,
    },
  ] = useLazyGetAddresssByCustomerIdQuery();

  useEffect(() => {
    getAllAddressTypes();
    getAllCountries();
    getAllStates();
    getAllCities();
  }, []);

  useEffect(() => {
    if (customerId > 0) {
      getAddresssByCustomerId(customerId);
    }
  }, [customerId]);

  const manageFilteredForm = () => {
    const manageData = { ...formData };
    const filteredFormFields = addressFormData.formFields.filter(
      (field) =>
        field.dataField !== "isPreferredShipping" &&
        field.dataField !== "isShippingAndBilling" &&
        field.dataField !== "isPreferredBilling"
    );
    manageData.formFields = filteredFormFields;
    setFormData(manageData);
  };

  useEffect(() => {
    if (
      !isGetAddresssByCustomerIdFetching &&
      isGetAddresssByCustomerId &&
      GetAddresssByCustomerIdData
    ) {
      setAddressData(GetAddresssByCustomerIdData);
    }
  }, [
    isGetAddresssByCustomerIdFetching,
    isGetAddresssByCustomerId,
    GetAddresssByCustomerIdData,
  ]);

  useEffect(() => {
    if (
      !isGetAllAddressTypesFetching &&
      isGetAllAddressTypesSucess &&
      allGetAllAddressTypesData
    ) {
      const getData = allGetAllAddressTypesData.map((item) => ({
        value: item.addressTypeId,
        label: item.type,
      }));
      const dropdownField = addressFormData.formFields.find(
        (item) => item.dataField === "addressTypeId"
      );
      dropdownField.fieldSetting.options = getData;
    }
  }, [
    isGetAllAddressTypesFetching,
    isGetAllAddressTypesSucess,
    allGetAllAddressTypesData,
  ]);

  useEffect(() => {
    if (
      !isGetAllCountriesFetching &&
      isGetAllCountriesSucess &&
      allGetAllCountriesData
    ) {
      const getData = allGetAllCountriesData.map((item) => ({
        value: item.countryId,
        label: item.name,
      }));
      const dropdownField = addressFormData.formFields.find(
        (item) => item.dataField === "countryId"
      );
      dropdownField.fieldSetting.options = getData;
    }
  }, [
    isGetAllCountriesFetching,
    isGetAllCountriesSucess,
    allGetAllCountriesData,
  ]);

  useEffect(() => {
    if (
      !isGetAllStatesFetching &&
      isGetAllStatesSucess &&
      allGetAllStatesData
    ) {
      const getData = allGetAllStatesData.map((item) => ({
        value: item.stateId,
        label: item.name,
      }));
      const dropdownField = addressFormData.formFields.find(
        (item) => item.dataField === "stateId"
      );
      dropdownField.fieldSetting.options = getData;
      // setSelectedState(allGetAllStatesData)
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllStatesFetching, isGetAllStatesSucess, allGetAllStatesData]);

  useEffect(() => {
    if (
      !isGetAllCitiesFetching &&
      isGetAllCitiesSucess &&
      allGetAllCitiesData
    ) {
      const getData = allGetAllCitiesData.map((item) => ({
        value: item.cityId,
        label: item.name,
      }));
      const dropdownField = addressFormData.formFields.find(
        (item) => item.dataField === "cityId"
      );
      dropdownField.fieldSetting.options = getData;
      // setSelectedCity(allGetAllCitiesData)
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllCitiesFetching, isGetAllCitiesSucess, allGetAllCitiesData]);

  const handleToggleModal = () => {
    setisModelOpen(true);
    manageFilteredForm();
  };

  const handleSetData = (data) => {
    setUpdateSetData(data);
    let form = { ...formData };
    if (data.countryId) {
      const dataValue = allGetAllStatesData
        ?.filter((item) => item.countryId === data.countryId)
        .map((item) => ({
          value: item.stateId,
          label: item.name,
        }));
      const dropdownFieldIndex = form.formFields.findIndex(
        (item) => item.dataField === "stateId"
      );
      form.formFields[dropdownFieldIndex].fieldSetting.options = dataValue;
    }
    if (data.stateId) {
      const dataValue = allGetAllCitiesData
        ?.filter((item) => item.stateId === data.stateId)
        .map((item) => ({
          value: item.cityId,
          label: item.name,
        }));
      const dropdownFieldIndex = form.formFields.findIndex(
        (item) => item.dataField === "cityId"
      );
      form.formFields[dropdownFieldIndex].fieldSetting.options = dataValue;
    }
    form.initialState = {
      customerId: customerId,
      addressTypeId: data.addressTypeId,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      addressLine3: data.addressLine3,
      addressLine4: data.addressLine4,
      addressLine5: data.addressLine5,
      countryId: data.countryId,
      stateId: data.stateId,
      cityId: data.cityId,
      zipCode: data.zipCode,
      isPreferredShipping: data.isPreferredShipping,
      isPreferredBilling: data.isPreferredBilling,
    };
    const filteredFormFields = addressFormData.formFields.filter(
      (field) => field.dataField !== "isShippingAndBilling"
    );
    form.formFields = filteredFormFields;
    setFormData(form);
  };

  useEffect(() => {
    if (updateSetData) {
      if (updateSetData.type === "Billing") {
        const manageData = { ...formData };
        const filteredFormFields = addressFormData.formFields.filter(
          (field) =>
            field.dataField !== "isShippingAndBilling" &&
            field.dataField !== "isPreferredShipping"
        );
        manageData.formFields = filteredFormFields;
        setFormData(manageData);
      } else if (updateSetData.type === "Shipping") {
        const manageData = { ...formData };
        const filteredFormFields = addressFormData.formFields.filter(
          (field) =>
            field.dataField !== "isShippingAndBilling" &&
            field.dataField !== "isPreferredBilling"
        );
        manageData.formFields = filteredFormFields;
        setFormData(manageData);
      } else if (
        updateSetData.type === "AP" ||
        updateSetData.type === "Primary"
      ) {
        const manageData = { ...formData };
        const filteredFormFields = addressFormData.formFields.filter(
          (field) =>
            field.dataField !== "isShippingAndBilling" &&
            field.dataField !== "isPreferredBilling" &&
            field.dataField !== "isPreferredShipping"
        );
        manageData.formFields = filteredFormFields;
        setFormData(manageData);
      }
    }
  }, [updateSetData]);

  const onSidebarClose = () => {
    setisModelOpen(false);
    onreset();
  };

  const onreset = () => {
    let restData = { ...addressFormData };
    restData.initialState = { ...addressFormData.initialState };
    setFormData(restData);
    setUpdateSetData(null);
  };

  const handleChangeDropdownList = (data, dataField) => {
    const manageData = { ...formData };
    if (dataField === "countryId") {
      const dataValue = allGetAllStatesData
        ?.filter((item) => item.countryId === data.value)
        .map((item) => ({
          value: item.stateId,
          label: item.name,
        }));
      const dropdownFieldIndex = manageData.formFields.findIndex(
        (item) => item.dataField === "stateId"
      );
      manageData.formFields[dropdownFieldIndex].fieldSetting.options =
        dataValue;
      manageData.formFields[dropdownFieldIndex].fieldSetting.isDisabled = false;
      userFormRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
      });
    } else if (dataField === "stateId") {
      const dataValue = allGetAllCitiesData
        ?.filter((item) => item.stateId === data.value)
        .map((item) => ({
          value: item.cityId,
          label: item.name,
        }));
      const dropdownFieldIndex = manageData.formFields.findIndex(
        (item) => item.dataField === "cityId"
      );
      manageData.formFields[dropdownFieldIndex].fieldSetting.options =
        dataValue;
      manageData.formFields[dropdownFieldIndex].fieldSetting.isDisabled = false;
      userFormRef.current.updateFormFieldValue({
        stateId: data.value,
        cityId: null,
      });
    } else if (dataField === "addressTypeId") {
      let filteredFormFields;
      if (data.label === "Billing") {
        if (updateSetData) {
          filteredFormFields = addressFormData.formFields.filter(
            (field) =>
              field.dataField !== "isPreferredShipping" &&
              field.dataField !== "isShippingAndBilling"
          );
        } else {
          filteredFormFields = addressFormData.formFields.filter(
            (field) => field.dataField !== "isPreferredShipping"
          );
        }
      } else if (data.label === "Shipping") {
        if (updateSetData) {
          filteredFormFields = addressFormData.formFields.filter(
            (field) =>
              field.dataField !== "isPreferredBilling" &&
              field.dataField !== "isShippingAndBilling"
          );
        } else {
          filteredFormFields = addressFormData.formFields.filter(
            (field) => field.dataField !== "isPreferredBilling"
          );
        }
      } else if (data.label === "AP" || data.label === "Primary") {
        filteredFormFields = addressFormData.formFields.filter(
          (field) =>
            field.dataField !== "isPreferredBilling" &&
            field.dataField !== "isPreferredShipping" &&
            field.dataField !== "isShippingAndBilling"
        );
      }
      manageData.formFields = filteredFormFields;
      if (updateSetData) {
        manageData.initialState = {
          ...formData.initialState,
          addressTypeId: data.value,
        };
      } else {
        manageData.initialState = {
          ...addressFormData.initialState,
          addressTypeId: data.value,
        };
      }
      setFormData(manageData);
    }
    // setShouldRerenderFormCreator(prevState => !prevState);
  };

  useEffect(() => {
    if (isAddAddressSuccess && isAddAddressData) {
      if (isAddAddressData.errorMessage.includes("exists")) {
        ToastService.warning(isAddAddressData.errorMessage);
        getAddresssByCustomerId(customerId);
        return;
      }
      onreset();
      ToastService.success(isAddAddressData.errorMessage);
      getAddresssByCustomerId(customerId);
      onSidebarClose();
    }
  }, [isAddAddressSuccess, isAddAddressData]);

  useEffect(() => {
    if (isUpdateAddAddressSuccess && isUpdateAddAddressData) {
      if (isUpdateAddAddressData.errorMessage.includes("exists")) {
        ToastService.warning(isUpdateAddAddressData.errorMessage);
        getAddresssByCustomerId(customerId);
        return;
      }
      onreset();
      ToastService.success(isUpdateAddAddressData.errorMessage);
      getAddresssByCustomerId(customerId);
      onSidebarClose();
    }
  }, [isUpdateAddAddressSuccess, isUpdateAddAddressData]);

  const handleAddress = () => {
    let data = userFormRef.current.getFormData();
    if (data != null) {
      let req = {
        ...data,
        customerId: customerId,
        addressTypeId:
          data.addressTypeId && typeof data.addressTypeId === "object"
            ? data.addressTypeId.value
            : data.addressTypeId,
        countryId:
          data.countryId && typeof data.countryId === "object"
            ? data.countryId.value
            : data.countryId,
        stateId:
          data.stateId && typeof data.stateId === "object"
            ? data.stateId.value
            : data.stateId,
        cityId:
          data.cityId && typeof data.cityId === "object"
            ? data.cityId.value
            : data.cityId,
      };
      if (updateSetData) {
        let setReq = {
          ...req,
          addressId: updateSetData.addressId,
          customerAddressId: updateSetData.customerAddressId,
        };
        updateAddAddress(setReq);
        setAddressData(setReq);
      } else {
        addAddress(req);
      }
    }
  };

  const formActionHandler = {
    DDL_CHANGED: handleChangeDropdownList,
  };

  return (
    <>
      <CardSection
        cardTitle="Address"
        buttonClassName="theme-button"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={buttonVisible ? true : false}
        buttonText="Add"
        titleButtonClick={handleToggleModal}
      >
        <AddressCard
          isAddEditModal={handleToggleModal}
          addressData={addressData}
          onHandleSetData={handleSetData}
          isGetByIdLoading={isGetAddresssByCustomerIdFetching}
        />
      </CardSection>
      <div className="address-model">
        <SidebarModel
          modalTitle={updateSetData ? "Update Address" : "Add Address"}
          contentClass="content-40"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}
        >
          <div className="row horizontal-form mt-3 ">
            <FormCreator
              config={formData}
              ref={userFormRef}
              {...formData}
              onActionChange={formActionHandler}
              key={shouldRerenderFormCreator}
            />
            <div className="col-md-12 mt-2">
              <div className="d-flex align-item-end justify-content-end">
                <Buttons
                  buttonTypeClassName="theme-button"
                  buttonText={updateSetData ? "Update" : "Save"}
                  onClick={handleAddress}
                  isLoading={isAddAddressLoading || isUpdateAddAddressLoading}
                  isDisable={isButtonDisable}
                />
                <Buttons
                  buttonTypeClassName="dark-btn ml-5"
                  buttonText="Cancel"
                  onClick={onSidebarClose}
                />
              </div>
            </div>
          </div>
        </SidebarModel>
      </div>
    </>
  );
};

export default AddressDetail;
