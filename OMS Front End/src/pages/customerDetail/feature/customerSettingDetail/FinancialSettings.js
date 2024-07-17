/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Libs's */
import { SettingFormData } from "./config/SettingData";
import { securityKey } from "../../../../data/SecurityKey";
import Buttons from "../../../../components/ui/button/Buttons";
import FormCreator from "../../../../components/Forms/FormCreator";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
//** Service's */
import ToastService from "../../../../services/toastService/ToastService";
import { useAddEditCustomerSettingsMutation, useLazyGetAllPaymentMethodQuery, useLazyGetAllPaymentTermsQuery, useLazyGetDetailsbyCustomerIDQuery, } from "../../../../app/services/customerSettingsAPI";
import { CountryCode, CustomerSettingEnum, PaymentMethodTypes, PaymentMethods } from "../../../../utils/Enums/commonEnums";
import { addFormFields, removeFormFields } from "../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import { getFieldData } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";

const FinancialSettings = ({ isEditablePage }) => {

  const settingFormRef = useRef();
  const [showButton, setShowButton] = useState(true);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
  const [customerSettingFormData, setCustomerSettingFormData] = useState(SettingFormData);
  const { customerId, customerCountryId, setCustomerCountryId, isResponsibleUser, settingRef, handleActiveSubTabClick } = useContext(BasicDetailContext);

  //** API Call's */
  const [getAllPaymentTerms, { isSuccess: isGetAllPaymentTermsSuccess, data: isGetAllPaymentTermsData, },] = useLazyGetAllPaymentTermsQuery();
  const [getAllPaymentMethod, { isSuccess: isGetAllPaymentMethodSuccess, data: isGetAllPaymentMethodData, },] = useLazyGetAllPaymentMethodQuery();
  const [GetDetailsbyCustomerID, { isFetching: isGetDetailByCustomerIDFetching, isSuccess: isGetDetailByCustomerIDSuccess, data: isGetDetailByCustomerIDData, },] = useLazyGetDetailsbyCustomerIDQuery();
  const [addEditCustomerSettings, { isLoading: isAddEditCustomerSettingsLoading, isSuccess: isAddEditCustomerSettingsSuccess, data: isAddEditCustomerSettingsData, },] = useAddEditCustomerSettingsMutation();

  const { formSetting } = SettingFormData;
  const hasAddEditPermission = hasFunctionalPermission(securityKey.ADDEDITCUSTOMERFINANCIAL);

  useEffect(() => {
    if (isEditablePage) {
      if (!isResponsibleUser) {
        if (hasAddEditPermission.hasAccess === true) {
          setShowButton(true);
          formSetting.isViewOnly = false;
        } else {
          setShowButton(false);
          formSetting.isViewOnly = true;
        }
      }
    }
  }, [hasAddEditPermission]);

  useEffect(() => {
    getAllPaymentTerms();
    getAllPaymentMethod();
    // removeCardProcessCharge();
  }, []);

  useEffect(() => {
    if (customerCountryId) {
      GetDetailsbyCustomerID(customerId);
    }
  }, [customerCountryId, setCustomerCountryId])

  useEffect(() => {
    if (customerId > 0) {
      GetDetailsbyCustomerID(customerId)
    };
  }, [customerId]);

  useEffect(() => {
    if (isGetAllPaymentTermsSuccess && isGetAllPaymentTermsData) {
      const getData = isGetAllPaymentTermsData.map((item) => ({
        value: item.paymentTermId,
        label: item.paymentTerm,
      }));
      const dropdownField = SettingFormData.formFields.find((item) => item.dataField === "paymentTermId");
      dropdownField.fieldSetting.options = getData;
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllPaymentTermsSuccess, isGetAllPaymentTermsData,]);

  useEffect(() => {
    if (isGetAllPaymentMethodSuccess && isGetAllPaymentMethodData) {
      const getData = isGetAllPaymentMethodData.map((item) => ({
        value: item.paymentMethodId,
        label: item.method,
      }));
      const dropdownField = SettingFormData.formFields.find((item) => item.dataField === "paymentMethodId");
      dropdownField.fieldSetting.options = getData;
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllPaymentMethodSuccess, isGetAllPaymentMethodData,]);

  useEffect(() => {
    if (!isGetDetailByCustomerIDFetching && isGetDetailByCustomerIDSuccess && isGetDetailByCustomerIDData) {
      if (isGetDetailByCustomerIDData) {
        let modifyFormFields;
        if (isGetDetailByCustomerIDData.paymentMethodId !== PaymentMethodTypes.CREDITCARD) {
          modifyFormFields = handleExcludeCardValue();
        } else if (isGetDetailByCustomerIDData.paymentMethodId === PaymentMethodTypes.CREDITCARD) {
          modifyFormFields = handleCrditCardValue();
        }
        let formData = { ...modifyFormFields };
        formData.initialState = {
          ...modifyFormFields.initialState,
          customerAccountingSettingId: isGetDetailByCustomerIDData.customerAccountingSettingId,
          paymentTermId: isGetDetailByCustomerIDData.paymentTermId,
          creditLimit: isGetDetailByCustomerIDData.creditLimit,
          paymentMethodId: isGetDetailByCustomerIDData.paymentMethodId,
          billingCurrency: isGetDetailByCustomerIDData.billingCurrency,
          invoiceSubmissionInstruction: isGetDetailByCustomerIDData.invoiceSubmissionInstruction,
        };
        setCustomerSettingFormData(formData);
        setShouldRerenderFormCreator((prevState) => !prevState);
      }
    }
  }, [isGetDetailByCustomerIDFetching, isGetDetailByCustomerIDSuccess, isGetDetailByCustomerIDData,]);

  useEffect(() => {
    if (isAddEditCustomerSettingsSuccess && isAddEditCustomerSettingsData) {
      ToastService.success(isAddEditCustomerSettingsData.errorMessage);
      handleActiveSubTabClick(CustomerSettingEnum.ShippingSettings);
    }
  }, [isAddEditCustomerSettingsSuccess, isAddEditCustomerSettingsData]);

  useImperativeHandle(settingRef, () => ({
    onhandleEdit,
  }));

  const onhandleEdit = () => {
    const settingFormData = settingFormRef.current.getFormData();
    if (settingFormData && !settingFormData.customerAccountingSettingId) {
      const request = {
        ...settingFormData,
        customerId: customerId,
        paymentTermId: settingFormData.paymentTermId.value,
        paymentMethodId: settingFormData.paymentMethodId.value,
        billingCurrency: !settingFormData.billingCurrency?.value ? settingFormData.billingCurrency : settingFormData.billingCurrency.value,
      };
      addEditCustomerSettings(request);

    } else if (settingFormData && settingFormData.customerAccountingSettingId) {
      const updaterequest = {
        ...settingFormData,
        customerAccountingSettingId: settingFormData.customerAccountingSettingId,
        customerId: customerId,
        paymentTermId: settingFormData.paymentTermId && typeof settingFormData.paymentTermId === "object"
          ? settingFormData.paymentTermId.value
          : settingFormData.paymentTermId,
        paymentMethodId: settingFormData.paymentMethodId && typeof settingFormData.paymentMethodId === "object"
          ? settingFormData.paymentMethodId.value
          : settingFormData.paymentMethodId,
        billingCurrency: settingFormData.billingCurrency && typeof settingFormData.billingCurrency === "object"
          ? settingFormData.billingCurrency.value
          : settingFormData.billingCurrency,
      };
      addEditCustomerSettings(updaterequest);
    }
  };

  const handleCheckboxChanges = (data, dataField) => {
    if (dataField === 'exemptSalesTax' && data) {
      let formData = { ...customerSettingFormData };
      formData.formFields = formData.formFields.filter((field) => field.dataField !== 'salesTax');
      // const modifyFormFields = removeFormFields(customerSettingFormData, ['salesTax']);
      setCustomerSettingFormData(formData);
    } else if (dataField === 'exemptSalesTax' && !data) {
      let modifyFormFields = { ...SettingFormData }
      // modifyFormFields.initialState = customerSettingFormData.initialState
      if (customerSettingFormData.initialState.paymentTermId !== PaymentMethodTypes.CREDITCARD) {
        modifyFormFields = handleExcludeCardValue(true);
      } else if (customerSettingFormData.initialState.paymentTermId === PaymentMethodTypes.CREDITCARD) {
        modifyFormFields = handleCrditCardValue(true);
      }
      setCustomerSettingFormData(modifyFormFields);
    }
  };

  const handleCrditCardValue = (isExemptSalesTAX) => {
    let salesTaxFieldsAdd;
    let findCreditFields = getFieldData(SettingFormData, 'cardProcessingCharges');
    if (isExemptSalesTAX) {
      salesTaxFieldsAdd = getFieldData(SettingFormData, 'salesTax');
    }
    let formData = { ...customerSettingFormData };
    formData.formFields = formData.formFields.filter((field) => field.dataField !== 'bankFee');
    const isBankFeePresent = formData.formFields.some((field) => field.dataField === 'cardProcessingCharges');
    const isSalesTaxPresent = isExemptSalesTAX ? formData.formFields.some((field) => field.dataField === 'salesTax') : true;
    if (!isBankFeePresent) {
      const insertIndex = formData.formFields.length - 1;
      let updatedFormFields = [...formData.formFields];
      updatedFormFields.splice(insertIndex, 0, findCreditFields);
      formData.formFields = updatedFormFields;
    }
    else if (!isSalesTaxPresent) {
      const insertIndex = formData.formFields.length - 2;
      let updatedFormFields = [...formData.formFields];
      updatedFormFields.splice(insertIndex, 0, isExemptSalesTAX ? salesTaxFieldsAdd : null);
      formData.formFields = updatedFormFields;
    }
    return formData;
  }

  const handleExcludeCardValue = (isExemptSalesTAX) => {
    let salesTaxFieldsAdd;
    const findCreditFields = getFieldData(SettingFormData, 'bankFee');
    if (isExemptSalesTAX) {
      salesTaxFieldsAdd = getFieldData(SettingFormData, 'salesTax');
    }
    let formData = { ...customerSettingFormData };
    formData.formFields = formData.formFields.filter((field) => field.dataField !== 'cardProcessingCharges');
    const isBankFeePresent = formData.formFields.some((field) => field.dataField === 'bankFee');
    const isSalesTaxPresent = isExemptSalesTAX ? formData.formFields.some((field) => field.dataField === 'salesTax') : true;
    if (!isBankFeePresent) {
      const insertIndex = formData.formFields.length - 1;
      let updatedFormFields = [...formData.formFields];
      if (!isSalesTaxPresent && salesTaxFieldsAdd) {
        updatedFormFields.splice(insertIndex, 0, salesTaxFieldsAdd, findCreditFields);
      } else {
        updatedFormFields.splice(insertIndex, 0, findCreditFields);
      }
      formData.formFields = updatedFormFields;
    } else if (!isSalesTaxPresent) {
      const insertIndex = formData.formFields.length - 2;
      let updatedFormFields = [...formData.formFields];
      updatedFormFields.splice(insertIndex, 0, isExemptSalesTAX ? salesTaxFieldsAdd : null);
      formData.formFields = updatedFormFields;
    }
    return formData;
  }

  const handleDropdownChanges = (data, dataField) => {
    if (dataField === 'paymentMethodId') {
      if (data.value !== PaymentMethodTypes.CREDITCARD) {
        const modifyFormFields = handleExcludeCardValue();
        setCustomerSettingFormData(modifyFormFields);
      } else if (data.value === PaymentMethodTypes.CREDITCARD) {
        const modifyFormFields = handleCrditCardValue();
        setCustomerSettingFormData(modifyFormFields);
      }
      settingFormRef.current.updateFormFieldValue({
        paymentMethodId: data.value
      });
    }
  }
  //** Action Handler */
  const formActionHandler = {
    DDL_CHANGED: handleDropdownChanges,
    CHECK_CHANGE: handleCheckboxChanges
  };

  return (
    <div className="row">
      {!isGetDetailByCustomerIDFetching ?
        <FormCreator
          config={customerSettingFormData}
          ref={settingFormRef}
          key={shouldRerenderFormCreator}
          // {...customerSettingFormData}
          onCheckBoxChange={formActionHandler}
          onActionChange={formActionHandler} />
        : <DataLoader />
      }
      {isEditablePage &&
        showButton ?
        <div className="col-md-12 mt-2 mb-3">
          <div className="d-flex align-item-end justify-content-end">
            <div className="d-flex align-item-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Save"
                onClick={onhandleEdit}
                isLoading={isAddEditCustomerSettingsLoading}
              />
            </div>
          </div>
        </div>
        : null
      }
    </div>
  );
};

export default FinancialSettings;
