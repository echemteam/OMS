import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import CardSection from '../../../../components/ui/card/CardSection';
import MolGrid from '../../../../components/Grid/MolGrid';
import CustomerListContext from '../../../../utils/ContextAPIs/Customer/CustomerListContext';
import { useGetCustomersMutation, useUpdateCustomerStatusMutation } from '../../../../app/services/basicdetailAPI';
import ToastService from '../../../../services/toastService/ToastService';
import { StatusEnums } from '../../../../common/features/Enums/StatusEnums';

export const InActiveCustomers = ({ statusId, configFile }) => {

  const molGridRef = useRef();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [dataSource, setDataSource] = useState();
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

  const handleUnfreeze = (data) => {
    handleUpdate(data)
  }

  const handleActiveCustomer = (data) => {
    handleUpdate(data)
  }

  const handleUnBlock = (data) => {
    handleUpdate(data)
  }

  const handleUpdate = (data) => {
    let req = {
      customerId: data.customerId,
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
                <MolGrid
                  ref={molGridRef}
                  configuration={configFile}
                  dataSource={dataSource}
                  isLoading={isListLoading || updateCustomerStatusLoading}
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
          </CardSection>
        </div>
      </div>
    </div>
  )
}