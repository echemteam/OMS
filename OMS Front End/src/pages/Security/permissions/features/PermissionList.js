import React from "react";
import PropTypes from 'prop-types';

//** Lib's */
import { SecurityPermissionsGrid } from "../../permissions/features/config/securityPermissions.Data";
import DataLoader from '../../../../components/ui/dataLoader/DataLoader';
//** Component's */
const PermissionListWrapper = React.lazy(() => import("./PermissionWrapper"));

const PermissionList = (props) => {

    //** State */
    const { onUpdatePermission, isLoading, permissionsData } = props;

    return (
        <div className="tree-section-view security-permission">
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

PermissionList.propTypes = {
    onUpdatePermission: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    permissionsData: PropTypes.array.isRequired,
};

export default PermissionList;