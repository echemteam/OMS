/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { reasonData } from '../../../customerDetail/customers/config/CustomerData';
import SupplierContext from "../../../../utils/ContextAPIs/Supplier/SupplierListContext"
import Buttons from '../../../../components/ui/button/Buttons';
import ToastService from '../../../../services/toastService/ToastService';
import CardSection from '../../../../components/ui/card/CardSection';
import MolGrid from '../../../../components/Grid/MolGrid';
import CenterModel from '../../../../components/ui/centerModel/CenterModel';
import FormCreator from '../../../../components/Forms/FormCreator';
import { useGetSuppliersMutation, useUpdateSupplierApproveStatusMutation, useUpdateSupplierInActiveStatusMutation } from '../../../../app/services/supplierAPI';
import { encryptUrlData } from '../../../../services/CryptoService';
import { hasFunctionalPermission } from '../../../../utils/AuthorizeNavigation/authorizeNavigation';
import { securityKey } from '../../../../data/SecurityKey';
import SupplierApproval from './supplierApproval/SupplierApproval';
import { useAddSupplierNotesMutation } from '../../../../app/services/supplierNotesAPI';
import AddSupplierContext from "../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { useSelector } from 'react-redux';
import { StatusEnums, StatusFeild } from '../../../../utils/Enums/StatusEnums';

const SupplierList = ({ statusId, configFile, handleChange, search, handleChangeDropdown, statusOptions, selectedDrpvalues, selectedStatusOptions, searchStatusFilter , handleSearch , handleClear , shouldRerenderFormCreator}) => {

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
  const { isResponsibleUser, setIsResponsibleUser } = useContext(AddSupplierContext);

  const [
    getSuppliers,
    { isLoading: isListLoading, isSuccess: isListSuccess, data: isListeData },
  ] = useGetSuppliersMutation();

  const [updateSupplierApproveStatus, { isSuccess: isSuccessUpdateSupplier, data: updateSupplierData }] = useUpdateSupplierApproveStatusMutation();

  const [updateSupplierInActiveStatus, { isLoading: updateInActiveStatusSupplierLoading, isSuccess: isSuccessUpdateSupplierInActiveStatus, data: updateSupplierInActiveStatusData }] = useUpdateSupplierInActiveStatusMutation();

  const [addSupplierNotes] = useAddSupplierNotesMutation();

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

  const handlePageChange = (page) => {
    const request = {
      pagination: {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      },
      filters: { searchText: search },
      statusId: Array.isArray(statusId) ? statusId.join(",") : String(statusId),
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
        setDataSource(isListeData.dataSource);
      }
      if (isListeData.totalRecord) {
        setTotalRowCount(isListeData.totalRecord);
      }
    }
  }, [isListSuccess, isListeData]);

  useEffect(() => {
    if (isSuccessUpdateSupplier && updateSupplierData) {
      ToastService.success(updateSupplierData.errorMessage);
      getListApi()
    }
  }, [isSuccessUpdateSupplier, updateSupplierData]);

  // useEffect(() => {
  //   if (molGridRef.current) {
  //     const currentPageObject = molGridRef.current.getCurrentPageObject();
  //     getListApi(currentPageObject);
  //   }
  // }, [search, selectedStatusOptions]);

  useEffect(() => {
    if (isSuccessUpdateSupplierInActiveStatus && updateSupplierInActiveStatusData) {
      ToastService.success(updateSupplierInActiveStatusData.errorMessage);
      getListApi()
      handleToggleModal()
    }
  }, [isSuccessUpdateSupplierInActiveStatus, updateSupplierInActiveStatusData]);

  useImperativeHandle(supplierListRef, () => ({
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
      statusId: Array.isArray(statusId) ? statusId.join(",") : String(statusId),
    };
    getSuppliers(request);
  };

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

  const handlefreeze = (data) => {
    setShowModal(true);
    setSupplierId(data.supplierId)
    setStaticId(StatusEnums.Freeze)
    setStatusFeild(StatusFeild.Freeze)
  }

  const handleDiseble = (data) => {
    setShowModal(true);
    setSupplierId(data.supplierId)
    setStaticId(StatusEnums.Disable)
    setStatusFeild(StatusFeild.Disable)
  }

  const handleBlock = (data) => {
    setShowModal(true);
    setSupplierId(data.supplierId)
    setStaticId(StatusEnums.Block)
    setStatusFeild(StatusFeild.Block)
  }
  const handleReject = (data) => {
    setShowModal(true);
    setSupplierId(data.supplierId)
    setStaticId(StatusEnums.Reject)
    setStatusFeild(StatusFeild.Reject)
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
    }
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
            searchFilter={searchStatusFilter ? true : false}
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

export default SupplierList