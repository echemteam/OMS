import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SwalAlert from '../../../../services/swalService/SwalService';
import { reasonData } from '../../../customerDetail/customers/config/CustomerData';
import SupplierContext from "../../../../utils/ContextAPIs/Supplier/SupplierListContext"
import Buttons from '../../../../components/ui/button/Buttons';
import ToastService from '../../../../services/toastService/ToastService';
import { StatusEnums, StatusFeild } from '../../../../common/features/Enums/StatusEnums';
import CardSection from '../../../../components/ui/card/CardSection';
import MolGrid from '../../../../components/Grid/MolGrid';
import CenterModel from '../../../../components/ui/centerModel/CenterModel';
import FormCreator from '../../../../components/Forms/FormCreator';
import { useGetSuppliersMutation, useUpdateSupplierApproveStatusMutation, useUpdateSupplierInActiveStatusMutation } from '../../../../app/services/supplierAPI';
import { encryptUrlData } from '../../../../services/CryptoService';
import { hasFunctionalPermission } from '../../../../utils/AuthorizeNavigation/authorizeNavigation';
import { securityKey } from '../../../../data/SecurityKey';

const SupplierList = ({ statusId, configFile }) => {
  const navigate = useNavigate();
  const { confirm } = SwalAlert();
  const molGridRef = useRef();
  const reasonRef = useRef();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [dataSource, setDataSource] = useState();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(reasonData);
  const [supplierID, setSupplierId] = useState();
  const [staticId, setStaticId] = useState()
  const [statusFeild, setStatusFeild] = useState()
  const { supplierListRef } = useContext(SupplierContext);

  const [
    getSuppliers,
    { isLoading: isListLoading, isSuccess: isListSuccess, data: isListeData },
  ] = useGetSuppliersMutation();

  const [updateSupplierApproveStatus, { isSuccess: isSuccessUpdateSupplier, data: updateSupplierData }] = useUpdateSupplierApproveStatusMutation();

  const [updateSupplierInActiveStatus, { isLoading: updateInActiveStatusSupplierLoading, isSuccess: isSuccessUpdateSupplierInActiveStatus, data: updateSupplierInActiveStatusData }] = useUpdateSupplierInActiveStatusMutation();

  useEffect(() => {
    const actionColumn = configFile?.columns.find(
      (column) => column.name === "Action"
    );
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
      if (actionColumn.defaultAction.allowActiveCustomer) {
        actionColumn.defaultAction.allowActiveCustomer = hasActive?.hasAccess;
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
  }, [configFile]);

  const handlePageChange = (page) => {
    const request = {
      pagination: {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      },
      filters: { searchText: "" },
      statusId: statusId
    };
    getSuppliers(request);
  };

  useEffect(() => {
    if (isListSuccess && isListeData) {
      if (isListeData) {
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
      filters: { searchText: "" },
      statusId: statusId
    };
    getSuppliers(request);
  };

  const handleEditClick = (data) => {
    navigate(`/SupplierDetails/${encryptUrlData(data.supplierId)}`, "_blank");
  };

  const handleGridCheckBoxChange = (rowData, datafield, rowindex, updatedValue, parentData) => {
    confirm(
      "Warning?",
      "Are you sure you want to approve the supplier?",
      "Yes",
      "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        let req = {
          supplierId: rowData.supplierId
        }
        updateSupplierApproveStatus(req)
      } else {
        getListApi()
      }
    });
  }

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
        statusId: staticId
      }
      updateSupplierInActiveStatus(req)
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
        <div className="col-xxl-12 col-xl-12 col-md-12 col-12">
          <CardSection
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
              modalTitle={statusFeild + " " + "Reason"}
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
      </div>
    </div>
  )
}

export default SupplierList