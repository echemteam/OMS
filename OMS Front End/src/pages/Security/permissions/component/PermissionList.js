import React from "react";
//** Lib's */
import { SecurityPermissionsGrid } from "../securityPermissions.Data";
import DataLoader from '../../../../components/ui/dataLoader/DataLoader';
//** Component's */
const PermissionListWrapper = React.lazy(() => import("./PermissionWrapper"));

const PermissionList = (props) => {

    //** State */
    const { onUpdatePermission, isLoading, permissionsData } = props;

    return (
        <div className="tree-section-view">
            {console.log('isLoading', isLoading)}
            <div className="section-header-part">
                {SecurityPermissionsGrid.map((column, index) => (
                    <div key={index} className={column.className}>{column.name}</div>
                ))}
            </div>
            <div className="inner-section">
                {!isLoading ? (<PermissionListWrapper
                    treeData={permissionsData}
                    level={0}
                    onTreeNodeDataChange={onUpdatePermission}
                />) : <DataLoader />}
            </div>
        </div>
    );
}

export default PermissionList;