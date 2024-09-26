/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
//** Lib's */
import "./Permission.scss";
import { AppIcons } from "../../../data/appIcons";
import Label from "../../../components/ui/label/Label";
import Buttons from "../../../components/ui/button/Buttons";
import DropDown from "../../../components/ui/dropdown/DropDrown";
import CardSection from "../../../components/ui/card/CardSection";
//** Service's */
import { decryptUrlData } from "../../../services/CryptoService";
import { useLazyGetAllRolesQuery } from "../../../app/services/securityPermissionsAPI";
import { SecurityPermissionsContext } from "../../../utils/ContextAPIs/SecurityPermissions/SecurityPermissionsContext";
//** Component's */
const ManagePermission = React.lazy(() => import("./features/ManagePermission"));

const Permissions = () => {

  //** State */
  const childRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const roleId = id ? decryptUrlData(id) : 0;
  const [rolesList, setRolesList] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(roleId);
  const [selecteRoleId, setSelecteRoleId] = useState(roleId);
  const [togglePermissionCard, setTogglePermissionCard] = useState(false);

  //** API Call's */
  const [getAllRoles, { data: isAllRolesData, isSuccess: isSuccessAllRoles, isFetching: isFetchingAllRoles }] = useLazyGetAllRolesQuery();

  //** Handle Change's */
  const handleDropdownChange = (selectedOption) => {
    setSelecteRoleId(selectedOption.value);
  };
  const handleClick = () => {
    if (selecteRoleId) {
      setTogglePermissionCard(true);
      if (childRef.current) {
        childRef.current.callChildFunction(selecteRoleId);
      }
    }
  };

  //** Use Effect's */
  useEffect(() => {
    getAllRoles();
  },[roleId]);

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
    if (!id) {
      setSelectedRoleId(0);
      setTogglePermissionCard(false);
    }
  }, [id, location.pathname]);
  useEffect(() => {
    if (roleId > 0) {
      setSelectedRoleId(roleId);
      setTogglePermissionCard(true);
    }
  }, [roleId]);

  //** Back Button */
  const BackButton = () => {
    navigate("/SecurityRoleManagement");
  };

  return (
    <React.Fragment>
      <SecurityPermissionsContext.Provider value={{ togglePermissionCard, selectedRoleId, childRef }}>
        <div className="mt-2">
        <CardSection
          cardTitle="Security Permissions Role"
          rightButton={true}
          buttonText="Go Back"
          buttonClassName="btn dark-btn"
          titleButtonClick={BackButton}
          textWithIcon={true}
          iconImg={AppIcons.BackArrowIcon}>
          <div className="top-filter">
            <div className="row">
              <div className="col-md-7 mb-2">
                <div className="d-flex align-items-end">
                  <div className="input-label-part">
                    <Label labelName="Roles" />
                    <DropDown
                      options={rolesList}
                      value={selecteRoleId}
                      placeholder="Please Select Role"
                      onChange={handleDropdownChange} />
                  </div>
                  <div className="apply-btn ml-5">
                    <Buttons
                      buttonTypeClassName="theme-button"
                      buttonText="Show Permissions"
                      onClick={handleClick} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardSection>
        </div>
        <ManagePermission />
      </SecurityPermissionsContext.Provider>
    </React.Fragment>
  );
};

export default Permissions;
