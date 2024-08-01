import { useEffect } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../components/ui/card/CardSection";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";

const LabAddressDetail=({labAddressRef,labAddressData,LabAddressForm})=>{
 
    const [getAllCountries, { isSuccess: isGetAllCountriesSucess,isFetching:isGetAllcountriesFetching ,data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
    const [getAllCities, { isSuccess: isGetAllCitiesSucess,isFetching:isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
    const [getAllStates, { isSuccess: isGetAllStatesSucess,isFetching:isGetAllStatesFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
    useEffect(() => {
        getAllCountries();
        getAllStates();
        
      }, [allGetAllCountriesData,allGetAllStatesData]);
      
      const handleBankStateOption = (responseData) => {
            setDropDownOptionField(responseData, 'stateId', 'name', LabAddressForm, 'stateId');
      };
    useEffect(()=>{
        if (!isGetAllcountriesFetching && isGetAllCountriesSucess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', LabAddressForm, 'countryId');
          }
        if ( !isGetAllStatesFetching && isGetAllStatesSucess && allGetAllStatesData) {
            handleBankStateOption(allGetAllStatesData);
          }
        if ( !isGetAllCitiesFetching && isGetAllCitiesSucess && allGetAllCitiesData) {
              setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', LabAddressForm, 'cityId');
          }
    },[isGetAllcountriesFetching,allGetAllCountriesData,isGetAllCountriesSucess,isGetAllStatesSucess,allGetAllStatesData,isGetAllCitiesSucess,allGetAllCitiesData])
   
    const handleChangeAddressDropdownList = (data, dataField) => {
    
        const manageData = { ...labAddressData };
        if (dataField === "countryId") {
           getAllStates(data.value);
        //  setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
          setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
          labAddressRef.current.updateFormFieldValue({
            countryId: data.value,
            stateId: null,
          });
        } else if (dataField === "stateId") {
          getAllCities(data.value)
          setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
         labAddressRef.current.updateFormFieldValue({
            stateId: data.value,
            cityId: null,
          });

        }
      };
    const formAddressActionHandler = {
        DDL_CHANGED: handleChangeAddressDropdownList,
      };
    return(<>
        <CardSection cardTitle="Lab Address">
            <div className="row">
              <FormCreator
                config={labAddressData}
                ref={labAddressRef}
                {...labAddressData}
                onActionChange={formAddressActionHandler}
              />
            </div>
          </CardSection>
    
      </>)
}
export default LabAddressDetail;