/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import FormCreator from "../../../../components/FinalForms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";

import { CommansDataField } from "../../../../utils/Enums/DropdownEnums";
import ToastService from "../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";
import { getFieldData, setDropDownOptionField, setFieldSetting } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { rulesFormData } from "./config/RulesForm.data";
import { useAddEditApprovalConfigurationMutation, useLazyGetAllFunctionalitiesFieldsQuery, useLazyGetAllFunctionalitiesQuery, useLazyGetAllFunctionalityEventByFunctionalityIdQuery, useLazyGetAllModulesQuery, useLazyGetApprovalConfigurationByApprovalConfigurationIdQuery } from "../../../../app/services/configurationAPI";
import { useLazyGetAllRolesQuery } from "../../../../app/services/securityPermissionsAPI";
import { FieldSettingType } from "../../../../utils/Enums/commonEnums";
import { getValue } from "../../../../utils/CommonUtils/CommonUtilsMethods";

const AddEditRules = (props) => {
  const ruleFormRef = useRef();
  const [ruleData, setRuleData] = useState(rulesFormData)
  const [moduleId, setModuleID] = useState(0)
  const [functionalityID, setFunctionalityID] = useState(0)
  const [ApprovalConfigurationId, setApprovalConfigurationId] = useState(0);


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

  const [getApprovalConfigurationByApprovalConfigurationId, { isFetching: isGetApprovalConfigurationByApprovalConfigurationIdFetching,
    isSuccess: isGetApprovalConfigurationByApprovalConfigurationIdSuccess,
    data: isGetApprovalConfigurationByApprovalConfigurationIdData }] = useLazyGetApprovalConfigurationByApprovalConfigurationIdQuery();

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
  }, [isGetAllFunctionalityEventByFunctionalityIdFetching, isGetAllFunctionalityEventByFunctionalityIdSucess, isGetAllFunctionalityEventByFunctionalityIdData])

  useEffect(() => {
    if (!isGetAllFunctionalitiesFetching && isGetAllFunctionalitiesSucess && allGetAllFunctionalitiesData) {
      handleSetFunctionalityOptions();
    }
  }, [isGetAllFunctionalitiesFetching, isGetAllFunctionalitiesSucess, allGetAllFunctionalitiesData]);

  const handleSetFunctionalityOptions = () => {
    let form = { ...ruleData };
    const dataq = allGetAllFunctionalitiesData.map((item) => ({
      value: item.functionalityId,
      label: item.name,
    }));
    const dropdownField = getFieldData(form, 'functionalityId');
    dropdownField.fieldSetting.options = dataq;
    if (isGetApprovalConfigurationByApprovalConfigurationIdData) {
      const selectedFunctionality = allGetAllFunctionalitiesData.find(item => item.functionalityId ===
        isGetApprovalConfigurationByApprovalConfigurationIdData.functionalityId);
      if (selectedFunctionality) {
        if (selectedFunctionality.isFunctional) {
          setFieldSetting(form, 'functionalitiesFieldId', FieldSettingType.DISABLED, true);
        } else {
          setFieldSetting(form, 'functionalitiesFieldId', FieldSettingType.DISABLED, false);
        }
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
    const modifyDropdownData = allGetAllFunctionalitiesFieldsData.map((item) => ({
      value: item.functionalitiesFieldId,
      label: item.fieldName,
    }));
    const dropdownField = getFieldData(data, 'functionalitiesFieldId');
    if (dropdownField && dropdownField.fieldSetting) {
      dropdownField.fieldSetting.options = modifyDropdownData;
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
    setFieldSetting(form, 'functionalityEventId', FieldSettingType.DISABLED, true);

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
        getAllFunctionalityEventByFunctionalityId(isGetApprovalConfigurationByApprovalConfigurationIdData.functionalityId);
      }
      setApprovalConfigurationId(isGetApprovalConfigurationByApprovalConfigurationIdData.approvalConfigurationId);
      setFieldSetting(form, 'functionalityId', FieldSettingType.DISABLED, false);
      setFieldSetting(form, 'functionalityEventId', FieldSettingType.DISABLED, false);
      form.initialState = {
        ...rulesFormData.initialState,
        functionalitiesFieldId: isGetApprovalConfigurationByApprovalConfigurationIdData.functionalitiesFieldId,
        functionalityId: isGetApprovalConfigurationByApprovalConfigurationIdData.functionalityId,
        functionalityEventId: isGetApprovalConfigurationByApprovalConfigurationIdData.functionalityEventId,
        moduleId: isGetApprovalConfigurationByApprovalConfigurationIdData.moduleId,
        roleId: isGetApprovalConfigurationByApprovalConfigurationIdData.approverRoleId,
        ruleName: isGetApprovalConfigurationByApprovalConfigurationIdData.ruleName,
        isFunctional: isGetApprovalConfigurationByApprovalConfigurationIdData.isFunctional,
        template: isGetApprovalConfigurationByApprovalConfigurationIdData.template
      };
      setRuleData(form);
    }
  }, [isGetApprovalConfigurationByApprovalConfigurationIdFetching, isGetApprovalConfigurationByApprovalConfigurationIdSuccess, isGetApprovalConfigurationByApprovalConfigurationIdData]);


  const handleColumnChange = (dataField, updatedData) => {
    let manageData = { ...ruleData };
    const existingState = { ...manageData.initialState };
    const moduleId = getValue(updatedData.moduleId);
    const functionalityId = getValue(updatedData.functionalityId);
    if (dataField === CommansDataField.ModuleId) {
      setModuleID(moduleId);
      setDropDownOptionField(allGetAllFunctionalitiesData, "functionalityId", "name", manageData, "functionalityId");
      setFieldSetting(manageData, 'functionalityId', FieldSettingType.DISABLED, false);
      manageData.initialState = {
        ...updatedData,
        moduleId: moduleId,
        functionalityId: 0,
        functionalityEventId: 0,
        functionalitiesFieldId: 0,
      }
    } else if (dataField === CommansDataField.FunctionalityId) {
      setFunctionalityID(functionalityId);
      const functionalData = allGetAllFunctionalitiesData.find(item => item.functionalityId === functionalityId);
      setDropDownOptionField(allGetAllFunctionalitiesFieldsData, "functionalitiesFieldId", "fieldName", manageData, "functionalitiesFieldId");
      setFieldSetting(manageData, 'functionalityEventId', FieldSettingType.DISABLED, false);
      if (functionalData) {
        if (functionalData.isFunctional) {
          setFieldSetting(manageData, 'functionalitiesFieldId', FieldSettingType.DISABLED, true);
          manageData.initialState.isFunctional = functionalData.isFunctional;
          setFieldSetting(manageData, 'template', FieldSettingType.CKEDITORDISABLED, false);
        } else {
          setFieldSetting(manageData, 'functionalitiesFieldId', FieldSettingType.DISABLED, false);
          setFieldSetting(manageData, 'template', FieldSettingType.CKEDITORDISABLED, true);
        }

        manageData.initialState = {
          ...updatedData,
          functionalityId: functionalityId,
          functionalitiesFieldId: functionalData.isFunctional ? 0 : existingState.functionalitiesFieldId,
          isFunctional: functionalData.isFunctional,
          functionalityEventId: 0,
          template: manageData.template,
        }
      }
    }
    setRuleData(manageData);
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
        template: data.template
      };
      addEditApprovalConfiguration(requestData);
    }
  };
  const handleResetAndClose = () => {
    onResetForm(rulesFormData, setRuleData, null);
    props.onClose();
  };

  return (
    <div className="row mt-2">
      <FormCreator config={ruleData} ref={ruleFormRef} onColumnChange={handleColumnChange} />
      <div className="col-md-12">
        <div className="d-flex align-item-end justify-content-end">
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Save"
            onClick={handleAddEditRule}
            isLoading={isAddEditApprovalConfigurationLoading}
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
