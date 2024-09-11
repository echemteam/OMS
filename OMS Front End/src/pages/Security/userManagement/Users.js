/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import { AppIcons } from "../../../data/appIcons";
import { UserGridConfig, userFormData } from "./features/config/UserForm.data";
import { encryptUrlData } from '../../../services/CryptoService'
import { useDeleteUserMutation, useGetUsersMutation } from '../../../app/services/userAPI'
import SwalAlert from "../../../services/swalService/SwalService";
import ToastService from "../../../services/toastService/ToastService";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../app/customHooks/useDebouce";
import { securityKey } from "../../../data/SecurityKey";
import { hasFunctionalPermission } from "../../../utils/AuthorizeNavigation/authorizeNavigation";
import "./Users.scss"
import FinalMolGrid from "../../../components/FinalMolGrid/FinalMolGrid";
const Users = () => {

  const molGridRef = useRef();

  const [search, setSearch] = useState("");
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [listData, setListData] = useState();
  const debouncedSearch = useDebounce(search, 300);
  const { confirm } = SwalAlert();
  const navigate = useNavigate();
  const [buttonVisible, setButtonVisible] = useState(false);

  const hasAddPermission = hasFunctionalPermission(securityKey.ADDUSER);
  const hasEditPermission = hasFunctionalPermission(securityKey.EDITUSER);
  const hasDeletePermission = hasFunctionalPermission(securityKey.DELETEUSER);

  const { formSetting } = userFormData;
  const actionColumn = UserGridConfig.columns.find(column => column.name === "Action");

  const [
    getUsers,
    { isLoading: isListLoading, isSuccess: isListSuccess, data: isListeData },
  ] = useGetUsersMutation();

  const [deleteUser, { isSuccess: isDeleteSuccess, data: isDeletData }] =
    useDeleteUserMutation();

  const getLists = (pageObject, sortingString) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: debouncedSearch },
      sortString: sortingString
    };
    getUsers(request);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handlePageChange = (page) => {
    getLists(page, molGridRef.current.generateSortingString());
  };

  const handleSorting = (shortString) => {
    getLists(molGridRef.current.getCurrentPageObject(), shortString);
  }

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
    if (hasAddPermission.hasAccess === true) {
      formSetting.isViewOnly = false;
      setButtonVisible(true);
    }
  }, [hasEditPermission, hasAddPermission, formSetting.isViewOnly])

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
      getLists(currentPageObject, molGridRef.current.generateSortingString());
    }
  }, [isDeleteSuccess, isDeletData]);

  useEffect(() => {
    if (molGridRef.current) {
      const defaultPageObject = molGridRef.current.getCurrentPageObject();
      getLists(defaultPageObject, molGridRef.current.generateSortingString());
    }
  }, [debouncedSearch]);


  const handleEidtClick = (data) => {
    navigate(`/EditUser/${encryptUrlData(data.userId)}`, "_blank");
  };

  const handleDeleteClick = (data) => {
    confirm(
      "Delete?",
      "Are you sure you want to Delete?",
      "Delete",
      "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        deleteUser(data.userId);
      }
    });
  };

  const actionHandler = {
    EDIT: handleEidtClick,
    DELETE: handleDeleteClick,
  };

  const AddUser = () => {
    navigate("/AddEditUser");
  };

  return (
    <div className="user-lists">
      <CardSection
        // cardTitle="View All Users"
        // cardSubTitle="Sub title add hear"
        searchInputName="Search By User Name"
        titleButtonClick={AddUser}
        buttonClassName="btn theme-button"
        rightButton={buttonVisible}
        buttonText="Add User"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        handleChange={handleChange}
        searchInput={true}>
        <div className="row">
          <div className="col-md-12 table-striped ">
            <FinalMolGrid
              ref={molGridRef}
              configuration={UserGridConfig}
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
    </div>
  );
};

export default Users;
