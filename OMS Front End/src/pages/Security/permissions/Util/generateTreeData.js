import { AppIcons } from "../../../../data/appIcons";

export const GetPermissionTreeData = (permissionData) => {
    let treeMainNode = GetChildNode(permissionData, 0);

    return treeMainNode;
}

const GetChildNode = (permissionData, parenetId) => {
    let treeData = [];
    let treeMainNode = permissionData.filter(f => f.securityKeyParentId === parenetId)

    if (treeMainNode) {

        treeMainNode.forEach(function (permissionKey) {
            // Perform an action on each element, such as logging it.
            let childNode = GetChildNode(permissionData, permissionKey.securityKeyId)
            let treeNode = {
                id: permissionKey.securityKeyId,
                name: permissionKey.securityKeyName,
                icon: AppIcons.folderIcon,
                itemData: { ...permissionKey },
                isActive: false,
                children: childNode
            };

            treeData.push(treeNode);
        });
    }

    return treeData;

}


export const GetPermissionData = (permissionData) => {

    let permissionSettingData = [];
    permissionSettingData = GetChildPermissionData(permissionData)
    return permissionSettingData;
}

const GetChildPermissionData = (permissionList) => {
    let permissionData = [];

    if (permissionList) {
        permissionList.forEach(function (permissionItem) {
            let permissionchildData = [];
            if (permissionItem?.children.length > 0) {
                permissionchildData = GetChildPermissionData(permissionItem?.children);
                permissionData = permissionData.concat(permissionchildData);
            }

            let item = {
                roleId: permissionItem.itemData.roleId,
                securityKeyId: permissionItem.itemData.securityKeyId,
                securitySettingId: permissionItem.itemData.securitySettingId,
                securityPermissionId: permissionItem.itemData.securityPermissionId,
            };
            permissionData.push(item);

        });
    }

    return permissionData;
};
