import { useEffect, useState } from "react";
import { ActionFlag } from "../../components/SecurityPermission/EditDeletePermissions.Data";
import { hasFunctionalPermission } from "../../utils/AuthorizeNavigation/authorizeNavigation";
import { AddPagePermissionsContext } from "../../utils/ContextAPIs/AddPagePermissions/AddPagePermissionsContext";

export const SecurityPermissionsHOC = ({ permissionConfig, children }) => {


    const [isShowAddButton, setIsShowAddButton] = useState(false);
    const [isButtonDisable, setIsButtonDisable] = useState(false);


    useEffect(() => {
        if (!permissionConfig || permissionConfig.length === 0) {
            return;
        }
        if (permissionConfig && permissionConfig.length > 0) {
            for (let i = 0; i < permissionConfig.length; i++) {
                let securityKeysObj = permissionConfig[i];
                const { keyName, value, gridConfig, formConfig } = securityKeysObj;
                const permission = value ? hasFunctionalPermission(value) : '';
                const actionColumn = gridConfig ? gridConfig.columns.find(column => column.name === "Action") : '';
                if (permission) {
                    if (keyName === ActionFlag.Edit) {
                        CheckEditButtonPermission(permission, actionColumn);
                    } else if (keyName === ActionFlag.Delete) {
                        CheckDeletePermission(permission, actionColumn);
                    } else if (keyName === ActionFlag.Add) {
                        CheckAddPermission(permission, formConfig.formSetting);
                    } else if (keyName === ActionFlag.EditPage) {
                        CheckEditPagePermission(permission, formConfig.formSetting);
                    }
                }
            }
        }
    }, [permissionConfig]);

    const CheckAddPermission = (permission, formSetting) => {
        if (permission.hasAccess === true) {
            formSetting.isViewOnly = false;
            setIsShowAddButton(true);
            setIsButtonDisable(false);
        } else {
            setIsShowAddButton(false);
        }
    }

    const CheckDeletePermission = (permission, actionColumn) => {
        if (permission.hasAccess === true) {
            actionColumn.defaultAction.allowDelete = true;
        }
        else if (permission.hasAccess === false) {
            actionColumn.defaultAction.allowDelete = false;
        }
    }

    const CheckEditButtonPermission = (permission, actionColumn) => {
        if (permission.isViewOnly === true) {
            actionColumn.defaultAction.allowEdit = true;
        }
        else if (permission.isEditable === true) {
            actionColumn.defaultAction.allowEdit = true;
        }
        else {
            actionColumn.defaultAction.allowEdit = false;
        }
    }

    const CheckEditPagePermission = (permission, formSetting) => {
        if (permission.isViewOnly === true) {
            formSetting.isViewOnly = true;
            setIsButtonDisable(true);
        }
        else {
            formSetting.isViewOnly = false;
            setIsButtonDisable(false);
        }
    }





    // const CheckAddDeletePermission = (permission, formSetting, actionColumn) => {
    //     if (permission && permission.hasAccess === true) {
    //         setIsShowAddButton(true);
    //         formSetting.isViewOnly = false;
    //         actionColumn.defaultAction.allowDelete = true;
    //     } else if (permission && permission.hasAccess === false) {
    //         setIsShowAddButton(false);
    //         actionColumn.defaultAction.allowDelete = false;
    //     }
    // }

    return (
        <AddPagePermissionsContext.Provider value={{ isShowAddButton, isButtonDisable }}>
            {children}
        </AddPagePermissionsContext.Provider>
    );
}
