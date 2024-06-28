import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import FormCreator from '../../../../../components/Forms/FormCreator';
import CardSection from '../../../../../components/ui/card/CardSection';
import { supplierBasicData } from '../supplierBasicDetail/config/SupplierBasicDetail.data';
import { useAddEditSupplierBasicInformationMutation, useCheckSupplierNameExistMutation, useLazyGetAllSupplierTypeQuery } from '../../../../../app/services/supplierAPI'
import ToastService from '../../../../../services/toastService/ToastService';
import { getTaxIdMinMaxLength } from '../../../../customerDetail/features/basicDetail/config/TaxIdValidator';
import AddSupplierContext from '../../../../../utils/ContextAPIs/Supplier/AddSupplierContext';
import Buttons from '../../../../../components/ui/button/Buttons';
import { useLazyGetAllCountriesQuery, useLazyGetAllGroupTypesQuery, useLazyGetAllTerritoriesQuery } from '../../../../../app/services/basicdetailAPI';
import { securityKey } from '../../../../../data/SecurityKey';
import { hasFunctionalPermission } from '../../../../../utils/AuthorizeNavigation/authorizeNavigation';
import { useLazyGetAllUserQuery } from '../../../../../app/services/commonAPI';

const SupplierBasicDetail = (props) => {

  const basicDetailRef = useRef();

  const [formData, setFormData] = useState(supplierBasicData);
   const [supplierName, setSupplierName] = useState('');

  const { nextStepRef, setSupplierId, moveNextPage, setAllCountries, supplierId } = useContext(AddSupplierContext);

  const { formSetting } = supplierBasicData;
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const hasEditPermission = hasFunctionalPermission(securityKey.EDITBASICSUPPLIERDETAILS);

  useEffect(() => {
    if (props.isOpen) {
      if (hasEditPermission.isViewOnly === true) {
        formSetting.isViewOnly = true;
        setIsButtonDisable(true);
      }
      else {
        formSetting.isViewOnly = false;
        setIsButtonDisable(false);
      }
    }
  }, [props.isOpen, hasEditPermission, formSetting.isViewOnly])

  const [
    addEditSupplierBasicInformation,
    {
      isLoading: isAddEditSupplierBasicInformationLoading,
      isSuccess: isAddEditSupplierBasicInformationSuccess,
      data: isAddEditSupplierBasicInformationData,
    },
  ] = useAddEditSupplierBasicInformationMutation();

  const [
    getAllGroupTypes,
    {
      isFetching: isGetAllGroupTypesFetching,
      isSuccess: isGetAllGroupTypesSucess,
      data: allGetAllGroupTypesData,
    },
  ] = useLazyGetAllGroupTypesQuery();

  const [
    getAllUser,
    {
      isFetching: isGetAllUserFetching,
      isSuccess: isGetAllUserSucess,
      data: allGetAllUserData,
    },
  ] = useLazyGetAllUserQuery();

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
    getAllSupplierType,
    {
      isFetching: isGetAllSupplierTypeFetching,
      isSuccess: isGetAllSupplierTypeSucess,
      data: allGetAllSupplierTypeData,
    },
  ] = useLazyGetAllSupplierTypeQuery();

  const [CheckSupplierNameExist, {isSuccess: isSupplierNameExistSucess, data: isSupplierNameExistData, }] = useCheckSupplierNameExistMutation();


  useEffect(() => {
    getAllGroupTypes();
    getAllCountries();
    getAllTerritories();
    getAllSupplierType();
    manageFilteredForm();
    getAllUser();
  }, []);

  const manageFilteredForm = () => {
    const manageData = { ...formData }
    const filteredFormFields = supplierBasicData.formFields.filter(field => field.id !== "name-input" &&  field.dataField !== "responsibleUserId");
    manageData.formFields = filteredFormFields;
    setFormData(manageData)
  };

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
      const dropdownField = supplierBasicData.formFields.find(
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
    if (!isGetAllUserFetching && isGetAllUserSucess && allGetAllUserData) {
      const getData = allGetAllUserData.map((item) => ({
        value: item.userId,
        label: item.fullName,
      }));
      const dropdownField = supplierBasicData.formFields.find(
        (item) => item.dataField === "responsibleUserId"
      );
      dropdownField.fieldSetting.options = getData;
    }
   
  }, [isGetAllUserFetching,isGetAllUserSucess,allGetAllUserData,]);
  
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
      const dropdownField = supplierBasicData.formFields.find(
        (item) => item.dataField === "countryId"
      );
      dropdownField.fieldSetting.options = getData;
      setAllCountries(allGetAllCountriesData);
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
      const dropdownField = supplierBasicData.formFields.find(
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
    if (
      !isGetAllSupplierTypeFetching &&
      isGetAllSupplierTypeSucess &&
      allGetAllSupplierTypeData
    ) {
      const getData = allGetAllSupplierTypeData.map((item) => ({
        value: item.supplierTypeId,
        label: item.type,
      }));
      const dropdownField = supplierBasicData.formFields.find(
        (item) => item.dataField === "supplierTypeId"
      );
      dropdownField.fieldSetting.options = getData;
    }
  }, [
    isGetAllSupplierTypeFetching,
    isGetAllSupplierTypeSucess,
    allGetAllSupplierTypeData,
  ]);

  useEffect(() => {
    if (isAddEditSupplierBasicInformationSuccess && isAddEditSupplierBasicInformationData) {
      if (isAddEditSupplierBasicInformationData.errorMessage.includes('exists')) {
        ToastService.warning(isAddEditSupplierBasicInformationData.errorMessage);
        return;
      }
      if (supplierId === 0) {
        setSupplierId(isAddEditSupplierBasicInformationData.keyValue)
        ToastService.success(isAddEditSupplierBasicInformationData.errorMessage);
        moveNextPage();
      } else {
        props.onhandleRepeatCall()
        ToastService.success(isAddEditSupplierBasicInformationData.errorMessage);
        onreset()
      }
    }
  }, [isAddEditSupplierBasicInformationSuccess, isAddEditSupplierBasicInformationData]);

  useImperativeHandle(nextStepRef, () => ({
    handleAddSupplierBasicDetails,
  }));

  const onreset = () => {
    props.onSidebarClose()
    let restData = { ...supplierBasicData };
    restData.initialState = { ...formData };
    setFormData(restData);
  }

  useEffect(() => {
    if (props.isOpen) {
      let data = { ...supplierBasicData };
      data.initialState = { ...props.supplierData };
      data.formFields = supplierBasicData.formFields.filter(field => field.dataField !== "note" && field.id !== "name");

      setFormData(data);
    }
  }, [props.isOpen])

  const handleAddSupplierBasicDetails = () => {
    let data = basicDetailRef.current.getFormData();
    if (data) {
      let req = {
        ...data,
        supplierTypeId: data.supplierTypeId.value,
        groupTypeId: data.groupTypeId.value,
        territoryId: data.territoryId.value,
        countryId: data.countryId.value,
        responsibleUserId:0
      }
      addEditSupplierBasicInformation(req);
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
        supplierTypeId: data.supplierTypeId && typeof data.supplierTypeId === "object"
          ? data.supplierTypeId.value
          : data.supplierTypeId,
        territoryId: data.territoryId && typeof data.territoryId === "object"
          ? data.territoryId.value
          : data.territoryId,
        countryId: data.countryId && typeof data.countryId === "object"
          ? data.countryId.value
          : data.countryId,
          responsibleUserId: data.responsibleUserId && typeof data.responsibleUserId === "object"
          ? data.responsibleUserId.value
          : data.responsibleUserId,
        supplierId: props.pageId
      }
      addEditSupplierBasicInformation(req);
    }
  };

  const handleValidateTextId = (data, dataField) => {
    if (dataField === 'countryId') {
      const modifyFormFields = getTaxIdMinMaxLength(data.value, supplierBasicData.formFields, 'taxId');
      const updatedForm = { ...formData };
      updatedForm.formFields = modifyFormFields;
      if (props.isOpen) {
        updatedForm.formFields = supplierBasicData.formFields.filter(field => field.id !== "name" && field.dataField !== "note");
      } else {
        updatedForm.formFields = supplierBasicData.formFields.filter(field => field.id !== "name-input" && field.dataField !== "responsibleUserId");
      }
      setFormData(updatedForm);
    }
  }
  const formActionHandler = {
    DDL_CHANGED: handleValidateTextId
  };
 
  useEffect(() => {
    if (isSupplierNameExistSucess && isSupplierNameExistData) {
      if (isSupplierNameExistData.errorMessage.includes('exists')) {
        ToastService.warning(isSupplierNameExistData.errorMessage);
        return;
      }
      ToastService.success(isSupplierNameExistData.errorMessage);
    }
  }, [isSupplierNameExistSucess, isSupplierNameExistData]);

  const handleInputGroupButton = () => {
    if (supplierName !== '') {
      let request = {
        name: supplierName
      }
      CheckSupplierNameExist(request);
    }
  }

  const handleInputFields = (data, dataField) => {
    if (dataField === 'name') {
      const trimCustomerName = data.replace(/\s+/g, '');
      setSupplierName(trimCustomerName);
    }
  }
  const formInputHandler = {
    INPUT_CHANGED: handleInputFields
  }

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
                isLoading={isAddEditSupplierBasicInformationLoading}
                isDisable={isButtonDisable}
              />
            </div>
          </div>
        }

      </CardSection>
    </div>
  );
}

export default SupplierBasicDetail