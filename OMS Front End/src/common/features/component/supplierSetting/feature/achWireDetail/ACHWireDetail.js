/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import CardSection from "../../../../../../components/ui/card/CardSection";
import FormCreator from "../../../../../../components/FinalForms/FormCreator";
import { achWireFormData } from "../../config/ACHWireForm.data";
import Buttons from "../../../../../../components/ui/button/Buttons";
import { getFieldData, setDropDownOptionField } from "../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useAddEditACHWireMutation, useLazyGetACHWireBySupplierIdQuery } from "../../../../../../app/services/supplierFinancialSettingsAPI";
import ToastService from "../../../../../../services/toastService/ToastService";
import BankAddressDetail from "./features/BankAddressDetail";
import ACHWIreOtherDetails from "./features/ACHWIreOtherDetails";
import { ACHOtherDetailsData } from "../../config/ACHOtherDetails.data";
import { useLazyGetAllCountriesQuery } from "../../../../../../app/services/basicdetailAPI";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../../app/services/addressAPI";
import { bankAddressFormData } from "../../config/BankAddressForm.data";
import DataLoader from "../../../../../../components/ui/dataLoader/DataLoader";
import { getValue } from "../../../../../../utils/CommonUtils/CommonUtilsMethods";


const ACHWireDetail = ({ activeTabIndex, supplierId, financialSettingFormRef, getSupplierCompletionCount }) => {

  const bankFormRef = useRef();
  const aCHWireFormRef = useRef();
  const aCHWireOtherRef = useRef();
  const [achWireData, setAchWireData] = useState(achWireFormData);

  const [getAllStates, { data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [addEditACHWire, { isLoading: isAddEditACHWireLoading, isSuccess: isAddEditACHWireSuccess, data: isAddEditACHWireData }] = useAddEditACHWireMutation();
  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getACHWireBySupplierId, { isFetching: isGetACHWireBySupplierIdFetching, isSuccess: isGetACHWireBySupplierIdSuccess, data: isGetACHWireBySupplierIdData }] = useLazyGetACHWireBySupplierIdQuery();

  useEffect(() => {
    getAllCountries();
    getAllStates();
  }, []);
  useEffect(() => {
    if (!isGetAllCountriesFetching && isGetAllCountriesSuccess && allGetAllCountriesData) {
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', achWireData, 'countryId');
    }
  }, [isGetAllCountriesFetching, isGetAllCountriesSuccess, allGetAllCountriesData]);
  useEffect(() => {
    if (!isGetAllCitiesFetching && isGetAllCitiesSuccess && allGetAllCitiesData) {
      const cities = allGetAllCitiesData.map((item) => ({
        value: item.cityId,
        label: item.name,
      }));
      let data = { ...achWireData };
      const dropdownField = getFieldData(data, 'cityId');
      dropdownField.fieldSetting.options = cities;
      setAchWireData(data);
    }
  }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);
  useEffect(() => {
    if (activeTabIndex === 0 && supplierId > 0) {
      getACHWireBySupplierId(supplierId)
    }
  }, [activeTabIndex]);
  useEffect(() => {
    handleResponse(isAddEditACHWireSuccess, isAddEditACHWireData);
  }, [isAddEditACHWireSuccess, isAddEditACHWireData]);
  useEffect(() => {
    if (!isGetACHWireBySupplierIdFetching && isGetACHWireBySupplierIdSuccess && isGetACHWireBySupplierIdData) {
      let formDataAchWire = { ...achWireData };
      const { bankAddress } = isGetACHWireBySupplierIdData;
      if (bankAddress.countryId) {
        setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', formDataAchWire, 'stateId', item => item.countryId === bankAddress.countryId);
      }
      if (bankAddress.stateId) {
        getAllCities(bankAddress.stateId)
      }
      if (isGetACHWireBySupplierIdData.supplierBankDetailsId) {
        formDataAchWire.initialState = {
          supplierId: supplierId,
          recipientPhoneNumber: isGetACHWireBySupplierIdData.recipientPhoneNumber,
          beneficiaryName: isGetACHWireBySupplierIdData.beneficiaryName,
          addressId: bankAddress.addressId,
          addressLine1Id: bankAddress.addressLine1,
          addressLine2Id: bankAddress.addressLine2,
          countryId: bankAddress.countryId,
          zipCode: bankAddress.zipCode,
          stateId: bankAddress.stateId,
          cityId: bankAddress.cityId,
        }
        setAchWireData(formDataAchWire)
      }
    }
  }, [isGetACHWireBySupplierIdFetching, isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData,]);

  const handleResponse = (success, data) => {
    if (success && data) {
      handleAddResponse(success, data);
    }
  };
  const handleAddResponse = (isSuccess, responseData) => {
    if (isSuccess && responseData) {
      if (responseData.errorMessage && responseData.errorMessage.includes("exists")) {
        ToastService.warning(responseData.errorMessage);
        return;
      }
      ToastService.success(responseData.errorMessage);
      if (supplierId) {
        getACHWireBySupplierId(supplierId)
      }
      getSupplierCompletionCount(supplierId);
    }
  }
  const handleACHWireAdd = async () => {
    const formsupplierFinancialSettings = financialSettingFormRef.current.getFormData();
    const formBankAddress = bankFormRef.current.getFormData();
    const formOtherDetail = aCHWireFormRef.current.getFormData();
    const formAchWireOtherDetail = aCHWireOtherRef.current.getFormData();
    if (formsupplierFinancialSettings && formBankAddress && formOtherDetail) {
      const extractId = (item, key) => (item[key] && typeof item[key] === "object" ? item[key].value : item[key]);
      const req = {
        supplierFinancialSettings: {
          isActive: true,
          supplierId,
          supplierAccountingSettingId: formsupplierFinancialSettings.supplierAccountingSettingId ?? 0,
          paymentTermId: extractId(formsupplierFinancialSettings, 'paymentTermId'),
          invoiceSubmissionMethod: extractId(formsupplierFinancialSettings, 'paymentMethodId'),
          poDeliveryMethodId: extractId(formsupplierFinancialSettings, 'poDeliveryMethodId'),
        },
        beneficiaryDetails: {
          addressId: formOtherDetail.addressId ?? 0,
          addressLine1: formOtherDetail.addressLine1Id,
          addressLine2: formOtherDetail.addressLine2Id,
          cityId: extractId(formOtherDetail, 'cityId'),
          stateId: extractId(formOtherDetail, 'stateId'),
          countryId: extractId(formOtherDetail, 'countryId'),
          zipCode: formOtherDetail.zipCode,
          recipientPhoneNumber: formOtherDetail.recipientPhoneNumber,
          beneficiaryName: formOtherDetail.beneficiaryName,
        },
        bankDetails: {
          addressId: formBankAddress.addressId ?? 0,
          addressLine1: formBankAddress.addressLine1Id,
          addressLine2: formBankAddress.addressLine2Id,
          cityId: extractId(formBankAddress, 'cityId'),
          stateId: extractId(formBankAddress, 'stateId'),
          countryId: extractId(formBankAddress, 'countryId'),
          zipCode: formBankAddress.zipCode,
          bankName: formBankAddress.bankName,
          accountType: extractId(formBankAddress, 'accountType'),
          accountNumber: formBankAddress.accountNumber,
          branchCode: formBankAddress.branchCode,
          ibanNumber: formBankAddress.ibanNumber,
          swiftCode: formBankAddress.swiftCode,
          routingNumber: formBankAddress.routingNumber,
          sortCode: formBankAddress.sortCode,
          bsbNumber: formBankAddress.bsbNumber,
          isAddressInUs: formBankAddress.isAddressInUs,
        },
        otherDetails: {
          messageToRecipientBank: formAchWireOtherDetail.messageToRecipientBank,
          messageToRecipient: formAchWireOtherDetail.messageToRecipient,
        },
        supplierId
      }
      addEditACHWire(req);
    }
  };
  const handleColumnChange = (dataField, updatedData) => {
    const manageData = { ...achWireData };
    const stateId = getValue(updatedData.stateId);
    const countryId = getValue(updatedData.countryId);
    if (dataField === "countryId") {
      setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === countryId);
      setDropDownOptionField(null, 'cityId', 'name', manageData, 'cityId', null);
      manageData.initialState = {
        ...updatedData,
        stateId: null,
        cityId: null
      }
    } else if (dataField === "stateId") {
      getAllCities(stateId);
      manageData.initialState = {
        ...updatedData,
        stateId: stateId,
        countryId: countryId,
        cityId: null
      }
    }
    setAchWireData(manageData);
  }

  if (isGetACHWireBySupplierIdFetching) {
    return <div><DataLoader /></div>;
  }

  return (
    <div className="ach-wire-section">
      <CardSection cardTitle="Beneficiary/Remit To Details">
        <div className="row">
          <FormCreator config={achWireData} onColumnChange={handleColumnChange}
            ref={aCHWireFormRef} />
        </div>
      </CardSection>

      <BankAddressDetail bankFormRef={bankFormRef} bankAddressFormData={bankAddressFormData}
        isGetACHWireBySupplierIdSuccess={isGetACHWireBySupplierIdSuccess}
        isGetACHWireBySupplierIdData={isGetACHWireBySupplierIdData}
      />

      <ACHWIreOtherDetails
        aCHWireOtherRef={aCHWireOtherRef}
        otherData={ACHOtherDetailsData}
        isGetACHWireBySupplierIdSuccess={isGetACHWireBySupplierIdSuccess}
        isGetACHWireBySupplierIdData={isGetACHWireBySupplierIdData}
      />

      <div className="col-md-12">
        <div className="d-flex align-item-end justify-content-end centered" >
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Save"
            onClick={handleACHWireAdd}
            isLoading={isAddEditACHWireLoading}
          />
        </div>
      </div>
    </div>
  );
};

ACHWireDetail.propTypes = {
  activeTabIndex: PropTypes.number.isRequired,
  supplierId: PropTypes.number.isRequired,
  financialSettingFormRef: PropTypes.object.isRequired,
};
export default ACHWireDetail;
