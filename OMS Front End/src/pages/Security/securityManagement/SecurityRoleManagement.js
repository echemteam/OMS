/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import { AppIcons } from "../../../data/appIcons";
import MolGrid from "../../../components/Grid/MolGrid";
import { useNavigate } from "react-router-dom";
import CenterModel from "../../../components/ui/centerModel/CenterModel";
import AddEditRole from "./features/AddEditRole";
import AssignUser from "./features/AssignUser";
import { SecurityRoleGridConfig, addEditRoleFormData } from "./features/config/AddEditRoleForm.data";
import { useDeleteRolesMutation, useGetRolesMutation } from "../../../app/services/securityRoleAPI";
import SwalAlert from "../../../services/swalService/SwalService";
import ToastService from "../../../services/toastService/ToastService";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import { encryptUrlData } from "../../../services/CryptoService";
import { securityKey } from "../../../data/SecurityKey";
import { hasFunctionalPermission } from "../../../utils/AuthorizeNavigation/authorizeNavigation";


const SecurityRoleManagement = () => {
  const molGridRef = useRef();
  // const [search, setSearch] = useState("");
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [listData, setListData] = useState();
  const [isModelOpen, setisModelOpen] = useState(false);

  // const debouncedSearch = useDebounce(search, 300);
  const [addRoleModal, setAddRoleModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(addEditRoleFormData.initialState);

  const navigate = useNavigate();
  const { confirm } = SwalAlert();

  const [buttonVisible, setButtonVisible] = useState(false);
  const { formSetting } = addEditRoleFormData;
  const actionColumn = SecurityRoleGridConfig.columns.find(column => column.name === "Action");

  const hasAssingUser = hasFunctionalPermission(securityKey.ASSIGNUSERS);
  const hasAddPermission = hasFunctionalPermission(securityKey.ADDSECURITYROLE);
  const hasEditPermission = hasFunctionalPermission(securityKey.EDITSECURITYROLE);
  const hasDeletePermission = hasFunctionalPermission(securityKey.DELETESECURITYROLE);
  const hasPermissionsManagement = hasFunctionalPermission(securityKey.PERMISSIONMANAGEMENT);

  //** Check grid Action Permission */
  useEffect(() => {
    if (hasEditPermission.isViewOnly === true) {
      actionColumn.defaultAction.allowEdit = true;
    }
    else if (hasEditPermission.isEditable === true) {
      actionColumn.defaultAction.allowEdit = true;
    }
    else {
      actionColumn.defaultAction.allowEdit = false;
    }
  }, [hasEditPermission, actionColumn.defaultAction.allowEdit])

  //** Check grid Action Permission */
  useEffect(() => {
    if (hasDeletePermission.hasAccess === true) {
      actionColumn.defaultAction.allowDelete = true;
    }
    else if (hasDeletePermission.hasAccess === false) {
      actionColumn.defaultAction.allowDelete = false;
    }
  }, [hasDeletePermission, actionColumn.defaultAction.allowDelete]);

  // ** Check Form fields Permission */
  useEffect(() => {
    if (hasAddPermission.hasAccess) {
      formSetting.isViewOnly = false;
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
  }, [hasEditPermission, hasAddPermission, formSetting.isViewOnly])

  useEffect(() => {
    if (hasPermissionsManagement.hasAccess === true) {
      actionColumn.defaultAction.allowPermission = true;
    }
    else if (hasPermissionsManagement.hasAccess === false) {
      actionColumn.defaultAction.allowPermission = false;
    }
  }, [hasPermissionsManagement, actionColumn.defaultAction.allowPermission]);

  useEffect(() => {
    if (hasAssingUser.hasAccess === true) {
      actionColumn.defaultAction.allowUser = true;
    }
    else if (hasAssingUser.hasAccess === false) {
      actionColumn.defaultAction.allowUser = false;
    }
  }, [hasAssingUser, actionColumn.defaultAction.allowUser])

  const [
    getRoles,
    { isLoading: isListLoading, isSuccess: isListSuccess, data: isListeData },
  ] = useGetRolesMutation();

  const [deleteRoles, { isSuccess: isDeleteSuccess, data: isDeletData }] =
    useDeleteRolesMutation();

  const handleAdd = () => {
    setIsEdit(false);
    resetForm();
    setAddRoleModal(!addRoleModal);
  };

  const handleEditClick = (data) => {
    resetForm();
    setFormData(data);
    setIsEdit(true);
    setAddRoleModal(!addRoleModal);
  };

  const handlePermission = (data) => {
    navigate(`/EditPermissions/${encryptUrlData(data.roleId)}`);
  };
  const handleUser = (data) => {
    setisModelOpen(true);
    setFormData(data);
  };

  const resetForm = () => {
    let form = { ...addEditRoleFormData.initialState };
    setFormData(form);
  };

  const getLists = (pageObject,sortingString) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: "" },
      sortString: sortingString
    };
    getRoles(request);
  };

  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   setSearch(value);
  // };

  const handlePageChange = (page) => {
    getLists(page,molGridRef.current.generateSortingString());
  };

  const handleSorting = (shortString) => {
    getLists(molGridRef.current.getCurrentPageObject(), shortString);
  }

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
    if (isDeleteSuccess && isDeletData) {
      ToastService.success(isDeletData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getLists(currentPageObject,molGridRef.current.generateSortingString());
    }
  }, [isDeleteSuccess, isDeletData]);

  useEffect(() => {
    if (molGridRef.current) {
      const defaultPageObject = molGridRef.current.getCurrentPageObject();
      getLists(defaultPageObject,molGridRef.current.generateSortingString());
    }
  }, []);

  const handleDeleteClick = (data) => {
    confirm(
      "Delete?",
      "Are you sure you want to Delete?",
      "Delete",
      "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        deleteRoles(data.roleId);
      }
    });
  };

  const actionHandler = {
    EDIT: handleEditClick,
    DELETE: handleDeleteClick,
    PERMISSION: handlePermission,
    USER: handleUser,
  };

  const onModalClose = () => {
    setAddRoleModal(!addRoleModal);
    resetForm();
  };

  //** Success */
  const onSuccess = () => {
    onModalClose();
    const defaultPageObject = molGridRef.current.getCurrentPageObject();
    getLists(defaultPageObject,molGridRef.current.generateSortingString());
  };

  const onSidebarClose = () => {
    setisModelOpen(false);
  };

  return (
    <div>
      <CardSection
        cardTitle="Security Roles"
        // cardSubTitle="Sub title add hear"
        buttonClassName="btn theme-button"
        rightButton={buttonVisible }
        buttonText="Add"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={handleAdd}
      >
        <div className="row">
          <div className="col-md-12 table-striped">
            <MolGrid
              ref={molGridRef}
              configuration={SecurityRoleGridConfig}
              dataSource={listData}
              allowPagination={true}
              pagination={{
                totalCount: totalRowCount,
                pageSize: 20,
                currentPage: 1,
              }}
              onPageChange={handlePageChange}
              onSorting={handleSorting}
              isLoading={isListLoading}
              onActionChange={actionHandler}
            />
          </div>
        </div>
      </CardSection>
      
        <CenterModel
          showModal={addRoleModal}
          handleToggleModal={handleAdd}
          modalTitle={formData.roleId ? "Update Role" : "Add Role"}
          modelSizeClass="w-40"
        >
          <AddEditRole onModalClose={onModalClose}
            isEdit={isEdit}
            initData={formData}
            onSuccess={onSuccess}
          />
        </CenterModel>

      <SidebarModel
        modalTitle="Assign Users"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <AssignUser
          initData={formData}
          isOpen={isModelOpen}
        />
      </SidebarModel>
    </div>
  );
};

export default SecurityRoleManagement;

