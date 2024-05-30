import React, { useEffect, useRef, useState } from "react";
import MolGrid from "../../../components/Grid/MolGrid";
import CardSection from "../../../components/ui/card/CardSection";
import { AppIcons } from "../../../data/appIcons";
import { UserGridConfig } from "./features/formData/UserForm.data";
import { encryptUrlData } from '../../../services/CryptoService'
import { useDeleteUserMutation, useGetUsersMutation } from '../../../app/services/userAPI'
import SwalAlert from "../../../services/swalService/SwalService";
import ToastService from "../../../services/toastService/ToastService";
import { useNavigate } from "react-router-dom";

const Users = () => {
  
  const molGridRef = useRef();
  
  const [search, setSearch] = useState("");
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [listData, setListData] = useState();
  
  const { confirm } = SwalAlert();
  const navigate = useNavigate()
  
  const [
    getUsers,
    { isLoading: isListLoading, isSuccess: isListSuccess, data: isListeData },
  ] = useGetUsersMutation();

  const [deleteUser, { isSuccess: isDeleteSuccess, data: isDeletData }] =
    useDeleteUserMutation();

  const getLists = (pageObject) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: search },
    };
    getUsers(request);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (value.length >= 3 || value.length === 0) {
      setSearch(value);
    }
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
  }, [search]);


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
    <div>
      <CardSection
        cardTitle="View All Users"
        cardSubTitle="Sub title add hear"
        searchInputName="Search By User Name"
        titleButtonClick={AddUser}
        buttonClassName="btn theme-button"
        rightButton={true}
        buttonText="Add User"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        handleChange={handleChange}
        searchInput={true}
      >
        <div className="row">
          <div className="col-md-12 table-bordered">
            <MolGrid
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
