/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormCreator from "../../../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import { setDropDownOptionField, setFieldSetting } from "../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../../../app/services/addressAPI";
import { FieldSettingType } from "../../../../../../../utils/Enums/commonEnums";
import { useLazyGetAllCountriesQuery } from "../../../../../../../app/services/basicdetailAPI";
import { useLazyGetAllAccountTypeQuery } from '../../../../../../../app/services/commonAPI';

const BankAddressDetail = ({ bankAddressFormData, bankFormRef, isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData }) => {
  const [formData, setFormData] = useState(bankAddressFormData);
  const [stateValue, setStateValue] = useState(false)

  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
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
      const dropdownField = data?.formFields?.find(data => data.id === "cityId");
      dropdownField.fieldSetting.options = cities;
      setFormData(data);
    }
  }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);


  const handleChangeBankAddressDropdownList = (data, dataField) => {
    const manageData = { ...formData };
    if (dataField === "countryId") {
      setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
      setDropDownOptionField(null, 'cityId', 'name', manageData, 'cityId', null);
      setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
      bankFormRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
        cityId: null
      });
    } else if (dataField === "stateId") {
      getAllCities(data.value)
      setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
      bankFormRef.current.updateFormFieldValue({
        stateId: data.value,
        cityId: null,
      });
    }
    setFormData(manageData);
  };

  useEffect(() => {
    if (isGetACHWireBySupplierIdData?.recipientAddress) {
      if (allGetAllStatesData) {
      let data = { ...formData };
        setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === isGetACHWireBySupplierIdData.recipientAddress.countryId);
      }
    }
  }, [stateValue])

  useEffect(() => {
    if (isGetACHWireBySupplierIdSuccess && isGetACHWireBySupplierIdData?.recipientAddress) {
      const { recipientAddress } = isGetACHWireBySupplierIdData;
      let data = { ...formData };
      if (recipientAddress.countryId) {
        setStateValue(true)
        // setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === recipientAddress.countryId);
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
        // messageToRecipient: bankAddress.messageToRecipient,
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



  const formBackAddressActionHandler = {
    DDL_CHANGED: handleChangeBankAddressDropdownList,
  };

  return (
    <CardSection cardTitle="Bank Address Details">
      <div className="row">
        <FormCreator
          config={formData}
          ref={bankFormRef}
          {...formData}
          onActionChange={formBackAddressActionHandler}
        />
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
