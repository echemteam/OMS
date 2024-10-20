/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import PropTypes from 'prop-types';
//** Lib's */
import { logout } from "../../../../app/slice/authSlice";
import { securityKey } from "../../../../data/SecurityKey";
import SwalAlert from "../../../../services/swalService/SwalService";
import CardSection from "../../../../components/ui/card/CardSection";
import {
  GetPermissionData,
  GetPermissionTreeData,
} from "../Util/generateTreeData";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { SecurityPermissionsContext } from "../../../../utils/ContextAPIs/SecurityPermissions/SecurityPermissionsContext";
//** Service's */
import {
  useAddSecurityPermissionsMutation,
  useLazyGetAllPagesByRoleIdQuery,
} from "../../../../app/services/securityPermissionsAPI";
//** Component's */
const PermissionList = React.lazy(() => import("./PermissionList"));

const ManagePermission = forwardRef((props, ref) => {
  //** State */
  const dispatch = useDispatch();
  const { confirm } = SwalAlert();
  const [permissionItem, setPermissionItem] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [permissionsData, setPermissionsData] = useState([]);
  const { togglePermissionCard, selectedRoleId, childRef } = useContext(
    SecurityPermissionsContext
  );

  //** API Call's */
  const [
    addSecurityPermissions,
    { isSuccess: isPermissionsAdded, data: isAddPermissionsData },
  ] = useAddSecurityPermissionsMutation();
  const [
    getAllPagesByRoleId,
    {
      isFetching: isGetByIdLoading,
      isSuccess: isPermissionSuccess,
      data: permissionData,
    },
  ] = useLazyGetAllPagesByRoleIdQuery();

  //** Check Permission */
  const hasAddPermission = hasFunctionalPermission(securityKey.SAVEPERMISSIONS);

  //** Handle Change's */
  const onUpdatePermission = (data) => {
    setPermissionsData(data);
    onPermissionItemSet(data);
  };
  const onPermissionItemSet = (permissionTreeItem) => {
    setPermissionItem(permissionTreeItem);
  };
  const handleSavePermission = () => {
    if (permissionItem && permissionItem.length > 0) {
      let permissionSettingList = GetPermissionData(permissionItem);
      const transformedData = permissionSettingList.map((item) => ({
        securitySettingId: item.securitySettingId,
        securityKeyId: item.securityKeyId,
        roleId: item.roleId,
      }));

      const requestData = {
        securityPermissionsList: transformedData,
      };
      addSecurityPermissions(requestData);
    }
    // setTogglePermissionCard(true);
  };
  const getPermissionList = (selectedRoleId) => {
    getAllPagesByRoleId(selectedRoleId);
  };

  //** Use Imperative Handle  */
  useImperativeHandle(childRef, () => ({
    callChildFunction: getPermissionList,
  }));

  //** Use Effect's */
  useEffect(() => {
    if (selectedRoleId) {
      getAllPagesByRoleId(selectedRoleId);
    }
  }, [selectedRoleId]);

  useEffect(() => {
    if (isPermissionSuccess && permissionData) {
      const data = GetPermissionTreeData(permissionData);
      onPermissionItemSet(data);
      setPermissionsData(data);
    }
  }, [isPermissionSuccess, permissionData]);

  useEffect(() => {
    if (hasAddPermission.hasAccess === true) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
  }, [hasAddPermission]);

  useEffect(() => {
    if (isPermissionsAdded && isAddPermissionsData) {
      confirm(
        "Security Permissions Updated!",
        "You will be logged out! Please Log In again",
        "Log Out",
        "",
        false
      ).then((confirmed) => {
        if (confirmed) {
          dispatch(logout());
        }
      });
    }
  }, [isPermissionsAdded, isAddPermissionsData]);

  return (
    <React.Fragment>
      {togglePermissionCard && selectedRoleId && (
        <div className="permission-list">
          <CardSection
            cardTitle="Security Permissions"
            rightButton={buttonVisible ? true : false}
            buttonText="Save Permissions"
            buttonClassName="btn theme-button"
            titleButtonClick={handleSavePermission}
          >
            <PermissionList
              onPermissionSet={onPermissionItemSet}
              onUpdatePermission={onUpdatePermission}
              isLoading={isGetByIdLoading}
              permissionsData={permissionsData}
            />
          </CardSection>
        </div>
      )}
    </React.Fragment>
  );
});

ManagePermission.propTypes = {
  props: PropTypes.object,
  ref: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  })
};
export default ManagePermission;
