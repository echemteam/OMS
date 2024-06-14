import React, { useContext, useEffect, useRef, useState } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { SettingFormData } from "../config/SettingData";
import Buttons from "../../../../../components/ui/button/Buttons";
import {
  useAddEditCustomerSettingsMutation,
  useLazyGetAllPaymentMethodQuery,
  useLazyGetAllPaymentTermsQuery,
  useLazyGetDetailsbyCustomerIDQuery,
} from "../../../../../app/services/customerSettingsAPI";
import ToastService from "../../../../../services/toastService/ToastService";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";

const FinancialSettings = (props) => {
  const settingFormRef = useRef();
  const { customerId } = useContext(BasicDetailContext);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
  const [customerSettingFormData, setCustomerSettingFormData] =useState(SettingFormData);
  const [ getAllPaymentTerms,{  isFetching: isGetAllPaymentTermsFetching, isSuccess: isGetAllPaymentTermsSuccess, data: isGetAllPaymentTermsData, },] = useLazyGetAllPaymentTermsQuery();
  const [ getAllPaymentMethod, {   isFetching: isGetAllPaymentMethodFetching,   isSuccess: isGetAllPaymentMethodSuccess,  data: isGetAllPaymentMethodData, },] = useLazyGetAllPaymentMethodQuery();
const [ GetDetailsbyCustomerID, {   isFetching: isGetDetailByCustomerIDFetching,  isSuccess: isGetDetailByCustomerIDSuccess,  data: isGetDetailByCustomerIDData,  }, ] = useLazyGetDetailsbyCustomerIDQuery();
const [ addEditCustomerSettings,{ isLoading: isAddEditCustomerSettingsLoading, isSuccess: isAddEditCustomerSettingsSuccess, data: isAddEditCustomerSettingsData, },] = useAddEditCustomerSettingsMutation();
  useEffect(() => {
    if (customerId > 0) GetDetailsbyCustomerID(customerId);
  }, [customerId]);
  useEffect(() => {
    if (  !isGetAllPaymentTermsFetching &&isGetAllPaymentTermsSuccess &&isGetAllPaymentTermsData ) {
      const getData = isGetAllPaymentTermsData.map((item) => ({
        value: item.paymentTermId,
        label: item.paymentTerm,
      }));
      const dropdownField = SettingFormData.formFields.find(
        (item) => item.dataField === "paymentTermId"
      );
      dropdownField.fieldSetting.options = getData;
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllPaymentTermsFetching,isGetAllPaymentTermsSuccess,isGetAllPaymentTermsData, ]);

  useEffect(() => {
    if (  !isGetAllPaymentMethodFetching &&  isGetAllPaymentMethodSuccess &&  isGetAllPaymentMethodData ) {
      const getData = isGetAllPaymentMethodData.map((item) => ({
        value: item.paymentMethodId,
        label: item.method,
      }));
      const dropdownField = SettingFormData.formFields.find(
        (item) => item.dataField === "paymentMethodId"
      );
      dropdownField.fieldSetting.options = getData;
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [ isGetAllPaymentMethodFetching, isGetAllPaymentMethodSuccess, isGetAllPaymentMethodData,
  ]);

  useEffect(() => {

    if ( isGetDetailByCustomerIDSuccess &&  !isGetDetailByCustomerIDFetching &&  isGetDetailByCustomerIDData ) {
      if (isGetDetailByCustomerIDData) {
        let formData = { ...customerSettingFormData };
        formData.initialState = {
          ...customerSettingFormData.initialState,
          customerAccountingSettingId:
            isGetDetailByCustomerIDData.customerAccountingSettingId,
          paymentTermId: isGetDetailByCustomerIDData.paymentTermId,
          creditLimit: isGetDetailByCustomerIDData.creditLimit,
          paymentMethodId: isGetDetailByCustomerIDData.paymentMethodId,
          billingCurrency: isGetDetailByCustomerIDData.billingCurrency,     
        invoiceSubmissionInstruction: isGetDetailByCustomerIDData.invoiceSubmissionInstruction,
        };
        setCustomerSettingFormData(formData);
      }
    }
  }, [  isGetDetailByCustomerIDSuccess, isGetDetailByCustomerIDFetching, isGetDetailByCustomerIDData,
  ]);
  useEffect(() => {
    if (isAddEditCustomerSettingsSuccess && isAddEditCustomerSettingsData) {
      if (props.onSuccess) {
        props.onSuccess();
      }
      ToastService.success(isAddEditCustomerSettingsData.errorMessage);
    }
  }, [isAddEditCustomerSettingsSuccess, isAddEditCustomerSettingsData]);

  const onhandleEdit = () => {
    const settingFormData = settingFormRef.current.getFormData();
    if (settingFormData && !settingFormData.customerAccountingSettingId) {
      const request = {
        ...settingFormData,
        customerId: customerId,
        paymentTermId: settingFormData.paymentTermId.value,

        paymentMethodId: settingFormData.paymentMethodId.value,
      };
      addEditCustomerSettings(request);
    } else if (settingFormData && settingFormData.customerAccountingSettingId) {
      const updaterequest = {
        ...settingFormData,
        customerAccountingSettingId:
          settingFormData.customerAccountingSettingId,
          customerId: customerId,
        paymentTermId:
          settingFormData.paymentTermId &&
          typeof settingFormData.paymentTermId === "object"
            ? settingFormData.paymentTermId.value
            : settingFormData.paymentTermId,
        paymentMethodId:
          settingFormData.paymentMethodId &&
          typeof settingFormData.paymentMethodId === "object"
            ? settingFormData.paymentMethodId.value
            : settingFormData.paymentMethodId,
      };
      addEditCustomerSettings(updaterequest);
    }
  };

  useEffect(() => {
    getAllPaymentTerms();
    getAllPaymentMethod();
  }, []);
  return (
    <>
      <div className="row horizontal-form">
        <FormCreator
          config={customerSettingFormData}
          ref={settingFormRef}
          key={shouldRerenderFormCreator}
          {...customerSettingFormData}
          // onFormDataUpdate={handleFormDataChange}
        />
        <div className="col-md-12 mt-2">
          <div className="d-flex align-item-end justify-content-end">
            <div className="d-flex align-item-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Save"
                onClick={onhandleEdit}
                isLoading={isAddEditCustomerSettingsLoading}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialSettings;
