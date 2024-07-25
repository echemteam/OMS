import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import { checkFormData } from "../config/CheckForm.data";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { useAddEditCheckMutation } from "../../../../../app/services/supplierFinancialSettingsAPI";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import ToastService from "../../../../../services/toastService/ToastService";
import Buttons from "../../../../../components/ui/button/Buttons";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";

const CheckDetail = ({ onHandleGetById, getCheckData, supplierId, financialSettingFormRef, getAllCities, getAllStates, getAllCountries, isGetAllCitiesSucess, allGetAllCitiesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCountriesSucess, allGetAllCountriesData }) => {
  const checkFormRef = useRef();
  const [checkformData, setCheckFormData] = useState(checkFormData);
  // const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  const [addEditCheck, { isLoading: isAddEditCheckLoading, isSuccess: isAddEditCheckSuccess, data: isAddEditCheckData }] = useAddEditCheckMutation();

  useEffect(() => {
    getAllCountries();
    getAllStates();
    // getAllCities();
  }, []);

  useEffect(() => {
    if (isGetAllCountriesSucess && allGetAllCountriesData) {
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', checkFormData, 'countryId');
      // setShouldRerenderFormCreator((prevState) => !prevState);
    }
    if (isGetAllStatesSucess && allGetAllStatesData) {
      handleStateOption(allGetAllStatesData);
      // setShouldRerenderFormCreator((prevState) => !prevState);
    }
    if (isGetAllCitiesSucess && allGetAllCitiesData) {
      setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', checkFormData, 'cityId');
      // setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllCountriesSucess, allGetAllCountriesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCitiesSucess, allGetAllCitiesData]);

  const handleStateOption = (responseData) => {
    setDropDownOptionField(responseData, 'stateId', 'name', checkFormData, 'stateId');
  };

  // const handleCityOption = (responseData) => {
  //   setDropDownOptionField(responseData, 'cityId', 'name', checkFormData, 'cityId');
  // };

  useEffect(() => {
    handleResponse(isAddEditCheckSuccess, isAddEditCheckData);
  }, [isAddEditCheckSuccess, isAddEditCheckData]);

  const handleResponse = (success, data) => {
    if (success && data) {
      handleAddResponse(success, data);
    }
  };

  const handleAddResponse = (isSuccess, responseData) => {
    if (isSuccess && responseData) {
      if (responseData.errorMessage.includes("exists")) {
        ToastService.warning(responseData.errorMessage);
        return;
      }
      ToastService.success(responseData.errorMessage);
      if (supplierId) {
        onHandleGetById(supplierId)
      }
    }
  }

  useEffect(() => {
    if (getCheckData.initialState.addressId > 0) {
      if (getCheckData.initialState.stateId) {
        getAllCities(getCheckData.initialState.stateId)
      }
      let formCheckData = { ...checkformData };
      formCheckData.initialState = {
        // addressId:getCheckData.initialState.addressId,
        addressLine1Id: getCheckData.initialState.addressLine1Id,
        addressLine2Id: getCheckData.initialState.addressLine2Id,
        cityId: getCheckData.initialState.cityId,
        stateId: getCheckData.initialState.stateId,
        countryId: getCheckData.initialState.countryId,
        zipCode: getCheckData.initialState.zipCode,
      };
      setCheckFormData(formCheckData);
    }
  }, [getCheckData])

  const handleAddCheckDetail = () => {
    let formsupplierFinancialSettings = financialSettingFormRef.current.getFormData()
    let formcheckForm = checkFormRef.current.getFormData();
    if (formcheckForm && formsupplierFinancialSettings) {
      let req = {
        supplierFinancialSettings: {
          isActive: true,
          supplierId: supplierId,
          supplierAccountingSettingId: formsupplierFinancialSettings.supplierAccountingSettingId ? formsupplierFinancialSettings.supplierAccountingSettingId : 0,
          paymentTermId: formsupplierFinancialSettings.paymentTermId && typeof formsupplierFinancialSettings.paymentTermId === "object" ? formsupplierFinancialSettings.paymentTermId.value : formsupplierFinancialSettings.paymentTermId,
          invoiceSubmissionMethod: formsupplierFinancialSettings.paymentMethodId && typeof formsupplierFinancialSettings.paymentMethodId === "object" ? formsupplierFinancialSettings.paymentMethodId.value : formsupplierFinancialSettings.paymentMethodId,
          poDeliveryMethodId: formsupplierFinancialSettings.poDeliveryMethodId && typeof formsupplierFinancialSettings.poDeliveryMethodId === "object" ? formsupplierFinancialSettings.poDeliveryMethodId.value : formsupplierFinancialSettings.poDeliveryMethodId,
        },
        supplierPaymentSettingId: getCheckData.initialState.supplierPaymentSettingId ? getCheckData.initialState.supplierPaymentSettingId : 0,
        supplierId: supplierId,
        checkMailingAddressId: getCheckData.initialState.checkMailingAddressId ? getCheckData.initialState.checkMailingAddressId : 0,
        mailingAddress: {
          addressId: getCheckData.initialState.addressId ? getCheckData.initialState.addressId : 0,
          addressLine1: formcheckForm.addressLine1Id,
          addressLine2: formcheckForm.addressLine2Id,
          cityId: formcheckForm.cityId && typeof formcheckForm.cityId === "object" ? formcheckForm.cityId.value : formcheckForm.cityId,
          stateId: formcheckForm.stateId && typeof formcheckForm.stateId === "object" ? formcheckForm.stateId.value : formcheckForm.stateId,
          countryId: formcheckForm.countryId && typeof formcheckForm.countryId === "object" ? formcheckForm.countryId.value : formcheckForm.countryId,
          zipCode: formcheckForm.zipCode
        },
      };
      addEditCheck(req)
    }
  }

  const handleChangeDropdownList = (data, dataField) => {
    const manageData = { ...checkformData };
    if (dataField === "countryId") {
      setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
      setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
      checkFormRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
      });
    } else if (dataField === "stateId") {
      getAllCities(data.value)
      // setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', manageData, 'cityId', item => item.stateId === data.value);
      setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
      checkFormRef.current.updateFormFieldValue({
        stateId: data.value,
        cityId: null,
      });
    }
  };

  const formActionHandler = {
    DDL_CHANGED: handleChangeDropdownList,
  };


  return (
    <>
      <div className="ach-wire-section">
        <div className="sub-card-sec-add">
          <CardSection cardTitle="Mailing Address">
            <div className="row">
              <FormCreator
                config={checkformData}
                ref={checkFormRef}
                {...checkformData}
                // key={shouldRerenderFormCreator}
                onActionChange={formActionHandler}
              />
            </div>
            <div className="col-md-12">
              <div className="d-flex align-item-end justify-content-end" >
                <Buttons
                  buttonTypeClassName="theme-button"
                  buttonText="Save"
                  onClick={handleAddCheckDetail}
                  isLoading={isAddEditCheckLoading}
                // isDisable={isButtonDisable}
                />
                <Buttons
                  buttonTypeClassName="dark-btn ml-5"
                  buttonText="Cancel"
                // onClick={onSidebarClose}
                />
              </div>
              {/* ))} */}
            </div>
          </CardSection>
        </div>
      </div>
    </>
  );
};

export default CheckDetail;
