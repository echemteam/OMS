import { ActionFlag } from './EditDeletePermissions.Data';
import { hasFunctionalPermission } from '../../utils/AuthorizeNavigation/authorizeNavigation';


export const HasPermissions = (keyName, actionFlag, gridConfig) => {
    const permission = hasFunctionalPermission(keyName);
    const actionColumn = gridConfig.columns.find(column => column.name === "Action");

    if (permission && actionColumn) {
        if (actionFlag === ActionFlag.Edit) {
            EditPermission(permission, actionColumn);
        } else if (actionFlag === ActionFlag.Delete) {
            DeletePermission(permission, actionColumn);
        }
    }
};

const EditPermission = (permission, actionColumn) => {
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

const DeletePermission = (permission, actionColumn) => {
    if (permission.hasAccess === true) {
        actionColumn.defaultAction.allowDelete = true;
    }
    else if (permission.hasAccess === false) {
        actionColumn.defaultAction.allowDelete = false;
    }
}