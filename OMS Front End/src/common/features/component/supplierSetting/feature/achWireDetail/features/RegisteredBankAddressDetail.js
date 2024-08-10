/* eslint-disable react-hooks/exhaustive-deps */

import FormCreator from "../../../../../../../components/Forms/FormCreator"
import CardSection from "../../../../../../../components/ui/card/CardSection"
import { setDropDownOptionField, setFieldSetting } from "../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../../../app/services/addressAPI";
import { FieldSettingType } from "../../../../../../../utils/Enums/commonEnums";
import { useLazyGetAllCountriesQuery } from "../../../../../../../app/services/basicdetailAPI";

const RegisteredBankAddressDetail = ({ registeredBankAddressData, registeredBankAddressForm, registeredFormRef, isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData }) => {
  const [formData, setFormData] = useState(registeredBankAddressForm);

  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { data: allGetAllStatesData }] = useLazyGetAllStatesQuery();


  useEffect(() => {
    getAllCountries();
    getAllStates();
  }, []);

  useEffect(() => {
    if (isGetACHWireBySupplierIdSuccess && isGetACHWireBySupplierIdData?.recipientAddress) {
      const { recipientAddress } = isGetACHWireBySupplierIdData;
      let data = { ...formData };
      if (recipientAddress.countryId) {
        setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === recipientAddress.countryId);
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
      };
      setFormData(data);
    }
  }, [isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData]);



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
      registeredFormRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
        cityId: null
      });
    } else if (dataField === "stateId") {
      getAllCities(data.value)
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

  return (
    <CardSection cardTitle="Remit To Address">
      <div className="row">
        <FormCreator
          config={formData}
          ref={registeredFormRef}
          // key={shouldRerenderFormCreator}
          {...formData}
          onActionChange={formBackAddressActionHandler}
        />
      </div>
    </CardSection>
  );
};

RegisteredBankAddressDetail.propTypes = {
  registeredBankAddressData: PropTypes.object,
  registeredBankAddressForm: PropTypes.object.isRequired,
  registeredFormRef: PropTypes.shape({
    current: PropTypes.shape({
      updateFormFieldValue: PropTypes.func
    })
  }).isRequired,
  isGetACHWireBySupplierIdSuccess: PropTypes.bool.isRequired,
  isGetACHWireBySupplierIdData: PropTypes.shape({
    recipientAddress: PropTypes.shape({
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
export default RegisteredBankAddressDetail;