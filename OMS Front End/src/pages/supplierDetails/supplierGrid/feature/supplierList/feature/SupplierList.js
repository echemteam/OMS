/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
//** Lib's */
import { AppIcons } from '../../../../../../data/appIcons';
import MolGrid from '../../../../../../components/Grid/MolGrid';
import { OwnerType } from '../../../../../../utils/Enums/commonEnums';
import { securityKey } from '../../../../../../data/SecurityKey';
import Buttons from '../../../../../../components/ui/button/Buttons';
import FormCreator from '../../../../../../components/Forms/FormCreator';
import CardSection from '../../../../../../components/ui/card/CardSection';
import CenterModel from '../../../../../../components/ui/centerModel/CenterModel';
import { StatusEnums, StatusFeild } from '../../../../../../utils/Enums/StatusEnums';
import SupplierContext from "../../../../../../utils/ContextAPIs/Supplier/SupplierListContext";
import AddSupplierContext from "../../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { removeFormFields } from '../../../../../../utils/FormFields/RemoveFields/handleRemoveFields';
import { hasFunctionalPermission } from '../../../../../../utils/AuthorizeNavigation/authorizeNavigation';
//** Service's */
import { encryptUrlData } from '../../../../../../services/CryptoService';
import ToastService from '../../../../../../services/toastService/ToastService';
import { useUpdateResponsibleUserMutation } from '../../../../../../app/services/commonAPI';
import { useAddSupplierNotesMutation } from '../../../../../../app/services/supplierNotesAPI';
import { useGetSuppliersMutation, useUpdateSupplierApproveStatusMutation, useUpdateSupplierInActiveStatusMutation } from '../../../../../../app/services/supplierAPI';
import { reasonData } from '../../../../../../common/features/component/CustomerSupplierReason/Reason.data';

//** Component's */
const SupplierApproval = React.lazy(() => import("../../../../feature/supplierApproval/SupplierApproval"));


const SupplierList = ({ statusId, configFile, handleChange, search, handleChangeDropdown, statusOptions, selectedDrpvalues, searchStatusFilter, handleSearch, handleClear, shouldRerenderFormCreator }) => {

  const childRef = useRef();
  const reasonRef = useRef();
  const molGridRef = useRef();
  const navigate = useNavigate();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [dataSource, setDataSource] = useState();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(reasonData);
  const [supplierID, setSupplierId] = useState();
  const [staticId, setStaticId] = useState()
  const [statusFeild, setStatusFeild] = useState()
  const authState = useSelector((state) => state.auth);
  const { supplierListRef } = useContext(SupplierContext);
  const [assignRUser, setAssignRUser] = useState();
  const { isResponsibleUser, setIsResponsibleUser } = useContext(AddSupplierContext);

  const [getSuppliers, { isLoading: isListLoading, isSuccess: isListSuccess, data: isListeData }] = useGetSuppliersMutation();
  const [updateSupplierApproveStatus, { isSuccess: isSuccessUpdateSupplier, data: updateSupplierData }] = useUpdateSupplierApproveStatusMutation();
  const [updateSupplierInActiveStatus, { isLoading: updateInActiveStatusSupplierLoading, isSuccess: isSuccessUpdateSupplierInActiveStatus, data: updateSupplierInActiveStatusData }] = useUpdateSupplierInActiveStatusMutation();

  const [addSupplierNotes] = useAddSupplierNotesMutation();
  const [updateResponsibleUser] = useUpdateResponsibleUserMutation();

  useEffect(() => {
    const actionColumn = configFile?.columns.find((column) => column.name === "Action");
    const approvalAction = configFile?.columns.find((column) => column.name === "Approve");
    if (actionColumn) {
      const hasEdit = hasFunctionalPermission(securityKey.EDITSUPPLIER);
      const hasBlock = hasFunctionalPermission(securityKey.BLOCKSUPPLIER);
      const hasFreeze = hasFunctionalPermission(securityKey.FREEZESUPPLIER);
      const hasActive = hasFunctionalPermission(securityKey.ACTIVESUPPLIER);
      const hasDisable = hasFunctionalPermission(securityKey.DISABLESUPPLIER);
      const hasUnBlock = hasFunctionalPermission(securityKey.UNBLOCKSUPPLIER);
      const hasUnFreeze = hasFunctionalPermission(securityKey.UNFREEZESUPPLIER);

      if (actionColumn.defaultAction.allowEdit) {
        actionColumn.defaultAction.allowEdit = hasEdit?.hasAccess;
      }
      if (actionColumn.defaultAction.allowBlocked) {
        actionColumn.defaultAction.allowBlocked = hasBlock?.hasAccess;
      }
      if (actionColumn.defaultAction.allowFreeze) {
        actionColumn.defaultAction.allowFreeze = hasFreeze?.hasAccess;
      }
      if (actionColumn.defaultAction.allowActiveSupplier) {
        actionColumn.defaultAction.allowActiveSupplier = hasActive?.hasAccess;
      }
      if (actionColumn.defaultAction.allowDisable) {
        actionColumn.defaultAction.allowDisable = hasDisable?.hasAccess;
      }
      if (actionColumn.defaultAction.allowUnblocked) {
        actionColumn.defaultAction.allowUnblocked = hasUnBlock?.hasAccess;
      }
      if (actionColumn.defaultAction.allowUnfreeze) {
        actionColumn.defaultAction.allowUnfreeze = hasUnFreeze?.hasAccess;
      }
      if (approvalAction) {
        if (approvalAction.colSettings.allowCheckbox) {
          approvalAction.colSettings.allowCheckbox = true;
        }
      }
    }
    if (isResponsibleUser) {
      if (approvalAction) {
        if (approvalAction.colSettings.allowCheckbox) {
          approvalAction.colSettings.allowCheckbox = true;
        }
      }
    }
  }, [configFile]);

  const hasResponsibleUserhasAccess = () => {
    const actionColumn = configFile?.columns.find((column) => column.name === "Action");
    if (actionColumn) {
      if (actionColumn.defaultAction.hasOwnProperty('allowEdit')) {
        actionColumn.defaultAction.allowEdit = true;
      }
      if (actionColumn.defaultAction.hasOwnProperty("allowBlocked")) {
        actionColumn.defaultAction.allowBlocked = true;
      }
      if (actionColumn.defaultAction.hasOwnProperty('allowFreeze')) {
        actionColumn.defaultAction.allowFreeze = true;
      }
      if (actionColumn.defaultAction.hasOwnProperty('allowActiveSupplier')) {
        actionColumn.defaultAction.allowActiveSupplier = true;
      }
      if (actionColumn.defaultAction.hasOwnProperty('allowDisable')) {
        actionColumn.defaultAction.allowDisable = true;
      }
      if (actionColumn.defaultAction.hasOwnProperty('allowUnblocked')) {
        actionColumn.defaultAction.allowUnblocked = true;
      }
      if (actionColumn.defaultAction.hasOwnProperty('allowUnblocked')) {
        actionColumn.defaultAction.allowUnblocked = true;
      }
    }
  }

  const handlePageChange = (page, sortingString) => {
    const sortingStringObject = sortingString || molGridRef.current.generateSortingString();
    const request = {
      pagination: {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      },
      filters: { searchText: search },
      statusId: Array.isArray(statusId) ? statusId.join(",") : String(statusId),
      sortString: sortingStringObject
    };
    getSuppliers(request);
  };

  useEffect(() => {
    if (isListSuccess && isListeData) {
      if (isListeData) {
        const isResponsibleId = isListeData.dataSource.find(data => data.responsibleUserId === authState?.user?.userID);
        if (isResponsibleId) {
          setIsResponsibleUser(true);
          hasResponsibleUserhasAccess();
        } else {
          setIsResponsibleUser(false);
        }
        const modifyCustomerData = isListeData.dataSource.map(data => ({
          ...data,
          taxId: data.taxId === '' ? '-' : data.taxId
        }));
        setDataSource(modifyCustomerData);
      }
      if (isListeData.totalRecord) {
        setTotalRowCount(isListeData.totalRecord);
      }
    }
  }, [isListSuccess, isListeData]);

  useEffect(() => {
    if (isSuccessUpdateSupplier && updateSupplierData) {
      ToastService.success(updateSupplierData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getListApi(currentPageObject, molGridRef.current.generateSortingString())
    }
  }, [isSuccessUpdateSupplier, updateSupplierData]);


  useEffect(() => {
    if (isSuccessUpdateSupplierInActiveStatus && updateSupplierInActiveStatusData) {
      ToastService.success(updateSupplierInActiveStatusData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getListApi(currentPageObject, molGridRef.current.generateSortingString())
      handleToggleModal()
    }
  }, [isSuccessUpdateSupplierInActiveStatus, updateSupplierInActiveStatusData]);

  useImperativeHandle(supplierListRef, () => ({
    getListApi,
  }));

  const getListApi = (pageObject, sortingString) => {
    const currentPageObject = pageObject || molGridRef.current.getCurrentPageObject();
    const sortingStringObject = sortingString || molGridRef.current.generateSortingString();
    const request = {
      pagination: {
        pageNumber: currentPageObject.pageNumber,
        pageSize: currentPageObject.pageSize,
      },
      filters: { searchText: search },
      statusId: Array.isArray(statusId) ? statusId.join(",") : String(statusId),
      sortString: sortingStringObject,
    };
    getSuppliers(request);
  };


  const handleSorting = (shortString) => {
    getListApi(molGridRef.current.getCurrentPageObject(), shortString);
  }

  const handleEditClick = (data) => {
    navigate(`/SupplierDetails/${encryptUrlData(data.supplierId)}`, "_blank");
  };

  const handleGridCheckBoxChange = (rowData) => {
    if (childRef.current) {
      childRef.current.callChildFunction(rowData.supplierId);
    }
    setSupplierId(rowData.supplierId);
  }

  const updateSupplierApprovel = () => {
    let req = {
      supplierId: supplierID
    };
    updateSupplierApproveStatus(req);
  };

  const handleToggleModal = () => {
    setShowModal(false);
    onReset()
  };

  const removeFields = () => {
    const modifyFormFields = removeFormFields(formData, ['responsibleUserId']);
    setFormData(modifyFormFields);
  }

  const handlefreeze = (data) => {
    removeFields();
    setShowModal(true);
    setSupplierId(data.supplierId)
    setStaticId(StatusEnums.Freeze)
    setStatusFeild(StatusFeild.Freeze)
  }

  const handleDiseble = (data) => {
    removeFields();
    setShowModal(true);
    setSupplierId(data.supplierId)
    setStaticId(StatusEnums.Disable)
    setStatusFeild(StatusFeild.Disable)
  }

  const handleBlock = (data) => {
    removeFields();
    setShowModal(true);
    setSupplierId(data.supplierId)
    setStaticId(StatusEnums.Block)
    setStatusFeild(StatusFeild.Block)
  }
  const handleReject = (data) => {
    const supllierData = dataSource.find(item => item.supplierId === data.supplierId);
    setShowModal(true);
    setAssignRUser(false);
    setSupplierId(data.supplierId)
    setStaticId(StatusEnums.Reject)
    setStatusFeild(StatusFeild.Reject);
    if (supllierData.responsibleUserId) {
      removeFields();
      setAssignRUser(true);
    }
  }

  const onReset = () => {
    let restData = { ...reasonData };
    restData.initialState = { ...formData };
    setFormData(restData);
  }

  const handleUpdate = () => {
    let custData = reasonRef.current.getFormData();
    if (custData) {
      let req = {
        ...custData,
        supplierId: supplierID,
        statusId: staticId,
        note: custData.inActiveReason,
      }
      updateSupplierInActiveStatus(req)
      addSupplierNotes(req);
      if (!assignRUser && custData.responsibleUserId && custData.responsibleUserId.value) {
        updateRUserData(custData.responsibleUserId.value);
      }
    }
  }

  const updateRUserData = (value) => {
    let req = {
      ownerId: supplierID,
      OwnerType: OwnerType.Supplier,
      responsibleUserId: value
    }
    updateResponsibleUser(req);
  }

  const actionHandler = {
    EDIT: handleEditClick,
    FREEZE: handlefreeze,
    DISABLE: handleDiseble,
    BLOCKED: handleBlock,
    REJECT: handleReject,
  };

  return (
    <div>
      <div className="row">
        <div className="col-xxl-12 col-xl-12 col-md-12 col-12" key={shouldRerenderFormCreator}>
          <CardSection
            searchInput={true}
            handleChange={handleChange}
            searchInputName="Search By Supplier Name, Tax Id , Email Address"
            searchFilter={searchStatusFilter }
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
              <div className="col-md-12 table-striped">
                {/* <div className='customer-list'> */}
                <MolGrid
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
                  onCellDataChange={handleGridCheckBoxChange}
                />
                {/* </div>/ */}
              </div>
            </div>
          </CardSection>
          {showModal && (
            <CenterModel
              showModal={showModal}
              handleToggleModal={handleToggleModal}
              modalTitle={`${statusFeild + " "}Reason`}
              modelSizeClass="w-50s"
            >
              <div className="row horizontal-form">
                <FormCreator
                  config={formData}
                  ref={reasonRef}
                  {...formData}

                />
                <div className="col-md-12 mt-2">
                  <div className="d-flex align-item-end justify-content-end">
                    <div className="d-flex align-item-end">
                      <Buttons
                        buttonTypeClassName="theme-button"
                        buttonText="Update"
                        isLoading={updateInActiveStatusSupplierLoading}
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
          )}
        </div>
        <SupplierApproval childRef={childRef} getListApi={getListApi} updateApproval={updateSupplierApprovel} />
      </div>
    </div>
  )
}

SupplierList.propTypes = {
  statusId: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]).isRequired,
  configFile: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  handleChangeDropdown: PropTypes.func.isRequired,
  statusOptions: PropTypes.array.isRequired,
  selectedDrpvalues: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.string
  ]).isRequired,
  searchStatusFilter: PropTypes.bool,
  handleSearch: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  shouldRerenderFormCreator: PropTypes.bool.isRequired,
};

export default SupplierList