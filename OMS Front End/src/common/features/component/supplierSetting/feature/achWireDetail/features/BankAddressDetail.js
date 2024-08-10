/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormCreator from "../../../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import { setDropDownOptionField, setFieldSetting } from "../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../../../app/services/addressAPI";
import { FieldSettingType } from "../../../../../../../utils/Enums/commonEnums";
import { useLazyGetAllCountriesQuery } from "../../../../../../../app/services/basicdetailAPI";

const BankAddressDetail = ({ bankAddressData, bankAddressFormData, bankFormRef, isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData }) => {
  const [formData, setFormData] = useState(bankAddressFormData);

  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { data: allGetAllStatesData }] = useLazyGetAllStatesQuery();

  useEffect(() => {
    if (isGetACHWireBySupplierIdSuccess && isGetACHWireBySupplierIdData?.bankAddress) {
      const { bankAddress } = isGetACHWireBySupplierIdData;
      let data = { ...formData };
      if (bankAddress.countryId) {
        setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === bankAddress.countryId);
      }

      if (bankAddress.stateId) {
        getAllCities(bankAddress.stateId)
      }

      data.initialState = {
        addressId: bankAddress.addressId,
        addressLine1Id: bankAddress.addressLine1,
        addressLine2Id: bankAddress.addressLine2,
        countryId: bankAddress.countryId,
        zipCode: bankAddress.zipCode,
        stateId: bankAddress.stateId,
        cityId: bankAddress.cityId,
      };
      setFormData(data);
    }
  }, [isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData]);

  useEffect(() => {
    getAllCountries();
    getAllStates();
  }, []);

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

  const formBackAddressActionHandler = {
    DDL_CHANGED: handleChangeBankAddressDropdownList,
  };

  return (
    <CardSection cardTitle="Bank Address">
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
  bankAddressData: PropTypes.object,
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
