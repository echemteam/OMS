/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";

import { CommansDataField } from "../../../../utils/Enums/DropdownEnums";
import ToastService from "../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";
import { setDropDownOptionField, setFieldSetting } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { rulesFormData } from "./config/RulesForm.data";
import { useAddEditApprovalConfigurationMutation, useLazyGetAllFunctionalitiesFieldsQuery, useLazyGetAllFunctionalitiesQuery, useLazyGetAllFunctionalityEventByFunctionalityIdQuery, useLazyGetAllModulesQuery, useLazyGetApprovalConfigurationByApprovalConfigurationIdQuery } from "../../../../app/services/configurationAPI";
import { useLazyGetAllRolesQuery } from "../../../../app/services/securityPermissionsAPI";
import { FieldSettingType } from "../../../../utils/Enums/commonEnums";

const AddEditRules = (props) => {
  const ruleFormRef = useRef();
  const [ruleData, setRuleData] = useState(rulesFormData)
  const [moduleId, setModuleID] = useState(0)
  const [functionalityID, setFunctionalityID] = useState(0)
  const [ApprovalConfigurationId, setApprovalConfigurationId] = useState(0)

  const [getAllModules,
    {
      isSuccess: isgetAllModulesSucess,
      data: allGetAllModulesData,
    },
  ] = useLazyGetAllModulesQuery();

  const [getAllFunctionalities,
    {
      isFetching: isGetAllFunctionalitiesFetching,
      isSuccess: isGetAllFunctionalitiesSucess,
      data: allGetAllFunctionalitiesData,
    },
  ] = useLazyGetAllFunctionalitiesQuery();
  const [getAllFunctionalityEventByFunctionalityId,
    {
      isFetching: isGetAllFunctionalityEventByFunctionalityIdFetching,
      isSuccess: isGetAllFunctionalityEventByFunctionalityIdSucess,
      data: isGetAllFunctionalityEventByFunctionalityIdData,
    },
  ] = useLazyGetAllFunctionalityEventByFunctionalityIdQuery();

  const [
    getAllFunctionalitiesFields,
    {
      isFetching: isGetAllFunctionalitiesFieldsFetching,
      isSuccess: isGetAllFunctionalitiesFieldsSucess,
      data: allGetAllFunctionalitiesFieldsData,
    },
  ] = useLazyGetAllFunctionalitiesFieldsQuery();

  const [
    getAllRoles,
    { isSuccess: isGetAllRolesSucess, data: allGetAllRolesData },
  ] = useLazyGetAllRolesQuery();

  const [
    addEditApprovalConfiguration,
    {
      isLoading: isAddEditApprovalConfigurationLoading,
      isSuccess: isAddEditApprovalConfigurationSucess,
      data: allAddEditApprovalConfigurationData,
    },
  ] = useAddEditApprovalConfigurationMutation();

  const [getApprovalConfigurationByApprovalConfigurationId, { isFetching: isGetApprovalConfigurationByApprovalConfigurationIdFetching, isSuccess: isGetApprovalConfigurationByApprovalConfigurationIdSuccess, data: isGetApprovalConfigurationByApprovalConfigurationIdData }] = useLazyGetApprovalConfigurationByApprovalConfigurationIdQuery();

  useEffect(() => {
    getAllModules();
    getAllRoles();
   
  }, []);

  useEffect(() => {
    if (moduleId > 0) {
      getAllFunctionalities(moduleId);
    }
  }, [moduleId]);

  useEffect(() => {
    if (functionalityID > 0) {
      getAllFunctionalitiesFields(functionalityID);
      getAllFunctionalityEventByFunctionalityId(functionalityID);
    }
  }, [functionalityID]);

  useEffect(() => {
    if (isgetAllModulesSucess && allGetAllModulesData) {
      handleModuleOption(allGetAllModulesData);
    }

  }, [isgetAllModulesSucess, allGetAllModulesData])

  useEffect(() => {
    
    if (!isGetAllFunctionalityEventByFunctionalityIdFetching && isGetAllFunctionalityEventByFunctionalityIdSucess && isGetAllFunctionalityEventByFunctionalityIdData) {
      handleFunctionalityEventOption(isGetAllFunctionalityEventByFunctionalityIdData);
    }

  }, [isGetAllFunctionalityEventByFunctionalityIdFetching,isGetAllFunctionalityEventByFunctionalityIdSucess, isGetAllFunctionalityEventByFunctionalityIdData])

  // useEffect(() => {
  //   if (!isGetAllFunctionalitiesFetching && isGetAllFunctionalitiesSucess && allGetAllFunctionalitiesData) {
  //     let form = { ...ruleData };

  //     const options = allGetAllFunctionalitiesData.map((item) => ({
  //       value: item.functionalityId,
  //       label: item.name,
  //     }));

  //     const dropdownField = form?.formFields?.find(item => item.id === "functionalityId");

  //     if (dropdownField) {
  //       dropdownField.fieldSetting.options = options;

  //       // If editing, ensure the correct functionality value is set
  //       if (isGetApprovalConfigurationByApprovalConfigurationIdData) {
  //         const selectedFunctionality = allGetAllFunctionalitiesData.find(
  //           (item) => item.functionalityId === isGetApprovalConfigurationByApprovalConfigurationIdData.functionalityId
  //         );

  //         if (selectedFunctionality) {
  //           ruleFormRef.current.updateFormFieldValue({
  //             functionalityId: {
  //               value: selectedFunctionality.functionalityId,
  //               label: selectedFunctionality.name,
  //             },
  //           });
  //         }
  //       }

  //       setRuleData(form);
  //     }
  //   }
  // }, [isGetAllFunctionalitiesFetching, isGetAllFunctionalitiesSucess, allGetAllFunctionalitiesData]);

  useEffect(() => {
    if (!isGetAllFunctionalitiesFetching && isGetAllFunctionalitiesSucess && allGetAllFunctionalitiesData) {
      // Handle the option setting logic
      handleSetFunctionalityOptions();
    }
  }, [isGetAllFunctionalitiesFetching, isGetAllFunctionalitiesSucess, allGetAllFunctionalitiesData]);

  const handleSetFunctionalityOptions = () => {
    let form = { ...ruleData };
    const dataq = allGetAllFunctionalitiesData.map((item) => ({
      value: item.functionalityId,
      label: item.name,
    }));

    const dropdownField = form?.formFields?.find(item => item.id === "functionalityId");
    dropdownField.fieldSetting.options = dataq;

    if (isGetApprovalConfigurationByApprovalConfigurationIdData) {
      const selectedFunctionality = allGetAllFunctionalitiesData.find(
        item => item.functionalityId === isGetApprovalConfigurationByApprovalConfigurationIdData.functionalityId
      );

      if (selectedFunctionality) {
        if (selectedFunctionality.isFunctional) {
          setFieldSetting(form, 'functionalitiesFieldId', FieldSettingType.DISABLED, true);
        } else {
          setFieldSetting(form, 'functionalitiesFieldId', FieldSettingType.DISABLED, false);
        }
        ruleFormRef.current.updateFormFieldValue({
          functionalityId: selectedFunctionality.functionalityId,
        });
      }
    }

    setRuleData(form);
  };

  useEffect(() => {
    if (!isGetAllFunctionalitiesFieldsFetching && isGetAllFunctionalitiesFieldsSucess && allGetAllFunctionalitiesFieldsData) {
      handleSetFunctionalitiesFieldOptions();
    }
  }, [isGetAllFunctionalitiesFieldsFetching, isGetAllFunctionalitiesFieldsSucess, allGetAllFunctionalitiesFieldsData]);

  const handleSetFunctionalitiesFieldOptions = () => {
    let data = { ...ruleData };
    const datav = allGetAllFunctionalitiesFieldsData.map((item) => ({
      value: item.functionalitiesFieldId,
      label: item.fieldName,
    }));

    const dropdownField = data?.formFields?.find(field => field.id === "functionalitiesFieldId");
    if (dropdownField && dropdownField.fieldSetting) {
      dropdownField.fieldSetting.options = datav;

      // If there's a preselected value, update it
      if (isGetApprovalConfigurationByApprovalConfigurationIdData) {
        ruleFormRef.current.updateFormFieldValue({
          functionalitiesFieldId: isGetApprovalConfigurationByApprovalConfigurationIdData.functionalitiesFieldId,
        });
      }
      setRuleData(data);
    }
  };


  useEffect(() => {
    if (isGetAllRolesSucess && allGetAllRolesData) {
      handleRoleOption(allGetAllRolesData);
    }
  }, [isGetAllRolesSucess, allGetAllRolesData,])

  const handleModuleOption = (responseData) => {
    setDropDownOptionField(responseData, CommansDataField.ModuleId, 'moduleName', rulesFormData, CommansDataField.ModuleId);
  }

  const handleRoleOption = (responseData) => {
    setDropDownOptionField(responseData, "roleId", "roleName", rulesFormData, "roleId"
    );
  };

  const handleFunctionalityEventOption = (responseData) => {
    setDropDownOptionField(responseData, "functionalityEventId", "eventName", rulesFormData, "functionalityEventId"
    );
  };
  useEffect(() => {
    if (isAddEditApprovalConfigurationSucess && allAddEditApprovalConfigurationData) {
      if (allAddEditApprovalConfigurationData.errorMessage.includes("exists")) {
        ToastService.warning(allAddEditApprovalConfigurationData.errorMessage);
        handleResetAndClose();
        return;
      }
      ToastService.success(allAddEditApprovalConfigurationData.errorMessage);
      handleResetAndClose();
      props.onGetData()
    }
  }, [isAddEditApprovalConfigurationSucess, allAddEditApprovalConfigurationData]);

  useEffect(() => {
    let form = { ...rulesFormData };
    setFieldSetting(form, 'functionalityId', FieldSettingType.DISABLED, true);
    setFieldSetting(form, 'functionalitiesFieldId', FieldSettingType.DISABLED, true);
    onResetForm(rulesFormData, setRuleData, null);
    if (props.initData.approvalConfigurationId) {
      getApprovalConfigurationByApprovalConfigurationId(props.initData.approvalConfigurationId)
    }
    if (!props.isEdit) {
      setApprovalConfigurationId(0);
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (!isGetApprovalConfigurationByApprovalConfigurationIdFetching && isGetApprovalConfigurationByApprovalConfigurationIdSuccess && isGetApprovalConfigurationByApprovalConfigurationIdData) {
      let form = { ...rulesFormData };
      if (isGetApprovalConfigurationByApprovalConfigurationIdData.moduleId > 0) {
        getAllFunctionalities(isGetApprovalConfigurationByApprovalConfigurationIdData.moduleId);
      }
      if (isGetApprovalConfigurationByApprovalConfigurationIdData.functionalityId) {
        getAllFunctionalitiesFields(isGetApprovalConfigurationByApprovalConfigurationIdData.functionalityId);
      }
      // let data = { ...ruleData };
      setApprovalConfigurationId(isGetApprovalConfigurationByApprovalConfigurationIdData.approvalConfigurationId);
      setFieldSetting(form, 'functionalityId', FieldSettingType.DISABLED, false);
      // setFieldSetting(form, 'functionalitiesFieldId', FieldSettingType.DISABLED, false);

      form.initialState = {
        ...rulesFormData.initialState,
        approvalAction: isGetApprovalConfigurationByApprovalConfigurationIdData.approvalAction,
        functionalitiesFieldId: isGetApprovalConfigurationByApprovalConfigurationIdData.functionalitiesFieldId,
        functionalityId: isGetApprovalConfigurationByApprovalConfigurationIdData.functionalityId,
        functionalityEventId:isGetApprovalConfigurationByApprovalConfigurationIdData.functionalityEventId,
        moduleId: isGetApprovalConfigurationByApprovalConfigurationIdData.moduleId,
        roleId: isGetApprovalConfigurationByApprovalConfigurationIdData.approverRoleId,
        ruleName: isGetApprovalConfigurationByApprovalConfigurationIdData.ruleName,
        isFunctional:isGetApprovalConfigurationByApprovalConfigurationIdData.isFunctional,
      };
      setRuleData(form);
    }
  }, [isGetApprovalConfigurationByApprovalConfigurationIdFetching, isGetApprovalConfigurationByApprovalConfigurationIdSuccess, isGetApprovalConfigurationByApprovalConfigurationIdData]);


  const handleChangeDropdownList = (data, dataField) => {
    let manageData = { ...ruleData };
    const existingState = { ...manageData.initialState };

    if (dataField === CommansDataField.ModuleId) {
      // Handle ModuleId change
      setModuleID(data.value);

      // Update options for functionality dropdown
      setDropDownOptionField(allGetAllFunctionalitiesData, "functionalityId", "name", manageData, "functionalityId");
      setFieldSetting(manageData, 'functionalityId', FieldSettingType.DISABLED, false);

      // Clear functionalityId on module change
      ruleFormRef.current.updateFormFieldValue({
        moduleId: data.value,
        functionalityId: null,
      });

      // Update manageData and state
      manageData.initialState = {
        ...existingState,
        moduleId: data.value,
        functionalityId: null,
      };
      setRuleData(manageData);

    } else if (dataField === CommansDataField.FunctionalityId) {
      // Handle FunctionalityId change
      setFunctionalityID(data.value);

      // Find selected functionality data
      const functionalData = allGetAllFunctionalitiesData.find(item => item.functionalityId === data.value);

      // Set options for functionalitiesFieldId dropdown
      setDropDownOptionField(allGetAllFunctionalitiesFieldsData, "functionalitiesFieldId", "fieldName", manageData, "functionalitiesFieldId");
      // setFieldSetting(manageData, 'functionalitiesFieldId', FieldSettingType.DISABLED, false);

      if (functionalData) {
        if (functionalData.isFunctional) {
          // Remove functionalitiesFieldId if the functionality is functional
          // manageData = removeFormFields(manageData, ['functionalitiesFieldId']);
          setFieldSetting(manageData, 'functionalitiesFieldId', FieldSettingType.DISABLED, true);
          manageData.initialState.isFunctional = functionalData.isFunctional;
          // manageData.initialState = {
          //   ...existingState,
          //   moduleId: existingState.moduleId,
          //   functionalityId: data.value,
          //   functionalitiesFieldId: null,
          // };
          // setRuleData(manageData);

        } else {
          // const isFieldAlreadyPresent = manageData.formFields.some(field => field.dataField === 'functionalitiesFieldId');
          setFieldSetting(manageData, 'functionalitiesFieldId', FieldSettingType.DISABLED, false);
          // if (!isFieldAlreadyPresent) {
          //   const functionalitiesField = {
          //     id: "functionalitiesFieldId",
          //     lable: "Field",
          //     Field_Name: "fieldName",
          //     fieldType: FormFieldTypes.SELECT,
          //     dataField: "functionalitiesFieldId",
          //     fieldSetting: {
          //       isDisabled: true,
          //       placeholder: "Select Field",
          //       isEnableOnChange: true,
          //     },
          //     style: {
          //       containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
          //     },
          //   };

          //   const insertIndex = 3; // Insert at the 4th position
          //   let updatedFormFields = [...manageData.formFields];
          //   updatedFormFields.splice(insertIndex, 0, functionalitiesField);
          //   manageData.formFields = updatedFormFields;

          //   manageData.initialState = {
          //     ...existingState,
          //     functionalitiesFieldId: null, // Ensure this is initialized correctly
          //   };
          //   setRuleData(manageData);
          // }
        }

        // Update form field values
        ruleFormRef.current.updateFormFieldValue({
          ...existingState,
          functionalityId: data.value,
          functionalitiesFieldId: existingState.functionalitiesFieldId,
          isFunctional: functionalData.isFunctional,
        });
      }
    }
  };


  const handleAddEditRule = () => {
        let data = ruleFormRef.current.getFormData();
    if (data) {
      const requestData = {
        ...data,
        approvalConfigurationId: ApprovalConfigurationId ? ApprovalConfigurationId : 0,
        ruleName: data.ruleName,
        moduleId:
          data.moduleId && typeof data.moduleId === "object"
            ? data.moduleId.value
            : data.moduleId,
        functionalityId:
          data.functionalityId && typeof data.functionalityId === "object"
            ? data.functionalityId.value
            : data.functionalityId,

            functionalityEventId:
            data.functionalityEventId && typeof data.functionalityEventId === "object"
              ? data.functionalityEventId.value
              : data.functionalityEventId,
        functionalitiesFieldId:
          data.functionalitiesFieldId ? data.functionalitiesFieldId &&
            typeof data.functionalitiesFieldId === "object"
            ? data.functionalitiesFieldId.value
            : data.functionalitiesFieldId : 0,
        approverRoleId:
          data.roleId && typeof data.roleId === "object"
            ? data.roleId.value
            : data.roleId,
        approvalAction: data.approvalAction,
      };
      addEditApprovalConfiguration(requestData);
    }
  };

  const formActionHandler = {
    DDL_CHANGED: handleChangeDropdownList,
  };

  const handleResetAndClose = () => {
    onResetForm(rulesFormData, setRuleData, null);
    props.onClose();
  };

  return (
    <div className="row mt-2">
      <FormCreator
        config={ruleData}
        ref={ruleFormRef}
        {...ruleData}
        onActionChange={formActionHandler}
      // key={shouldRerenderFormCreator}
      />
      <div className="col-md-12">
        <div className="d-flex align-item-end justify-content-end">
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Save"
            // buttonText={approvalConfigurationId ? "Update" : "Save"}
            onClick={handleAddEditRule}
            isLoading={isAddEditApprovalConfigurationLoading}
          // isDisable={isButtonDisable}
          />
          <Buttons
            buttonTypeClassName="dark-btn ml-5"
            buttonText="Cancel"
            onClick={handleResetAndClose}
          />
        </div>
      </div>
    </div>
  );
};
AddEditRules.propTypes = {
  onGetData: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initData: PropTypes.shape({
    approvalConfigurationId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  isOpen: PropTypes.bool.isRequired,
};
export default AddEditRules;
