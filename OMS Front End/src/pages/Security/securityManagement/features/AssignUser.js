import React, { useEffect, useRef, useState } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import { assignUserFormData, assignUserListData } from "./formData/AssignUserForm.data";
import Buttons from "../../../../components/ui/button/Buttons";
import MolGrid from "../../../../components/Grid/MolGrid";
import { useAddRoleMappingMutation, useDeleteRolesMappingMutation, useGetRolesMappingByRoleIdMutation, useLazyGetUnAssignedUserByRoleIdQuery } from "../../../../app/services/rolesMappingAPI";
import ToastService from "../../../../services/toastService/ToastService";
import SwalAlert from "../../../../services/swalService/SwalService";

const AssignUser = (props) => {
  const molGridRef = useRef();
  const asignUserFormRef = useRef();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [listData, setListData] = useState();
  const [userForm, setUserForm] = useState(assignUserFormData);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  const { confirm } = SwalAlert();

  const [addRoleMapping,
    { isLoading: isAddRoleMappingLoading, isSuccess: isUserAddRoleMapping,
      data: AddRoleMappingData }
  ] = useAddRoleMappingMutation();

  const [getUnAssignedUserByRoleId,
    {
      isFetching: isGetUnAssignedUserByRoleIdFetching,
      isSuccess: isGetUnAssignedUserByRoleId,
      data: GetUnAssignedUserByRoleIdData
    }
  ] = useLazyGetUnAssignedUserByRoleIdQuery();

  const [
    getRolesMappingByRoleId,
    { isLoading: isListLoading, isSuccess: isListSuccess, data: isListeData },
  ] = useGetRolesMappingByRoleIdMutation();

  const [deleteUser, { isSuccess: isDeleteSuccess, data: isDeletData }] =
    useDeleteRolesMappingMutation();

  useEffect(() => {
    if (props.isOpen) {
      getUnAssignedUserByRoleId(props.initData.roleId)
    }
  }, [props.isOpen])

  useEffect(() => {
    if (!isGetUnAssignedUserByRoleIdFetching && isGetUnAssignedUserByRoleId && GetUnAssignedUserByRoleIdData) {
      const listdata = GetUnAssignedUserByRoleIdData.map(item => ({
        value: item.userId,
        label: item.userName
      }))
      const dropdownField = assignUserFormData.formFields.find(item => item.dataField === "userName");
      dropdownField.fieldSetting.options = listdata;
      // setUserForm(listdata)
      setShouldRerenderFormCreator(prevState => !prevState);
    }
  }, [isGetUnAssignedUserByRoleIdFetching, isGetUnAssignedUserByRoleId, GetUnAssignedUserByRoleIdData])

  const getLists = (pageObject) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: "" },
      roleId: props.initData.roleId
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
      const defaultPageObject = molGridRef.current.getDefulatPageObject();
      getLists(defaultPageObject);
    }
  }, [props.isOpen]);

  const handleUser = () => {
    let userData = asignUserFormRef.current.getFormData();
    if (userData != null) {
      if (props.initData) {
        let req = {
          userId: userData.userName.value,
          roleId: props.initData.roleId
        }
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
      getUnAssignedUserByRoleId(props.initData.roleId)
    }
  }, [isUserAddRoleMapping, AddRoleMappingData]);

  useEffect(() => {
    if (isDeleteSuccess && isDeletData) {
      ToastService.success(isDeletData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getLists(currentPageObject);
      getUnAssignedUserByRoleId(props.initData.roleId)
    }
  }, [isDeleteSuccess, isDeletData]);

  const actionHandler = {
    DELETE: handleDeleteClick,
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12 horizontal-form">
          <div className="row vertical-form">
            <FormCreator
              ref={asignUserFormRef}
              config={userForm}
              {...userForm}
              key={shouldRerenderFormCreator}
            />
            <div className="col-xxl-2 col-xl-2 col-md-2 mt-2 mb-3">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Add"
                onClick={handleUser}
                isLoading={isAddRoleMappingLoading}
              />
            </div>
          </div>
        </div>
        <div className="col-md-12 card mb-0 pb-2">
          <div className="card-title">
            <h4>Users</h4>
          </div>
        </div>
        <div className="col-md-12 table-bordered">
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
      </div>
    </div>
  );
};

export default AssignUser;
