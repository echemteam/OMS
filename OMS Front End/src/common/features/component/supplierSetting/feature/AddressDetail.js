import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import PropTypes from "prop-types";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { addressFormData } from "../config/BankAddressForm.data";
import { setDropDownOptionField } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useAddEditACHWireMutation } from "../../../../../app/services/supplierFinancialSettingsAPI";
import Buttons from "../../../../../components/ui/button/Buttons";

const AddressDetail = ({ aCHWireFormRef, getAllCities, getAllStates, getAllCountries, isGetAllCitiesSucess, allGetAllCitiesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCountriesSucess, allGetAllCountriesData }) => {
  const addressFormRef = useRef();
  const [addressForm, setaddressForm] = useState(addressFormData);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  const [addEditACHWire, { isLoading: isAddEditACHWireing, isSuccess: isAddEditACHWireSuccess, data: isAddEditACHWireData }] = useAddEditACHWireMutation();

  useEffect(() => {
    getAllCountries();
    getAllStates();
    getAllCities();
  }, []);

  useEffect(() => {
    if (isGetAllCountriesSucess && allGetAllCountriesData) {
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', addressFormData, 'countryId');
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
    if (isGetAllStatesSucess && allGetAllStatesData) {
      handleStateOption(allGetAllStatesData);
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
    if (isGetAllCitiesSucess && allGetAllCitiesData) {
      handleCityOption(allGetAllCitiesData);
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllCountriesSucess, allGetAllCountriesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCitiesSucess, allGetAllCitiesData]);

  const handleStateOption = (responseData) => {
    setDropDownOptionField(responseData, 'stateId', 'name', addressFormData, 'stateId');
  };
  const handleCityOption = (responseData) => {
    setDropDownOptionField(responseData, 'cityId', 'name', addressFormData, 'cityId');
  };

  useImperativeHandle(aCHWireFormRef, () => ({
    handleAddData,
  }));

  const handleAddData = () => {
    let data = addressFormRef.current.getFormData();
    if(data){
      let req = {
        ...data,

      }
      addEditACHWire(req)
    }
  }

  return (
    <div>
      <div className="row">
        <FormCreator
          config={addressForm}
          ref={addressFormRef}
          {...addressForm}
          key={shouldRerenderFormCreator}
        />
      </div>
    </div>
  );
};
AddressDetail.propTypes = {
  aCHWireFormRef: PropTypes.shape({
    current: PropTypes.shape({
      handleAddData: PropTypes.func
    })
  }).isRequired,
  getAllCities: PropTypes.func.isRequired,
  getAllStates: PropTypes.func.isRequired,
  getAllCountries: PropTypes.func.isRequired,
  isGetAllCitiesSucess: PropTypes.bool.isRequired,
  allGetAllCitiesData: PropTypes.array,
  isGetAllStatesSucess: PropTypes.bool.isRequired,
  allGetAllStatesData: PropTypes.array,
  isGetAllCountriesSucess: PropTypes.bool.isRequired,
  allGetAllCountriesData: PropTypes.array,
};
export default AddressDetail;
