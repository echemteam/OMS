import { useEffect } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import CardSection from "../../../../../components/ui/card/CardSection";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";

const WarehouseAddressDetail=({warehouseAddressData,warehouseAddressRef,WarehouseAddressForm})=>{;
  const [getAllCountries, { isSuccess: isGetAllCountriesSucess,isFetching:isGetAllcountriesFetching ,data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSucess,isFetching:isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { isSuccess: isGetAllStatesSucess,isFetching:isGetAllStatesFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
  useEffect(() => {
      getAllCountries();
      getAllStates();
      
    }, [allGetAllCountriesData,allGetAllStatesData]);
    
    const handleBankStateOption = (responseData) => {
          setDropDownOptionField(responseData, 'stateId', 'name', WarehouseAddressForm, 'stateId');
    };
  useEffect(()=>{
     
      if (!isGetAllcountriesFetching && isGetAllCountriesSucess && allGetAllCountriesData) {
          setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', WarehouseAddressForm, 'countryId');

        }
      if ( !isGetAllStatesFetching && isGetAllStatesSucess && allGetAllStatesData) {
        
          handleBankStateOption(allGetAllStatesData);
        }
      if ( !isGetAllCitiesFetching && isGetAllCitiesSucess && allGetAllCitiesData) {
       
            setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', WarehouseAddressForm, 'cityId');
          
          }
  },[isGetAllcountriesFetching,allGetAllCountriesData,isGetAllCountriesSucess,isGetAllStatesSucess,allGetAllStatesData,isGetAllCitiesSucess,allGetAllCitiesData])
 
  const handleChangeAddressDropdownList = (data, dataField) => {
  
      const manageData = { ...warehouseAddressData };
      if (dataField === "countryId") {
         getAllStates(data.value);
        setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
        warehouseAddressRef.current.updateFormFieldValue({
          countryId: data.value,
          stateId: null,
        });
      } else if (dataField === "stateId") {
        getAllCities(data.value)
        setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
       warehouseAddressRef.current.updateFormFieldValue({
          stateId: data.value,
          cityId: null,
        });

      }
    };
  const formAddressActionHandler = {
      DDL_CHANGED: handleChangeAddressDropdownList,
    };
    return( 
        <CardSection cardTitle="Warehouse Address">
            <div className="row">
              <FormCreator
                config={warehouseAddressData}
                ref={warehouseAddressRef}
                {...warehouseAddressData}
                onActionChange={formAddressActionHandler}
              />
            </div>
          </CardSection>
    
       )
}
export default WarehouseAddressDetail;