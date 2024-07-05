import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Libs's */
import { securityKey } from "../../../../data/SecurityKey";
import Buttons from "../../../../components/ui/button/Buttons";
import { getTaxIdMinMaxLength } from "./config/TaxIdValidator";
import FormCreator from "../../../../components/Forms/FormCreator";
import CardSection from "../../../../components/ui/card/CardSection";
import { basicDetailFormDataHalf, excludingRoles } from "./config/BasicDetailForm.data";
import { setFieldDisabled } from "../../../../utils/FieldDisabled/setFieldDisabled";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
//** Service's */
import ToastService from "../../../../services/toastService/ToastService";
import { useLazyGetAllUserQuery } from "../../../../app/services/commonAPI";
import { useAddCustomersBasicInformationMutation, useCheckCustomerNameExistMutation, useLazyGetAllCountriesQuery, useLazyGetAllGroupTypesQuery, useLazyGetAllTerritoriesQuery, useUpdateCustomersBasicInformationMutation } from "../../../../app/services/basicdetailAPI";

const BasicDetail = (props) => {
  const basicDetailRef = useRef();
  const [customerName, setCustomerName] = useState('');
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [formData, setFormData] = useState(basicDetailFormDataHalf);
  const { nextRef, setCustomerId, moveNextPage, setAllCountries, isResponsibleUser } = useContext(BasicDetailContext);

  const { formSetting } = basicDetailFormDataHalf;
  const hasEditPermission = hasFunctionalPermission(securityKey.EDITBASICCUSTOMERDETAILS);

  useEffect(() => {
    if (props.isOpen) {
      if (!isResponsibleUser) {
        if (hasEditPermission.isViewOnly === true) {
          formSetting.isViewOnly = true;
          setIsButtonDisable(true);
          setFieldDisabled(formData, setFormData, 'responsibleUserId', true);
        }
        else {
          formSetting.isViewOnly = false;
          setIsButtonDisable(false);
          setFieldDisabled(formData, setFormData, 'responsibleUserId', false);
        }
      }
      if (isResponsibleUser) {
        formSetting.isViewOnly = false;
        setIsButtonDisable(false);
        setFieldDisabled(formData, setFormData, 'responsibleUserId', true);
      }
    }
  }, [props.isOpen, hasEditPermission, formSetting.isViewOnly])

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

  const [CheckCustomerNameExist, { isSuccess: isCustomerNameExistSucess, data: isCustomerNameExistData, }] = useCheckCustomerNameExistMutation();


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
      setAllCountries(allGetAllCountriesData);
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
      let data = { ...basicDetailFormDataHalf };
      data.initialState = { ...props.customerData };
      if (data.initialState.countryId > 0) {
        let det = {
          value: data.initialState.countryId
        }
        handleValidateTextId(det, "countryId");
      }
      data.formFields = basicDetailFormDataHalf.formFields.filter(field => field.dataField !== "note" && field.id !== "name");
      setFormData(data);
    }
  }, [props.isOpen])

  useImperativeHandle(nextRef, () => ({
    handleAddBasicDetails,
  }));

  const handleAddBasicDetails = () => {
    // debugger
    let data = basicDetailRef.current.getFormData();
    // if (data.taxId) {
    //   ToastService.warning('Please enter valid tax id');
    // } else {
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
          responsibleUserId: data.responsibleUserId ? data.responsibleUserId : null,
        }
        addCustomersBasicInformation(req);
      } else {
        ToastService.warning('Please enter customer basic information');
      }
    // }
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
        responsibleUserId: data.responsibleUserId && typeof data.responsibleUserId === "object"
          ? data.responsibleUserId.value
          : data.responsibleUserId,
        customerId: props.pageId
      }
      updateCustomersBasicInformation(req);
    } else {
      ToastService.warning('Please enter customer basic information');
    }
  };

  const handleValidateTextId = (data, dataField) => {
    if (dataField === 'countryId') {
      const modifyFormFields = getTaxIdMinMaxLength(data.value, basicDetailFormDataHalf.formFields, 'taxId');
      const updatedForm = { ...formData };
      updatedForm.formFields = modifyFormFields;
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
      if (isCustomerNameExistData.errorMessage.includes('exists')) {
        ToastService.warning(isCustomerNameExistData.errorMessage);
        return;
      }
      ToastService.success(isCustomerNameExistData.errorMessage);
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
                buttonTypeClassName="theme-button"
                buttonText="Update"
                onClick={handleUpdate}
                isLoading={isLoading}
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
    </div>
  );
};


export default BasicDetail;
