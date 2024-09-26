/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Libs's */
import { SettingFormData } from "./config/SettingData";
import { securityKey } from "../../../../data/SecurityKey";
import Buttons from "../../../../components/ui/button/Buttons";
import FormCreator from "../../../../components/Forms/FormCreator";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import { getFieldData, setDropDownOptionField, setFieldSetting } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { CountryId, PaymentMethodTypes } from "../../../../utils/Enums/commonEnums";
import PropTypes from "prop-types";
//** Service's */
import ToastService from "../../../../services/toastService/ToastService";
import { useAddEditCustomerSettingsMutation, useLazyGetAllPaymentMethodQuery, useLazyGetAllPaymentTermsQuery, useLazyGetDetailsbyCustomerIDQuery, } from "../../../../app/services/customerSettingsAPI";
import { useValidateAndAddApprovalRequests } from "../../../../utils/CustomHook/useValidateAndAddApproval";
import { isCustomerOrSupplierApprovedStatus } from "../../../../utils/CustomerSupplier/CustomerSupplierUtils";
import { SuccessMessage } from "../../../../data/appMessages";
import SwalAlert from "../../../../services/swalService/SwalService";

const ExemptSalesTax = { exemptSalesTax: true };

const FinancialSettings = ({ isEditablePage, customerStatusId }) => {

  const settingFormRef = useRef();
  const { success } = SwalAlert();
  const [isBankFee, setIsBankFee] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [isCardCharges, setIsCardCharges] = useState(false);
  const { ValidateRequestByApprovalRules, isApprovelLoading } = useValidateAndAddApprovalRequests();
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
  const [customerSettingFormData, setCustomerSettingFormData] = useState(SettingFormData);
  const [customerAccountingSettingId, setCustomerAccountingSettingId] = useState(0);
  const approvalMessages = [];
  const { customerId, customerCountryId, setCustomerCountryId, isResponsibleUser, settingRef, activeTab, setIsExistsFinancialSetting, financialRef,
    subCustomer, getCustomerCompletionCount } = useContext(BasicDetailContext);

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
    setCustomerAccountingSettingId(0);
    // removeCardProcessCharge();
  }, []);


  useEffect(() => {
    if (!isEditablePage && activeTab === 3) {
      if (ExemptSalesTax.exemptSalesTax) {
        handleCheckboxChanges(true, "exemptSalesTax")
      }
    }
  }, [activeTab])

  useEffect(() => {
    if (customerCountryId) {
      GetDetailsbyCustomerID(customerId);
      addRemoveBankFee();
    }
  }, [customerCountryId, setCustomerCountryId, customerStatusId])

  useEffect(() => {
    if (customerId > 0) {
      GetDetailsbyCustomerID(customerId);
      addRemoveBankFee();
    };
  }, [customerId]);

  useEffect(() => {
    let formData = { ...customerSettingFormData };
    const isBankFeePresent = formData.formFields.some((field) => field.dataField === 'bankWireFee');
    const isCardPresent = formData.formFields.some((field) => field.dataField === 'cardProcessingCharges');
    if (isBankFeePresent) {
      setIsBankFee(true);
    } else if (!isBankFeePresent) {
      setIsBankFee(false);
    }
    if (isCardPresent) {
      setIsCardCharges(true);
    } else if (!isCardPresent) {
      setIsCardCharges(false);
    }
  }, [customerSettingFormData])

  const addRemoveBankFee = () => {
    let updatedFormFields;
    let formData = { ...customerSettingFormData };
    const isBankFeePresent = formData.formFields.some((field) => field.dataField === 'bankWireFee');
    const isSalesTaxPresent = formData.formFields.some((field) => field.dataField === 'salesTax');
    if (customerCountryId === CountryId.USA) {
      updatedFormFields = formData.formFields.filter((field) => field.dataField !== 'bankWireFee');
      formData.formFields = updatedFormFields
    } else if (customerCountryId !== CountryId.USA && !isBankFeePresent) {
      const findBankFields = getFieldData(SettingFormData, 'bankWireFee');
      const insertIndex = formData.formFields.length - 1;
      updatedFormFields = [...formData.formFields];
      updatedFormFields.splice(insertIndex, 0, findBankFields);
      formData.formFields = updatedFormFields;
    }
    if (!isSalesTaxPresent) {
      const findSalesTaxFields = getFieldData(SettingFormData, 'salesTax');
      const insertIndex = formData.formFields.length - 2;
      updatedFormFields = [...formData.formFields];
      updatedFormFields.splice(insertIndex, 0, findSalesTaxFields);
      formData.formFields = updatedFormFields;
    }
    formData.formFields = formData.formFields.filter((field) => field.dataField !== 'cardProcessingCharges');
    setCustomerSettingFormData(formData);
  }

  useEffect(() => {
    if (isGetAllPaymentTermsSuccess && isGetAllPaymentTermsData) {
      setDropDownOptionField(isGetAllPaymentTermsData, "paymentTermId", "paymentTerm", SettingFormData, "paymentTermId");
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllPaymentTermsSuccess, isGetAllPaymentTermsData]);

  useEffect(() => {
    if (isGetAllPaymentMethodSuccess && isGetAllPaymentMethodData) {
      setDropDownOptionField(isGetAllPaymentMethodData, "paymentMethodId", "method", SettingFormData, "paymentMethodId");
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllPaymentMethodSuccess, isGetAllPaymentMethodData]);

  useEffect(() => {
    if (!isGetDetailByCustomerIDFetching && isGetDetailByCustomerIDSuccess && isGetDetailByCustomerIDData) {
      if (isGetDetailByCustomerIDData) {
        if (isCustomerOrSupplierApprovedStatus(customerStatusId)) {
          setFieldSetting(customerSettingFormData, 'billingCurrency', 'isDisabled', true);
        } else {
          setFieldSetting(customerSettingFormData, 'billingCurrency', 'isDisabled');
        }
        let modifyFormFields;
        if (isGetDetailByCustomerIDData.paymentMethodId !== PaymentMethodTypes.CREDITCARD) {
          setIsBankFee(true);
          setIsCardCharges(false);
          modifyFormFields = handleExcludeCardValue(isGetDetailByCustomerIDData.paymentMethodId, false);
        } else if (isGetDetailByCustomerIDData.paymentMethodId === PaymentMethodTypes.CREDITCARD) {
          setIsBankFee(false);
          setIsCardCharges(true);
          modifyFormFields = handleCrditCardValue(isGetDetailByCustomerIDData.paymentMethodId, false);
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
          bankWireFee: isGetDetailByCustomerIDData.bankWireFee,
          salesTax: isGetDetailByCustomerIDData.salesTax,
          exemptSalesTax: isGetDetailByCustomerIDData.exemptSalesTax,
          cardProcessingCharges: isGetDetailByCustomerIDData.cardProcessingCharges,
        };
        if (isGetDetailByCustomerIDData.exemptSalesTax) {
          formData.formFields = formData.formFields.filter((field) => field.dataField !== 'salesTax');
        } else {
          const isBankFeePresent = formData.formFields.some((field) => field.dataField === 'bankWireFee');
          const isCardPresent = formData.formFields.some((field) => field.dataField === 'cardProcessingCharges');
          const isSalesTaxPresent = formData.formFields.some((field) => (field.dataField === 'salesTax'));
          if (!isSalesTaxPresent) {
            const findSalesTaxFields = getFieldData(SettingFormData, 'salesTax');
            let setIndex;
            if ((isBankFeePresent && !isCardPresent) || (!isBankFeePresent && isCardPresent)) {
              setIndex = 2;
            } else if (isBankFeePresent && isCardPresent) {
              setIndex = 3;
            }
            else {
              setIndex = 1;
            }
            const insertIndex = formData.formFields.length - setIndex;
            let updatedFormFields = [...formData.formFields];
            updatedFormFields.splice(insertIndex, 0, findSalesTaxFields);
            formData.formFields = updatedFormFields;
          }
        }
        setCustomerSettingFormData(formData);
        setShouldRerenderFormCreator((prevState) => !prevState);
      }
    } else {
      if (isEditablePage && activeTab === 0) {
        if (ExemptSalesTax.exemptSalesTax) {
          handleCheckboxChanges(true, "exemptSalesTax")
        }
      }
    }
  }, [isGetDetailByCustomerIDFetching, isGetDetailByCustomerIDSuccess, isGetDetailByCustomerIDData,]);

  useEffect(() => {
    if (isAddEditCustomerSettingsSuccess && isAddEditCustomerSettingsData) {
      ToastService.success(isAddEditCustomerSettingsData.errorMessage);
      setIsExistsFinancialSetting(true);
      setCustomerAccountingSettingId(isAddEditCustomerSettingsData.keyValue);
      if (financialRef.current) {
        financialRef.current.handleGetDefaultList();
      }
      getCustomerCompletionCount(customerId, subCustomer);
    }
  }, [isAddEditCustomerSettingsSuccess, isAddEditCustomerSettingsData]);

  useImperativeHandle(settingRef, () => ({
    onhandleEdit,
  }));

  const onhandleEdit = async () => {
    const settingFormData = settingFormRef.current.getFormData();
    const accountingSettingId = settingFormData.customerAccountingSettingId ? settingFormData.customerAccountingSettingId : customerAccountingSettingId;
    if (settingFormData && !accountingSettingId) {
      const request = {
        ...settingFormData,
        customerId: customerId,
        paymentTermId: settingFormData.paymentTermId.value,
        paymentMethodId: settingFormData.paymentMethodId.value,
        billingCurrency: !settingFormData.billingCurrency?.value ? settingFormData.billingCurrency : settingFormData.billingCurrency.value,
        bankWireFee: settingFormData.bankWireFee && isBankFee ? settingFormData.bankWireFee : null,
        salesTax: settingFormData.salesTax && !settingFormData.exemptSalesTax ? settingFormData.salesTax : null,
        exemptSalesTax: settingFormData.exemptSalesTax,
        cardProcessingCharges: settingFormData.cardProcessingCharges && isCardCharges ? settingFormData.cardProcessingCharges : null,
      };
      addEditCustomerSettings(request);
    } else if (settingFormData && accountingSettingId) {
      const updaterequest = updateRequestObj(settingFormData, accountingSettingId);
      addEditCustomerSettings(updaterequest);
    }
  };

  const updateRequestObj = (data, accountingSettingId) => {
    return {
      ...data,
      customerAccountingSettingId: data.customerAccountingSettingId ? data.customerAccountingSettingId : accountingSettingId,
      customerId: customerId,
      paymentTermId: data.paymentTermId && typeof data.paymentTermId === "object"
        ? data.paymentTermId.value : data.paymentTermId,
      paymentMethodId: data.paymentMethodId && typeof data.paymentMethodId === "object"
        ? data.paymentMethodId.value : data.paymentMethodId,
      billingCurrency: data.billingCurrency && typeof data.billingCurrency === "object"
        ? data.billingCurrency.value : data.billingCurrency,
      bankWireFee: data.bankWireFee && isBankFee ? data.bankWireFee : null,
      salesTax: data.salesTax && !data.exemptSalesTax ? data.salesTax : null,
      exemptSalesTax: data.exemptSalesTax,
      cardProcessingCharges: data.cardProcessingCharges && isCardCharges ? data.cardProcessingCharges : null,
    };
  }

  const handleSalesTax = (data, dataField) => {
    if (dataField === 'exemptSalesTax' && data) {
      let formData = { ...customerSettingFormData };
      formData.formFields = formData.formFields.filter((field) => field.dataField !== 'salesTax');
      setCustomerSettingFormData(formData);
    } else if (dataField === 'exemptSalesTax' && !data) {
      let updatedFormFields;
      let formData = { ...customerSettingFormData };
      const isBankFeePresent = formData.formFields.some((field) => field.dataField === 'bankWireFee');
      const isCardPresent = formData.formFields.some((field) => field.dataField === 'cardProcessingCharges');
      let setIndex;
      if ((isBankFeePresent && !isCardPresent) || (!isBankFeePresent && isCardPresent)) {
        setIndex = 2;
      } else if (isBankFeePresent && isCardPresent) {
        setIndex = 3;
      } else {
        setIndex = 1;
      }
      const isSalesTaxPresent = formData.formFields.some((field) => (field.dataField === 'salesTax'));
      if (!isSalesTaxPresent) {
        const findSalesTaxFields = getFieldData(SettingFormData, 'salesTax');
        const insertIndex = formData.formFields.length - setIndex;
        updatedFormFields = [...formData.formFields];
        updatedFormFields.splice(insertIndex, 0, findSalesTaxFields);
        formData.formFields = updatedFormFields;
        const getFormData = settingFormRef.current.getFormDataWithoutValidation();
        formData.initialState = { ...getFormData, exemptSalesTax: data, salesTax: '' };
        setCustomerSettingFormData(formData);
      }
    }
  }

  const handleCheckboxChanges = (data, dataField) => {
    handleSalesTax(data, dataField);
  };

  const handleCrditCardValue = (dropdownValue, isHandleChange) => {
    let findCreditFields = getFieldData(SettingFormData, 'cardProcessingCharges');
    let formData = { ...customerSettingFormData };
    if (customerCountryId === CountryId.USA) {
      formData.formFields = formData.formFields.filter((field) => field.dataField !== 'bankWireFee');
    }
    let value = isHandleChange ? dropdownValue.value : dropdownValue;
    if (customerCountryId !== CountryId.USA && value === PaymentMethodTypes.CREDITCARD) {
      formData.formFields = formData.formFields.filter((field) => field.dataField !== 'bankWireFee');
    }
    const isCardChargePresent = formData.formFields.some((field) => field.dataField === 'cardProcessingCharges');
    if (!isCardChargePresent) {
      const insertIndex = formData.formFields.length - 1;
      let updatedFormFields = [...formData.formFields];
      updatedFormFields.splice(insertIndex, 0, findCreditFields);
      formData.formFields = updatedFormFields;
    }
    const getFormData = settingFormRef.current.getFormDataWithoutValidation();
    formData.initialState = { ...getFormData, paymentMethodId: dropdownValue, bankWireFee: '' };
    return formData;
  }

  const handleExcludeCardValue = (dropdownValue, isHandleChange) => {
    let value = isHandleChange ? dropdownValue.value : dropdownValue;
    const findCreditFields = getFieldData(SettingFormData, 'bankWireFee');
    let formData = { ...customerSettingFormData };
    formData.formFields = formData.formFields.filter((field) => field.dataField !== 'cardProcessingCharges');
    const isBankFeePresent = formData.formFields.some((field) => field.dataField === 'bankWireFee');
    if (!isBankFeePresent && value !== PaymentMethodTypes.ACHECHECK) {
      const insertIndex = formData.formFields.length - 1;
      let updatedFormFields = [...formData.formFields];
      if (customerCountryId !== CountryId.USA) {
        updatedFormFields.splice(insertIndex, 0, findCreditFields);
      }
      formData.formFields = updatedFormFields;
    } else if (isBankFeePresent) {
      if (customerCountryId === CountryId.USA || value === PaymentMethodTypes.ACHECHECK) {
        let updatedFormFields = [...formData.formFields];
        formData.formFields = formData.formFields.filter((field) => field.dataField !== 'bankWireFee');
        updatedFormFields = [...formData.formFields];
        formData.formFields = updatedFormFields;
      }
    }
    if (customerCountryId !== CountryId.USA && value === PaymentMethodTypes.CREDITCARD) {
      formData.formFields = formData.formFields.filter((field) => field.dataField !== 'bankWireFee');
    }
    const getFormData = settingFormRef.current.getFormDataWithoutValidation();
    formData.initialState = { ...getFormData, paymentMethodId: dropdownValue, cardProcessingCharges: '' };
    return formData;
  }

  const handleDropdownChanges = (data, dataField) => {
    if (dataField === 'paymentMethodId') {
      if (data.value !== PaymentMethodTypes.CREDITCARD) {
        setIsBankFee(true);
        setIsCardCharges(false);
        const modifyFormFields = handleExcludeCardValue(data, true);
        setCustomerSettingFormData(modifyFormFields);
      } else if (data.value === PaymentMethodTypes.CREDITCARD) {
        setIsBankFee(false);
        setIsCardCharges(true);
        const modifyFormFields = handleCrditCardValue(data, true);
        setCustomerSettingFormData(modifyFormFields);
      }
    }
  }
  //** Action Handler */
  const formActionHandler = {
    DDL_CHANGED: handleDropdownChanges,
    CHECK_CHANGE: handleCheckboxChanges
  };

  return (
    <div className="row">
      {/* <Masking type="currency" currencyCode="USD" currencySymbol="$" maxLength={4} /> */}
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
                isLoading={isApprovelLoading || isAddEditCustomerSettingsLoading}
              />
            </div>
          </div>
        </div>
        : null
      }
    </div>
  );
};

FinancialSettings.propTypes = {
  isEditablePage: PropTypes.bool.isRequired,
};

export default FinancialSettings;
