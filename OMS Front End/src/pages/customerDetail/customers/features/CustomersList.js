import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import CardSection from '../../../../components/ui/card/CardSection'
import MolGrid from '../../../../components/Grid/MolGrid';
import { useGetCustomersMutation, useUpdateCustomerApproveStatusMutation } from '../../../../app/services/basicdetailAPI';
import CustomerContext from "../../../../utils/ContextAPIs/Customer/CustomerListContext"
import { useNavigate } from 'react-router-dom';
import { encryptUrlData } from '../../../../services/CryptoService';
import ToastService from '../../../../services/toastService/ToastService';

export const CustomersList = ({ statusId, configFile }) => {
  const navigate = useNavigate();
  const molGridRef = useRef();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [dataSource, setDataSource] = useState();
  const { listRef } = useContext(CustomerContext);

  const [
    getCustomers,
    { isLoading: isListLoading, isSuccess: isListSuccess, data: isListeData },
  ] = useGetCustomersMutation();

  const [updateCustomerApproveStatus, { isLoading: updateCustomerLoading, isSuccess: isSuccessUpdateCustomer, data: updateCustomerData }] = useUpdateCustomerApproveStatusMutation();

  const handlePageChange = (page) => {
    const request = {
      pagination: {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      },
      filters: { searchText: "" },
      statusId: statusId
    };
    getCustomers(request);
  };

  useEffect(() => {
    if (isListSuccess && isListeData) {
      console.log("li", isListeData)
      if (isListeData) {
        setDataSource(isListeData.dataSource);
      }
      if (isListeData.totalRecord) {
        setTotalRowCount(isListeData.totalRecord);
      }
    }
  }, [isListSuccess, isListeData]);

  useEffect(() => {
    if (isSuccessUpdateCustomer && updateCustomerData) {
      ToastService.success(updateCustomerData.errorMessage);
      getListApi()
    }
  }, [isSuccessUpdateCustomer, updateCustomerData]);

  useImperativeHandle(listRef, () => ({
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
    getCustomers(request);
  };

  const handleEditClick = (data) => {
    navigate(`/viewCustomer/${encryptUrlData(data.customerId)}`, "_blank");
  };

  const handleGridCheckBoxChange = (rowData, datafield, rowindex, updatedValue, parentData) => {
    let req = {
      customerId: rowData.customerId
    }
    updateCustomerApproveStatus(req)
  }

  const actionHandler = {
    EDIT: handleEditClick,
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
                  isLoading={isListLoading}
                  pagination={{
                    totalCount: totalRowCount,
                    pageSize: 25,
                    currentPage: 1,
                  }}
                  onPageChange={handlePageChange}
                  onActionChange={actionHandler}
                  onCellDataChange={handleGridCheckBoxChange}
                />
              </div>
            </div>
          </CardSection>
        </div>
      </div>
    </div>
  )
}
