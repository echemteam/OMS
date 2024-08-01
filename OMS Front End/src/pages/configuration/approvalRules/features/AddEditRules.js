/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";

import { CommansDataField } from "../../../../utils/Enums/DropdownEnums";
import ToastService from "../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";
import { setDropDownOptionField, setFieldSetting } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { rulesFormData } from "./config/RulesForm.data";
import { useAddEditApprovalConfigurationMutation, useLazyGetAllFunctionalitiesFieldsQuery, useLazyGetAllFunctionalitiesQuery, useLazyGetAllModulesQuery, useLazyGetApprovalConfigurationByApprovalConfigurationIdQuery } from "../../../../app/services/configurationAPI";
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
      isSuccess: isGetAllFunctionalitiesSucess,
      data: allGetAllFunctionalitiesData,
    },
  ] = useLazyGetAllFunctionalitiesQuery();

  const [
    getAllFunctionalitiesFields,
    {
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
    }
  }, [functionalityID]);

  useEffect(() => {
    if (isgetAllModulesSucess && allGetAllModulesData) {
      handleModuleOption(allGetAllModulesData);
    }
    if (isGetAllFunctionalitiesSucess && allGetAllFunctionalitiesData) {
      handleFunctionalityOption(allGetAllFunctionalitiesData);
    }
    if (isGetAllRolesSucess && allGetAllRolesData) {
      handleRoleOption(allGetAllRolesData);
    }
    if (
      isGetAllFunctionalitiesFieldsSucess && allGetAllFunctionalitiesFieldsData
    ) {
      handleFunctionalityFieldOption(allGetAllFunctionalitiesFieldsData);
    }
  }, [isgetAllModulesSucess, allGetAllModulesData,
    allGetAllFunctionalitiesData, isGetAllFunctionalitiesSucess,
    isGetAllRolesSucess, allGetAllRolesData,
    isGetAllFunctionalitiesFieldsSucess, allGetAllFunctionalitiesFieldsData
  ])

  const handleModuleOption = (responseData) => {
    setDropDownOptionField(responseData, CommansDataField.ModuleId, 'moduleName', rulesFormData, CommansDataField.ModuleId);
  }

  const handleFunctionalityOption = (responseData) => {
    setDropDownOptionField(responseData, CommansDataField.FunctionalityId, 'name', rulesFormData, CommansDataField.FunctionalityId);
  }

  const handleRoleOption = (responseData) => {
    setDropDownOptionField(responseData, "roleId", "roleName", rulesFormData, "roleId"
    );
  };

  const handleFunctionalityFieldOption = (responseData) => {
    setDropDownOptionField(responseData, "functionalitiesFieldId", "fieldName", rulesFormData, "functionalitiesFieldId"
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
    onResetForm(rulesFormData, setRuleData, null);
    if (props.initData.approvalConfigurationId) {
      getApprovalConfigurationByApprovalConfigurationId(props.initData.approvalConfigurationId)
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (!isGetApprovalConfigurationByApprovalConfigurationIdFetching && isGetApprovalConfigurationByApprovalConfigurationIdSuccess && isGetApprovalConfigurationByApprovalConfigurationIdData) {
      if (isGetApprovalConfigurationByApprovalConfigurationIdData.moduleId > 0) {
        getAllFunctionalities(isGetApprovalConfigurationByApprovalConfigurationIdData.moduleId);
      }
      if (isGetApprovalConfigurationByApprovalConfigurationIdData.functionalityId) {
        getAllFunctionalitiesFields(isGetApprovalConfigurationByApprovalConfigurationIdData.functionalityId);
      }
      // const configData = isGetApprovalConfigurationByApprovalConfigurationIdData;
      setApprovalConfigurationId(isGetApprovalConfigurationByApprovalConfigurationIdData.approvalConfigurationId);
      let form = { ...rulesFormData };
      setFieldSetting(form, 'functionalityId', FieldSettingType.DISABLED, false);
      setFieldSetting(form, 'functionalitiesFieldId', FieldSettingType.DISABLED, false);
      
      form.initialState = {
        ...rulesFormData.initialState,
        approvalAction: isGetApprovalConfigurationByApprovalConfigurationIdData.approvalAction,
        functionalitiesFieldId: isGetApprovalConfigurationByApprovalConfigurationIdData.functionalitiesFieldId,
        functionalityId: isGetApprovalConfigurationByApprovalConfigurationIdData.functionalityId,
        moduleId: isGetApprovalConfigurationByApprovalConfigurationIdData.moduleId,
        roleId: isGetApprovalConfigurationByApprovalConfigurationIdData.approverRoleId,
        ruleName: isGetApprovalConfigurationByApprovalConfigurationIdData.ruleName,
      };
      setRuleData(form);
    }
  }, [isGetApprovalConfigurationByApprovalConfigurationIdFetching, isGetApprovalConfigurationByApprovalConfigurationIdSuccess, isGetApprovalConfigurationByApprovalConfigurationIdData]);


  const handleChangeDropdownList = (data, dataField) => {
    const manageData = { ...ruleData };
    if (dataField === CommansDataField.ModuleId) {
      setModuleID(data.value);
      setDropDownOptionField(allGetAllFunctionalitiesData, "functionalityId", "name", manageData, "functionalityId");
      setFieldSetting(manageData, 'functionalityId', FieldSettingType.DISABLED, false);
      ruleFormRef.current.updateFormFieldValue({
        moduleId: data.value,
        functionalityId: null,
      });
    }
    else if (dataField === CommansDataField.FunctionalityId) {
      setFunctionalityID(data.value);
      setDropDownOptionField(allGetAllFunctionalitiesFieldsData, "functionalitiesFieldId", "fieldName", manageData, "functionalitiesFieldId");
      setFieldSetting(manageData, 'functionalitiesFieldId', FieldSettingType.DISABLED, false);
      ruleFormRef.current.updateFormFieldValue({
        functionalityId: data.value,
        functionalitiesFieldId: null,
      });
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
        functionalitiesFieldId:
          data.functionalitiesFieldId &&
            typeof data.functionalitiesFieldId === "object"
            ? data.functionalitiesFieldId.value
            : data.functionalitiesFieldId,
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

export default AddEditRules;
