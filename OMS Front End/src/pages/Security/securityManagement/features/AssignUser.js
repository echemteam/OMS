import React, { useContext, useEffect, useRef, useState } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import {
  assignUserFormData,
  assignUserListData,
} from "./config/AssignUserForm.data";
import Buttons from "../../../../components/ui/button/Buttons";
import MolGrid from "../../../../components/Grid/MolGrid";
import {
  useAddRoleMappingMutation,
  useDeleteRolesMappingMutation,
  useGetRolesMappingByRoleIdMutation,
  useLazyGetUnAssignedUserByRoleIdQuery,
} from "../../../../app/services/rolesMappingAPI";
import ToastService from "../../../../services/toastService/ToastService";
import SwalAlert from "../../../../services/swalService/SwalService";
import CardSection from "../../../../components/ui/card/CardSection";
import { securityKey } from "../../../../data/SecurityKey";
import { hasFunctionalPermission } from "../../../../utils/AuthorizeNavigation/authorizeNavigation";


const AssignUser = (props) => {
  const molGridRef = useRef();
  const asignUserFormRef = useRef();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [listData, setListData] = useState();
  const [userForm, setUserForm] = useState(assignUserFormData);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  const { formSetting } = assignUserFormData;
  const actionColumn = assignUserListData.columns.find(column => column.name === "Action");
  const hasAddPermission = hasFunctionalPermission(securityKey.ADDASSIGNUSERS);
  const hasDeletePermission = hasFunctionalPermission(securityKey.DELETEASSIGNUSERS);

  useEffect(() => {
    if (hasDeletePermission.hasAccess === true) {
      actionColumn.defaultAction.allowDelete = true;
    }
    else if (hasDeletePermission.hasAccess === false) {
      actionColumn.defaultAction.allowDelete = false;
    }
  }, [hasDeletePermission, actionColumn.defaultAction.allowDelete]);

  useEffect(() => {
    if (hasAddPermission.hasAccess) {
      formSetting.isViewOnly = false;
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
  }, [hasAddPermission, formSetting.isViewOnly])

  const { confirm } = SwalAlert();

  const [
    addRoleMapping,
    {
      isLoading: isAddRoleMappingLoading,
      isSuccess: isUserAddRoleMapping,
      data: AddRoleMappingData,
    },
  ] = useAddRoleMappingMutation();

  const [
    getUnAssignedUserByRoleId,
    {
      isFetching: isGetUnAssignedUserByRoleIdFetching,
      isSuccess: isGetUnAssignedUserByRoleId,
      data: GetUnAssignedUserByRoleIdData,
    },
  ] = useLazyGetUnAssignedUserByRoleIdQuery();

  const [
    getRolesMappingByRoleId,
    { isLoading: isListLoading, isSuccess: isListSuccess, data: isListeData },
  ] = useGetRolesMappingByRoleIdMutation();

  const [deleteUser, { isSuccess: isDeleteSuccess, data: isDeletData }] =
    useDeleteRolesMappingMutation();

  useEffect(() => {
    if (props.isOpen) {
      getUnAssignedUserByRoleId(props.initData.roleId);
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (
      !isGetUnAssignedUserByRoleIdFetching &&
      isGetUnAssignedUserByRoleId &&
      GetUnAssignedUserByRoleIdData
    ) {
      const listdata = GetUnAssignedUserByRoleIdData.map((item) => ({
        value: item.userId,
        label: item.userName,
      }));
      const dropdownField = assignUserFormData.formFields.find(
        (item) => item.dataField === "userName"
      );
      dropdownField.fieldSetting.options = listdata;
      // setUserForm(listdata)
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [
    isGetUnAssignedUserByRoleIdFetching,
    isGetUnAssignedUserByRoleId,
    GetUnAssignedUserByRoleIdData,
  ]);

  const getLists = (pageObject) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: "" },
      roleId: props.initData.roleId,
    };
    getRolesMappingByRoleId(request);
  };

  const handlePageChange = (page) => {
    getLists(page);
  };

  useEffect(() => {
    if (isListSuccess && isListeData) {
      if (isListeData) {
        setListData(isListeData.dataSource);
      }
      if (isListeData.totalRecord) {
        setTotalRowCount(isListeData.totalRecord);
      }
    }
  }, [isListSuccess, isListeData]);

  useEffect(() => {
    if (molGridRef.current) {
      const defaultPageObject = molGridRef.current.getCurrentPageObject();
      getLists(defaultPageObject);
    }
  }, [props.isOpen]);

  const handleUser = () => {
    let userData = asignUserFormRef.current.getFormData();
    if (userData != null) {
      if (props.initData) {
        let req = {
          userId: userData.userName.value,
          roleId: props.initData.roleId,
        };
        addRoleMapping(req);
      }
    }
  };

  const handleDeleteClick = (data) => {
    confirm(
      "Delete?",
      "Are you sure you want to Delete?",
      "Delete",
      "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        deleteUser(data.userRoleId);
      }
    });
  };

  useEffect(() => {
    if (isUserAddRoleMapping && AddRoleMappingData) {
      ToastService.success(AddRoleMappingData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getLists(currentPageObject);
      getUnAssignedUserByRoleId(props.initData.roleId);
    }
  }, [isUserAddRoleMapping, AddRoleMappingData]);

  useEffect(() => {
    if (isDeleteSuccess && isDeletData) {
      ToastService.success(isDeletData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getLists(currentPageObject);
      getUnAssignedUserByRoleId(props.initData.roleId);
    }
  }, [isDeleteSuccess, isDeletData]);

  const actionHandler = {
    DELETE: handleDeleteClick,
  };

  return (
    <div>
      <div className="row">
        <div className="col-12 col-md-11 horizontal-form mt-3">
          <div className="row vertical-form">
            <FormCreator
              ref={asignUserFormRef}
              config={userForm}
              {...userForm}
              key={shouldRerenderFormCreator}
            />
            <div className="col-xxl-2 col-xl-2 col-md-2  mb-3">
              {buttonVisible ?
                <Buttons
                  buttonTypeClassName="theme-button"
                  buttonText="Add"
                  onClick={handleUser}
                  isLoading={isAddRoleMappingLoading}
                />
                : null}
            </div>
          </div>
        </div>
        <CardSection
          cardTitle="Users"
        >
          <div className="col-md-12 table-striped">
            <MolGrid
              ref={molGridRef}
              configuration={assignUserListData}
              dataSource={listData}
              allowPagination={true}
              pagination={{
                totalCount: totalRowCount,
                pageSize: 20,
                currentPage: 1,
              }}
              onPageChange={handlePageChange}
              isLoading={isListLoading}
              onActionChange={actionHandler}
            />
          </div>
        </CardSection>
      </div>
    </div>
  );
};

export default AssignUser;
