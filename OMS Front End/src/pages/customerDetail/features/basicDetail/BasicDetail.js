import React, { useEffect, useRef } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import { basicDetailFormDataHalf } from "./component/BasicDetailForm.data";
import CardSection from "../../../../components/ui/card/CardSection";
import {
  useLazyGetAllCountriesQuery,
  useLazyGetAllGroupTypesQuery,
  useLazyGetAllTerritoriesQuery,
} from "../../../../app/services/basicdetailAPI";

const BasicDetail = () => {
  const basicDetailRef = useRef();

  const [
    getAllGroupTypes,
    {
      isFetching: isGetAllGroupTypesFetching,
      isSuccess: isGetAllGroupTypesSucess,
      data: allGetAllGroupTypesData,
    },
  ] = useLazyGetAllGroupTypesQuery();

  const [
    getAllCountries,
    {
      isFetching: isGetAllCountriesFetching,
      isSuccess: isGetAllCountriesSucess,
      data: allGetAllCountriesData,
    },
  ] = useLazyGetAllCountriesQuery();

  const [
    getAllTerritories,
    {
      isFetching: isGetAllTerritoriesFetching,
      isSuccess: isGetAllTerritoriesSucess,
      data: allGetAllTerritoriesData,
    },
  ] = useLazyGetAllTerritoriesQuery();

  useEffect(() => {
    getAllGroupTypes();
    getAllCountries();
    getAllTerritories();
  }, []);

  useEffect(() => {
    if (
      !isGetAllGroupTypesFetching &&
      isGetAllGroupTypesSucess &&
      allGetAllGroupTypesData
    ) {
      const getData = allGetAllGroupTypesData.map((item) => ({
        value: item.groupTypeId,
        label: item.type,
      }));
      const dropdownField = basicDetailFormDataHalf.formFields.find(
        (item) => item.dataField === "type"
      );
      dropdownField.fieldSetting.options = getData;
    }
  }, [
    isGetAllGroupTypesFetching,
    isGetAllGroupTypesSucess,
    allGetAllGroupTypesData,
  ]);

  useEffect(() => {
    if (
      !isGetAllCountriesFetching &&
      isGetAllCountriesSucess &&
      allGetAllCountriesData
    ) {
      const getData = allGetAllCountriesData.map((item) => ({
        value: item.countryId,
        label: item.name,
      }));
      const dropdownField = basicDetailFormDataHalf.formFields.find(
        (item) => item.dataField === "name"
      );
      dropdownField.fieldSetting.options = getData;
    }
  }, [
    isGetAllCountriesFetching,
    isGetAllCountriesSucess,
    allGetAllCountriesData,
  ]);

  useEffect(() => {
    if (
      !isGetAllTerritoriesFetching &&
      isGetAllTerritoriesSucess &&
      allGetAllTerritoriesData
    ) {
      const getData = allGetAllTerritoriesData.map((item) => ({
        value: item.territoryId,
        label: item.territory,
      }));
      const dropdownField = basicDetailFormDataHalf.formFields.find(
        (item) => item.dataField === "territory"
      );
      dropdownField.fieldSetting.options = getData;
    }
  }, [
    isGetAllTerritoriesFetching,
    isGetAllTerritoriesSucess,
    allGetAllTerritoriesData,
  ]);

  return (
    <div className="basic-info-sec half-sec">
      <CardSection buttonClassName="theme-button">
        <div className="row horizontal-form basic-info-step">
          <FormCreator
            ref={basicDetailRef}
            {...basicDetailFormDataHalf}
            // onFormDataUpdate={handleFormDataChange}
          />
        </div>
      </CardSection>
    </div>
  );
};

export default BasicDetail;
