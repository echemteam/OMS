import { useEffect, useState } from 'react';
import { hasFunctionalPermission } from '../AuthorizeNavigation/authorizeNavigation';

function usePermissionHandling(userFormData, UserGridConfig, pageSecurityKeys) {

    const [isButtonDisable, setIsButtonDisable] = useState(true);
    const permissions = {};

    pageSecurityKeys.forEach(({ type, keyName }) => {
        permissions[type] = hasFunctionalPermission(keyName);
    });

    const { formSetting } = userFormData;
    const actionColumn = UserGridConfig.columns.find(column => column.name === "Action");

    useEffect(() => {
        // Handle Edit permission
        if (permissions['EDIT'].isViewOnly || permissions['EDIT'].isEditable) {
            actionColumn.defaultAction.allowEdit = true;
        } else {
            actionColumn.defaultAction.allowEdit = false;
        }
    }, [permissions, actionColumn.defaultAction]);

    useEffect(() => {
        // Handle Delete permission
        actionColumn.defaultAction.allowDelete = permissions['DELETE'].hasAccess;
    }, [permissions, actionColumn.defaultAction]);

    useEffect(() => {
        // Handle Add permission
        if (permissions['ADD'].hasAccess) {
            formSetting.isViewOnly = false;
            setIsButtonDisable(false);  // Assuming setIsButtonDisable is a state setter function
        }
    }, [permissions, formSetting, setIsButtonDisable]);


    // Return any state or functions you want to expose
    return {
        formSetting,
        actionColumn,
        hasAddPermission: permissions['ADD'],
        hasEditPermission: permissions['EDIT'],
        hasDeletePermission: permissions['DELETE'],
        isButtonDisable
    };
}

export default usePermissionHandling;
