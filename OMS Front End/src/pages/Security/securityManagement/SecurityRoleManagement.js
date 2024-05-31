import React, { useContext, useEffect, useRef, useState } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import { AppIcons } from "../../../data/appIcons";
import MolGrid from "../../../components/Grid/MolGrid";
import { useNavigate } from "react-router-dom";
import CenterModel from "../../../components/ui/centerModel/CenterModel";
import AddEditRole from "./features/AddEditRole";
import AssignUser from "./features/AssignUser";
import { SecurityRoleGridConfig, addEditRoleFormData } from "./features/formData/AddEditRoleForm.data";
import { useDeleteRolesMutation, useGetRolesMutation } from "../../../app/services/securityRoleAPI";
import SwalAlert from "../../../services/swalService/SwalService";
// import useDebounce from "../../../app/customHooks/useDebouce";
import ToastService from "../../../services/toastService/ToastService";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import { encryptUrlData } from "../../../services/CryptoService";
import { securityKey } from "../../../data/SecurityKey";
import { AddPagePermissionsContext } from "../../../utils/ContextAPIs/AddPagePermissions/AddPagePermissionsContext";

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
  const { hasAccess, CheckAddPermission } = useContext(AddPagePermissionsContext);

  useEffect(() => {
    CheckAddPermission(securityKey.ADDSECURITYROLE);
  }, [])

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

  const handleCopy = () => {
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

  const getLists = (pageObject) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: "" },
    };
    getRoles(request);
  };

  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   setSearch(value);
  // };

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
    if (isDeleteSuccess && isDeletData) {
      ToastService.success(isDeletData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getLists(currentPageObject);
    }
  }, [isDeleteSuccess, isDeletData]);

  useEffect(() => {
    if (molGridRef.current) {
      const defaultPageObject = molGridRef.current.getDefulatPageObject();
      getLists(defaultPageObject);
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
    COPY: handleCopy,
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
    const defaultPageObject = molGridRef.current.getDefulatPageObject();
    getLists(defaultPageObject);
  };

  const onSidebarClose = () => {
    setisModelOpen(false);
  };

  return (
    <div>
      <CardSection
        cardTitle="Security Roles"
        // cardSubTitle="Sub title add hear"
        buttonClassName="btn dark-btn"
        rightButton={hasAccess ? true : false}
        buttonText="Add"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={handleAdd}
      >
        <div className="row">
          <div className="col-md-12 table-bordered">
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
              isLoading={isListLoading}
              onActionChange={actionHandler}
            />
          </div>
        </div>
      </CardSection>
      {addRoleModal && (
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
      )}
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

