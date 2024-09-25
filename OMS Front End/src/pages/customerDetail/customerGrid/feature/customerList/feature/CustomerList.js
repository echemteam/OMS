/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import CardSection from "../../../../../../components/ui/card/CardSection";
import {
  useAddEditResponsibleUserForCustomerMutation,
  useGetCustomersMutation,
  useUpdateCustomerApproveStatusMutation,
  useUpdateCustomerInActiveStatusMutation,
} from "../../../../../../app/services/basicdetailAPI";
import BasicDetailContext from "../../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import CustomerListContext from "../../../../../../utils/ContextAPIs/Customer/CustomerListContext";
import { useAddCustomerNotesMutation } from "../../../../../../app/services/notesAPI";
import { useSelector } from "react-redux";
import { useLazyGetAllUserQuery } from "../../../../../../app/services/commonAPI";
import { excludingRoles } from "../../../../feature/customerBasicDetail/config/CustomerBasicDetail.data";
import { setDropDownOptionField } from "../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { hasFunctionalPermission } from "../../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { securityKey } from "../../../../../../data/SecurityKey";
import ToastService from "../../../../../../services/toastService/ToastService";
import { encryptUrlData } from "../../../../../../services/CryptoService";
import {
  StatusEnums,
  StatusFeild,
} from "../../../../../../utils/Enums/StatusEnums";
import { AppIcons } from "../../../../../../data/appIcons";
import CenterModel from "../../../../../../components/ui/centerModel/CenterModel";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import Buttons from "../../../../../../components/ui/button/Buttons";
import CustomerApproval from "../../../../feature/cutomerApproval/CustomerApproval";
import { reasonData } from "../../../../../../common/features/component/CustomerSupplierReason/Reason.data";
import PropTypes from "prop-types";
import FinalMolGrid from "../../../../../../components/FinalMolGrid/FinalMolGrid";
import { validateResponsibleUserId } from "../../../../../../utils/ResponsibleUser/validateRUser";
import { securityValidator } from "../../../../../../utils/CustomActionSecurity/actionsSecurityValidator";
// import { securityValidator } from "../../../../../../utils/CustomActionSecurity/actionsSecurityValidator";
//import MolGrid from "../../../../../../components/Grid/MolGrid";

export const CustomersList = ({
  statusId,
  configFile,
  handleChange,
  search,
  handleChangeDropdown,
  statusOptions,
  selectedDrpvalues,
  searchStatusFilter,
  handleSearch,
  handleClear,
  handleKeyPress,
  shouldRerenderFormCreator,
}) => {
  const navigate = useNavigate();
  const molGridRef = useRef();
  const reasonRef = useRef();
  const childRef = useRef();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [dataSource, setDataSource] = useState();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(reasonData);
  const [customerID, setCustomerId] = useState();
  const [staticId, setStaticId] = useState();
  const [statusFeild, setStatusFeild] = useState();
  const { listRef } = useContext(CustomerListContext);
  const authState = useSelector((state) => state.auth);
  const [assignRUser, setAssignRUser] = useState();
  const { isResponsibleUser, setIsResponsibleUser } =
    useContext(BasicDetailContext);

  const [
    getCustomers,
    { isLoading: isListLoading, isSuccess: isListSuccess, data: isListeData },
  ] = useGetCustomersMutation();
  const [
    updateCustomerApproveStatus,
    { isSuccess: isSuccessUpdateCustomer, data: updateCustomerData },
  ] = useUpdateCustomerApproveStatusMutation();
  const [
    updateCustomerInActiveStatus,
    {
      isLoading: updateCustomerInActiveStatusCustomerLoading,
      isSuccess: isSuccessUpdateCustomerInActiveStatus,
      data: updateCustomerInActiveStatusData,
    },
  ] = useUpdateCustomerInActiveStatusMutation();

  const [
    addEditResponsibleUserForCustomer,
    {
      isSuccess: isSuccessAddEditResponsibleUserForCustomer,
      data: isAddEditResponsibleUserForCustomerData,
    },
  ] = useAddEditResponsibleUserForCustomerMutation();

  const [
    getAllUser,
    { isSuccess: isGetAllUserSucess, data: allGetAlluserData },
  ] = useLazyGetAllUserQuery();
  // const [updateResponsibleUser] = useUpdateResponsibleUserMutation();

  const [addCustomerNotes] = useAddCustomerNotesMutation();

  useEffect(() => {
    getAllUser();
  }, [statusId]);

  useEffect(() => {
    if (
      isSuccessAddEditResponsibleUserForCustomer &&
      isAddEditResponsibleUserForCustomerData
    ) {
      ToastService.success(
        isAddEditResponsibleUserForCustomerData.errorMessage
      );
    }
  }, [
    isSuccessAddEditResponsibleUserForCustomer,
    isAddEditResponsibleUserForCustomerData,
  ]);

  useEffect(() => {
    if (isGetAllUserSucess && allGetAlluserData) {
      const filterData = allGetAlluserData.filter((item) => {
        return (
          item.roleName === null ||
          !excludingRoles
            .map((role) => role.toLowerCase())
            .includes(item.roleName.toLowerCase())
        );
      });
      // Remove duplicates based on fullName
      const uniqueData = Array.from(
        new Map(filterData.map((item) => [item.fullName, item])).values()
      );
      setDropDownOptionField(
        uniqueData,
        "userId",
        "fullName",
        reasonData,
        "responsibleUserId"
      );
    }
  }, [isGetAllUserSucess, allGetAlluserData]);

  useEffect(() => {
    onCustomeActionHandler();
  }, [configFile]);

  const hasResponsibleUserhasAccess = () => {
    onCustomeActionHandler();
  };

  const onCustomeActionHandler = () => {
    const actionColumn = configFile?.columns.find(
      (column) => column.name === "Action"
    );
    const approvalAction = configFile?.columns.find(
      (column) => column.name === "Approve"
    );
    if (actionColumn) {
      const hasEdit = hasFunctionalPermission(securityKey.EDITCUSTOMER);
      const hasBlock = hasFunctionalPermission(securityKey.BLOCKCUSTOMER);
      const hasFreeze = hasFunctionalPermission(securityKey.FREEZECUSTOMER);
      const hasDisable = hasFunctionalPermission(securityKey.DISABLECUSTOMER);
      const hasUnBlock = hasFunctionalPermission(securityKey.UNBLOCKCUSTOMER);
      // const hasUnFreeze = hasFunctionalPermission(securityKey.UNFREEZECUSTOMER);

      if (actionColumn.defaultAction) {
        actionColumn.defaultAction.allowEdit = hasEdit?.hasAccess;
      }
      actionColumn.customAction = securityValidator(
        hasBlock?.hasAccess,
        actionColumn.customAction,
        "ALLOWBLOCKED"
      );
      actionColumn.customAction = securityValidator(
        hasFreeze?.hasAccess,
        actionColumn.customAction,
        "ALLOWFREEZE"
      );
      actionColumn.customAction = securityValidator(
        hasDisable?.hasAccess,
        actionColumn.customAction,
        "ALLOWDISABLE"
      );
      actionColumn.customAction = securityValidator(
        hasUnBlock?.hasAccess,
        actionColumn.customAction,
        "ALLOWUNBLOCKED"
      );
    }
    if (approvalAction && approvalAction.colSettings) {
      approvalAction.colSettings.isDisabled = true;
    }
    if (isResponsibleUser) {
      if (approvalAction && approvalAction.colSettings) {
        approvalAction.colSettings.isDisabled = false;
      }
    }
  };

  const handlePageChange = (page, sortingString) => {
    const sortingStringObject =
      sortingString || molGridRef.current.generateSortingString();
    const request = {
      pagination: {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      },
      filters: { searchText: search },
      statusId: Array.isArray(statusId) ? statusId.join(",") : String(statusId),
      sortString: sortingStringObject,
    };
    // saveData('customerPagination', request);
    getCustomers(request);
  };

  useEffect(() => {
    if (isListSuccess && isListeData) {
      if (isListeData) {
        const isResponsibleId = isListeData.dataSource.find((data) =>
          validateResponsibleUserId(
            data.responsibleUserId,
            authState?.user?.userID
          )
        );
        if (isResponsibleId) {
          setIsResponsibleUser(true);
          hasResponsibleUserhasAccess();
        } else {
          setIsResponsibleUser(false);
        }
        const modifyCustomerData = isListeData.dataSource.map((data) => ({
          ...data,
          taxId: data.taxId === "" ? "-" : data.taxId,
        }));
        setDataSource(modifyCustomerData);
      }
      if (isListeData.totalRecord) {
        setTotalRowCount(isListeData.totalRecord);
      }
    }
  }, [isListSuccess, isListeData]);

  useEffect(() => {
    if (isSuccessUpdateCustomer && updateCustomerData) {
      ToastService.success(updateCustomerData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getListApi(currentPageObject, molGridRef.current.generateSortingString());
    }
  }, [isSuccessUpdateCustomer, updateCustomerData]);

  useEffect(() => {
    if (
      isSuccessUpdateCustomerInActiveStatus &&
      updateCustomerInActiveStatusData
    ) {
      ToastService.success(updateCustomerInActiveStatusData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getListApi(currentPageObject, molGridRef.current.generateSortingString());
      handleToggleModal();
    }
  }, [isSuccessUpdateCustomerInActiveStatus, updateCustomerInActiveStatusData]);

  useImperativeHandle(listRef, () => ({
    getListApi,
  }));

  const getListApi = (pageObject, sortingString) => {
    const currentPageObject =
      pageObject || molGridRef.current.getCurrentPageObject();
    const sortingStringObject =
      sortingString || molGridRef.current.generateSortingString();
    const request = {
      pagination: {
        pageNumber: currentPageObject.pageNumber,
        pageSize: currentPageObject.pageSize,
      },
      filters: { searchText: search },
      statusId: Array.isArray(statusId) ? statusId.join(",") : String(statusId),
      sortString: sortingStringObject,
    };
    getCustomers(request);
  };

  const handleSorting = (shortString) => {
    getListApi(molGridRef.current.getCurrentPageObject(), shortString);
  };

  const handleEditClick = (data) => {
    navigate(`/CustomerDetails/${encryptUrlData(data.customerId)}`, "_blank");
  };

  const handleGridCheckBoxChange = (fieldName, rowData) => {
    if (childRef.current) {
      childRef.current.callChildFunction(
        rowData.customerId,
        rowData.isSubCustomer ? rowData.isSubCustomer : false
      );
    }
    setCustomerId(rowData.customerId);
  };

  const updateCustomerApproval = () => {
    let req = {
      customerId: customerID,
    };
    updateCustomerApproveStatus(req);
  };

  const handleToggleModal = () => {
    setShowModal(false);
    onReset();
  };

  const removeFields = () => {
    const removeFields = ["ResponsibleUserId"];
    const newFrom = { ...formData };
    newFrom.formFields = formData.formFields.filter(
      (field) => !removeFields.includes(field.id)
    );
    setFormData(newFrom);
  };

  const handlefreeze = (data) => {
    removeFields();
    setShowModal(true);
    setCustomerId(data.customerId);
    setStaticId(StatusEnums.Freeze);
    setStatusFeild(StatusFeild.Freeze);
  };

  const handleDiseble = (data) => {
    removeFields();
    setShowModal(true);
    setCustomerId(data.customerId);
    setStaticId(StatusEnums.Disable);
    setStatusFeild(StatusFeild.Disable);
  };

  const handleBlock = (data) => {
    removeFields();
    setShowModal(true);
    setCustomerId(data.customerId);
    setStaticId(StatusEnums.Block);
    setStatusFeild(StatusFeild.Block);
  };
  const handleReject = (data) => {
    const customerData = dataSource.find(
      (customerItem) => customerItem.customerId === data.customerId
    );
    setShowModal(true);
    setAssignRUser(false);
    setCustomerId(data.customerId);
    setStaticId(StatusEnums.Reject);
    setStatusFeild(StatusFeild.Reject);
    if (customerData.responsibleUserId) {
      // removeFields();
      // setAssignRUser(true);
      const responsibleUserIds = customerData?.responsibleUserId
      ?.split(",")
      .map((id) => Number(id.trim()));
      const formNew = { ...formData }
      formNew.initialState = {
        ...formNew.initialState,
        responsibleUserId: responsibleUserIds,
      };
      setFormData(formNew);
    }
  };
  const onReset = () => {
    let restData = { ...reasonData };
    restData.initialState = { ...formData };
    setFormData(restData);
  };

  const handleUpdate = () => {
    let custData = reasonRef.current.getFormData();
    if (custData) {
      let req = {
        ...custData,
        customerId: customerID,
        statusId: staticId,
        note: custData.inActiveReason,
      };
      updateCustomerInActiveStatus(req);
      addCustomerNotes(req);
      if (
        !assignRUser &&
        custData.responsibleUserId &&
        custData.responsibleUserId
      ) {
        updateRUserData(custData.responsibleUserId);
      }
    }
  };

  const updateRUserData = (value) => {
    let req = {
      customerId: customerID,
      userId: String(value),
    };
    addEditResponsibleUserForCustomer(req);
  };

  const actionHandler = {
    EDIT: handleEditClick,
    ALLOWFREEZE: handlefreeze,
    ALLOWDISABLE: handleDiseble,
    ALLOWBLOCKED: handleBlock,
    ALLOREJECT: handleReject,
  };

  return (
    <div>
      <div className="row">
        <div
          className="col-xxl-12 col-xl-12 col-md-12 col-12"
          key={shouldRerenderFormCreator}
        >
          <CardSection
            searchInput={true}
            handleChange={handleChange}
            searchInputName="Search By Customer Name, Tax Id , Email Address"
            searchFilter={searchStatusFilter}
            handleChangeDropdown={handleChangeDropdown}
            selectedOptions={selectedDrpvalues}
            optionsValue={statusOptions}
            isMultiSelect={true}
            placeholder="Search by Status"
            isCardSection={true}
            isdropdownOpen={true}
            searchButton={true}
            searchbuttonText="Search"
            buttonClassName="theme-button"
            searchTitleButtonClick={handleSearch}
            clearButton={true}
            clearTitleButtonClick={handleClear}
            clearButtonText="Clear"
            clearButtonClassName="dark-btn"
            searchIconImg={AppIcons.SearchIcone}
            searchTextWithIcon={true}
            clearTextWithIcon={true}
            clearIconImg={AppIcons.ClearIcone}
            handleKeyPress={handleKeyPress}
          >
            <div className="row">
              <div className="col-md-12 table-striped">
                {/* <div className="customer-list"> */}
                <FinalMolGrid
                  ref={molGridRef}
                  configuration={configFile}
                  dataSource={dataSource}
                  isLoading={isListLoading}
                  pagination={{
                    totalCount: totalRowCount,
                    pageSize: 25,
                    currentPage: 1,
                  }}
                  onPageChange={handlePageChange}
                  onSorting={handleSorting}
                  onActionChange={actionHandler}
                  allowPagination={true}
                  onColumnChange={handleGridCheckBoxChange}
                />
                {/* </div> */}
              </div>
            </div>
          </CardSection>

          <CenterModel
            showModal={showModal}
            handleToggleModal={handleToggleModal}
            modalTitle={`${statusFeild} Reason`}
            modelSizeClass="w-50s"
          >
            <div className="row">
              <FormCreator config={formData} ref={reasonRef} {...formData} />
              <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                  <div className="d-flex align-item-end">
                    <Buttons
                      buttonTypeClassName="theme-button"
                      buttonText="Update"
                      isLoading={updateCustomerInActiveStatusCustomerLoading}
                      onClick={handleUpdate}
                    />
                    <Buttons
                      buttonTypeClassName="dark-btn ml-5"
                      buttonText="Cancel"
                      onClick={handleToggleModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CenterModel>
        </div>
      </div>
      <CustomerApproval
        childRef={childRef}
        getListApi={getListApi}
        updateCustomerApproval={updateCustomerApproval}
      />
    </div>
  );
};

CustomersList.propTypes = {
  statusId: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  configFile: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        defaultAction: PropTypes.shape({
          allowActiveCustomer: PropTypes.bool,
          allowBlocked: PropTypes.bool,
          allowEdit: PropTypes.bool,
          allowFreeze: PropTypes.bool,
          allowDisable: PropTypes.bool,
          allowUnblocked: PropTypes.bool,
          allowUnfreeze: PropTypes.bool,
        }),
      })
    ).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  handleChangeDropdown: PropTypes.func.isRequired,
  statusOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    })
  ).isRequired,
  selectedDrpvalues: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.string,
  ]).isRequired,
  searchStatusFilter: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  shouldRerenderFormCreator: PropTypes.any,
};
