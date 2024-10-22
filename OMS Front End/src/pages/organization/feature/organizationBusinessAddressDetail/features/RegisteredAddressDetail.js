/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CardSection from "../../../../../components/ui/card/CardSection";
import FormCreator from "../../../../../components/FinalForms/FormCreator";
import { RegisteredAddressForm } from "../config/RegisteredAddressForm.data";
import { setDropDownOptionField } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
//** Service's */
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";

const RegisteredAddressDetail = ({ registeredAddressRef, isGetAddressDetailsSuccess, isGetAddressDetails }) => {

  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
  const [registeredFormData, setRegisteredFormData] = useState(RegisteredAddressForm);

  //** API Call's */
  const [getAllStates, { isSuccess: isGetAllStateSuccess, isFetching: isGetAllStateFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();


  useEffect(() => {
    if (!isGetAllStateFetching && isGetAllStateSuccess && isGetAddressDetailsSuccess && isGetAddressDetails) {
      let data = { ...registeredFormData };
      if (isGetAddressDetails.countryId) {
        setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === isGetAddressDetails.countryId);
      }
      if (isGetAddressDetails.stateId) {
        getAllCities(isGetAddressDetails.stateId)
      }
      data.initialState = {
        addressId: isGetAddressDetails.addressId,
        addressLine1Id: isGetAddressDetails.addressLine1,
        addressLine2Id: isGetAddressDetails.addressLine2,
        countryId: isGetAddressDetails.countryId,
        zipCode: isGetAddressDetails.zipCode,
        stateId: isGetAddressDetails.stateId,
        cityId: isGetAddressDetails.cityId,
      };
      setRegisteredFormData(data);
    }
  }, [isGetAllStateFetching, isGetAllStateSuccess, isGetAddressDetailsSuccess, isGetAddressDetails]);

  useEffect(() => {
    getAllCountries();
    getAllStates();
  }, []);

  useEffect(() => {
    if (!isGetAllCountriesFetching && isGetAllCountriesSuccess && allGetAllCountriesData) {
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', registeredFormData, 'countryId');
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllCountriesFetching, isGetAllCountriesSuccess, allGetAllCountriesData]);

  useEffect(() => {
    if (!isGetAllCitiesFetching && isGetAllCitiesSuccess && allGetAllCitiesData) {
      setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', registeredFormData, 'cityId');
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);

  const handleColumnChange = (dataField, updatedData) => {
    const manageData = { ...registeredFormData };
    const countryId = updatedData.countryId && typeof updatedData.countryId === "object" ? updatedData.countryId.value : updatedData.countryId;
    const stateId = updatedData.stateId && typeof updatedData.stateId === "object" ? updatedData.stateId.value : updatedData.stateId;
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
    setRegisteredFormData(manageData);
  }

  return (
    <CardSection cardTitle="Registered Address">
      <div className="">
        <FormCreator
          config={registeredFormData}
          ref={registeredAddressRef}
          onColumnChange={handleColumnChange}
          key={shouldRerenderFormCreator}
        />
      </div>
    </CardSection>

  )
}

// PropTypes for the component
RegisteredAddressDetail.propTypes = {
  registeredAddressRef: PropTypes.object.isRequired,
  RegisteredAddressForm: PropTypes.object.isRequired,

};
export default RegisteredAddressDetail;