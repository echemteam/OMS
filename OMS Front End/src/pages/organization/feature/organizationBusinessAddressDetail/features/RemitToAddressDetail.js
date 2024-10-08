/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormCreator from "../../../../../components/FinalForms/FormCreator";
import CardSection from "../../../../../components/ui/card/CardSection";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";


const RemitToAddressDetail = ({ remitToAddressRef, RemitToAddressForm, isGetOrganizationBusinessAddressesData, isGetOrganizationBusinessAddressesSuccess }) => {

  const [remitToAddressFormData, setRemitToAddressFormData] = useState(RemitToAddressForm)
  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { isSuccess: isGetAllStateSuccess, isFetching: isGetAllStateFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();

  useEffect(() => {
    getAllCountries();
    getAllStates();
  }, []);

  //   useEffect(()=>{

  //   })
  useEffect(() => {

    if (!isGetAllStateFetching && isGetAllStateSuccess && isGetOrganizationBusinessAddressesSuccess && isGetOrganizationBusinessAddressesData?.remitToAddress) {
      const { remitToAddress } = isGetOrganizationBusinessAddressesData;
      let data = { ...remitToAddressFormData };
      if (remitToAddress.countryId) {
        setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === remitToAddress.countryId);
      }

      if (remitToAddress.stateId) {
        getAllCities(remitToAddress.stateId)
      }

      data.initialState = {
        addressId: remitToAddress.addressId,
        addressLine1Id: remitToAddress.addressLine1,
        addressLine2Id: remitToAddress.addressLine2,
        countryId: remitToAddress.countryId,
        zipCode: remitToAddress.zipCode,
        stateId: remitToAddress.stateId,
        cityId: remitToAddress.cityId,
      };
      setRemitToAddressFormData(data);
    }
  }, [isGetAllStateFetching, isGetAllStateSuccess, isGetOrganizationBusinessAddressesSuccess, isGetOrganizationBusinessAddressesData]);



  useEffect(() => {
    if (!isGetAllCountriesFetching && isGetAllCountriesSuccess && allGetAllCountriesData) {
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', remitToAddressFormData, 'countryId');
    }
  }, [isGetAllCountriesFetching, isGetAllCountriesSuccess, allGetAllCountriesData]);


  useEffect(() => {
    if (!isGetAllCitiesFetching && isGetAllCitiesSuccess && allGetAllCitiesData) {
      setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', remitToAddressFormData, 'cityId');

    }
  }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);


  const handleChangeAddressDropdownList = (data, dataField) => {
    const manageData = { ...remitToAddressFormData };
    if (dataField === "countryId") {
      setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
      setDropDownOptionField(null, 'cityId', 'name', manageData, 'cityId', null);
      setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
      remitToAddressRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
        cityId: null
      });
    } else if (dataField === "stateId") {
      getAllCities(data.value)
      setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
      remitToAddressRef.current.updateFormFieldValue({
        stateId: data.value,
        cityId: null,
      });
    }
    setRemitToAddressFormData(manageData);
  };

  const formAddressActionHandler = {
    DDL_CHANGED: handleChangeAddressDropdownList,
  };
  return (
    <CardSection cardTitle="Remit To Address">
      <div className="row">
        <FormCreator
          config={remitToAddressFormData}
          ref={remitToAddressRef}
          {...remitToAddressFormData}
          onActionChange={formAddressActionHandler}
        />
      </div>
    </CardSection>

  )
}
// PropTypes for the component
RemitToAddressDetail.propTypes = {
  remitToAddressRef: PropTypes.object.isRequired,
  RemitToAddressForm: PropTypes.object.isRequired,
};
export default RemitToAddressDetail;