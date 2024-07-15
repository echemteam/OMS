/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Libs's */
import { securityKey } from "../../../../data/SecurityKey";
import Buttons from "../../../../components/ui/button/Buttons";
import { getTaxIdMinMaxLength } from "./config/TaxIdValidator";
import FormCreator from "../../../../components/Forms/FormCreator";
import CardSection from "../../../../components/ui/card/CardSection";
import { basicDetailFormDataHalf, excludingRoles } from "./config/BasicDetailForm.data";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
//** Service's */
import ToastService from "../../../../services/toastService/ToastService";
import { useLazyGetAllUserQuery } from "../../../../app/services/commonAPI";
import { useAddEditCustomersBasicInformationMutation, useCheckCustomerNameExistMutation, useLazyGetAllCountriesQuery, useLazyGetAllGroupTypesQuery, useLazyGetAllTerritoriesQuery, useLazyGetCustomersBasicInformationByIdQuery, useLazyGetCustomersDetailsByCutomerNameQuery } from "../../../../app/services/basicdetailAPI";
import { BasicInformation } from "./BasicInformation";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { settingTypeEnums } from "../../../../utils/Enums/enums";
import { setFieldSetting } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";

const BasicDetail = (props) => {
  const basicDetailRef = useRef();
  const [customerName, setCustomerName] = useState('');
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [customerInfoData, setCustomerInfoData] = useState(false);
  const [noteId, setNoteId] = useState("")

  const [formData, setFormData] = useState(basicDetailFormDataHalf);
  const { nextRef, customerId, setCustomerId, moveNextPage, isResponsibleUser, setIsResponsibleUser } = useContext(BasicDetailContext);

  const { formSetting } = basicDetailFormDataHalf;
  const hasEditPermission = hasFunctionalPermission(securityKey.EDITBASICCUSTOMERDETAILS);

  const [getCustomersBasicInformationById, { isFetching: isGetCustomersBasicInformationByIdFetching, isSuccess: isGetCustomersBasicInformationById,
    data: GetCustomersBasicInformationByIdData }] = useLazyGetCustomersBasicInformationByIdQuery();
  const [CheckCustomerNameExist, { isSuccess: isCustomerNameExistSucess, data: isCustomerNameExistData, }] = useCheckCustomerNameExistMutation();
  const [getCustomersDetailsByCutomerName, { isFetching: isuseGetCustomersDetailsByCutomerNameMutationFetching, isSuccess: isuseGetCustomersDetailsByCutomerNameMutationSucess, data: isuseGetCustomersDetailsByCutomerNameMutationData, }] = useLazyGetCustomersDetailsByCutomerNameQuery();

  useEffect(() => {
    if (props.isOpen) {
      if (!isResponsibleUser) {
        if (hasEditPermission.isViewOnly === true) {
          formSetting.isViewOnly = true;
          setIsButtonDisable(true);
          setFieldSetting(formData, 'responsibleUserId', settingTypeEnums.isDisabled, true);
          setIsResponsibleUser(true);
        }
        else {
          formSetting.isViewOnly = false;
          setIsButtonDisable(false);
          setFieldSetting(formData, 'responsibleUserId', settingTypeEnums.isDisabled, false);
          setIsResponsibleUser(false);
        }
      }
      if (isResponsibleUser) {
        formSetting.isViewOnly = false;
        setIsButtonDisable(false);
        setFieldSetting(formData, 'responsibleUserId', settingTypeEnums.isDisabled, true);
        setIsResponsibleUser(true);
      }
    }
  }, [props.isOpen, hasEditPermission, formSetting.isViewOnly, isResponsibleUser])

  const [
    getAllGroupTypes,
    {
      isSuccess: isGetAllGroupTypesSucess,
      data: allGetAllGroupTypesData,
    },
  ] = useLazyGetAllGroupTypesQuery();

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
    getAllUser,
    {
      isSuccess: isGetAllUserSucess,
      data: allGetAlluserData,
    },
  ] = useLazyGetAllUserQuery();

  const [
    addEditCustomersBasicInformation,
    {
      isLoading: isAddEditCustomersBasicInformationLoading,
      isSuccess: isAddEditCustomersBasicInformationSuccess,
      data: isAddEditCustomersBasicInformationData,
    },
  ] = useAddEditCustomersBasicInformationMutation();

  useEffect(() => {
    getAllGroupTypes();
    getAllCountries();
    getAllTerritories();
    manageFilteredForm();
    getAllUser();
  }, []);

  const manageFilteredForm = () => {
    const manageData = { ...formData }
    const filteredFormFields = basicDetailFormDataHalf.formFields.filter(field => field.id !== "name-input" && field.dataField !== "responsibleUserId");
    manageData.formFields = filteredFormFields;
    setFormData(manageData)
  };

  useEffect(() => {
    if (
      isGetAllGroupTypesSucess &&
      allGetAllGroupTypesData
    ) {
      const getData = allGetAllGroupTypesData.filter(x => x.isForCustomers).map((item) => ({
        value: item.groupTypeId,
        label: item.type,
      }));
      const dropdownField = basicDetailFormDataHalf.formFields.find(
        (item) => item.dataField === "groupTypeId"
      );
      dropdownField.fieldSetting.options = getData;
    }
  }, [
    isGetAllGroupTypesSucess,
    allGetAllGroupTypesData,
  ]);

  useEffect(() => {
    if (
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
    isGetAllCountriesSucess,
    allGetAllCountriesData,
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
      const dropdownField = basicDetailFormDataHalf.formFields.find(
        (item) => item.dataField === "territoryId"
      );
      dropdownField.fieldSetting.options = getData;
    }
  }, [
    isGetAllTerritoriesSucess,
    allGetAllTerritoriesData,
  ]);

  useEffect(() => {
    if (isGetAllUserSucess && allGetAlluserData) {
      const filterData = allGetAlluserData.filter((item) => {
        return item.roleName === null || !excludingRoles.map(role => role.toLowerCase()).includes(item.roleName.toLowerCase());
      });

      const getData = filterData.map((item) => ({
        value: item.userId,
        label: item.fullName,
      }));
      const dropdownField = basicDetailFormDataHalf.formFields.find(
        (item) => item.dataField === "responsibleUserId"
      );
      dropdownField.fieldSetting.options = getData;
    }
  }, [isGetAllUserSucess, allGetAlluserData,]);

  useEffect(() => {
    if (isAddEditCustomersBasicInformationSuccess && isAddEditCustomersBasicInformationData) {
      if (isAddEditCustomersBasicInformationData.errorMessage.includes('exists')) {
        ToastService.warning(isAddEditCustomersBasicInformationData.errorMessage);
        return;
      }
      setNoteId(isAddEditCustomersBasicInformationData.noteId)
      if (props.pageId > 0) {
        props.onhandleRepeatCall()
        onreset()
        ToastService.success(isAddEditCustomersBasicInformationData.errorMessage);
      } else {
        setCustomerId(isAddEditCustomersBasicInformationData.keyValue)
        ToastService.success(isAddEditCustomersBasicInformationData.errorMessage);
        moveNextPage();
      }
    }
  }, [isAddEditCustomersBasicInformationSuccess, isAddEditCustomersBasicInformationData]);

  const onreset = () => {
    props.onSidebarClose()
    let restData = { ...basicDetailFormDataHalf };
    restData.initialState = { ...formData };
    setFormData(restData);
  }

  useEffect(() => {
    if (isGetCustomersBasicInformationById && GetCustomersBasicInformationByIdData && !isGetCustomersBasicInformationByIdFetching) {
      const newFrom = { ...basicDetailFormDataHalf };
      const { formFields } = getTaxIdMinMaxLength(GetCustomersBasicInformationByIdData.countryId, basicDetailFormDataHalf.formFields, 'taxId');
      newFrom.formFields = formFields;
      newFrom.initialState = { ...GetCustomersBasicInformationByIdData };
      newFrom.formFields = basicDetailFormDataHalf.formFields.filter(field => field.dataField !== "note" && field.id !== "name");
      setFormData(newFrom);
    }
  }, [isGetCustomersBasicInformationById, GetCustomersBasicInformationByIdData, isGetCustomersBasicInformationByIdFetching]);

  useEffect(() => {
    if (props.isOpen) {
      customerId && getCustomersBasicInformationById(customerId);
    }
  }, [props.isOpen])

  useImperativeHandle(nextRef, () => ({
    handleAddBasicDetails,
  }));

  const handleAddBasicDetails = () => {
    let data = basicDetailRef.current.getFormData();
    if (data) {
      let countryId = data.countryId && typeof data.countryId === "object" ? data.countryId.value : data.countryId;
      let req = {
        ...data,
        groupTypeId: data.groupTypeId && typeof data.groupTypeId === "object" ? data.groupTypeId.value : data.groupTypeId,
        territoryId: data.territoryId && typeof data.territoryId === "object" ? data.territoryId.value : data.territoryId,
        countryId: data.countryId && typeof data.countryId === "object" ? data.countryId.value : data.countryId,
        responsibleUserId: data.responsibleUserId && typeof data.responsibleUserId === "object" ? data.responsibleUserId.value : data.responsibleUserId,
        customerId: props.pageId ? props.pageId : customerId,
        customerNoteId: noteId ? noteId : 0
      };

      if (data.taxId === "") {
        let value = {
          ...req,
          responsibleUserId: data.responsibleUserId === "" ? 0 : data.responsibleUserId && typeof data.responsibleUserId === "object" ? data.responsibleUserId.value : data.responsibleUserId,
        }
        addEditCustomersBasicInformation(value);
      } else {
        if (data.taxId) {
          const { message: validateTaxIdMessage, minLength, maxLength } = getTaxIdMinMaxLength(countryId ? countryId : 0, basicDetailFormDataHalf.formFields, 'taxId');
          if (data.taxId.length === minLength || data.taxId.length >= maxLength) {
            let value = {
              ...req,
              responsibleUserId: data.responsibleUserId === "" ? 0 : data.responsibleUserId && typeof data.responsibleUserId === "object" ? data.responsibleUserId.value : data.responsibleUserId,
            }
            addEditCustomersBasicInformation(value);
          } else {
            ToastService.warning(validateTaxIdMessage);
          }
        }
      }
    } else {
      ToastService.warning('Please enter customer basic information');
    }
  };

  const handleValidateTextId = (data, dataField) => {
    if (dataField === 'countryId') {
      const { formFields } = getTaxIdMinMaxLength(data.value, basicDetailFormDataHalf.formFields, 'taxId');
      const updatedForm = { ...formData };
      updatedForm.formFields = formFields;
      if (props.isOpen) {
        updatedForm.formFields = basicDetailFormDataHalf.formFields.filter(field => field.id !== "name" && field.dataField !== "note");
      } else {
        updatedForm.formFields = basicDetailFormDataHalf.formFields.filter(field => field.id !== "name-input" && field.dataField !== "responsibleUserId");
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
    INPUT_CHANGED: handleInputFields,
  }


  const handleInputGroupButton = () => {
    if (customerName !== '') {
      let request = {
        name: customerName
      }
      CheckCustomerNameExist(request);
    }
  }

  const handleInputShowInfo = () => {
    if (customerName !== '' && customerName.trim().length >= 3) {
      getCustomersDetailsByCutomerName(customerName);

    } else {
      ToastService.warning('Please enter at least three characters.');
    }
  }

  const onSidebarClose = () => {
    setIsModelOpen(false)
  }

  useEffect(() => {
    if (isCustomerNameExistSucess && isCustomerNameExistData) {
      if (isCustomerNameExistData.errorMessage.includes('exists')) {
        ToastService.warning(isCustomerNameExistData.errorMessage);
        return;
      }
      ToastService.info(isCustomerNameExistData.errorMessage);
    }
  }, [isCustomerNameExistSucess, isCustomerNameExistData]);

  useEffect(() => {
    if (!isuseGetCustomersDetailsByCutomerNameMutationFetching && isuseGetCustomersDetailsByCutomerNameMutationSucess && isuseGetCustomersDetailsByCutomerNameMutationData) {
      if (isuseGetCustomersDetailsByCutomerNameMutationData.length > 0) {
        setIsModelOpen(true)
        setCustomerInfoData(isuseGetCustomersDetailsByCutomerNameMutationData)
      }
      else {
        ToastService.warning("No record found");
      }
    }
  }, [isuseGetCustomersDetailsByCutomerNameMutationFetching, isuseGetCustomersDetailsByCutomerNameMutationSucess, isuseGetCustomersDetailsByCutomerNameMutationData]);

  return (
    <div className="basic-info-sec half-sec">
      <CardSection buttonClassName="theme-button">
        <div className="row basic-info-step">
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

        {props.isOpen &&
          <div className="col-md-12">
            <div className="d-flex align-item-end justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Update"
                onClick={handleAddBasicDetails}
                isLoading={isAddEditCustomersBasicInformationLoading}
                isDisable={isButtonDisable}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
                onClick={props.onSidebarClose}
              />
            </div>
          </div>
        }

      </CardSection>
      {isModelOpen &&
        <SidebarModel
          modalTitle="Customer Information"
          contentClass="content-50 basic-info-model"
          onClose={onSidebarClose}
          isOpen={isModelOpen}
          onClick={handleInputShowInfo}
        >
          <BasicInformation
            onSidebarClose={onSidebarClose}
            infoData={customerInfoData}
          />
        </SidebarModel>
      }

    </div>
  );
};


export default BasicDetail;
