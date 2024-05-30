import { useEffect, useState } from "react";
import { useLazyGetAllPagesByRoleIdQuery } from "../../../../../app/services/securityPermissionsAPI";
import { GetPermissionTreeData } from "../Util/generateTreeData";
import DataLoader from '../../../../../components/ui/dataLoader/DataLoader'
import PermissionListWrapper from './PermissionWrapper';

const PermissionList = (props) => {

    const { roleId, onPermissionSet } = props;
    const [permissionsData, setPermissionsData] = useState([]);

    const [getAllPagesByRoleId, { isLoading, isSuccess: isPermissionSuccess, data: permissionData }] = useLazyGetAllPagesByRoleIdQuery();

    const onUpdatePermission = (data) => {
        setPermissionsData(data);
        onPermissionSet && onPermissionSet(data);
    }

    const getPermissionList = (roleId) => {
        getAllPagesByRoleId(roleId);
    }

    useEffect(() => {
        if (roleId) {
            getPermissionList(roleId);
        }
    }, [roleId]);

    useEffect(() => {
        if (isPermissionSuccess && permissionData) {
            const data = GetPermissionTreeData(permissionData);
            onPermissionSet && onPermissionSet(data);
            setPermissionsData(data);
        }
    }, [isPermissionSuccess, permissionData]);

    return (
        <div className="tree-section-view">
            <div className="section-header-part">
                <div className="drop-menu-icon">Drop</div>
                <div className="security-key">Security Key</div>
                <div className="permission-dropdown">Permission Type</div>
            </div>
            <div className="inner-section">

                {
                    !isLoading ? (<PermissionListWrapper
                        treeData={permissionsData}
                        level={0}
                        onTreeNodeDataChange={onUpdatePermission}
                    />) : <DataLoader />

                }

            </div>
        </div>
    );
}

export default PermissionList;