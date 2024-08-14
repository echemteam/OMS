/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SwalAlert from '../../../../../../services/swalService/SwalService';
import BasicDetailContext from '../../../../../../utils/ContextAPIs/Customer/BasicDetailContext';
import { useSelector } from 'react-redux';
import { hasFunctionalPermission } from '../../../../../../utils/AuthorizeNavigation/authorizeNavigation';
import { securityKey } from '../../../../../../data/SecurityKey';
import CustomerApproval from '../../../../feature/cutomerApproval/CustomerApproval';
import ToastService from '../../../../../../services/toastService/ToastService';
import { AppIcons } from '../../../../../../data/appIcons';
import { StatusEnums } from '../../../../../../utils/Enums/StatusEnums';
import { encryptUrlData } from '../../../../../../services/CryptoService';
import CardSection from '../../../../../../components/ui/card/CardSection';
import CustomerListContext from '../../../../../../utils/ContextAPIs/Customer/CustomerListContext';
import { useGetCustomersMutation, useUpdateCustomerStatusMutation } from '../../../../../../app/services/basicdetailAPI';
import PropTypes from 'prop-types';
import FinalMolGrid from '../../../../../../components/FinalMolGrid/FinalMolGrid';
import { validateResponsibleUserId } from '../../../../../../utils/ResponsibleUser/validateRUser';
import { securityValidator } from '../../../../../../utils/CustomActionSecurity/actionsSecurityValidator';

const InActiveCustomersList = ({ statusId, configFile, handleChange, search, handleSearch, handleClear, shouldRerenderFormCreator, handleChangeDropdown, statusOptions, selectedDrpvalues, selectedStatusOptions, searchStatusFilter }) => {

  const navigate = useNavigate();
  const { confirm } = SwalAlert();
  const childRef = useRef();
  const molGridRef = useRef();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [dataSource, setDataSource] = useState();
  const { DataRef } = useContext(CustomerListContext);
  const authState = useSelector((state) => state.auth);
  const { isResponsibleUser, setIsResponsibleUser } = useContext(BasicDetailContext);

  const [
    getCustomers,
    { isLoading: isListLoading, isSuccess: isListSuccess, data: isListeData },
  ] = useGetCustomersMutation();

  const [updateCustomerStatus, { isLoading: updateCustomerStatusLoading, isSuccess: isSuccessUpdateCustomerStatus, data: updateCustomerStatusData }] = useUpdateCustomerStatusMutation();

  const handlePageChange = (page) => {
    const request = {
      pagination: {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      },
      filters: { searchText: search },
      statusId: Array.isArray(statusId) ? statusId.join(",") : String(statusId)
    };
    getCustomers(request);
  };


  useEffect(() => {
    if (!isResponsibleUser) {
      const actionColumn = configFile?.columns.find(column => column.name === "Action");
      if (actionColumn) {
        const hasFreeze = hasFunctionalPermission(securityKey.FREEZECUSTOMER);
        const hasActive = hasFunctionalPermission(securityKey.ACTIVECUSTOMER);
        const hasUnBlock = hasFunctionalPermission(securityKey.UNBLOCKCUSTOMER);
        const hasUnFreeze = hasFunctionalPermission(securityKey.UNFREEZECUSTOMER);

        // actionColumn.customAction = securityValidator(hasFreeze?.hasAccess, actionColumn.customAction, "ALLOWFREEZE");
        // actionColumn.customAction = securityValidator(hasUnBlock?.hasAccess, actionColumn.customAction, "ALLOWUNBLOCKED");

        if (actionColumn.defaultAction.allowActiveCustomer) {
          actionColumn.defaultAction.allowActiveCustomer = hasActive?.hasAccess;
        } else if (actionColumn.defaultAction.allowUnblocked) {
          actionColumn.defaultAction.allowUnblocked = hasUnBlock?.hasAccess;
        } else if (actionColumn.defaultAction.allowUnfreeze) {
          actionColumn.defaultAction.allowUnfreeze = hasUnFreeze?.hasAccess;
        }
      }
    }
  }, [configFile]);

  const hasResponsibleUserhasAccess = () => {
    const actionColumn = configFile?.columns.find((column) => column.name === "Action");
    if (actionColumn) {
      if (actionColumn.defaultAction.hasOwnProperty('allowActiveCustomer')) {
        actionColumn.defaultAction.allowActiveCustomer = true;
      }
      if (actionColumn.defaultAction.hasOwnProperty("allowUnblocked")) {
        actionColumn.defaultAction.allowUnblocked = true;
      }
      if (actionColumn.defaultAction.hasOwnProperty('allowUnfreeze')) {
        actionColumn.defaultAction.allowUnfreeze = true;
      }
    }
  }

  useEffect(() => {
    if (isListSuccess && isListeData) {
      if (isListeData) {
        setDataSource(isListeData.dataSource);
        const isResponsibleId = isListeData.dataSource.find(data => validateResponsibleUserId(data.responsibleUserId, authState?.user?.userID));
        if (isResponsibleId) {
          setIsResponsibleUser(true);
          hasResponsibleUserhasAccess();
        } else {
          setIsResponsibleUser(false);
        }
      }
      if (isListeData.totalRecord) {
        setTotalRowCount(isListeData.totalRecord);
      }
    }
  }, [isListSuccess, isListeData]);

  useEffect(() => {
    if (isSuccessUpdateCustomerStatus && updateCustomerStatusData) {
      ToastService.success(updateCustomerStatusData.errorMessage);
      getListApi()
    }
  }, [isSuccessUpdateCustomerStatus, updateCustomerStatusData]);

  useImperativeHandle(DataRef, () => ({
    getListApi,
  }));

  const getListApi = () => {
    const currentPageObject = molGridRef.current.getCurrentPageObject();
    const request = {
      pagination: {
        pageNumber: currentPageObject.pageNumber,
        pageSize: currentPageObject.pageSize,
      },
      filters: { searchText: search },
      statusId: selectedDrpvalues.length === 0 ? (Array.isArray(statusId) ? statusId.join(",") : String(statusId)) : (Array.isArray(selectedDrpvalues) ? selectedDrpvalues.join(",") : String(selectedDrpvalues))
    };
    getCustomers(request);
  };


  const handleUnfreeze = (data) => {

    confirm(
      "Warning?",
      `Are you sure you want to unfreeze and change the status to approved?`,
      "Yes",
      "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        handleUpdate(data)
      }
    });
  }

  const handleActiveCustomer = (data) => {
    handleUpdate(data)
  }

  const handleUnBlock = (data) => {

    confirm(
      "Warning?",
      `Are you sure you want to unblock and change the status to approved?`,
      "Yes",
      "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        handleUpdate(data)
      }
    });
  }

  const handleUpdate = (data) => {
    let req = {
      customerId: data.customerId,
      statusId: StatusEnums.Approved
    }
    updateCustomerStatus(req)
  }

  const handleEditClick = (data) => {
    navigate(`/CustomerDetails/${encryptUrlData(data.customerId)}`, "_blank");
  };

  const actionHandler = {
    ALLOWUNFREEZE: handleUnfreeze,
    ACTIVECUSTOMER: handleActiveCustomer,
    ALLOWUNBLOCKED: handleUnBlock,
    EDIT: handleEditClick,
  };

  return (
    <div>
      <div className="row">
        <div className="col-xxl-12 col-xl-12 col-md-12 col-12" key={shouldRerenderFormCreator}>
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
          >
            <div className="row">
              <div className="col-md-12 table-striped last-center">
                <div className='inactive-scroll-bar'>
                  <FinalMolGrid
                    ref={molGridRef}
                    configuration={configFile}
                    dataSource={dataSource}
                    isLoading={isListLoading || updateCustomerStatusLoading}
                    allowPagination={true}
                    pagination={{
                      totalCount: totalRowCount,
                      pageSize: 25,
                      currentPage: 1,
                    }}
                    onPageChange={handlePageChange}
                    onActionChange={actionHandler}
                  />
                </div>
              </div>
            </div>
          </CardSection>
        </div>
      </div>
      <CustomerApproval childRef={childRef} getListApi={getListApi} updateCustomerApproval={handleUpdate} />
    </div>
  )
}

InActiveCustomersList.propTypes = {
  statusId: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]).isRequired,
  configFile: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  shouldRerenderFormCreator: PropTypes.bool.isRequired,
  handleChangeDropdown: PropTypes.func.isRequired,
  statusOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedDrpvalues: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.string
  ]).isRequired,
  selectedStatusOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.string
  ]).isRequired,
  searchStatusFilter: PropTypes.bool.isRequired,
};

export default InActiveCustomersList