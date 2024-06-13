import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import { basicDetailFormDataHalf } from "./config/BasicDetailForm.data";
import CardSection from "../../../../components/ui/card/CardSection";
import { useAddCustomersBasicInformationMutation, useCheckCustomerNameExistMutation, useLazyGetAllCountriesQuery, useLazyGetAllGroupTypesQuery, useLazyGetAllTerritoriesQuery, useUpdateCustomersBasicInformationMutation } from "../../../../app/services/basicdetailAPI";
import ToastService from "../../../../services/toastService/ToastService";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import Buttons from "../../../../components/ui/button/Buttons";
import { getTaxIdMinMaxLength } from "./config/TaxIdValidator";

const BasicDetail = (props) => {
  const basicDetailRef = useRef();
  const [formData, setFormData] = useState(basicDetailFormDataHalf);
  const [customerName, setCustomerName] = useState('');
  const { nextRef, setCustomerId, moveNextPage } = useContext(BasicDetailContext);

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

  const [
    addCustomersBasicInformation,
    {
      isSuccess: isAddCustomersBasicInformationSuccess,
      data: isAddCustomersBasicInformationData,
    },
  ] = useAddCustomersBasicInformationMutation();

  const [
    updateCustomersBasicInformation,
    {
      isLoading,
      isSuccess: isUpdateCustomersBasicInformationSuccess,
      data: isUpdateCustomersBasicInformationData,
    },
  ] = useUpdateCustomersBasicInformationMutation();

  const [CheckCustomerNameExist, { isLoading: isCustomerNameExistLoading, isSuccess: isCustomerNameExistSucess, data: isCustomerNameExistData, }] = useCheckCustomerNameExistMutation();

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
        (item) => item.dataField === "groupTypeId"
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
        (item) => item.dataField === "countryId"
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
        (item) => item.dataField === "territoryId"
      );
      dropdownField.fieldSetting.options = getData;
    }
  }, [
    isGetAllTerritoriesFetching,
    isGetAllTerritoriesSucess,
    allGetAllTerritoriesData,
  ]);

  useEffect(() => {
    if (isAddCustomersBasicInformationSuccess && isAddCustomersBasicInformationData) {
      if (isAddCustomersBasicInformationData.errorMessage.includes('exists')) {
        ToastService.warning(isAddCustomersBasicInformationData.errorMessage);
        return;
      }
      setCustomerId(isAddCustomersBasicInformationData.keyValue)
      ToastService.success(isAddCustomersBasicInformationData.errorMessage);
      moveNextPage();
    }
  }, [isAddCustomersBasicInformationSuccess, isAddCustomersBasicInformationData]);

  useEffect(() => {
    if (isUpdateCustomersBasicInformationSuccess && isUpdateCustomersBasicInformationData) {
      if (isUpdateCustomersBasicInformationData.errorMessage.includes('exists')) {
        ToastService.warning(isUpdateCustomersBasicInformationData.errorMessage);
        return;
      }
      // setCustomerId(isUpdateCustomersBasicInformationData.keyValue)
      props.onhandleRepeatCall()
      ToastService.success(isUpdateCustomersBasicInformationData.errorMessage);
      onreset()
    }
  }, [isUpdateCustomersBasicInformationSuccess, isUpdateCustomersBasicInformationData]);

  const onreset = () => {
    props.onSidebarClose()
    let restData = { ...basicDetailFormDataHalf };
    restData.initialState = { ...formData };
    setFormData(restData);
  }

  useEffect(() => {
    if (props.isOpen) {
      const removeFields = ['note']
      let data = { ...basicDetailFormDataHalf };
      data.initialState = { ...props.customerData };
      data.formFields = basicDetailFormDataHalf.formFields.filter(field => !removeFields.includes(field.id));
      setFormData(data);
    }
  }, [props.isOpen])

  useImperativeHandle(nextRef, () => ({
    handleAddBasicDetails,
  }));

  const handleAddBasicDetails = () => {
    let data = basicDetailRef.current.getFormData();
    if (data) {
      let req = {
        ...data,
        groupTypeId: data.groupTypeId.value,
        territoryId: data.territoryId.value,
        countryId: data.countryId.value,
      }
      addCustomersBasicInformation(req);
    }
  };

  const handleUpdate = () => {
    let data = basicDetailRef.current.getFormData();
    if (data) {
      let req = {
        ...data,
        groupTypeId: data.groupTypeId && typeof data.groupTypeId === "object"
          ? data.groupTypeId.value
          : data.groupTypeId,
        territoryId: data.territoryId && typeof data.territoryId === "object"
          ? data.territoryId.value
          : data.territoryId,
        countryId: data.countryId && typeof data.countryId === "object"
          ? data.countryId.value
          : data.countryId,
        customerId: props.pageId
      }
      updateCustomersBasicInformation(req);
    }
  };

  const handleValidateTextId = (data, dataField) => {
    if (dataField === 'countryId') {
      const removeFields = ['note']
      const modifyFormFields = getTaxIdMinMaxLength(data.value, basicDetailFormDataHalf.formFields, 'taxId');
      const updatedForm = { ...formData };
      updatedForm.formFields = modifyFormFields;
      if (props.isOpen) {
        updatedForm.formFields = basicDetailFormDataHalf.formFields.filter(field => !removeFields.includes(field.id));
      }
      setFormData(updatedForm);
    }
  }
  const formActionHandler = {
    DDL_CHANGED: handleValidateTextId
  };

  const handleInputFields = (data, dataField) => {
    if (dataField === 'name') {
      const trimCustomerName = data.replace(/\s+/g, '');
      setCustomerName(trimCustomerName);
    }
  }
  const formInputHandler = {
    INPUT_CHANGED: handleInputFields
  }


  const handleInputGroupButton = () => {
    if (customerName !== '') {
      let request = {
        name: customerName
      }
      CheckCustomerNameExist(request);
    }
  }

  useEffect(() => {
    if (isCustomerNameExistSucess && isCustomerNameExistData) {
      ToastService.warning(isCustomerNameExistData.errorMessage);
    }
  }, [isCustomerNameExistSucess, isCustomerNameExistData]);

  return (
    <div className="basic-info-sec half-sec">
      <CardSection buttonClassName="theme-button">
        <div className="row horizontal-form basic-info-step">
          <FormCreator
            config={formData}
            ref={basicDetailRef}
            {...formData}
            onActionChange={formActionHandler}
            onInputChange={formInputHandler}
            handleInputGroupButton={handleInputGroupButton}
          />
        </div>

        {props.isOpen &&
          <div className="col-md-12">
            <div className="d-flex align-item-end justify-content-end">
              <Buttons
                buttonTypeClassName="dark-btn"
                buttonText="Cancel"
                onClick={props.onSidebarClose}
              />
              <Buttons
                buttonTypeClassName="theme-button ml-5"
                buttonText="Update"
                onClick={handleUpdate}
                isLoading={isLoading}
              />
            </div>
          </div>
        }

      </CardSection>
    </div>
  );
};


export default BasicDetail;
