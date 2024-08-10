
import FormCreator from "../../../../../../../components/Forms/FormCreator"
import CardSection from "../../../../../../../components/ui/card/CardSection"
import { setDropDownOptionField, setFieldSetting } from "../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../../../app/services/addressAPI";
import { FieldSettingType } from "../../../../../../../utils/Enums/commonEnums";
import { useLazyGetAllCountriesQuery } from "../../../../../../../app/services/basicdetailAPI";

const RegisteredBankAddressDetail = ({ registeredBankAddressData, registeredBankAddressForm, registeredFormRef, isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData }) => {
  const isInitialSetupRef = useRef(true); // Flag to indicate initial setup
  const [formData, setFormData] = useState(registeredBankAddressForm);
  const [activeCountryId, setActiveCountryId] = useState(0);
  const [activeStateId, setActiveStateId] = useState(0);
  // const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { isSuccess: isGetAllStatesSuccess, isFetching: isGetAllStatesFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();

  useEffect(() => {
    if (isGetACHWireBySupplierIdSuccess && isGetACHWireBySupplierIdData?.recipientAddress) {
      const { recipientAddress } = isGetACHWireBySupplierIdData;
      setFormData(prevData => ({
        ...prevData,
        initialState: {
          addressId: recipientAddress.addressId,
          addressLine1Id: recipientAddress.addressLine1,
          addressLine2Id: recipientAddress.addressLine2,
          countryId: recipientAddress.countryId,
          zipCode: recipientAddress.zipCode,
          stateId: recipientAddress.stateId,
          cityId: recipientAddress.cityId,
        }
      }));
      setActiveCountryId(recipientAddress.countryId ?? 0);
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

  

  // useEffect(() => {
  //   if (!isGetAllStatesFetching && isGetAllStatesSuccess && allGetAllStatesData) {
  //     const filteredData = allGetAllStatesData.filter(item => item.countryId === activeCountryId);
  //     setDropDownOptionField(filteredData, 'stateId', 'name', formData, 'stateId');
  //     if (isInitialSetupRef.current && isGetACHWireBySupplierIdData?.recipientAddress.stateId) {
  //       setFormData(prevData => ({
  //         ...prevData,
  //         initialState: {
  //           ...prevData.initialState,
  //           stateId: isGetACHWireBySupplierIdData.recipientAddress.stateId,
  //         }
  //       }));
  //       setActiveStateId(isGetACHWireBySupplierIdData.bankAddress.stateId ?? 0);
  //     }
  //   }
  // }, [isGetAllStatesFetching, isGetAllStatesSuccess, allGetAllStatesData]);

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
      // setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', addressFormData, 'cityId');
    }
  }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);

  // useEffect(() => {
  //   if (!isGetAllCitiesFetching && isGetAllCitiesSuccess && allGetAllCitiesData) {
  //     setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', formData, 'cityId');
  //     if (isInitialSetupRef.current && isGetACHWireBySupplierIdData?.recipientAddress.cityId) {
  //       setFormData(prevData => ({
  //         ...prevData,
  //         initialState: {
  //           ...prevData.initialState,
  //           cityId: isGetACHWireBySupplierIdData.recipientAddress.cityId,
  //         }
  //       }));
  //       isInitialSetupRef.current = false; // Mark initial setup as done
  //     }
  //   }
  // }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);

  const handleChangeBankAddressDropdownList = (data, dataField) => {
    const manageData = { ...formData };
    if (dataField === "countryId") {
      setActiveCountryId(data?.value);
      setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
      setDropDownOptionField(null, 'cityId', 'name', manageData, 'cityId', null);
      setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
      registeredFormRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
        cityId: null
      });
    } else if (dataField === "stateId") {
      setActiveStateId(data?.value);
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