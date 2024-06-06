import React, { useEffect, useRef, useState } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import {
  basicDetailFormDataHalf,
} from "./component/BasicDetailForm.data";
import Buttons from "../../../../components/ui/button/Buttons";
import CardSection from "../../../../components/ui/card/CardSection";
import { useAddCustomersBasicInformationMutation, useLazyGetAllCountriesQuery, useLazyGetAllGroupTypesQuery, useLazyGetAllTerritoriesQuery } from "../../../../app/services/basicdetailAPI";

const BasicDetail = ({ isFullWidthForm }) => {
  const basicDetailRef = useRef();
  const [formData, setFormData] = useState(basicDetailFormDataHalf);

  const [getAllGroupTypes, {
    isFetching: isGetAllGroupTypesFetching,
    isSuccess: isGetAllGroupTypesSucess,
    data: allGetAllGroupTypesData
  },] = useLazyGetAllGroupTypesQuery();

  const [getAllCountries, {
    isFetching: isGetAllCountriesFetching,
    isSuccess: isGetAllCountriesSucess,
    data: allGetAllCountriesData
  },] = useLazyGetAllCountriesQuery();

  const [getAllTerritories, {
    isFetching: isGetAllTerritoriesFetching,
    isSuccess: isGetAllTerritoriesSucess,
    data: allGetAllTerritoriesData
  },] = useLazyGetAllTerritoriesQuery();

  const [addCustomersBasicInformation, {
    isLoading: isAddCustomersBasicInformationLoading,
    isSuccess: isAddCustomersBasicInformationSuccess,
    data: isAddCustomersBasicInformationData }] = useAddCustomersBasicInformationMutation();

  useEffect(() => {
    getAllGroupTypes()
    getAllCountries()
    getAllTerritories()
  }, [])

  useEffect(() => {
    if (!isGetAllGroupTypesFetching && isGetAllGroupTypesSucess && allGetAllGroupTypesData) {
      const getData = allGetAllGroupTypesData.map(item => ({
        value: item.groupTypeId,
        label: item.type
      }))
      const dropdownField = basicDetailFormDataHalf.formFields.find(item => item.dataField === "groupTypeId");
      dropdownField.fieldSetting.options = getData;
    }
  }, [isGetAllGroupTypesFetching, isGetAllGroupTypesSucess, allGetAllGroupTypesData])

  useEffect(() => {
    if (!isGetAllCountriesFetching && isGetAllCountriesSucess && allGetAllCountriesData) {
      const getData = allGetAllCountriesData.map(item => ({
        value: item.countryId,
        label: item.name
      }))
      const dropdownField = basicDetailFormDataHalf.formFields.find(item => item.dataField === "countryId");
      dropdownField.fieldSetting.options = getData;
    }
  }, [isGetAllCountriesFetching, isGetAllCountriesSucess, allGetAllCountriesData])

  useEffect(() => {
    if (!isGetAllTerritoriesFetching && isGetAllTerritoriesSucess && allGetAllTerritoriesData) {
      const getData = allGetAllTerritoriesData.map(item => ({
        value: item.territoryId,
        label: item.territory
      }))
      const dropdownField = basicDetailFormDataHalf.formFields.find(item => item.dataField === "territoryId");
      dropdownField.fieldSetting.options = getData;
    }
  }, [isGetAllTerritoriesFetching, isGetAllTerritoriesSucess, allGetAllTerritoriesData])

  const Add = () => {
    debugger
    let data = basicDetailRef.current.getFormData();
    if (data != null) {
      // if (data) {
      addCustomersBasicInformation(data);
      // }
    }
  };

  return (
    <div className="basic-info-sec half-sec">
      {isFullWidthForm ? (
      <div className="row">
        <FormCreator
          ref={basicDetailRef}
          {...formData}
        // onFormDataUpdate={handleFormDataChange}
        />
        <div className="col-md-12">
          <div className="d-flex align-item-end justify-content-end">
            <Buttons
              buttonTypeClassName="dark-btn"
              buttonText="Cancel"
            // onClick={BackButton}
            />
            <Buttons
              buttonTypeClassName="theme-button ml-5"
              buttonText="Save"
              onClick={Add}
              isLoading={isAddCustomersBasicInformationLoading}
            />
          </div>
        </div>
      </div>
      ) : (
        <CardSection buttonClassName="theme-button">
          <div className="row horizontal-form basic-info-step">
            <FormCreator
              ref={basicDetailRef}
              {...formData}
            // onFormDataUpdate={handleFormDataChange}
            />
          </div>
          <div className="col-md-12">
          <div className="d-flex align-item-end justify-content-end">
            <Buttons
              buttonTypeClassName="dark-btn"
              buttonText="Cancel"
            // onClick={BackButton}
            />
            <Buttons
              buttonTypeClassName="theme-button ml-5"
              buttonText="Save"
              onClick={Add}
              isLoading={isAddCustomersBasicInformationLoading}
            />
          </div>
        </div>
        </CardSection>
      )}
    </div>
  );
};

export default BasicDetail;
