/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";
import FormCreator from "../../../../../components/FinalForms/FormCreator";
import CardSection from "../../../../../components/ui/card/CardSection";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";

const RegisteredAddressDetail = ({ registeredAddressRef, RegisteredAddressForm, isGetOrganizationBusinessAddressesSuccess, isGetOrganizationBusinessAddressesData }) => {

  const [registeredFormData, setRegisteredFormData] = useState(RegisteredAddressForm)
  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { isSuccess: isGetAllStateSuccess, isFetching: isGetAllStateFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();


  useEffect(() => {
    if (!isGetAllStateFetching && isGetAllStateSuccess && isGetOrganizationBusinessAddressesSuccess && isGetOrganizationBusinessAddressesData?.registeredAddress) {
      const { registeredAddress } = isGetOrganizationBusinessAddressesData;
      let data = { ...registeredFormData };
      if (registeredAddress.countryId) {
        setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === registeredAddress.countryId);
      }
      if (registeredAddress.stateId) {
        getAllCities(registeredAddress.stateId)
      }
      data.initialState = {
        addressId: registeredAddress.addressId,
        addressLine1Id: registeredAddress.addressLine1,
        addressLine2Id: registeredAddress.addressLine2,
        countryId: registeredAddress.countryId,
        zipCode: registeredAddress.zipCode,
        stateId: registeredAddress.stateId,
        cityId: registeredAddress.cityId,
      };
      setRegisteredFormData(data);
    }
  }, [isGetAllStateFetching, isGetAllStateSuccess, isGetOrganizationBusinessAddressesSuccess, isGetOrganizationBusinessAddressesData]);

  useEffect(() => {
    getAllCountries();
    getAllStates();
  }, []);

  useEffect(() => {
    if (!isGetAllCountriesFetching && isGetAllCountriesSuccess && allGetAllCountriesData) {
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', registeredFormData, 'countryId');
    }
  }, [isGetAllCountriesFetching, isGetAllCountriesSuccess, allGetAllCountriesData]);


  useEffect(() => {
    if (!isGetAllCitiesFetching && isGetAllCitiesSuccess && allGetAllCitiesData) {
      setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', registeredFormData, 'cityId');
    }
  }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);


  const handleChangeAddressDropdownList = (data, dataField) => {
    const manageData = { ...registeredFormData };
    if (dataField === "countryId") {
      setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
      setDropDownOptionField(null, 'cityId', 'name', manageData, 'cityId', null);
      setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
      registeredAddressRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
        cityId: null
      });
    } else if (dataField === "stateId") {
      getAllCities(data.value)
      setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
      registeredAddressRef.current.updateFormFieldValue({
        stateId: data.value,
        cityId: null,
      });
    }
    setRegisteredFormData(manageData);
  };

  const formAddressActionHandler = {
    DDL_CHANGED: handleChangeAddressDropdownList,
  };
  return (
    <CardSection cardTitle="Registered Address">
      <div className="row">
        <FormCreator
          config={registeredFormData}
          ref={registeredAddressRef}
          {...registeredFormData}
          onActionChange={formAddressActionHandler}
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