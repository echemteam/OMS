import { useContext, useEffect } from "react";
import { ActionFlag } from "../ContextAPIs/PagePermissions/ActionFlag.Data";
import { PagePermissionsContext } from "../ContextAPIs/PagePermissions/PagePermissionsContext";

const usePermissions = (isEdit, securityKeys, formData, gridConfig) => {

    const { HasPermissions } = useContext(PagePermissionsContext);

    useEffect(() => {
        if (isEdit !== undefined) {
            if (isEdit) {
                HasPermissions(securityKeys.EDIT, ActionFlag.EditPage, '', formData);
            } else {
                HasPermissions(securityKeys.ADD, ActionFlag.Add, '', formData);
            }
        } else {
            if (securityKeys.ADD) {
                HasPermissions(securityKeys.ADD, ActionFlag.Add, '', formData);
            }
            if (securityKeys.EDIT) {
                HasPermissions(securityKeys.EDIT, ActionFlag.Edit, gridConfig ? gridConfig : '');
            }
            if (securityKeys.DELETE) {
                HasPermissions(securityKeys.DELETE, ActionFlag.Delete, gridConfig ? gridConfig : '');
            }
        }
    }, [isEdit, securityKeys, formData, gridConfig]);
};

export default usePermissions;