import React, { useEffect, useRef, useState } from 'react'
import FormCreator from '../../../../components/Forms/FormCreator';
import Buttons from '../../../../components/ui/button/Buttons';
import { useAddEditApprovalConfigurationMutation, useLazyGetAllFunctionalitiesFieldsQuery, useLazyGetAllFunctionalitiesQuery, useLazyGetAllModulesQuery } from '../../../../app/services/configurationAPI';
import { CommansDataField } from '../../../../utils/Enums/DropdownEnums';
import { useLazyGetAllRolesQuery } from '../../../../app/services/securityPermissionsAPI';
import ToastService from '../../../../services/toastService/ToastService';
import { onResetForm } from '../../../../utils/FormFields/ResetForm/handleResetForm';
import { setDropDownOptionField } from '../../../../utils/FormFields/FieldsSetting/SetFieldSetting';

const AddEditRules = (props) => {
    const ruleFormRef = useRef();
    const [approvalConfigurationId, setApprovalConfigurationId] = useState(0)
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
    const [moduleId, setModuleID] = useState("")
    const [functionalityId, setFunctionalityID] = useState("")

    const [
        // getAllModules,
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
        // getAllFunctionalitiesFields,
        {
            isSuccess: isGetAllFunctionalitiesFieldsSucess,
            data: allGetAllFunctionalitiesFieldsData,
        },
    ] = useLazyGetAllFunctionalitiesFieldsQuery();

    const [
        getAllRoles,
        {
            isSuccess: isGetAllRolesSucess,
            data: allGetAllRolesData,
        },
    ] = useLazyGetAllRolesQuery();

    const [
        addEditApprovalConfiguration,
        {
            isLoading: isAddEditApprovalConfigurationLoading,
            isSuccess: isAddEditApprovalConfigurationSucess,
            data: allAddEditApprovalConfigurationData,
        },
    ] = useAddEditApprovalConfigurationMutation();

    useEffect(() => {
        getAllRoles();
    }, []);


    useEffect(() => {
        if (moduleId > 0) {
            getAllFunctionalities(moduleId)
        }
    }, [moduleId])

    useEffect(() => {
        if (isGetAllFunctionalitiesFieldsSucess && allGetAllFunctionalitiesFieldsData) {
            handleFunctionalityFieldOption(allGetAllFunctionalitiesFieldsData);
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
        if (isGetAllRolesSucess && allGetAllRolesData) {
            handleRoleOption(allGetAllRolesData);
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
        if (isgetAllModulesSucess && allGetAllModulesData) {
            handleModuleOption(allGetAllModulesData);
            setModuleID(allGetAllModulesData)
            setShouldRerenderFormCreator((prevState) => !prevState);
        }
        if (isGetAllFunctionalitiesSucess && allGetAllFunctionalitiesData) {
            handleFunctionalityOption(allGetAllFunctionalitiesData);
            setFunctionalityID(allGetAllFunctionalitiesData)
            setShouldRerenderFormCreator((prevState) => !prevState);
        }

    }, [isGetAllFunctionalitiesFieldsSucess, allGetAllFunctionalitiesFieldsData, allGetAllRolesData, isGetAllRolesSucess, isgetAllModulesSucess, allGetAllModulesData, isGetAllFunctionalitiesSucess, allGetAllFunctionalitiesData])

    useEffect(() => {
        if (isAddEditApprovalConfigurationSucess && allAddEditApprovalConfigurationData) {
            handleAddEditRulesResponse(isAddEditApprovalConfigurationSucess, allAddEditApprovalConfigurationData);
        }
    }, [isAddEditApprovalConfigurationSucess, allAddEditApprovalConfigurationData]);

    useEffect(() => {
        if (props.getApprovedConfigData && props.getApprovedConfigData.length > 0) {
            const configData = props.getApprovedConfigData[0];
            setApprovalConfigurationId(configData.approvalConfigurationId)
            let data = { ...props.rulesFormData };
            data.initialState = {
                ...props.rulesFormData.initialState,
                approvalAction: configData.approvalAction,
                functionalitiesFieldId: configData.functionalitiesFieldId,
                functionalityId: configData.functionalityId,
                moduleId: configData.moduleId,
                roleId: configData.approverRoleId,
                ruleName: configData.ruleName
            };
            props.setFormData(data);
        }
    }, [props.getApprovedConfigData])

    const handleModuleOption = (responseData) => {
        setDropDownOptionField(responseData, CommansDataField.ModuleId, 'moduleName', props.rulesFormData, CommansDataField.ModuleId);
    }

    const handleFunctionalityOption = (responseData) => {
        setDropDownOptionField(responseData, CommansDataField.FunctionalityId, 'name', props.rulesFormData, CommansDataField.FunctionalityId);
    }

    const handleFunctionalityFieldOption = (responseData) => {
        setDropDownOptionField(responseData, 'functionalitiesFieldId', 'fieldName', props.rulesFormData, 'functionalitiesFieldId');
    }

    const handleRoleOption = (responseData) => {
        setDropDownOptionField(responseData, 'roleId', 'roleName', props.rulesFormData, 'roleId');
    }

    const handleAddEditRulesResponse = (isSuccess, responseData) => {
        if (isSuccess && responseData) {
            if (responseData.errorMessage.includes("exists")) {
                ToastService.warning(responseData.errorMessage);
                return;
            }
            onResetForm(props.rulesFormData, props.setFormData, null);
            ToastService.success(responseData.errorMessage);
            let req = {
                functionalityId: props.selectedFunctionalityId,
                moduleId: props.selectedModuleId
            }
            props.handleRepeatCallRule(req)
            props.onClose();
        }
    }

    const handleChangeDropdownList = (data, dataField) => {
        const manageData = { ...props.formData };
        if (dataField === CommansDataField.ModuleId) {
            setModuleID(data.value)
            setDropDownOptionField(props.allGetAllFunctionalitiesData, 'functionalityId', 'name', manageData, 'functionalityId');
            ruleFormRef.current.updateFormFieldValue({
                moduleId: data.value,
                functionalityId: null,
            });
        } else if (dataField === CommansDataField.FunctionalityId) {
            setFunctionalityID(data.value)
            setDropDownOptionField(props.allGetAllFunctionalitiesFieldsData, 'functionalitiesFieldId', 'fieldName', manageData, 'functionalitiesFieldId');
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
                approvalConfigurationId: approvalConfigurationId ? approvalConfigurationId : 0,
                ruleName: data.ruleName,
                moduleId: data.moduleId && typeof data.moduleId === "object"
                    ? data.moduleId.value
                    : data.moduleId,
                functionalityId: data.functionalityId && typeof data.functionalityId === "object"
                    ? data.functionalityId.value
                    : data.functionalityId,
                functionalitiesFieldId: data.functionalitiesFieldId && typeof data.functionalitiesFieldId === "object"
                    ? data.functionalitiesFieldId.value
                    : data.functionalitiesFieldId,
                approverRoleId: data.roleId && typeof data.roleId === "object"
                    ? data.roleId.value
                    : data.roleId,
                approvalAction: data.approvalAction
            };
            addEditApprovalConfiguration(requestData);
            setFunctionalityID(requestData.moduleId)
            setModuleID(requestData.functionalityId)
        }
    }

    const formActionHandler = {
        DDL_CHANGED: handleChangeDropdownList,
    };

    const handleResetAndClose = () => {
        onResetForm(props.rulesFormData, props.setFormData, null);
        props.onClose();
    };

    return (
        <div className="row horizontal-form mt-3 add-address-form">
            <FormCreator
                config={props.formData}
                ref={ruleFormRef}
                {...props.formData}
                onActionChange={formActionHandler}
                key={shouldRerenderFormCreator}
            />
            <div className="col-md-12">
                <div className="d-flex align-item-end justify-content-end">
                    <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText={approvalConfigurationId ? "Update" : "Save"}
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
    )
}

export default AddEditRules