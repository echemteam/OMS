/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import MolGrid from "../../../../../components/Grid/MolGrid";
import { SubCustomerGridConfig } from "../config/SubCustomer.data";
import { useState } from "react";
import { useDeleteSubCompanyMutation, useGetSubCompanysByMainCompanyIdMutation } from "../../../../../app/services/customerSubCustomerAPI";
import { useEffect } from "react";
import ToastService from "../../../../../services/toastService/ToastService";
import SwalAlert from "../../../../../services/swalService/SwalService";
import { useImperativeHandle } from "react";

const SubCustomerList = (props) => {
  const molGridRef = useRef();
  const [listData, setListData] = useState();
  const [totalRowCount, setTotalRowCount] = useState(0);
  const { confirm } = SwalAlert();
  const [getSubCompanysByMainCompanyId,{ isLoading: isGetSubCompanysByMainCompanyIdLoading, isSuccess: isGetSubCompanysByMainCompanyIdSuccess, data: isGetSubCompanysByMainCompanyIdData },] = useGetSubCompanysByMainCompanyIdMutation();
  const [deleteSubCompany,{  isSuccess: isDeleteSubCompanySuccess, data: isDeleteSubCompanyData }, ] = useDeleteSubCompanyMutation();
 const getLists = (pageObject,sortingString) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: "" },
      sortString: sortingString,
      mainCompanyId: props.customerId,
    };
    getSubCompanysByMainCompanyId(request);
  };

  const handlePageChange = (page) => {
    getLists(page,molGridRef.current.generateSortingString());
  };
  const handleSorting = (shortString) => {
    getLists(molGridRef.current.getCurrentPageObject(), shortString);
  }
  const onGetData = () =>{

    if (molGridRef.current) {
      const defaultPageObject = molGridRef.current.getCurrentPageObject();
      getLists(defaultPageObject,molGridRef.current.generateSortingString());
    }
  }

  useEffect(() => {
    if (isDeleteSubCompanySuccess && isDeleteSubCompanyData) {
      ToastService.success(isDeleteSubCompanyData.errorMessage);
       const currentPageObject = molGridRef.current.getCurrentPageObject();
      handlePageChange(currentPageObject)
    }
  }, [isDeleteSubCompanySuccess, isDeleteSubCompanyData]);

  const handleDeleteClick = (data) => {

    confirm( "Delete?", "Are you sure you want to Delete?", "Delete",  "Cancel" )
       .then((confirmed) => {
         if (confirmed) {
            deleteSubCompany(data.subCompanyMainCompanyId);
         }
       });
     };

  useEffect(() => {
    onGetData()
  }, []);

  useEffect(() => {
    if (isGetSubCompanysByMainCompanyIdSuccess && isGetSubCompanysByMainCompanyIdData) {
  
      if (isGetSubCompanysByMainCompanyIdData) {
        setListData(isGetSubCompanysByMainCompanyIdData.dataSource);  
      }
      if (isGetSubCompanysByMainCompanyIdData.totalRecord) {
        setTotalRowCount(isGetSubCompanysByMainCompanyIdData.totalRecord);
      }
    }
  }, [isGetSubCompanysByMainCompanyIdSuccess, isGetSubCompanysByMainCompanyIdData]);
 
  const actionHandler = {
    DELETE: handleDeleteClick,    
  };

  useImperativeHandle(props.childRef, () => ({
    callChildFunction: onGetData
}));
  return (
    <>
      <div className="row">
        <div className="col-md-12 table-striped p-3">
          <MolGrid
            ref={molGridRef}
            configuration={SubCustomerGridConfig}
            dataSource={listData}
            allowPagination={true}
            pagination={{
              totalCount: totalRowCount,
              pageSize: 20,
              currentPage: 1,
            }}
            onPageChange={handlePageChange}
             onSorting={handleSorting}
             isLoading={isGetSubCompanysByMainCompanyIdLoading}
             onActionChange={actionHandler}
          />
        </div>
      </div>
    </>
  );
};
export default SubCustomerList;
