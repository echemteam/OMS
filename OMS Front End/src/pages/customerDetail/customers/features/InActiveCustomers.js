import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import CardSection from '../../../../components/ui/card/CardSection';
import MolGrid from '../../../../components/Grid/MolGrid';
import CustomerListContext from '../../../../utils/ContextAPIs/Customer/CustomerListContext';
import { useGetCustomersMutation, useUpdateCustomerStatusMutation } from '../../../../app/services/basicdetailAPI';
import ToastService from '../../../../services/toastService/ToastService';
import { StatusEnums } from '../../../../common/features/Enums/StatusEnums';
import { securityKey } from '../../../../data/SecurityKey';
import { hasFunctionalPermission } from '../../../../utils/AuthorizeNavigation/authorizeNavigation';
import CustomerApproval from '../../features/cutomerApproval/CustomerApproval';

export const InActiveCustomers = ({ statusId, configFile }) => {

  const childRef = useRef();
  const molGridRef = useRef();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [dataSource, setDataSource] = useState();
  const [customerId, setCustomerId] = useState();
  const { DataRef } = useContext(CustomerListContext);

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
      filters: { searchText: "" },
      statusId: Array.isArray(statusId) ? statusId.join(",") : statusId
    };
    getCustomers(request);
  };


  useEffect(() => {
    const actionColumn = configFile?.columns.find(column => column.name === "Action");
    if (actionColumn) {

      const hasActive = hasFunctionalPermission(securityKey.ACTIVECUSTOMER);
      const hasUnBlock = hasFunctionalPermission(securityKey.UNBLOCKCUSTOMER);
      const hasUnFreeze = hasFunctionalPermission(securityKey.UNFREEZECUSTOMER);

      if (actionColumn.defaultAction.allowActiveCustomer) {
        actionColumn.defaultAction.allowActiveCustomer = hasActive?.hasAccess;
      } else if (actionColumn.defaultAction.allowUnblocked) {
        actionColumn.defaultAction.allowUnblocked = hasUnBlock?.hasAccess;
      } else if (actionColumn.defaultAction.allowUnfreeze) {
        actionColumn.defaultAction.allowUnfreeze = hasUnFreeze?.hasAccess;
      }
    }
  }, [configFile]);


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
      filters: { searchText: "" },
      statusId: Array.isArray(statusId) ? statusId.join(",") : statusId
    };
    getCustomers(request);
  };

  const approvalCheckList = (data) => {
    if (childRef.current) {
      childRef.current.callChildFunction(data.customerId);
    }
    setCustomerId(data.customerId);
  }

  const handleUnfreeze = (data) => {
    approvalCheckList(data);
  }

  const handleActiveCustomer = (data) => {
    handleUpdate(data)
  }

  const handleUnBlock = (data) => {
    approvalCheckList(data);
  }

  const handleUpdate = () => {
    let req = {
      customerId: customerId,
      statusId: StatusEnums.Approved
    }
    updateCustomerStatus(req)
  }

  const actionHandler = {
    UNFREEZE: handleUnfreeze,
    ACTIVECUSTOMER: handleActiveCustomer,
    UNBLOCKED: handleUnBlock
  };

  return (
    <div>
      <div className="row">
        <div className="col-xxl-12 col-xl-12 col-md-12 col-12">
          <CardSection
          >
            <div className="row">
              <div className="col-md-12 table-striped">
                <div className='inactive-scroll-bar'>
                  <MolGrid
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