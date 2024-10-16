/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormCreator from "../../../../../../../components/FinalForms/FormCreator";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import { getFieldData, setDropDownOptionField } from "../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../../../app/services/addressAPI";
import { useLazyGetAllCountriesQuery } from "../../../../../../../app/services/basicdetailAPI";
import { useLazyGetAllAccountTypeQuery } from '../../../../../../../app/services/commonAPI';
import { getValue } from '../../../../../../../utils/CommonUtils/CommonUtilsMethods';

const BankAddressDetail = ({ bankAddressFormData, bankFormRef, isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData }) => {

  const [stateValue, setStateValue] = useState(false);
  const [formData, setFormData] = useState(bankAddressFormData);

  const [getAllStates, { data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllAccountType, { isFetching: isGetAllAccountTypeFetching, isSuccess: isGetAllAccountTypeSuccess, data: isGetAllAccountTypeData }] = useLazyGetAllAccountTypeQuery();

  useEffect(() => {
    getAllCountries();
    getAllStates();
    getAllAccountType();
  }, []);
  useEffect(() => {
    if (!isGetAllAccountTypeFetching && isGetAllAccountTypeSuccess && isGetAllAccountTypeData) {
      setDropDownOptionField(isGetAllAccountTypeData, "accountType", "accountType", bankAddressFormData, "accountType");
    }
  }, [isGetAllAccountTypeData, isGetAllAccountTypeSuccess, isGetAllAccountTypeFetching]);
  useEffect(() => {
    if (!isGetAllCountriesFetching && isGetAllCountriesSuccess && allGetAllCountriesData) {
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', formData, 'countryId');
    }
  }, [isGetAllCountriesFetching, isGetAllCountriesSuccess, allGetAllCountriesData]);
  useEffect(() => {
    if (!isGetAllCitiesFetching && isGetAllCitiesSuccess && allGetAllCitiesData) {
      const cities = allGetAllCitiesData.map((item) => ({
        value: item.cityId,
        label: item.name,
      }));
      let data = { ...formData };
      const dropdownField = getFieldData(data, 'cityId');
      dropdownField.fieldSetting.options = cities;
      setFormData(data);
    }
  }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);
  useEffect(() => {
    if (isGetACHWireBySupplierIdData?.recipientAddress) {
      if (allGetAllStatesData) {
        let data = { ...formData };
        setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === isGetACHWireBySupplierIdData.recipientAddress.countryId);
      }
    }
  }, [stateValue]);
  useEffect(() => {
    if (isGetACHWireBySupplierIdSuccess && isGetACHWireBySupplierIdData?.recipientAddress) {
      const { recipientAddress } = isGetACHWireBySupplierIdData;
      let data = { ...formData };
      if (recipientAddress.countryId) {
        setStateValue(true);
      }
      if (recipientAddress.stateId) {
        getAllCities(recipientAddress.stateId)
      }
      data.initialState = {
        addressId: recipientAddress.addressId,
        addressLine1Id: recipientAddress.addressLine1,
        addressLine2Id: recipientAddress.addressLine2,
        countryId: recipientAddress.countryId,
        zipCode: recipientAddress.zipCode,
        stateId: recipientAddress.stateId,
        cityId: recipientAddress.cityId,
        supplierBankDetailsId: isGetACHWireBySupplierIdData.supplierBankDetailsId,
        bankAddressId: isGetACHWireBySupplierIdData.bankAddressId,
        recipientAddressId: isGetACHWireBySupplierIdData.recipientAddressId,
        isAddressInUs: isGetACHWireBySupplierIdData.isAddressInUs,
        bankName: isGetACHWireBySupplierIdData.bankName,
        accountType: isGetACHWireBySupplierIdData.accountType,
        accountNumber: isGetACHWireBySupplierIdData.accountNumber,
        branchCode: isGetACHWireBySupplierIdData.branchCode,
        ibanNumber: isGetACHWireBySupplierIdData.ibanNumber,
        swiftCode: isGetACHWireBySupplierIdData.swiftCode,
        routingNumber: isGetACHWireBySupplierIdData.routingNumber,
        sortCode: isGetACHWireBySupplierIdData.sortCode,
        bsbNumber: isGetACHWireBySupplierIdData.bsbNumber,
      };
      setFormData(data);
    }
  }, [isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData]);

  const handleColumnChange = (dataField, updatedData) => {
    const manageData = { ...formData };
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
    setFormData(manageData);
  }

  return (
    <CardSection cardTitle="Bank Information">
      <div className="row">
        <FormCreator config={formData} ref={bankFormRef}
          onColumnChange={handleColumnChange} />
      </div>
    </CardSection>
  );
};

BankAddressDetail.propTypes = {
  bankAddressFormData: PropTypes.object.isRequired,
  bankFormRef: PropTypes.shape({
    current: PropTypes.shape({
      updateFormFieldValue: PropTypes.func
    })
  }).isRequired,
  isGetACHWireBySupplierIdSuccess: PropTypes.bool.isRequired,
  isGetACHWireBySupplierIdData: PropTypes.shape({
    bankAddress: PropTypes.shape({
      addressId: PropTypes.number,
      addressLine1: PropTypes.string,
      addressLine2: PropTypes.string,
      countryId: PropTypes.number,
      zipCode: PropTypes.number,
      stateId: PropTypes.number,
      cityId: PropTypes.number,
    })
  })
};

export default BankAddressDetail;
