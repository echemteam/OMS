import React, { useEffect, useRef, useState } from "react";
import PermissionTree from "./component/PermissionTree";
import "./Permission.scss";
import CardSection from "../../../../components/ui/card/CardSection";
import Buttons from "../../../../components/ui/button/Buttons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppIcons } from "../../../../data/appIcons";
import { useAddSecurityPermissionsMutation, useLazyGetAllPagesByRoleIdQuery, useLazyGetAllRolesQuery } from "../../../../app/services/securityPermissionsAPI";
import FormCreator from "../../../../components/Forms/FormCreator";
import SecurityPermissions from "./securityPermissions.Data";
import { decryptUrlData } from "../../../../services/CryptoService";
import Label from "../../../../components/ui/label/Label";
import DropDown from "../../../../components/ui/dropdown/DropDrown";
import PermissionList from "./component/PermissionList";
import { GetPermissionData } from "./Util/generateTreeData";
import SwalAlert from "../../../../services/swalService/SwalService";
import { useDispatch } from "react-redux";
import { logout } from "../../../../app/slice/authSlice";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { securityKey } from "../../../../data/SecurityKey";

const Permissions = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const roleId = id ? decryptUrlData(id) : 0;

  const ref = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { confirm } = SwalAlert();
  const [rolesList, setRolesList] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [permissionsList, setPermissionsList] = useState();
  const [permissionItem, setpermissionItem] = useState([]);
  const [selectedRoleId, setselectedRoleId] = useState(roleId);
  const [togglePermissionCard, setTogglePermissionCard] = useState(false);
  const [handleShowPermission, setHandleShowPermission] = useState(false);

  //** API Call's */
  const [getAllRoles, { data: isAllRolesData, isSuccess: isSuccessAllRoles, isFetching: isFetchingAllRoles }] = useLazyGetAllRolesQuery();
  const [getById, { data: isGetByIdData, isSuccess: isSuccessgetById, isFetching: isFetchingGetById }] = useLazyGetAllPagesByRoleIdQuery();
  const [addSecurityPermissions, { isSuccess: isPermissionsAdded, data: permissionsData }] = useAddSecurityPermissionsMutation();

  // const hasAddPermission = hasFunctionalPermission(securityKey.ADDPERMISSIONS);

  // useEffect(() => {
  //   if (hasAddPermission.hasAccess === true) {
  //     setButtonVisible(true);
  //   }
  //   else {
  //     setButtonVisible(false);
  //   }
  // }, [hasAddPermission])

  useEffect(() => {
    if (!id) {
      setselectedRoleId(0);
      setTogglePermissionCard(false);
    }
  }, [location.pathname]);

  const handleDropdownChange = (selectedOption) => {
    setselectedRoleId(selectedOption.value);
  };

  const handleClick = () => {
    // if (selectedRoleId) {
    //   getById(selectedRoleId);
    // }
    if (selectedRoleId) {
      setTogglePermissionCard(true);
    }
  };

  useEffect(() => {
    // if (roleId) {
    //   getById(roleId);
    // }
    if (roleId > 0) {
      setselectedRoleId(roleId);
      setTogglePermissionCard(true);
    }
  }, [roleId]);

  useEffect(() => {
    getAllRoles();
  }, []);

  useEffect(() => {
    if (isSuccessAllRoles && isAllRolesData && !isFetchingAllRoles) {
      const roleList = isAllRolesData.map((item) => ({
        value: item.roleId,
        label: item.roleName,
      }));
      setRolesList(roleList);
    }
  }, [isSuccessAllRoles, isAllRolesData, isFetchingAllRoles]);

  useEffect(() => {
    if (isSuccessgetById && isGetByIdData && !isFetchingGetById) {
      setPermissionsList(isGetByIdData);
    }
  }, [isSuccessgetById, isAllRolesData, isFetchingGetById]);

  const onPermissionItemSet = (permissionTreeItem) => {
    setpermissionItem(permissionTreeItem);
  }

  const handleSavePermission = () => {
    if (permissionItem && permissionItem.length > 0) {
      let permissionSettingList = GetPermissionData(permissionItem);
      const transformedData = permissionSettingList.map(item => ({
        "securitySettingId": item.securitySettingId,
        "securityKeyId": item.securityKeyId,
        "roleId": item.roleId
      }));

      const requestData = {
        "securityPermissionsList": transformedData
      }
      addSecurityPermissions(requestData);
    }
    setTogglePermissionCard(true);
  }

  useEffect(() => {
    if (isPermissionsAdded && permissionsData) {
      confirm("Security Permissions Updated!", "You will be logged out! Please Log In again", "Log Out", "", false)
        .then((confirmed) => {
          if (confirmed) {
            dispatch(logout());
          }
        })
    }
  }, [isPermissionsAdded, permissionsData])

  const BackButton = () => {
    navigate("/SecurityRoleManagement");
  };

  return (
    <React.Fragment>
      <CardSection
        cardTitle="Select Group"
        rightButton={true}
        buttonText="Go Back"
        buttonClassName="btn dark-btn"
        titleButtonClick={BackButton}
        textWithIcon={true}
        iconImg={AppIcons.BackArrowIcon}>
        <div className="top-filter">
          <div className="row">
            <div className="col-md-7">
              <div className="d-flex align-items-end">
                <div className="input-label-part">
                  <Label labelName="Roles" />
                  <DropDown
                    options={rolesList}
                    value={selectedRoleId}
                    placeholder="Please Select Role"
                    onChange={handleDropdownChange} />
                </div>
                <div className="apply-btn ml-5">
                  <Buttons
                    buttonTypeClassName="success-btn"
                    buttonText="Show Permissions"
                    onClick={handleClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardSection>
      {togglePermissionCard && selectedRoleId && (
        <CardSection
          cardTitle="Security Permissions"
          rightButton={true}
          buttonText="Save Permissions"
          buttonClassName="btn theme-button"
          titleButtonClick={handleSavePermission}
          isButtonVisible={buttonVisible}>
          <PermissionList roleId={selectedRoleId} togglePermissionCard={togglePermissionCard}
            onPermissionSet={onPermissionItemSet}
          />
          {/* <PermissionTree permissionsList={permissionsList} /> */}
        </CardSection>
      )}

    </React.Fragment>
  );
};

export default Permissions;
