/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";
import FormCreator from "../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../components/ui/card/CardSection";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";
import { useState } from "react";

const BillToAddressDetail=({billToAddressRef,billToAddressData,BillToAddressForm,isGetOrganizationBusinessAddressesData,isGetOrganizationBusinessAddressesSuccess})=>{

  const [billToAddressFormData,setBillToAddressFormData]=useState(BillToAddressForm)
  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { data: allGetAllStatesData }] = useLazyGetAllStatesQuery();

    
    useEffect(() => {
      if (isGetOrganizationBusinessAddressesSuccess && isGetOrganizationBusinessAddressesData?.billToAddress) {
        const { billToAddress } = isGetOrganizationBusinessAddressesData;
        let data = { ...billToAddressFormData };
        if (billToAddress.countryId) {
          setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === billToAddress.countryId);
        }
  
        if (billToAddress.stateId) {
          getAllCities(billToAddress.stateId)
        }
  
        data.initialState = {
          addressId: billToAddress.addressId,
          addressLine1Id: billToAddress.addressLine1,
          addressLine2Id: billToAddress.addressLine2,
          countryId: billToAddress.countryId,
          zipCode: billToAddress.zipCode,
          stateId: billToAddress.stateId,
          cityId: billToAddress.cityId,
        };
        setBillToAddressFormData(data);
      }
    }, [isGetOrganizationBusinessAddressesSuccess, isGetOrganizationBusinessAddressesData]);

    useEffect(() => {
      getAllCountries();
      getAllStates();
    }, []);
  
    useEffect(() => {
      if (!isGetAllCountriesFetching && isGetAllCountriesSuccess && allGetAllCountriesData) {
        setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', billToAddressFormData, 'countryId');
      }
    }, [isGetAllCountriesFetching, isGetAllCountriesSuccess, allGetAllCountriesData]);
  
  
    useEffect(() => {
      if (!isGetAllCitiesFetching && isGetAllCitiesSuccess && allGetAllCitiesData) {
        const cities = allGetAllCitiesData.map((item) => ({
          value: item.cityId,
          label: item.name,
        }));
        let data = { ...billToAddressFormData };
        const dropdownField = data?.formFields?.find(data => data.id === "cityId");
        dropdownField.fieldSetting.options = cities;
        setBillToAddressFormData(data);
      }
    }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);
  
  
    const handleChangeAddressDropdownList = (data, dataField) => {
      const manageData = { ...billToAddressFormData };
      if (dataField === "countryId") {
        setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
        setDropDownOptionField(null, 'cityId', 'name', manageData, 'cityId', null);
        setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
        billToAddressRef.current.updateFormFieldValue({
          countryId: data.value,
          stateId: null,
          cityId: null
        });
      } else if (dataField === "stateId") {
        getAllCities(data.value)
        setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
        billToAddressRef.current.updateFormFieldValue({
          stateId: data.value,
          cityId: null,
        });
      }
      setBillToAddressFormData(manageData);
    };
  
    const formAddressActionHandler = {
      DDL_CHANGED: handleChangeAddressDropdownList,
    };
   
    return( 
        <CardSection cardTitle="Bill To Address">
            <div className="row">
              <FormCreator
                config={billToAddressData}
                ref={billToAddressRef}
                {...billToAddressData}
                onActionChange={formAddressActionHandler}
              />
            </div>
          </CardSection>
    
       )
}
// PropTypes for the component
BillToAddressDetail.propTypes = {
  billToAddressRef: PropTypes.object.isRequired,
  billToAddressData: PropTypes.object.isRequired,
  BillToAddressForm: PropTypes.object.isRequired,
};
export default BillToAddressDetail;