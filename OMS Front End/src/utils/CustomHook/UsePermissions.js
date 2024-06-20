import { useContext, useEffect } from "react";
import { ActionFlag } from "../ContextAPIs/PagePermissions/ActionFlag.Data";
import { PagePermissionsContext } from "../ContextAPIs/PagePermissions/PagePermissionsContext";

const usePermissions = (securityKeys, formData, gridConfig) => {

    const { HasPermissions } = useContext(PagePermissionsContext);

    useEffect(() => {
        securityKeys && securityKeys.forEach(({ type, keyName }) => {
            HasPermissions(keyName, type, gridConfig, formData);

            // switch (type) {
            //     case 'ADD':
            //         HasPermissions(keyName, ActionFlag.Add, '', formData);
            //         break;
            //     case 'EDIT':
            //         HasPermissions(keyName, ActionFlag.Edit, gridConfig ? gridConfig : '');
            //         break;
            //     case 'DELETE':
            //         HasPermissions(keyName, ActionFlag.Delete, gridConfig ? gridConfig : '');
            //         break;
            //     case 'EDITPAGE':
            //         HasPermissions(keyName, ActionFlag.EditPage, '', formData ? formData : '');
            //         break;
            //     case 'PERMISSION':
            //         HasPermissions(keyName, ActionFlag.Permission, gridConfig ? gridConfig : '');
            //         break;
            //     case 'ASSIGNUSER':
            //         HasPermissions(keyName, ActionFlag.AssignUser, gridConfig ? gridConfig : '');
            //         break;
            //     case 'Block':
            //         HasPermissions(keyName, ActionFlag.AssignUser, gridConfig ? gridConfig : '');
            //         break;
            //     default:
            //         break;
            // }
        });
    }, [securityKeys, formData, gridConfig]);
};

export default usePermissions;