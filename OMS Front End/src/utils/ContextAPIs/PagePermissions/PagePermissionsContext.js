import { createContext, useState } from 'react';
import { hasFunctionalPermission } from '../../AuthorizeNavigation/authorizeNavigation';
import { ActionFlag } from './ActionFlag.Data';

// Create the context
export const PagePermissionsContext = createContext();


//** Page Permissions Provider */
export const PagePermissionsProvider = ({ children }) => {

    const [isShowAddButton, setIsShowAddButton] = useState(false);
    const [isButtonDisable, setIsButtonDisable] = useState(false);


    const HasPermissions = (keyName, actionFlag, gridConfig, formConfig) => {
        const permission = keyName ? hasFunctionalPermission(keyName) : '';
        const actionColumn = gridConfig ? gridConfig.columns.find(column => column.name === "Action") : '';

        if (permission) {
            if (actionFlag === ActionFlag.Edit) {
                CheckEditButtonPermission(permission, actionColumn);
            } else if (actionFlag === ActionFlag.Delete) {
                CheckDeletePermission(permission, actionColumn);
            } else if (actionFlag === ActionFlag.Add) {
                CheckAddPermission(permission, formConfig.formSetting);
            } else if (actionFlag === ActionFlag.EditPage) {
                CheckEditPagePermission(permission, formConfig.formSetting);
            }
        }
    };

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

    return (
        <PagePermissionsContext.Provider value={{ isShowAddButton, isButtonDisable, HasPermissions }}>
            {children}
        </PagePermissionsContext.Provider>
    );
};