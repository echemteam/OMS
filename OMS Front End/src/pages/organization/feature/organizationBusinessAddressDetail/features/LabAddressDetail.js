/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect ,useState} from "react";
import PropTypes from "prop-types";
import FormCreator from "../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../components/ui/card/CardSection";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";


const LabAddressDetail=({labAddressRef,LabAddressForm,isGetOrganizationBusinessAddressesData,isGetOrganizationBusinessAddressesSuccess})=>{
 
  const [labAddressFormData,setLabAddressFormData]=useState(LabAddressForm)
  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, {isSuccess: isGetAllStateSuccess, isFetching: isGetAllStateFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();

    
    useEffect(() => {
      if (!isGetAllStateFetching && isGetAllStateSuccess && isGetOrganizationBusinessAddressesSuccess && isGetOrganizationBusinessAddressesData?.labAddress) {
        const { labAddress } = isGetOrganizationBusinessAddressesData;
        let data = { ...labAddressFormData };
        if (labAddress.countryId) {
          setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === labAddress.countryId);
        }
  
        if (labAddress.stateId) {
          getAllCities(labAddress.stateId)
        }
  
        data.initialState = {
          addressId: labAddress.addressId,
          addressLine1Id: labAddress.addressLine1,
          addressLine2Id: labAddress.addressLine2,
          countryId: labAddress.countryId,
          zipCode: labAddress.zipCode,
          stateId: labAddress.stateId,
          cityId: labAddress.cityId,
        };
        setLabAddressFormData(data);
      }
    }, [isGetAllStateFetching , isGetAllStateSuccess,isGetOrganizationBusinessAddressesSuccess, isGetOrganizationBusinessAddressesData]);

    useEffect(() => {
      getAllCountries();
      getAllStates();
    }, []);
  
    useEffect(() => {
      if (!isGetAllCountriesFetching && isGetAllCountriesSuccess && allGetAllCountriesData) {
        setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', labAddressFormData, 'countryId');
      }
    }, [isGetAllCountriesFetching, isGetAllCountriesSuccess, allGetAllCountriesData]);
  
  
    useEffect(() => {
      if (!isGetAllCitiesFetching && isGetAllCitiesSuccess && allGetAllCitiesData) {
        const cities = allGetAllCitiesData.map((item) => ({
          value: item.cityId,
          label: item.name,
        }));
        let data = { ...labAddressFormData };
        const dropdownField = data?.formFields?.find(data => data.id === "cityId");
        dropdownField.fieldSetting.options = cities;
        setLabAddressFormData(data);
      }
    }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);
  
  
    const handleChangeAddressDropdownList = (data, dataField) => {
      const manageData = { ...labAddressFormData };
      if (dataField === "countryId") {
        setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
        setDropDownOptionField(null, 'cityId', 'name', manageData, 'cityId', null);
        setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
        labAddressRef.current.updateFormFieldValue({
          countryId: data.value,
          stateId: null,
          cityId: null
        });
      } else if (dataField === "stateId") {
        getAllCities(data.value)
        setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
        labAddressRef.current.updateFormFieldValue({
          stateId: data.value,
          cityId: null,
        });
      }
      setLabAddressFormData(manageData);
    };
  
    const formAddressActionHandler = {
      DDL_CHANGED: handleChangeAddressDropdownList,
    };
    return( 
        <CardSection cardTitle="Lab Address">
            <div className="row">
              <FormCreator
                config={labAddressFormData}
                ref={labAddressRef}
                {...labAddressFormData}
                onActionChange={formAddressActionHandler}
              />
            </div>
          </CardSection>
    
       )
}
// PropTypes for the component
LabAddressDetail.propTypes = {
  labAddressRef: PropTypes.object.isRequired,
  labAddressData: PropTypes.object.isRequired,
  LabAddressForm: PropTypes.object.isRequired,
};
export default LabAddressDetail;