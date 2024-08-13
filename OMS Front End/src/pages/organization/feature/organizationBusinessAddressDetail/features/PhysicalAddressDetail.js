/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormCreator from "../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../components/ui/card/CardSection";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";

const PhysicalAddressDetail=({physicalAddressRef,PhysicalAddressForm,isGetOrganizationBusinessAddressesData,isGetOrganizationBusinessAddressesSuccess})=>{
  const [physicalFormData,setPhysicalFormData]=useState(PhysicalAddressForm)
  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, {isSuccess: isGetAllStateSuccess, isFetching: isGetAllStateFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();

    
    useEffect(() => {
      if (!isGetAllStateFetching && isGetAllStateSuccess && isGetOrganizationBusinessAddressesSuccess && isGetOrganizationBusinessAddressesData?.physicalAddress) {
        const { physicalAddress } = isGetOrganizationBusinessAddressesData;
        let data = { ...physicalFormData };
        if (physicalAddress.countryId) {
          setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === physicalAddress.countryId);
        }
  
        if (physicalAddress.stateId) {
          getAllCities(physicalAddress.stateId)
        }
  
        data.initialState = {
          addressId: physicalAddress.addressId,
          addressLine1Id: physicalAddress.addressLine1,
          addressLine2Id: physicalAddress.addressLine2,
          countryId: physicalAddress.countryId,
          zipCode: physicalAddress.zipCode,
          stateId: physicalAddress.stateId,
          cityId: physicalAddress.cityId,
        };
        setPhysicalFormData(data);
      }
    }, [isGetAllStateFetching , isGetAllStateSuccess,isGetOrganizationBusinessAddressesSuccess, isGetOrganizationBusinessAddressesData]);

    useEffect(() => {
      getAllCountries();
      getAllStates();
    }, []);
  
    useEffect(() => {
      if (!isGetAllCountriesFetching && isGetAllCountriesSuccess && allGetAllCountriesData) {
        setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', physicalFormData, 'countryId');
      }
    }, [isGetAllCountriesFetching, isGetAllCountriesSuccess, allGetAllCountriesData]);
  
  
    useEffect(() => {
      if (!isGetAllCitiesFetching && isGetAllCitiesSuccess && allGetAllCitiesData) {
        const cities = allGetAllCitiesData.map((item) => ({
          value: item.cityId,
          label: item.name,
        }));
        let data = { ...physicalFormData };
        const dropdownField = data?.formFields?.find(data => data.id === "cityId");
        dropdownField.fieldSetting.options = cities;
        setPhysicalFormData(data);
      }
    }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);
  
  
    const handleChangeAddressDropdownList = (data, dataField) => {
      const manageData = { ...physicalFormData };
      if (dataField === "countryId") {
        setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
        setDropDownOptionField(null, 'cityId', 'name', manageData, 'cityId', null);
        setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
        physicalAddressRef.current.updateFormFieldValue({
          countryId: data.value,
          stateId: null,
          cityId: null
        });
      } else if (dataField === "stateId") {
        getAllCities(data.value)
        setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
        physicalAddressRef.current.updateFormFieldValue({
          stateId: data.value,
          cityId: null,
        });
      }
      setPhysicalFormData(manageData);
    };
  
    const formAddressActionHandler = {
      DDL_CHANGED: handleChangeAddressDropdownList,
    };
  
    return( 
        <CardSection cardTitle="Physical Address">
            <div className="row">
              <FormCreator
                config={physicalFormData}
                ref={physicalAddressRef}
                {...physicalFormData}
                onActionChange={formAddressActionHandler}
              />
            </div>
          </CardSection>
    
       )
}

// PropTypes for the component
PhysicalAddressDetail.propTypes = {
 
  physicalAddressRef: PropTypes.object.isRequired,
  PhysicalAddressForm: PropTypes.object.isRequired,
};
export default PhysicalAddressDetail;