import React, { useEffect, useRef, useState } from "react";
//** Libs's */
import AddressCard from "../AddressCard";
import { addressFormData } from "./AddressForm.data";
import { AppIcons } from "../../../../../../data/appIcons";
import Buttons from "../../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../../components/ui/card/CardSection";
import SidebarModel from "../../../../../../components/ui/sidebarModel/SidebarModel";
import { hasFunctionalPermission } from "../../../../../../utils/AuthorizeNavigation/authorizeNavigation";
//** Service's */
import ToastService from "../../../../../../services/toastService/ToastService";
import { useLazyGetAllCountriesQuery } from "../../../../../../app/services/basicdetailAPI";
import { useLazyGetAllAddressTypesQuery, useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../../app/services/addressAPI";

const fixData = {
  label: "United States",
  value: 233
}

const AddressDetail = ({ isEditablePage, addAddressMutation, updateAddAddressMutation, getAddresssByCustomerId, mainId, isSupplier, SecurityKey }) => {
  const userFormRef = useRef();
  const { formSetting } = addressFormData;
  const [isModelOpen, setisModelOpen] = useState(false);
  const [formData, setFormData] = useState(addressFormData);
  const [addressData, setAddressData] = useState();
  const [updateSetData, setUpdateSetData] = useState();
  const [updateSetDataSupplier, setUpdateSetDataSupplier] = useState();
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [lebel, setlebel] = useState(null);
  const [checkbox, setCheckbox] = useState(null);
  const [checkboxFeild, setCheckboxFeild] = useState(null);

  useEffect(() => {
    if (isEditablePage) {
      if (SecurityKey) {
        const hasAddPermission = hasFunctionalPermission(SecurityKey.ADD);
        const hasEditPermission = hasFunctionalPermission(SecurityKey.EDIT);
        if (hasAddPermission) {
          if (hasAddPermission.hasAccess === true) {
            setButtonVisible(true);
          }
          else {
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
            if (hasEditPermission.isViewOnly === true) {
              setShowEditIcon(true);
            }
          }
        }
      }
    }
  }, [isEditablePage, isSupplier, SecurityKey, updateSetData]);

  const [
    getAllAddressTypes,
    {
      isSuccess: isGetAllAddressTypesSucess,
      data: allGetAllAddressTypesData,
    },
  ] = useLazyGetAllAddressTypesQuery();

  const [
    getAllCountries,
    {
      isSuccess: isGetAllCountriesSucess,
      data: allGetAllCountriesData,
    },
  ] = useLazyGetAllCountriesQuery();

  const [
    getAllStates,
    {
      isSuccess: isGetAllStatesSucess,
      data: allGetAllStatesData,
    },
  ] = useLazyGetAllStatesQuery();

  const [
    getAllCities,
    {
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
  ] = addAddressMutation();

  const [
    updateAddAddress,
    {
      isLoading: isUpdateAddAddressLoading,
      isSuccess: isUpdateAddAddressSuccess,
      data: isUpdateAddAddressData,
    },
  ] = updateAddAddressMutation();

  const [
    getById,
    {
      isFetching: isGetAddresssByCustomerIdFetching,
      isSuccess: isGetAddresssByCustomerId,
      data: GetAddresssByCustomerIdData,
    },
  ] = getAddresssByCustomerId();

  useEffect(() => {
    getAllAddressTypes();
    getAllCountries();
    getAllStates();
    getAllCities();
  }, []);

  useEffect(() => {
    if (mainId > 0) {
      getById(mainId);
    }
  }, [mainId]);

  const manageFilteredForm = () => {
    // if(isSupplier){
    //   onresetManege()
    // }
    const manageData = { ...formData };
    const filteredFormFields = addressFormData.formFields.filter(
      (field) =>
        field.dataField !== "isPreferredShipping" &&
        field.dataField !== "isShippingAndBilling" &&
        field.dataField !== "isPreferredBilling"
    );
    manageData.formFields = filteredFormFields;

    if (updateSetData === null) {
      handleChangeDropdownList(fixData, "countryId")
      const dropdownFieldIndexs = manageData.formFields.findIndex(
        (item) => item.dataField === "cityId"
      );
      manageData.formFields[dropdownFieldIndexs].fieldSetting.isDisabled = true;
    }
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
      isGetAllAddressTypesSucess &&
      allGetAllAddressTypesData
    ) {
      if (isSupplier === true) {
        const getData = allGetAllAddressTypesData.filter(x => x.isForSuppliers).map((item) => ({
          value: item.addressTypeId,
          label: item.type,
        }));
        const dropdownField = addressFormData.formFields.find(
          (item) => item.dataField === "addressTypeId"
        );
        dropdownField.fieldSetting.options = getData;
      } else {
        const getData = allGetAllAddressTypesData.filter(x => x.isForCustomers).map((item) => ({
          value: item.addressTypeId,
          label: item.type,
        }));
        const dropdownField = addressFormData.formFields.find(
          (item) => item.dataField === "addressTypeId"
        );
        dropdownField.fieldSetting.options = getData;
      }
    }
  }, [
    isGetAllAddressTypesSucess,
    allGetAllAddressTypesData,
  ]);

  useEffect(() => {
    if (
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
    isGetAllCountriesSucess,
    allGetAllCountriesData,
  ]);

  useEffect(() => {
    if (
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
  }, [isGetAllStatesSucess, allGetAllStatesData]);

  useEffect(() => {
    if (
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
  }, [isGetAllCitiesSucess, allGetAllCitiesData]);

  useEffect(() => {
    if (allGetAllStatesData) {
      handleChangeDropdownList(fixData, "countryId")
    }
  }, [allGetAllStatesData])


  const handleToggleModal = () => {
    setisModelOpen(true);
    manageFilteredForm();
  };

  // useEffect(() => {

  // },[isModelOpen])

  const handleSetData = (data) => {
    setUpdateSetData(data);
    if (isSupplier) {
      setUpdateSetDataSupplier(data)
    }
    let form = { ...formData };
    if (data) {
      const dropdownFieldIndex = form.formFields.findIndex(
        (item) => item.dataField === "stateId"
      );
      const dropdownFieldIndexs = form.formFields.findIndex(
        (item) => item.dataField === "cityId"
      );
      form.formFields[dropdownFieldIndex].fieldSetting.isDisabled = false;
      form.formFields[dropdownFieldIndexs].fieldSetting.isDisabled = false;
    }
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
      customerId: isSupplier === false ? mainId : 0,
      supplierId: isSupplier === true ? mainId : 0,
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
    if (isSupplier === false) {
      const filteredFormFields = addressFormData.formFields.filter(
        (field) => field.dataField !== "isShippingAndBilling"
      );
      form.formFields = filteredFormFields;
      setFormData(form);
    }
    setFormData(form);
  };

  useEffect(() => {
    if (isSupplier === true) {
      manageFilteredForm()
    } else {
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
    }
  }, [updateSetData]);

  const onSidebarClose = () => {
    setisModelOpen(false);
    onreset();
  };

  // const onresetManege = () => {
  //   debugger
  //   let reset = { ...addressFormData };
  //   reset.initialState = {
  //     addressTypeId: "",
  //     addressLine1: "",
  //     addressLine2: "",
  //     addressLine3: "",
  //     addressLine4: "",
  //     addressLine5: "",
  //     countryId: 233,
  //     stateId: "",
  //     zipCode: "",
  //     cityId: "",
  //     supplierId: 0,
  //   };
  //   setFormData(reset);
  // }

  const onreset = () => {
    let restData = { ...addressFormData };
    restData.initialState = { ...addressFormData.initialState };
    setFormData(restData);
    setUpdateSetData(null);
    setUpdateSetDataSupplier(null)
  };

  const handleChangeDropdownList = (data, dataField) => {
    setlebel(data)
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
    } else if (isSupplier === false) {
      if (dataField === "addressTypeId") {
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
    }
    // setShouldRerenderFormCreator(prevState => !prevState);
  };

  useEffect(() => {
    if (isAddAddressSuccess && isAddAddressData) {
      if (isAddAddressData.errorMessage.includes("exists")) {
        ToastService.warning(isAddAddressData.errorMessage);
        getById(mainId);
        return;
      }
      onreset();
      ToastService.success(isAddAddressData.errorMessage);
      getById(mainId);
      onSidebarClose();
    }
  }, [isAddAddressSuccess, isAddAddressData]);

  useEffect(() => {
    if (isUpdateAddAddressSuccess && isUpdateAddAddressData) {
      if (isUpdateAddAddressData.errorMessage.includes("exists")) {
        ToastService.warning(isUpdateAddAddressData.errorMessage);
        getById(mainId);
        return;
      }
      onreset();
      ToastService.success(isUpdateAddAddressData.errorMessage);
      getById(mainId);
      onSidebarClose();
    }
  }, [isUpdateAddAddressSuccess, isUpdateAddAddressData]);

  const handleAddress = () => {
    let data = userFormRef.current.getFormData();
    if (data != null) {
      let req = {
        ...data,
        customerId: isSupplier === false ? mainId : 0,
        supplierId: isSupplier === true ? mainId : 0,
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
      if (updateSetData || updateSetDataSupplier) {
        let setReq = {
          ...req,
          addressId: updateSetData ? updateSetData.addressId : updateSetDataSupplier.addressId,
          customerAddressId: isSupplier === false ? (updateSetData ? updateSetData.customerAddressId : updateSetDataSupplier.customerAddressId) : 0,
          supplierAddressId: isSupplier === true ? (updateSetData ? updateSetData.supplierAddressId : updateSetDataSupplier.supplierAddressId) : 0,
        };
        updateAddAddress(setReq);
        setAddressData(setReq);
      } else {
        addAddress(req);
      }
    }
  };

  const handleCheckboxChanges = (data, dataField) => {
    setCheckbox(data)
    setCheckboxFeild(dataField)
    if (dataField === "isShippingAndBilling" && data && lebel) {
      const manageData = { ...formData };
      let filteredFormFields;
      filteredFormFields = addressFormData.formFields
      manageData.formFields = filteredFormFields;
      setFormData(manageData)
    }
  }

  useEffect(() => {
    if (checkboxFeild === "isShippingAndBilling" && checkbox === false && lebel.value === 1) {
      const manageData = { ...formData };
      let filteredFormFields;
      filteredFormFields = addressFormData.formFields.filter(
        (field) => field.dataField !== "isPreferredShipping"
      );
      manageData.formFields = filteredFormFields
      setFormData(manageData)
    } else if (checkboxFeild === "isShippingAndBilling" && checkbox === false && lebel.value === 2) {
      const manageData = { ...formData };
      let filteredFormFields;
      filteredFormFields = addressFormData.formFields.filter(
        (field) => field.dataField !== "isPreferredBilling"
      );
      manageData.formFields = filteredFormFields
      setFormData(manageData)
    }
  }, [checkbox, checkboxFeild])

  const formActionHandler = {
    DDL_CHANGED: handleChangeDropdownList,
    CHECK_CHANGE: handleCheckboxChanges
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
          showEditIcon={showEditIcon}
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
          <div className="row horizontal-form mt-3 add-address-form">
            <FormCreator
              config={formData}
              ref={userFormRef}
              {...formData}
              onActionChange={formActionHandler}
              onCheckBoxChange={formActionHandler}
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
