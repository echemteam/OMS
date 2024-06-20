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
            switch (actionFlag) {
                case ActionFlag.Edit:
                case ActionFlag.Block:
                case ActionFlag.UnBlock:
                case ActionFlag.Delete:
                case ActionFlag.Permission:
                case ActionFlag.AssignUser:
                case ActionFlag.Freeze:
                case ActionFlag.Unfreeze:
                case ActionFlag.Disable:
                case ActionFlag.ActiveCustomer:
                    CheckGridIcon(actionFlag, permission, actionColumn);
                    break;
                default:
                    // Handle any default actions if necessary
                    break;
            }
        }
    };

    const CheckGridIcon = (actionFlag, permission, actionColumn) => {
        const flagToActionMap = {
            [ActionFlag.Edit]: 'allowEdit',
            [ActionFlag.Block]: 'allowBlocked',
            [ActionFlag.Delete]: 'allowDelete',
            [ActionFlag.Freeze]: 'allowFreeze',
            [ActionFlag.Disable]: 'allowDisable',
            [ActionFlag.AssignUser]: 'allowUser',
            [ActionFlag.Unfreeze]: 'allowUnfreeze',
            [ActionFlag.UnBlock]: 'allowUnblocked',
            [ActionFlag.Permission]: 'allowPermission',
            [ActionFlag.ActiveCustomer]: 'allowActiveCustomer',
        };

        const actionProperty = flagToActionMap[actionFlag];
        if (actionProperty) {
            actionColumn.defaultAction[actionProperty] = permission.hasAccess;
        }
    };

    // const CheckAddPermission = (permission, formSetting) => {
    //     if (permission.hasAccess === true) {
    //         formSetting.isViewOnly = false;
    //         setIsShowAddButton(true);
    //         setIsButtonDisable(false);
    //     } else {
    //         setIsShowAddButton(false);
    //     }
    // }

    // const CheckEditButtonPermission = (permission, actionColumn) => {
    //     if (permission.isViewOnly === true) {
    //         actionColumn.defaultAction.allowEdit = true;
    //     }
    //     else if (permission.isEditable === true) {
    //         actionColumn.defaultAction.allowEdit = true;
    //     }
    //     else {
    //         actionColumn.defaultAction.allowEdit = false;
    //     }
    // }

    // const CheckEditPagePermission = (permission, formSetting) => {
    //     if (permission.isViewOnly === true) {
    //         formSetting.isViewOnly = true;
    //         setIsButtonDisable(true);
    //     }
    //     else {
    //         formSetting.isViewOnly = false;
    //         setIsButtonDisable(false);
    //     }
    // }

    return (
        <PagePermissionsContext.Provider value={{ isShowAddButton, isButtonDisable, HasPermissions }}>
            {children}
        </PagePermissionsContext.Provider>
    );
};