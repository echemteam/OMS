import React, { useEffect, useRef, useState } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import { addressFormData } from "./component/AddressForm.data";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import AddressCard from "./component/AddressCard";
import { useLazyGetAllAddressTypesQuery, useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../app/services/addressAPI";
import { useLazyGetAllCountriesQuery } from "../../../../app/services/basicdetailAPI";

const AddressDetail = () => {
  const userFormRef = useRef();
  const [isModelOpen, setisModelOpen] = useState(false);
  const [formData, setFormData] = useState(addressFormData);
  // const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [getAllAddressTypes, {
    isFetching: isGetAllAddressTypesFetching,
    isSuccess: isGetAllAddressTypesSucess,
    data: allGetAllAddressTypesData
  },] = useLazyGetAllAddressTypesQuery();

  const [getAllCountries, {
    isFetching: isGetAllCountriesFetching,
    isSuccess: isGetAllCountriesSucess,
    data: allGetAllCountriesData
  },] = useLazyGetAllCountriesQuery();

  const [getAllStates, {
    isFetching: isGetAllStatesFetching,
    isSuccess: isGetAllStatesSucess,
    data: allGetAllStatesData
  },] = useLazyGetAllStatesQuery();

  const [getAllCities, {
    isFetching: isGetAllCitiesFetching,
    isSuccess: isGetAllCitiesSucess,
    data: allGetAllCitiesData
  },] = useLazyGetAllCitiesQuery();

  useEffect(() => {
    getAllAddressTypes()
    getAllCountries()
    getAllStates()
    getAllCities()
  }, [])

  useEffect(() => {
    if (!isGetAllAddressTypesFetching && isGetAllAddressTypesSucess && allGetAllAddressTypesData) {
      const getData = allGetAllAddressTypesData.map(item => ({
        value: item.groupTypeId,
        label: item.type
      }))
      const dropdownField = addressFormData.formFields.find(item => item.dataField === "type");
      dropdownField.fieldSetting.options = getData;
    }
  }, [isGetAllAddressTypesFetching, isGetAllAddressTypesSucess, allGetAllAddressTypesData])

  useEffect(() => {
    if (!isGetAllCountriesFetching && isGetAllCountriesSucess && allGetAllCountriesData) {
      const getData = allGetAllCountriesData.map(item => ({
        value: item.countryId,
        label: item.name
      }))
      const dropdownField = addressFormData.formFields.find(item => item.dataField === "countryId");
      dropdownField.fieldSetting.options = getData;
    }
  }, [isGetAllCountriesFetching, isGetAllCountriesSucess, allGetAllCountriesData])

  useEffect(() => {
    if (!isGetAllStatesFetching && isGetAllStatesSucess && allGetAllStatesData) {
      setSelectedState(allGetAllStatesData)
    }
  }, [isGetAllStatesFetching, isGetAllStatesSucess, allGetAllStatesData])

  useEffect(() => {
    if (!isGetAllCitiesFetching && isGetAllCitiesSucess && allGetAllCitiesData) {
      setSelectedCity(allGetAllCitiesData)
    }
  }, [isGetAllCitiesFetching, isGetAllCitiesSucess, allGetAllCitiesData])

  const handleToggleModal = () => {
    setisModelOpen(true);
  };
  const onSidebarClose = () => {
    setisModelOpen(false);
  };

  const handleChangeDropdownList = (data, dataField) => {
    if (dataField === 'countryId') {
      const dataValue = selectedState?.filter(item => item.countryId === data.value).map(item => ({
        value: item.stateId,
        label: item.name,
      }));
      const dropdownFieldIndex = addressFormData.formFields.findIndex(item => item.dataField === "stateId");
      addressFormData.formFields[dropdownFieldIndex].fieldSetting.options = dataValue;
      addressFormData.formFields[dropdownFieldIndex].fieldSetting.isDisabled = false;
    }
    else if (dataField === 'stateId') {
      const dataValue = selectedCity?.filter(item => item.stateId === data.value).map(item => ({
        value: item.cityId,
        label: item.name,
      }));
      const dropdownFieldIndex = addressFormData.formFields.findIndex(item => item.dataField === "cityId");
      addressFormData.formFields[dropdownFieldIndex].fieldSetting.options = dataValue;
      addressFormData.formFields[dropdownFieldIndex].fieldSetting.isDisabled = false;
    }
  }

  const formActionHandler = {
    DDL_CHANGED: handleChangeDropdownList
  };

  return (
    <>
      <CardSection
        cardTitle="Address"
        buttonClassName="danger-btn"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={true}
        buttonText="Add"
        titleButtonClick={handleToggleModal}
      >
        <AddressCard isAddEditModal={handleToggleModal} />
      </CardSection>

      <SidebarModel
        modalTitle="Add/Edit Address"
        contentClass="content-40"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <div className="row horizontal-form mt-3">
          <FormCreator
            ref={userFormRef}
            // config={addressFormData}
            {...formData}
            onActionChange={formActionHandler}
          />
          <div className="col-md-12 mt-2">
            <div className="d-flex align-item-end justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Save"
              // onClick={onHandleUser}
              // isLoading={EmailLoading || updateUserLoading}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
                onClick={onSidebarClose}
              />
            </div>
          </div>
        </div>
      </SidebarModel>
    </>
  );
};

export default AddressDetail;
