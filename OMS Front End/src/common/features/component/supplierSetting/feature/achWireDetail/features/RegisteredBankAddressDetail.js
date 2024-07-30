
import FormCreator from "../../../../../../../components/Forms/FormCreator"
import CardSection from "../../../../../../../components/ui/card/CardSection"
import { setDropDownOptionField, setFieldSetting } from "../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useEffect } from "react";

import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../../../app/services/addressAPI";
import { FieldSettingType } from "../../../../../../../utils/Enums/commonEnums";
import { useLazyGetAllCountriesQuery } from "../../../../../../../app/services/basicdetailAPI";

const RegisteredBankAddressDetail=({registeredBankAddressData,registeredBankAddressForm,registeredFormRef,setShouldRerenderFormCreator})=>{
    const [getAllCountries, { isSuccess: isGetAllCountriesSucess, isFetching:isGetAllcountriesFetching,data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
    const [getAllCities, { isSuccess: isGetAllCitiesSucess, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
    const [getAllStates, { isSuccess: isGetAllStatesSucess, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();

    useEffect(() => {
        getAllCountries();
        getAllStates();
      }, []);

      useEffect(()=>{

        if (!isGetAllcountriesFetching && isGetAllCountriesSucess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', registeredBankAddressForm, 'countryId');
         
          }
        if (isGetAllStatesSucess && allGetAllStatesData) {
        
            handleRegisteredStateOption(allGetAllStatesData);
     
          }
          if (isGetAllCitiesSucess && allGetAllCitiesData) {
            setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', registeredBankAddressForm, 'cityId');
          
          }
      },[isGetAllcountriesFetching,isGetAllCountriesSucess,allGetAllCountriesData,isGetAllStatesSucess,allGetAllStatesData,isGetAllCitiesSucess,allGetAllCitiesData])
     
      const handleRegisteredStateOption = (responseData) => {
        setDropDownOptionField(responseData, 'stateId', 'name', registeredBankAddressForm, 'stateId');
      };
      const handleChangeRegisteredAddressDropdownList = (data, dataField) => {
        debugger
        const manageData = { ...registeredBankAddressData };
        if (dataField === "countryId") {
            getAllStates(data.value);
          //setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
          setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
          registeredFormRef.current.updateFormFieldValue({
            countryId: data.value,
            stateId: null,
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
   
   
      const formRegisteredActionHandler = {
        DDL_CHANGED: handleChangeRegisteredAddressDropdownList,
      };
    

  return(<>
    <CardSection cardTitle="Remit to Address">
        <div className="row">
          <FormCreator
            config={registeredBankAddressData}
            ref={registeredFormRef}
            {...registeredBankAddressData}
          //  key={shouldRerenderFormCreator}
            onActionChange={formRegisteredActionHandler}
          />
        </div>
      </CardSection>

  </>)
}
export default RegisteredBankAddressDetail;