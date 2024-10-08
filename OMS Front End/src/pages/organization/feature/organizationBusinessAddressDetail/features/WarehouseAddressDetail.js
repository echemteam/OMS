/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormCreator from "../../../../../components/FinalForms/FormCreator";
import CardSection from "../../../../../components/ui/card/CardSection";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";


const WarehouseAddressDetail = ({ warehouseAddressRef, WarehouseAddressForm, isGetOrganizationBusinessAddressesData, isGetOrganizationBusinessAddressesSuccess }) => {
  ;
  const [warehouseAddressFormData, setWarehouseAddressFormData] = useState(WarehouseAddressForm)
  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { isSuccess: isGetAllStateSuccess, isFetching: isGetAllStateFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();


  useEffect(() => {
    if (!isGetAllStateFetching && isGetAllStateSuccess && isGetOrganizationBusinessAddressesSuccess && isGetOrganizationBusinessAddressesData?.warehouseAddress) {
      const { warehouseAddress } = isGetOrganizationBusinessAddressesData;
      let data = { ...warehouseAddressFormData };
      if (warehouseAddress.countryId) {
        setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === warehouseAddress.countryId);
      }

      if (warehouseAddress.stateId) {
        getAllCities(warehouseAddress.stateId)
      }

      data.initialState = {
        addressId: warehouseAddress.addressId,
        addressLine1Id: warehouseAddress.addressLine1,
        addressLine2Id: warehouseAddress.addressLine2,
        countryId: warehouseAddress.countryId,
        zipCode: warehouseAddress.zipCode,
        stateId: warehouseAddress.stateId,
        cityId: warehouseAddress.cityId,
      };
      setWarehouseAddressFormData(data);
    }
  }, [isGetAllStateFetching, isGetAllStateSuccess, isGetOrganizationBusinessAddressesSuccess, isGetOrganizationBusinessAddressesData]);

  useEffect(() => {
    getAllCountries();
    getAllStates();
  }, []);

  useEffect(() => {
    if (!isGetAllCountriesFetching && isGetAllCountriesSuccess && allGetAllCountriesData) {
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', warehouseAddressFormData, 'countryId');
    }
  }, [isGetAllCountriesFetching, isGetAllCountriesSuccess, allGetAllCountriesData]);


  useEffect(() => {
    if (!isGetAllCitiesFetching && isGetAllCitiesSuccess && allGetAllCitiesData) {
      setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', warehouseAddressFormData, 'cityId');
    }
  }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);


  const handleChangeAddressDropdownList = (data, dataField) => {
    const manageData = { ...warehouseAddressFormData };
    if (dataField === "countryId") {
      setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
      setDropDownOptionField(null, 'cityId', 'name', manageData, 'cityId', null);
      setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
      warehouseAddressRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
        cityId: null
      });
    } else if (dataField === "stateId") {
      getAllCities(data.value)
      setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
      warehouseAddressRef.current.updateFormFieldValue({
        stateId: data.value,
        cityId: null,
      });
    }
    setWarehouseAddressFormData(manageData);
  };

  const formAddressActionHandler = {
    DDL_CHANGED: handleChangeAddressDropdownList,
  };
  return (
    <CardSection cardTitle="Warehouse Address">
      <div className="row">
        <FormCreator
          config={warehouseAddressFormData}
          ref={warehouseAddressRef}
          {...warehouseAddressFormData}
          onActionChange={formAddressActionHandler}
        />
      </div>
    </CardSection>

  )
}

WarehouseAddressDetail.propTypes = {
  warehouseAddressData: PropTypes.object.isRequired,
  warehouseAddressRef: PropTypes.object.isRequired,
  WarehouseAddressForm: PropTypes.object.isRequired,
};
export default WarehouseAddressDetail;