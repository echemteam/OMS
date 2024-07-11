/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import FormCreator from '../../../../../components/Forms/FormCreator';
import CardSection from '../../../../../components/ui/card/CardSection';
import { supplierBasicData } from '../supplierBasicDetail/config/SupplierBasicDetail.data';
import { useAddEditSupplierBasicInformationMutation, useCheckSupplierNameExistMutation, useLazyGetAllSupplierTypeQuery, useLazyGetSupplierBasicInformationByIdQuery, useLazyGetSupplierDetailsBySupplierNameQuery } from '../../../../../app/services/supplierAPI'
import ToastService from '../../../../../services/toastService/ToastService';
import { getTaxIdMinMaxLength } from '../../../../customerDetail/features/basicDetail/config/TaxIdValidator';
import AddSupplierContext from '../../../../../utils/ContextAPIs/Supplier/AddSupplierContext';
import Buttons from '../../../../../components/ui/button/Buttons';
import { useLazyGetAllCountriesQuery, useLazyGetAllGroupTypesQuery, useLazyGetAllTerritoriesQuery } from '../../../../../app/services/basicdetailAPI';
import { securityKey } from '../../../../../data/SecurityKey';
import { hasFunctionalPermission } from '../../../../../utils/AuthorizeNavigation/authorizeNavigation';
import { useLazyGetAllUserQuery } from '../../../../../app/services/commonAPI';
import { excludingRoles } from '../../../../customerDetail/features/basicDetail/config/BasicDetailForm.data';

import { BasicInformation } from '../../../../customerDetail/features/basicDetail/BasicInformation';
import SidebarModel from '../../../../../components/ui/sidebarModel/SidebarModel';
import { setFieldSetting } from '../../../../../utils/FieldsSetting/SetFieldSetting';
import { settingTypeEnums } from '../../../../../utils/Enums/enums';

const SupplierBasicDetail = (props) => {

  const basicDetailRef = useRef();
  const [supplierName, setSupplierName] = useState('');
  const [formData, setFormData] = useState(supplierBasicData);
  const { isOpen, onhandleRepeatCall, onSidebarClose, pageId } = props;
  const { nextStepRef, setSupplierId, moveNextPage, setAllCountries, supplierId, isResponsibleUser } = useContext(AddSupplierContext);

  const [isShowModel, setIsShowModel] = useState(false);
  const { formSetting } = supplierBasicData;
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const hasEditPermission = hasFunctionalPermission(securityKey.EDITBASICSUPPLIERDETAILS);
  const [supplierInfoData, setSupplierInfoData] = useState(false);
  const [noteId , setNotId] = useState("")

  const [
    getSupplierBasicInformationById,
    {
      isFetching: isGetSupplierBasicInformationByIdFetching,
      isSuccess: isGetSupplierBasicInformationById,
      data: GetSupplierBasicInformationByIdData,
    },
  ] = useLazyGetSupplierBasicInformationByIdQuery();
  const [getSupplierDetailsBySupplierName, { isFetching: isGetSupplierDetailsBySupplierNameFetching, isSuccess: isGetSupplierDetailsBySupplierNameSucess, data: isGetSupplierDetailsBySupplierNameData, }] = useLazyGetSupplierDetailsBySupplierNameQuery();

  useEffect(() => {
    if (isOpen) {
      if (!isResponsibleUser) {
        if (hasEditPermission.isViewOnly === true) {
          formSetting.isViewOnly = true;
          setIsButtonDisable(true);
          setFieldSetting(formData, 'responsibleUserId', settingTypeEnums.isDisabled, true);
        }
        else {
          formSetting.isViewOnly = false;
          setIsButtonDisable(false);
          setFieldSetting(formData, 'responsibleUserId', settingTypeEnums.isDisabled, false);
        }
      }
      if (isResponsibleUser) {
        formSetting.isViewOnly = false;
        setIsButtonDisable(false);
        setFieldSetting(formData, 'responsibleUserId', settingTypeEnums.isDisabled, true);
      }
    }
  }, [isOpen, hasEditPermission, formSetting, formData, isResponsibleUser])

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
      isSuccess: isGetAllGroupTypesSucess,
      data: allGetAllGroupTypesData,
    },
  ] = useLazyGetAllGroupTypesQuery();

  const [
    getAllUser,
    {
      isSuccess: isGetAllUserSucess,
      data: allGetAllUserData,
    },
  ] = useLazyGetAllUserQuery();

  const [
    getAllCountries,
    {
      isSuccess: isGetAllCountriesSucess,
      data: allGetAllCountriesData,
    },
  ] = useLazyGetAllCountriesQuery();

  const [
    getAllTerritories,
    {
      isSuccess: isGetAllTerritoriesSucess,
      data: allGetAllTerritoriesData,
    },
  ] = useLazyGetAllTerritoriesQuery();

  const [
    getAllSupplierType,
    {
      isSuccess: isGetAllSupplierTypeSucess,
      data: allGetAllSupplierTypeData,
    },
  ] = useLazyGetAllSupplierTypeQuery();

  const [CheckSupplierNameExist, { isSuccess: isSupplierNameExistSucess, data: isSupplierNameExistData, }] = useCheckSupplierNameExistMutation();


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
    const filteredFormFields = supplierBasicData.formFields.filter(field => field.id !== "name-input" && field.dataField !== "responsibleUserId");
    manageData.formFields = filteredFormFields;
    setFormData(manageData)
  };

  useEffect(() => {
    if (isGetAllGroupTypesSucess && allGetAllGroupTypesData) {
      const getData = allGetAllGroupTypesData.filter(x => x.isForSuppliers).map((item) => ({
        value: item.groupTypeId,
        label: item.type,
      }));
      const dropdownField = supplierBasicData.formFields.find(
        (item) => item.dataField === "groupTypeId"
      );
      dropdownField.fieldSetting.options = getData;
    }
  }, [
    isGetAllGroupTypesSucess,
    allGetAllGroupTypesData,
  ]);
  useEffect(() => {
    if (isGetAllUserSucess && allGetAllUserData) {
      const filterData = allGetAllUserData.filter((item) => {
        return item.roleName === null || !excludingRoles.map(role => role.toLowerCase()).includes(item.roleName.toLowerCase());
      });
      const getData = filterData.map((item) => ({
        value: item.userId,
        label: item.fullName,
      }));
      const dropdownField = supplierBasicData.formFields.find(
        (item) => item.dataField === "responsibleUserId"
      );
      dropdownField.fieldSetting.options = getData;
    }

  }, [isGetAllUserSucess, allGetAllUserData,]);

  useEffect(() => {
    if (
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
    isGetAllCountriesSucess,
    allGetAllCountriesData
  ]);

  useEffect(() => {
    if (
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
    isGetAllTerritoriesSucess,
    allGetAllTerritoriesData,
  ]);

  useEffect(() => {
    if (
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
    isGetAllSupplierTypeSucess,
    allGetAllSupplierTypeData,
  ]);

  useEffect(() => {
    if (isAddEditSupplierBasicInformationSuccess && isAddEditSupplierBasicInformationData) {
      if (isAddEditSupplierBasicInformationData.errorMessage.includes('exists')) {
        ToastService.warning(isAddEditSupplierBasicInformationData.errorMessage);
        return;
      }
      setNotId(isAddEditSupplierBasicInformationData.noteId)
      if (pageId > 0) {
        onhandleRepeatCall()
        ToastService.success(isAddEditSupplierBasicInformationData.errorMessage);
        onreset()
      } else {
        setSupplierId(isAddEditSupplierBasicInformationData.keyValue)
        ToastService.success(isAddEditSupplierBasicInformationData.errorMessage);
        moveNextPage();
      }
    }
  }, [isAddEditSupplierBasicInformationSuccess, isAddEditSupplierBasicInformationData]);

  useImperativeHandle(nextStepRef, () => ({
    handleAddSupplierBasicDetails,
  }));

  const onreset = () => {
    onSidebarClose()
    let restData = { ...supplierBasicData };
    restData.initialState = { ...formData };
    setFormData(restData);
  }

  useEffect(() => {
    if (isGetSupplierBasicInformationById && GetSupplierBasicInformationByIdData && !isGetSupplierBasicInformationByIdFetching) {
      const newFrom = { ...supplierBasicData };
      const { formFields } = getTaxIdMinMaxLength(GetSupplierBasicInformationByIdData.countryId, supplierBasicData.formFields, 'taxId');
      newFrom.formFields = formFields;
      newFrom.initialState = { ...GetSupplierBasicInformationByIdData };
      newFrom.formFields = supplierBasicData.formFields.filter(field => field.dataField !== "note" && field.id !== "name");
      setFormData(newFrom);
    }
  }, [isGetSupplierBasicInformationById, GetSupplierBasicInformationByIdData, isGetSupplierBasicInformationByIdFetching]);

  useEffect(() => {
    if (isOpen) {
      if (supplierId > 0) {
        getSupplierBasicInformationById(supplierId);
      }
    }
  }, [isOpen, supplierId, getSupplierBasicInformationById])

  const handleAddSupplierBasicDetails = () => {
    let data = basicDetailRef.current.getFormData();
    if (data) {
      let countryId = data.countryId && typeof data.countryId === "object" ? data.countryId.value : data.countryId;
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
        supplierId: pageId ? pageId : supplierId,
        supplierNoteId : noteId ? noteId : 0
      }

      if (data.taxId === "") {
        let value = {
          ...req,
          responsibleUserId: data.responsibleUserId === "" ? 0 : data.responsibleUserId && typeof data.responsibleUserId === "object" ? data.responsibleUserId.value : data.responsibleUserId,
        }
        addEditSupplierBasicInformation(value);
      } else {
        if (data.taxId) {
          const { message: validateTaxIdMessage, minLength, maxLength } = getTaxIdMinMaxLength(countryId ? countryId : 0, supplierBasicData.formFields, 'taxId');
          if (data.taxId.length === minLength || data.taxId.length >= maxLength) {
            let value = {
              ...req,
              responsibleUserId: data.responsibleUserId === "" ? 0 : data.responsibleUserId && typeof data.responsibleUserId === "object" ? data.responsibleUserId.value : data.responsibleUserId,
            }
            addEditSupplierBasicInformation(value);
          } else {
            ToastService.warning(validateTaxIdMessage);
          }
        }
      }

    } else {
      ToastService.warning('Please enter supplier basic information');
    }
  };

  const handleValidateTextId = (data, dataField) => {
    if (dataField === 'countryId') {
      const modifyFormFields = getTaxIdMinMaxLength(data.value, supplierBasicData.formFields, 'taxId');
      const updatedForm = { ...formData };
      updatedForm.formFields = modifyFormFields;
      if (isOpen) {
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
      ToastService.info(isSupplierNameExistData.errorMessage);
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
  useEffect(() => {

    if (!isGetSupplierDetailsBySupplierNameFetching && isGetSupplierDetailsBySupplierNameSucess && isGetSupplierDetailsBySupplierNameData) {
      if (isGetSupplierDetailsBySupplierNameData.length > 0) {
        setIsShowModel(true)
        setSupplierInfoData(isGetSupplierDetailsBySupplierNameData)
      } else {
        ToastService.warning("No record found");
      }
    }
  }, [isGetSupplierDetailsBySupplierNameFetching, isGetSupplierDetailsBySupplierNameSucess, isGetSupplierDetailsBySupplierNameData]);

  const sidebarClose = () => {
    setIsShowModel(false)
  }

  const handleInputShowInfo = () => {

    if (supplierName !== '' && supplierName.trim().length >= 3) {
      getSupplierDetailsBySupplierName(supplierName);

    } else {
      ToastService.warning('Please enter at least three characters.');
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
            handleInputShowInfo={handleInputShowInfo}
          />
        </div>

        {isOpen &&
          <div className="col-md-12">
            <div className="d-flex align-item-end justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Update"
                onClick={handleAddSupplierBasicDetails}
                isLoading={isAddEditSupplierBasicInformationLoading}
                isDisable={isButtonDisable}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
                onClick={onSidebarClose}
              />
            </div>
          </div>
        }

      </CardSection>
      {isShowModel &&
        <SidebarModel
          modalTitle="Supplier Information"
          contentClass="content-50 basic-info-model"
          onClose={sidebarClose}
          isOpen={isShowModel}
          onClick={handleInputShowInfo}
        >
          <BasicInformation
            onSidebarClose={sidebarClose}
            infoData={supplierInfoData}
          />
        </SidebarModel>
      }


    </div>
  );
}

export default SupplierBasicDetail