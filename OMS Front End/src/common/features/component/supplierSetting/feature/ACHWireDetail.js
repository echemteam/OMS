import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { achWireFormData } from "../config/ACHWireForm.data";
import Buttons from "../../../../../components/ui/button/Buttons";
import { bankAddressFormData } from "../config/BankAddressForm.data";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useAddEditACHWireMutation } from "../../../../../app/services/supplierFinancialSettingsAPI";
import { useLazyGetAllPaymentTermsQuery } from "../../../../../app/services/customerSettingsAPI";
import { registeredBankAddressForm } from "../config/RegisteredBankAddressForm.data";
import ToastService from "../../../../../services/toastService/ToastService";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";

const ACHWireDetail = ({supplierId,financialSettingFormRef, getAllCities, getAllStates, getAllCountries, isGetAllCitiesSucess, allGetAllCitiesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCountriesSucess, allGetAllCountriesData }) => {
  const aCHWireFormRef = useRef();
  const bankFormRef = useRef();
  const registeredFormRef = useRef();
  const [achWireData, setAchWireData] = useState(achWireFormData);
  const [bankAddressData, setBankAddressData] = useState(bankAddressFormData);
  const [registeredBankAddressData, setRegisteredBankAddressData] = useState(registeredBankAddressForm);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  const [addEditACHWire, { isLoading: isAddEditACHWireLoading, isSuccess: isAddEditACHWireSuccess, data: isAddEditACHWireData }] = useAddEditACHWireMutation();
  const [getAllPaymentTerms, { isFetching: isGetAllPaymentTermsFetching, isSuccess: isGetAllPaymentTermsSuccess, data: isGetAllPaymentTermsData }] = useLazyGetAllPaymentTermsQuery();

  useEffect(() => {
    getAllCountries();
    getAllStates();
    getAllCities();
    getAllPaymentTerms();
  }, []);

  useEffect(() => {
    if (isGetAllCountriesSucess && allGetAllCountriesData) {
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', bankAddressFormData, 'countryId');
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', registeredBankAddressForm, 'countryId');
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
    if (!isGetAllPaymentTermsFetching && isGetAllPaymentTermsSuccess && isGetAllPaymentTermsData) {
      setDropDownOptionField(isGetAllPaymentTermsData, "paymentTermId", "paymentTerm", achWireFormData, "paymentTermId");
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllPaymentTermsFetching, isGetAllPaymentTermsSuccess, isGetAllPaymentTermsData, isGetAllCountriesSucess, allGetAllCountriesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCitiesSucess, allGetAllCitiesData]);

  const handleStateOption = (responseData) => {
    setDropDownOptionField(responseData, 'stateId', 'name', bankAddressFormData, 'stateId');
    setDropDownOptionField(responseData, 'stateId', 'name', registeredBankAddressForm, 'stateId');
  };
  const handleCityOption = (responseData) => {
    setDropDownOptionField(responseData, 'cityId', 'name', bankAddressFormData, 'cityId');
    setDropDownOptionField(responseData, 'cityId', 'name', registeredBankAddressForm, 'cityId');
  };

  useEffect(() => {
    handleResponse(isAddEditACHWireSuccess, isAddEditACHWireData);
  }, [isAddEditACHWireSuccess, isAddEditACHWireData]);

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
    }
  }

  const handleACHWireAdd = () => {
    let formsupplierFinancialSettings = financialSettingFormRef.current.getFormData()
    let formBankAddress = bankFormRef.current.getFormData();
    let formRegisteredBankAddress = registeredFormRef.current.getFormData();
    let formOtherDetail = aCHWireFormRef.current.getFormData();
    if (formBankAddress || formRegisteredBankAddress || formOtherDetail || formsupplierFinancialSettings) {
      let req = {
        supplierFinancialSettings: {
          isActive: true,
          supplierId: supplierId.supplierId,
          supplierAccountingSettingId: 0,
          paymentTermId: formsupplierFinancialSettings.paymentTermId && typeof formsupplierFinancialSettings.paymentTermId === "object" ? formsupplierFinancialSettings.paymentTermId.value : formsupplierFinancialSettings.paymentTermId,
          invoiceSubmissionMethod: formsupplierFinancialSettings.paymentMethodId && typeof formsupplierFinancialSettings.paymentMethodId === "object" ? formsupplierFinancialSettings.paymentMethodId.value : formsupplierFinancialSettings.paymentMethodId,
          poDeliveryMethodId: formsupplierFinancialSettings.poDeliveryMethodId && typeof formsupplierFinancialSettings.poDeliveryMethodId === "object" ? formsupplierFinancialSettings.poDeliveryMethodId.value : formsupplierFinancialSettings.poDeliveryMethodId,
        },
        bankAddress: {
          addressId:0,
          addressLine1: formBankAddress.addressLine1Id,
          addressLine2: formBankAddress.addressLine2Id,
          cityId: formBankAddress.cityId && typeof formBankAddress.cityId === "object" ? formBankAddress.cityId.value : formBankAddress.cityId,
          stateId: formBankAddress.stateId && typeof formBankAddress.stateId === "object" ? formBankAddress.stateId.value : formBankAddress.stateId,
          countryId: formBankAddress.countryId && typeof formBankAddress.countryId === "object" ? formBankAddress.countryId.value : formBankAddress.countryId,
          zipCode: formBankAddress.zipCode
        },
        recipientAddress: {
          addressId:0,
          addressLine1: formRegisteredBankAddress.addressLine1Id,
          addressLine2: formRegisteredBankAddress.addressLine2Id,
          cityId: formRegisteredBankAddress.cityId && typeof formRegisteredBankAddress.cityId === "object" ? formRegisteredBankAddress.cityId.value : formRegisteredBankAddress.cityId,
          stateId: formRegisteredBankAddress.stateId && typeof formRegisteredBankAddress.stateId === "object" ? formRegisteredBankAddress.stateId.value : formRegisteredBankAddress.stateId,
          countryId: formRegisteredBankAddress.countryId && typeof formRegisteredBankAddress.countryId === "object" ? formRegisteredBankAddress.countryId.value : formRegisteredBankAddress.countryId,
          zipCode: formRegisteredBankAddress.zipCode
        },
        supplierBankDetailsId: 0,
        bankAddressId: 0,
        recipientAddressId: 0,
        supplierId: supplierId.supplierId,
        isActive: true,
        messageToRecipient: formOtherDetail.messageToRecipient,
        isAddressInUs: formOtherDetail.isAddressInUs,
        recipientPhoneNumber: formOtherDetail.recipientPhoneNumber,
        paymentTermId: formOtherDetail.paymentTermId && typeof formOtherDetail.paymentTermId === "object" ? formOtherDetail.paymentTermId.value : formOtherDetail.paymentTermId,
        messageToRecipientBank: formOtherDetail.messageToRecipientBank,
        beneficiaryName: formOtherDetail.beneficiaryName,
        bankName: formOtherDetail.bankName,
        accountType: formOtherDetail.accountType,
        accountNumber: formOtherDetail.accountNumber,
        branchCode: formOtherDetail.branchCode,
        ibanNumber: formOtherDetail.ibanNumber,
        swiftCode: formOtherDetail.swiftCode,
        routingNumber: formOtherDetail.routingNumber,
        sortCode: formOtherDetail.sortCode,
        bsbNumber: formOtherDetail.bsbNumber,
      };
      addEditACHWire(req)
    }
  }

  const handleChangeBankAddressDropdownList = (data, dataField) => {
    const manageData = { ...bankAddressData };
    if (dataField === "countryId") {
      setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
      setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
      bankFormRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
      });
    } else if (dataField === "stateId") {
      setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', manageData, 'cityId', item => item.stateId === data.value);
      setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
      bankFormRef.current.updateFormFieldValue({
        stateId: data.value,
        cityId: null,
      });
    }
  };

  const handleChangeRegisteredAddressDropdownList = (data, dataField) => {
    const manageData = { ...registeredBankAddressData };
    if (dataField === "countryId") {
      setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
      setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
      registeredFormRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
      });
    } else if (dataField === "stateId") {
      setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', manageData, 'cityId', item => item.stateId === data.value);
      setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
      registeredFormRef.current.updateFormFieldValue({
        stateId: data.value,
        cityId: null,
      });
    }
  };

  const formBackAddressActionHandler = {
    DDL_CHANGED: handleChangeBankAddressDropdownList,
  };

  const formRegisteredActionHandler = {
    DDL_CHANGED: handleChangeRegisteredAddressDropdownList,
  };

  return (
    <div className="ach-wire-section">
      <CardSection cardTitle="Bank Address">
        <div className="row">
          <FormCreator
            config={bankAddressData}
            ref={bankFormRef}
            {...bankAddressData}
            key={shouldRerenderFormCreator}
            onActionChange={formBackAddressActionHandler}
          />
        </div>
      </CardSection>

      <CardSection cardTitle="Registered Bank Address">
        <div className="row">
          <FormCreator
            config={registeredBankAddressData}
            ref={registeredFormRef}
            {...registeredBankAddressData}
            key={shouldRerenderFormCreator}
            onActionChange={formRegisteredActionHandler}
          />
        </div>
      </CardSection>

      <CardSection cardTitle="Other Details">
        <div className="row">
          <FormCreator
            config={achWireData}
            ref={aCHWireFormRef}
            {...achWireData}
          />
        </div>
      </CardSection>

      <div className="col-md-12">
        <div className="d-flex align-item-end justify-content-end" >
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Save"
            onClick={handleACHWireAdd}
            isLoading={isAddEditACHWireLoading}
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
    </div>
  );
};

export default ACHWireDetail;
