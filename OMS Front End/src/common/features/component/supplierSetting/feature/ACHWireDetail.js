/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { achWireFormData } from "../config/ACHWireForm.data";
import Buttons from "../../../../../components/ui/button/Buttons";
import { bankAddressFormData } from "../config/BankAddressForm.data";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useAddEditACHWireMutation, useLazyGetACHWireBySupplierIdQuery } from "../../../../../app/services/supplierFinancialSettingsAPI";
import { useLazyGetAllPaymentTermsQuery } from "../../../../../app/services/customerSettingsAPI";
import { registeredBankAddressForm } from "../config/RegisteredBankAddressForm.data";
import ToastService from "../../../../../services/toastService/ToastService";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";

// const ACHWireDetail = ({ activeTabIndex, supplierId, financialSettingFormRef, getAllCities, getAllStates, getAllCountries, isGetAllCitiesSucess, allGetAllCitiesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCountriesSucess, allGetAllCountriesData }) => {
const ACHWireDetail = ({ activeTabIndex, supplierId, financialSettingFormRef }) => {
  const aCHWireFormRef = useRef();
  const bankFormRef = useRef();
  const registeredFormRef = useRef();
  const [isRecipient, setIsRecipient] = useState(false);
  const [isBankAddress, setIsBankAddress] = useState(false);
  const [recipientStateId, setRecipientStateId] = useState();
  const [bankStateId, setBankStateId] = useState();
  const [achWireData, setAchWireData] = useState(achWireFormData);
  const [bankAddressData, setBankAddressData] = useState(bankAddressFormData);
  const [isbankAddressCityAPI, setIsbankAddressCityAPI] = useState(null);
  const [registeredBankAddressData, setRegisteredBankAddressData] = useState(registeredBankAddressForm);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  const [addEditACHWire, { isLoading: isAddEditACHWireLoading, isSuccess: isAddEditACHWireSuccess, data: isAddEditACHWireData }] = useAddEditACHWireMutation();
  const [getAllPaymentTerms, { isFetching: isGetAllPaymentTermsFetching, isSuccess: isGetAllPaymentTermsSuccess, data: isGetAllPaymentTermsData }] = useLazyGetAllPaymentTermsQuery();
  const [getACHWireBySupplierId, { isFetching: isGetACHWireBySupplierIdFetching, isSuccess: isGetACHWireBySupplierIdSuccess, data: isGetACHWireBySupplierIdData }] = useLazyGetACHWireBySupplierIdQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSucess, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { isSuccess: isGetAllStatesSucess, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
  const [getAllCountries, { isSuccess: isGetAllCountriesSucess, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();

  useEffect(() => {
    getAllCountries();
    getAllStates();
    getAllPaymentTerms();
    // getACHWireBySupplierId(supplierId)
  }, []);

  useEffect(() => {
    if (activeTabIndex === 0) {
      getACHWireBySupplierId(supplierId)
    }
  }, [activeTabIndex])

  useEffect(() => {
    if (isGetAllCountriesSucess && allGetAllCountriesData) {
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', bankAddressFormData, 'countryId');
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', registeredBankAddressForm, 'countryId');
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
    if (isGetAllStatesSucess && allGetAllStatesData) {
      // handleStateOption(allGetAllStatesData);
      handleBankStateOption(allGetAllStatesData);
      handleRegisteredStateOption(allGetAllStatesData);
      // setShouldRerenderFormCreator((prevState) => !prevState);
    }
    if (isGetAllCitiesSucess && allGetAllCitiesData) {
      if (isbankAddressCityAPI) {
        setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', bankAddressFormData, 'cityId');
        // let formDataBank = { ...bankAddressData };
        // formDataBank.initialState = {
        //   cityId: isGetACHWireBySupplierIdData.bankAddress.cityId,
        // };
        // setBankAddressData(formDataBank)
      }
      else if (!isbankAddressCityAPI) {
        setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', registeredBankAddressForm, 'cityId');
        // let formDataRegister = { ...registeredBankAddressData };
        // formDataRegister.initialState = {
        //   cityId: isGetACHWireBySupplierIdData.recipientAddress.cityId,
        // };
        // setRegisteredBankAddressData(formDataRegister)
      }
      // if (!isBankAddress) {
      //   setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', bankAddressFormData, 'cityId');
      // }
      // if (!isRecipient) {
      //   setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', registeredBankAddressForm, 'cityId');
      // }

    }
    if (!isGetAllPaymentTermsFetching && isGetAllPaymentTermsSuccess && isGetAllPaymentTermsData) {
      setDropDownOptionField(isGetAllPaymentTermsData, "paymentTermId", "paymentTerm", achWireFormData, "paymentTermId");
      // setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllPaymentTermsFetching, isGetAllPaymentTermsSuccess, isGetAllPaymentTermsData, isGetAllCountriesSucess,
    allGetAllCountriesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCitiesSucess, allGetAllCitiesData]);

  // useEffect(() => {
  //   if (bankStateId) {
  //     setIsbankAddressCityAPI(true);
  //     setIsBankAddress(true)
  //     getAllCities(bankStateId)
  //   }
  // }, [bankStateId])

  // useEffect(() => {
  //   if (recipientStateId) {
  //     setIsRecipient(true)
  //     setIsbankAddressCityAPI(false);
  //     getAllCities(recipientStateId)
  //   }
  // }, [recipientStateId])

  // const handleStateOption = (responseData) => {
  //   setDropDownOptionField(responseData, 'stateId', 'name', bankAddressFormData, 'stateId');
  //   setDropDownOptionField(responseData, 'stateId', 'name', registeredBankAddressForm, 'stateId');
  // };
  const handleBankStateOption = (responseData) => {
    setDropDownOptionField(responseData, 'stateId', 'name', bankAddressFormData, 'stateId');
    // setDropDownOptionField(responseData, 'stateId', 'name', registeredBankAddressForm, 'stateId');
  };
  const handleRegisteredStateOption = (responseData) => {
    // setDropDownOptionField(responseData, 'stateId', 'name', bankAddressFormData, 'stateId');
    setDropDownOptionField(responseData, 'stateId', 'name', registeredBankAddressForm, 'stateId');
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
      if (supplierId) {
        getACHWireBySupplierId(supplierId)
      }
    }
  }

  const handleGetAllCities = async () => {
    if (isGetACHWireBySupplierIdData.bankAddress.stateId) {
      setIsbankAddressCityAPI(true);
      setBankStateId(isGetACHWireBySupplierIdData.bankAddress.stateId);
      await getAllCities(isGetACHWireBySupplierIdData.bankAddress.stateId).unwrap();
    }

    if (isGetACHWireBySupplierIdData.recipientAddress.stateId) {
      setIsbankAddressCityAPI(false);
      setRecipientStateId(isGetACHWireBySupplierIdData.recipientAddress.stateId);
      await getAllCities(isGetACHWireBySupplierIdData.recipientAddress.stateId).unwrap();
    }
  };

  useEffect(() => {
    if (!isGetACHWireBySupplierIdFetching && isGetACHWireBySupplierIdSuccess && isGetACHWireBySupplierIdData) {

      let formDataAchWire = { ...achWireData };
      let formDataBank = { ...bankAddressData };
      let formDataRegister = { ...registeredBankAddressData };

      if (isGetACHWireBySupplierIdData.bankAddress.countryId) {
        handleBankStateOption(allGetAllStatesData)
      }

      if (isGetACHWireBySupplierIdData.recipientAddress.countryId) {
        handleRegisteredStateOption(allGetAllStatesData)
      }

      if (isGetACHWireBySupplierIdData.bankAddress.stateId) {
        // setIsBankAddress(true)
        setIsbankAddressCityAPI(true);
        setBankStateId(isGetACHWireBySupplierIdData.bankAddress.stateId)
        handleGetAllCities();
      }

      if (isGetACHWireBySupplierIdData.recipientAddress.stateId) {
        // setIsRecipient(true);
        setIsbankAddressCityAPI(false);
        setRecipientStateId(isGetACHWireBySupplierIdData.recipientAddress.stateId)
        handleGetAllCities();
      }

      if (isGetACHWireBySupplierIdData.bankAddress) {
        formDataBank.initialState = {
          addressId: isGetACHWireBySupplierIdData.bankAddress.addressId,
          addressLine1Id: isGetACHWireBySupplierIdData.bankAddress.addressLine1,
          addressLine2Id: isGetACHWireBySupplierIdData.bankAddress.addressLine2,
          cityId: isGetACHWireBySupplierIdData.bankAddress.cityId,
          stateId: isGetACHWireBySupplierIdData.bankAddress.stateId,
          countryId: isGetACHWireBySupplierIdData.bankAddress.countryId,
          zipCode: isGetACHWireBySupplierIdData.bankAddress.zipCode
        };
        setBankAddressData(formDataBank)
      }
      if (isGetACHWireBySupplierIdData.recipientAddress) {
        formDataRegister.initialState = {
          addressId: isGetACHWireBySupplierIdData.recipientAddress.addressId,
          addressLine1Id: isGetACHWireBySupplierIdData.recipientAddress.addressLine1,
          addressLine2Id: isGetACHWireBySupplierIdData.recipientAddress.addressLine2,
          cityId: isGetACHWireBySupplierIdData.recipientAddress.cityId,
          stateId: isGetACHWireBySupplierIdData.recipientAddress.stateId,
          countryId: isGetACHWireBySupplierIdData.recipientAddress.countryId,
          zipCode: isGetACHWireBySupplierIdData.recipientAddress.zipCode
        };
        setRegisteredBankAddressData(formDataRegister)
      }
      if (isGetACHWireBySupplierIdData.supplierBankDetailsId) {
        formDataAchWire.initialState = {
          supplierBankDetailsId: isGetACHWireBySupplierIdData.supplierBankDetailsId,
          bankAddressId: isGetACHWireBySupplierIdData.bankAddressId,
          recipientAddressId: isGetACHWireBySupplierIdData.recipientAddressId,
          supplierId: supplierId,
          messageToRecipient: isGetACHWireBySupplierIdData.messageToRecipient,
          isAddressInUs: isGetACHWireBySupplierIdData.isAddressInUs,
          recipientPhoneNumber: isGetACHWireBySupplierIdData.recipientPhoneNumber,
          paymentTermId: isGetACHWireBySupplierIdData.paymentTermId,
          messageToRecipientBank: isGetACHWireBySupplierIdData.messageToRecipientBank,
          beneficiaryName: isGetACHWireBySupplierIdData.beneficiaryName,
          bankName: isGetACHWireBySupplierIdData.bankName,
          accountType: isGetACHWireBySupplierIdData.accountType,
          accountNumber: isGetACHWireBySupplierIdData.accountNumber,
          branchCode: isGetACHWireBySupplierIdData.branchCode,
          ibanNumber: isGetACHWireBySupplierIdData.ibanNumber,
          swiftCode: isGetACHWireBySupplierIdData.swiftCode,
          routingNumber: isGetACHWireBySupplierIdData.routingNumber,
          sortCode: isGetACHWireBySupplierIdData.sortCode,
          bsbNumber: isGetACHWireBySupplierIdData.bsbNumber,
        }
        setAchWireData(formDataAchWire)
      }
      // setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetACHWireBySupplierIdFetching, isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData,]);


  const handleACHWireAdd = () => {
    let formsupplierFinancialSettings = financialSettingFormRef.current.getFormData()
    let formBankAddress = bankFormRef.current.getFormData();
    let formRegisteredBankAddress = registeredFormRef.current.getFormData();
    let formOtherDetail = aCHWireFormRef.current.getFormData();
    if (formBankAddress && formRegisteredBankAddress && formOtherDetail && formsupplierFinancialSettings) {
      let req = {
        supplierFinancialSettings: {
          isActive: true,
          supplierId: supplierId,
          supplierAccountingSettingId: formsupplierFinancialSettings.supplierAccountingSettingId ? formsupplierFinancialSettings.supplierAccountingSettingId : 0,
          paymentTermId: formsupplierFinancialSettings.paymentTermId && typeof formsupplierFinancialSettings.paymentTermId === "object" ? formsupplierFinancialSettings.paymentTermId.value : formsupplierFinancialSettings.paymentTermId,
          invoiceSubmissionMethod: formsupplierFinancialSettings.paymentMethodId && typeof formsupplierFinancialSettings.paymentMethodId === "object" ? formsupplierFinancialSettings.paymentMethodId.value : formsupplierFinancialSettings.paymentMethodId,
          poDeliveryMethodId: formsupplierFinancialSettings.poDeliveryMethodId && typeof formsupplierFinancialSettings.poDeliveryMethodId === "object" ? formsupplierFinancialSettings.poDeliveryMethodId.value : formsupplierFinancialSettings.poDeliveryMethodId,
        },
        bankAddress: {
          addressId: formBankAddress.addressId ? formBankAddress.addressId : 0,
          addressLine1: formBankAddress.addressLine1Id,
          addressLine2: formBankAddress.addressLine2Id,
          cityId: formBankAddress.cityId && typeof formBankAddress.cityId === "object" ? formBankAddress.cityId.value : formBankAddress.cityId,
          stateId: formBankAddress.stateId && typeof formBankAddress.stateId === "object" ? formBankAddress.stateId.value : formBankAddress.stateId,
          countryId: formBankAddress.countryId && typeof formBankAddress.countryId === "object" ? formBankAddress.countryId.value : formBankAddress.countryId,
          zipCode: formBankAddress.zipCode
        },
        recipientAddress: {
          addressId: formRegisteredBankAddress.addressId ? formRegisteredBankAddress.addressId : 0,
          addressLine1: formRegisteredBankAddress.addressLine1Id,
          addressLine2: formRegisteredBankAddress.addressLine2Id,
          cityId: formRegisteredBankAddress.cityId && typeof formRegisteredBankAddress.cityId === "object" ? formRegisteredBankAddress.cityId.value : formRegisteredBankAddress.cityId,
          stateId: formRegisteredBankAddress.stateId && typeof formRegisteredBankAddress.stateId === "object" ? formRegisteredBankAddress.stateId.value : formRegisteredBankAddress.stateId,
          countryId: formRegisteredBankAddress.countryId && typeof formRegisteredBankAddress.countryId === "object" ? formRegisteredBankAddress.countryId.value : formRegisteredBankAddress.countryId,
          zipCode: formRegisteredBankAddress.zipCode
        },
        supplierBankDetailsId: formOtherDetail.supplierBankDetailsId ? formOtherDetail.supplierBankDetailsId : 0,
        bankAddressId: formOtherDetail.bankAddressId ? formOtherDetail.bankAddressId : 0,
        recipientAddressId: formOtherDetail.recipientAddressId ? formOtherDetail.recipientAddressId : 0,
        supplierId: supplierId,
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
      getAllCities(data.value)
      // setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', manageData, 'cityId', item => item.stateId === data.value);
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
      getAllCities(data.value)
      // setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', manageData, 'cityId', item => item.stateId === data.value);
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
          {/* <Buttons
            buttonTypeClassName="dark-btn ml-5"
            buttonText="Cancel"
          // onClick={onSidebarClose}
          /> */}
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default ACHWireDetail;
