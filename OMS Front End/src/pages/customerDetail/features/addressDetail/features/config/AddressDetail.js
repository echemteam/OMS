/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
//** Libs's */
import AddressCard from "../AddressCard";
import { addressFormData } from "./AddressForm.data";
import { AppIcons } from "../../../../../../data/appIcons";
import Buttons from "../../../../../../components/ui/button/Buttons";
import { settingTypeEnums } from "../../../../../../utils/Enums/enums";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../../components/ui/card/CardSection";
import SidebarModel from "../../../../../../components/ui/sidebarModel/SidebarModel";
import { onResetForm } from "../../../../../../utils/FormFields/ResetForm/handleResetForm";
import { removeFormFields } from "../../../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import { hasFunctionalPermission } from "../../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { setFieldSetting, setOptionFieldSetting } from "../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
//** Service's */
import ToastService from "../../../../../../services/toastService/ToastService";
import { useLazyGetAllCountriesQuery } from "../../../../../../app/services/basicdetailAPI";
import { useLazyGetAllAddressTypesQuery, useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../../app/services/addressAPI";

const fixData = {
  label: "United States",
  value: 233
}

const AddressDetail = ({ isEditablePage, addAddressMutation, updateAddAddressMutation, getAddresssByCustomerId, mainId, isSupplier, SecurityKey, getAddresssById }) => {
  const userFormRef = useRef();
  const { formSetting } = addressFormData;
  const [isModelOpen, setisModelOpen] = useState(false);
  const [formData, setFormData] = useState(addressFormData);
  const [addressData, setAddressData] = useState();
  const [updateSetData, setUpdateSetData] = useState();
  const [updateSetDataSupplier, setUpdateSetDataSupplier] = useState();
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [showEditIcon, setShowEditIcon] = useState(true);
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

  const [getAddresssByAddressId, { isFetching: isGetAddresssByIdFetching, isSuccess: isGetAddresssByIdSuccess, data: isGetAddresssByIdData, }] = getAddresssById();

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
    removeFormFields(formData, ['isPreferredShipping', 'isShippingAndBilling', 'isPreferredBilling'], setFormData);
    if (updateSetData === null) {
      handleChangeDropdownList(fixData, "countryId");
      setFieldSetting(formData, 'cityId', settingTypeEnums.isDisabled, true);
    }
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

  const handleCountryOption = (responseData) => {
    setOptionFieldSetting(responseData, 'countryId', 'name', addressFormData, 'countryId');
  }
  const handleStateOption = (responseData) => {
    setOptionFieldSetting(responseData, 'stateId', 'name', addressFormData, 'stateId');
  }
  const handleCityOption = (responseData) => {
    setOptionFieldSetting(responseData, 'cityId', 'name', addressFormData, 'cityId');
  }

  useEffect(() => {
    if (isGetAllCountriesSucess && allGetAllCountriesData) {
      handleCountryOption(allGetAllCountriesData);
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
    if (isGetAllStatesSucess && allGetAllStatesData) {
      handleStateOption(allGetAllStatesData);
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
    if (isGetAllCitiesSucess && allGetAllCitiesData) {
      handleCityOption(allGetAllCitiesData);
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
    if (isGetAllAddressTypesSucess && allGetAllAddressTypesData) {
      const filterCondition = (item) => {
        let condition = isSupplier ? item.isForSuppliers : item.isForCustomers
        return condition;
      };
      setOptionFieldSetting(allGetAllAddressTypesData, 'addressTypeId', 'type', addressFormData, 'addressTypeId', filterCondition);
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllCountriesSucess, allGetAllCountriesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCitiesSucess, allGetAllCitiesData, isGetAllAddressTypesSucess, allGetAllAddressTypesData]);

  useEffect(() => {
    if (allGetAllStatesData) {
      handleChangeDropdownList(fixData, "countryId")
    }
  }, [allGetAllStatesData])


  const handleToggleModal = () => {
    setisModelOpen(true);
    if (isSupplier) {
      onResetSupplier()
    }
    setFieldSetting(formData, 'cityId', settingTypeEnums.isDisabled, true);
  };

  useEffect(() => {
    if (isButtonDisable) {
      setFieldSetting(formData, 'cityId', settingTypeEnums.isDisabled, true);
      setFieldSetting(formData, 'stateId', settingTypeEnums.isDisabled, true);
    }
  }, [isButtonDisable])

  useEffect(() => {
    if (!isGetAddresssByIdFetching && isGetAddresssByIdSuccess && isGetAddresssByIdData) {
      let data = isGetAddresssByIdData;
      setUpdateSetData(data);
      if (isSupplier) {
        setUpdateSetDataSupplier(data)
      }
      let form = { ...formData };
      if (data) {
        if (!isButtonDisable) {
          setFieldSetting(formData, 'cityId', settingTypeEnums.isDisabled, false);
          setFieldSetting(formData, 'stateId', settingTypeEnums.isDisabled, false);
        }
      }
      if (data.countryId) {
        handleStateOption(allGetAllStatesData);
      }
      if (data.stateId) {
        handleCityOption(allGetAllCitiesData);
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
      setFormData(form);
      if (isSupplier === false) {
        removeFormFields(addressFormData, ['isShippingAndBilling'], setFormData);
      }
    }
  }, [isGetAddresssByIdFetching, isGetAddresssByIdSuccess, isGetAddresssByIdData]);

  const handleSetData = (data) => {
    data?.addressId && getAddresssByAddressId(data?.addressId);
  };

  useEffect(() => {
    if (isSupplier === true) {
      manageFilteredForm()
    } else {
      if (updateSetData) {
        if (updateSetData.type === "Billing") {
          removeFormFields(addressFormData, ['isShippingAndBilling', 'isPreferredShipping'], setFormData);
        } else if (updateSetData.type === "Shipping") {
          removeFormFields(addressFormData, ['isShippingAndBilling', 'isPreferredBilling'], setFormData);
        } else if (updateSetData.type === "AP" || updateSetData.type === "Primary") {
          removeFormFields(addressFormData, ['isShippingAndBilling', 'isPreferredBilling', 'isPreferredShipping'], setFormData);
        }
      }
    }
  }, [updateSetData]);

  const onSidebarClose = () => {
    setisModelOpen(false);
    onResetForm(addressFormData, setFormData, null, [
      { setter: setUpdateSetData, value: null },
      { setter: setUpdateSetDataSupplier, value: null }
    ]);
  };

  const onResetSupplier = () => {
    onResetForm(addressFormData, setFormData, null, [
      { setter: setUpdateSetData, value: null },
      { setter: setUpdateSetDataSupplier, value: null }
    ]);
    removeFormFields(formData, ['isPreferredShipping', 'isShippingAndBilling', 'isPreferredBilling'], setFormData);
  };

  const handleChangeDropdownList = (data, dataField) => {
    setlebel(data)
    const manageData = { ...formData };
    if (dataField === "countryId") {
      const filterCondition = (item) => {
        return item.countryId === data.value;
      }
      setOptionFieldSetting(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', filterCondition);
      setFieldSetting(manageData, 'stateId', settingTypeEnums.isDisabled, false);
      userFormRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
      });
    } else if (dataField === "stateId") {
      const filterCondition = (item) => {
        return item.stateId === data.value;
      }
      setOptionFieldSetting(allGetAllCitiesData, 'cityId', 'name', manageData, 'cityId', filterCondition);
      setFieldSetting(manageData, 'cityId', settingTypeEnums.isDisabled, false);
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
        console.log(formData.initialState);
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

  const handleAddressResponse = (isSuccess, responseData) => {
    if (isSuccess && responseData) {
      if (responseData.errorMessage.includes("exists")) {
        ToastService.warning(responseData.errorMessage);
        getById(mainId);
        return;
      }
      onResetForm(addressFormData, setFormData, null, [
        { setter: setUpdateSetData, value: null },
        { setter: setUpdateSetDataSupplier, value: null }
      ]);
      ToastService.success(responseData.errorMessage);
      getById(mainId);
      onSidebarClose();
    }
  }

  useEffect(() => {
    if (isAddAddressSuccess && isAddAddressData) {
      handleAddressResponse(isAddAddressSuccess, isAddAddressData);
    }
    if (isUpdateAddAddressSuccess && isUpdateAddAddressData) {
      handleAddressResponse(isUpdateAddAddressSuccess, isUpdateAddAddressData);
    }
  }, [isAddAddressSuccess, isAddAddressData, isUpdateAddAddressSuccess, isUpdateAddAddressData]);


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
      removeFormFields(formData, ['isPreferredShipping'], setFormData);
    } else if (checkboxFeild === "isShippingAndBilling" && checkbox === false && lebel.value === 2) {
      removeFormFields(formData, ['isPreferredBilling'], setFormData);
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
          <div className="row mt-3 add-address-form">
            <FormCreator
              config={formData}
              ref={userFormRef}
              {...formData}
              onActionChange={formActionHandler}
              onCheckBoxChange={formActionHandler}
              key={shouldRerenderFormCreator} />
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
