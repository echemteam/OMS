import { useEffect } from "react";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";
import FormCreator from "../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../components/ui/card/CardSection";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";

const RegisteredAddressDetail=({registeredAddressRef,RegisteredAddressForm,registeredAddressData})=>{
    const [getAllCountries, { isSuccess: isGetAllCountriesSucess,isFetching:isGetAllcountriesFetching ,data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
    const [getAllCities, { isSuccess: isGetAllCitiesSucess,isFetching:isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
    const [getAllStates, { isSuccess: isGetAllStatesSucess,isFetching:isGetAllStatesFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
    useEffect(() => {
        getAllCountries();
        getAllStates();
        
      }, [allGetAllCountriesData,allGetAllStatesData]);
      
      const handleBankStateOption = (responseData) => {
        setDropDownOptionField(responseData, 'stateId', 'name', RegisteredAddressForm, 'stateId');
      };

    useEffect(()=>{
        if (!isGetAllcountriesFetching && isGetAllCountriesSucess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', RegisteredAddressForm, 'countryId');

          }
        if ( !isGetAllStatesFetching &&  isGetAllStatesSucess && allGetAllStatesData) {
             handleBankStateOption(allGetAllStatesData);
          }
      if (!isGetAllCitiesFetching && isGetAllCitiesSucess && allGetAllCitiesData) {
              setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', RegisteredAddressForm, 'cityId');
           }
    },[isGetAllcountriesFetching,allGetAllCountriesData,isGetAllCountriesSucess,isGetAllStatesSucess,allGetAllStatesData,isGetAllCitiesSucess,allGetAllCitiesData])
   
    const handleChangeAddressDropdownList = (data, dataField) => {
        const manageData = { ...registeredAddressData };
        if (dataField === "countryId") {
           getAllStates(data.value);
        //  setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
          setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
          registeredAddressRef.current.updateFormFieldValue({
            countryId: data.value,
            stateId: null,
          });
        } else if (dataField === "stateId") {
          getAllCities(data.value)
          setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
         registeredAddressRef.current.updateFormFieldValue({
            stateId: data.value,
            cityId: null,
          });
        }
      };
    const formAddressActionHandler = {
        DDL_CHANGED: handleChangeAddressDropdownList,
      };
    
    return(<>
        <CardSection cardTitle="Registered Address">
            <div className="row">
              <FormCreator
                config={registeredAddressData}
                ref={registeredAddressRef}
                {...registeredAddressData}
                onActionChange={formAddressActionHandler}
              />
            </div>
          </CardSection>
    
      </>)
}
export default RegisteredAddressDetail;