import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import FormCreator from "../../../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import { setDropDownOptionField, setFieldSetting } from "../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../../../app/services/addressAPI";
import { FieldSettingType } from "../../../../../../../utils/Enums/commonEnums";
import { useLazyGetAllCountriesQuery } from "../../../../../../../app/services/basicdetailAPI";

const BankAddressDetail = ({ bankAddressData, bankAddressFormData, bankFormRef, isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData }) => {
  const isInitialSetupRef = useRef(true); // Flag to indicate initial setup
  const [formData, setFormData] = useState(bankAddressFormData);
  const [activeCountryId, setActiveCountryId] = useState(0);
  const [activeStateId, setActiveStateId] = useState(0);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { isSuccess: isGetAllStatesSuccess, isFetching: isGetAllStatesFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();

  useEffect(() => {
    if (isGetACHWireBySupplierIdSuccess && isGetACHWireBySupplierIdData?.bankAddress) {
      const { bankAddress } = isGetACHWireBySupplierIdData;
      setFormData(prevData => ({
        ...prevData,
        initialState: {
          addressId: bankAddress.addressId,
          addressLine1Id: bankAddress.addressLine1,
          addressLine2Id: bankAddress.addressLine2,
          countryId: bankAddress.countryId,
          zipCode: bankAddress.zipCode,
          stateId: bankAddress.stateId,
          cityId: bankAddress.cityId,
        }
      }));
      setActiveCountryId(bankAddress.countryId ?? 0);
    }
  }, [isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData]);

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  useEffect(() => {
    if (!isGetAllCountriesFetching && isGetAllCountriesSuccess && allGetAllCountriesData) {
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', formData, 'countryId');
    }
  }, [isGetAllCountriesFetching, isGetAllCountriesSuccess, allGetAllCountriesData]);

  useEffect(() => {
    if (activeCountryId > 0) {
      getAllStates();
    }
  }, [activeCountryId]);

  useEffect(() => {
    if (activeStateId > 0) {
      getAllCities(activeStateId);
    }
  }, [activeStateId, getAllCities]);

  useEffect(() => {
    if (!isGetAllStatesFetching && isGetAllStatesSuccess && allGetAllStatesData) {
      const filteredData = allGetAllStatesData.filter(item => item.countryId === activeCountryId);
      setDropDownOptionField(filteredData, 'stateId', 'name', formData, 'stateId');
      if (isInitialSetupRef.current && isGetACHWireBySupplierIdData?.bankAddress.stateId) {
        setFormData(prevData => ({
          ...prevData,
          initialState: {
            ...prevData.initialState,
            stateId: isGetACHWireBySupplierIdData.bankAddress.stateId,
          }
        }));
        setActiveStateId(isGetACHWireBySupplierIdData.bankAddress.stateId ?? 0);
      }
    }
  }, [isGetAllStatesFetching, isGetAllStatesSuccess, allGetAllStatesData]);



  useEffect(() => {
    if (!isGetAllCitiesFetching && isGetAllCitiesSuccess && allGetAllCitiesData) {
      setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', formData, 'cityId');
      if (isInitialSetupRef.current && isGetACHWireBySupplierIdData?.bankAddress.cityId) {
        setFormData(prevData => ({
          ...prevData,
          initialState: {
            ...prevData.initialState,
            cityId: isGetACHWireBySupplierIdData.bankAddress.cityId,
          }
        }));
        isInitialSetupRef.current = false; // Mark initial setup as done
      }
    }
  }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);

  const handleChangeBankAddressDropdownList = (data, dataField) => {
    const manageData = { ...formData };
    if (dataField === "countryId") {
      setActiveCountryId(data?.value);
      setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
      setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, true);
      bankFormRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
        cityId: null,
      });
    } else if (dataField === "stateId") {
      setActiveStateId(data?.value);
      setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
      bankFormRef.current.updateFormFieldValue({
        stateId: data.value,
        cityId: null,
      });
    }
    setFormData(manageData);
    // setShouldRerenderFormCreator(prev => !prev)
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
          key={shouldRerenderFormCreator}
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
