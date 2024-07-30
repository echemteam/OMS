
import FormCreator from "../../../../../../../components/Forms/FormCreator"
import CardSection from "../../../../../../../components/ui/card/CardSection"
import { setDropDownOptionField, setFieldSetting } from "../../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useEffect } from "react";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../../../app/services/addressAPI";
import { FieldSettingType } from "../../../../../../../utils/Enums/commonEnums";
import { useLazyGetAllCountriesQuery } from "../../../../../../../app/services/basicdetailAPI";

const BankAddressDetail=({bankAddressData,bankAddressFormData,bankFormRef})=>{
    const [getAllCountries, { isSuccess: isGetAllCountriesSucess,isFetching:isGetAllcountriesFetching ,data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
    const [getAllCities, { isSuccess: isGetAllCitiesSucess,isFetching:isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
    const [getAllStates, { isSuccess: isGetAllStatesSucess,isFetching:isGetAllStatesFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();

    useEffect(() => {
        getAllCountries();
        getAllStates();
        
      }, [allGetAllCountriesData,allGetAllStatesData]);
      
      const handleBankStateOption = (responseData) => {
       
        setDropDownOptionField(responseData, 'stateId', 'name', bankAddressFormData, 'stateId');
    
      };
    useEffect(()=>{
        debugger
        if (!isGetAllcountriesFetching && isGetAllCountriesSucess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', bankAddressFormData, 'countryId');

          }
        if (  isGetAllStatesSucess && allGetAllStatesData) {
          
            handleBankStateOption(allGetAllStatesData);

          }

        if ( isGetAllCitiesSucess && allGetAllCitiesData) {
         
              setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', bankAddressFormData, 'cityId');
            //   setShouldRerenderFormCreator((prevState) => !prevState);
          
            }
    },[isGetAllcountriesFetching,allGetAllCountriesData,isGetAllCountriesSucess,isGetAllStatesSucess,allGetAllStatesData,isGetAllCitiesSucess,allGetAllCitiesData])
   
    const handleChangeBankAddressDropdownList = (data, dataField) => {
     debugger
        const manageData = { ...bankAddressData };
        if (dataField === "countryId") {
           getAllStates(data.value);
        //  setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
          setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
          bankFormRef.current.updateFormFieldValue({
            countryId: data.value,
            stateId: null,
          });
        } else if (dataField === "stateId") {
          getAllCities(data.value)
          setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
         bankFormRef.current.updateFormFieldValue({
            stateId: data.value,
            cityId: null,
          });

        }
      };
    const formBackAddressActionHandler = {
        DDL_CHANGED: handleChangeBankAddressDropdownList,
      };
    

  return(<>
    <CardSection cardTitle="Bank Address">
        <div className="row">
          <FormCreator
            config={bankAddressData}
            ref={bankFormRef}
            {...bankAddressData}
           // key={shouldRerenderFormCreator}
            onActionChange={formBackAddressActionHandler}
          />
        </div>
      </CardSection>

  </>)
}
export default BankAddressDetail