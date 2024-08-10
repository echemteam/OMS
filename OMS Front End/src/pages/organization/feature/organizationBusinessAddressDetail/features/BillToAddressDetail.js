/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";
import FormCreator from "../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../components/ui/card/CardSection";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";

const BillToAddressDetail=({billToAddressRef,billToAddressData,BillToAddressForm})=>{

    const [getAllCountries, { isSuccess: isGetAllCountriesSucess,isFetching:isGetAllcountriesFetching ,data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
    const [getAllCities, { isSuccess: isGetAllCitiesSucess,isFetching:isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
    const [getAllStates, { isSuccess: isGetAllStatesSucess,isFetching:isGetAllStatesFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
    useEffect(() => {
        getAllCountries();
        getAllStates();
        
      }, [allGetAllCountriesData,allGetAllStatesData]);
      
      const handleBankStateOption = (responseData) => {
            setDropDownOptionField(responseData, 'stateId', 'name', BillToAddressForm, 'stateId');
      };
    useEffect(()=>{
       
        if (!isGetAllcountriesFetching && isGetAllCountriesSucess && allGetAllCountriesData) {
            setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', BillToAddressForm, 'countryId');
          }
        if ( !isGetAllStatesFetching && isGetAllStatesSucess && allGetAllStatesData) {
            handleBankStateOption(allGetAllStatesData);
          }
        if ( !isGetAllCitiesFetching && isGetAllCitiesSucess && allGetAllCitiesData) {
              setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', BillToAddressForm, 'cityId');
              
            }
    },[isGetAllcountriesFetching,allGetAllCountriesData,isGetAllCountriesSucess,isGetAllStatesSucess,allGetAllStatesData,isGetAllCitiesSucess,allGetAllCitiesData])
   
    const handleChangeAddressDropdownList = (data, dataField) => {
    
        const manageData = { ...billToAddressData };
        if (dataField === "countryId") {
           getAllStates(data.value);
      
          setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
          billToAddressRef.current.updateFormFieldValue({
            countryId: data.value,
            stateId: null,
          });
        } else if (dataField === "stateId") {
          getAllCities(data.value)
          setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
         billToAddressRef.current.updateFormFieldValue({
            stateId: data.value,
            cityId: null,
          });

        }
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