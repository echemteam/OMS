import { useEffect } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../components/ui/card/CardSection";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";

const PhysicalAddressDetail=({physicalAddressData,physicalAddressRef,PhysicalAddressForm})=>{
    const [getAllCountries, { isSuccess: isGetAllCountriesSucess,isFetching:isGetAllcountriesFetching ,data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
    const [getAllCities, { isSuccess: isGetAllCitiesSucess,isFetching:isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
    const [getAllStates, { isSuccess: isGetAllStatesSucess,isFetching:isGetAllStatesFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
    
    useEffect(() => {
        getAllCountries();
        getAllStates();
        
      }, [allGetAllCountriesData,allGetAllStatesData]);
      
      const handleBankStateOption = (responseData) => {
          setDropDownOptionField(responseData, 'stateId', 'name', PhysicalAddressForm, 'stateId');
      };
    useEffect(()=>{
        if (!isGetAllcountriesFetching && isGetAllCountriesSucess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', PhysicalAddressForm, 'countryId');
          }
        if ( !isGetAllStatesFetching && isGetAllStatesSucess && allGetAllStatesData) { 
            handleBankStateOption(allGetAllStatesData);
          }

        if (!isGetAllCitiesFetching && isGetAllCitiesSucess && allGetAllCitiesData) {
              setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', PhysicalAddressForm, 'cityId');
            }
    },[isGetAllcountriesFetching,allGetAllCountriesData,isGetAllCountriesSucess,isGetAllStatesSucess,allGetAllStatesData,isGetAllCitiesSucess,allGetAllCitiesData])
   
    const handleChangeAddressDropdownList = (data, dataField) => {
   
        const manageData = { ...physicalAddressData };
        if (dataField === "countryId") {
           getAllStates(data.value);
        //  setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
          setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
          physicalAddressRef.current.updateFormFieldValue({
            countryId: data.value,
            stateId: null,
          });
        } else if (dataField === "stateId") {
          getAllCities(data.value)
          setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
         physicalAddressRef.current.updateFormFieldValue({
            stateId: data.value,
            cityId: null,
          });

        }
      };
    const formAddressActionHandler = {
        DDL_CHANGED: handleChangeAddressDropdownList,
      };
    
    return(<>
        <CardSection cardTitle="Physical Address">
            <div className="row">
              <FormCreator
                config={physicalAddressData}
                ref={physicalAddressRef}
                {...physicalAddressData}
                onActionChange={formAddressActionHandler}
              />
            </div>
          </CardSection>
    
      </>)
}
export default PhysicalAddressDetail;