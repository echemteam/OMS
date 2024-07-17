import { useRef } from "react";
import MolGrid from "../../../../components/Grid/MolGrid";
import { ApiParameterGridConfig } from "../config/ApiParameter.data";
import { useState } from "react";
import { useEffect } from "react";
import SwalAlert from "../../../../services/swalService/SwalService";
import { useDeleteApiParameterMutation, useGetApiParametersMutation } from "../../../../app/services/apiParametersAPI";
import ToastService from "../../../../services/toastService/ToastService";
import { useImperativeHandle } from "react";

const ApiParametersList=({handleEditClick,childRef})=>{
    const molGridRef = useRef();
    const [listData, setListData] = useState();
    const [totalRowCount, setTotalRowCount] = useState(0);
    const { confirm } = SwalAlert();
   
    const [getApiParameters,{ isLoading: isGetApiParametersLoading, isSuccess: isGetApiParametersSuccess, data: isGetApiParameterseData },] = useGetApiParametersMutation();
    const [deleteApiParameter,{  isSuccess: isDeleteApiParameterSuccess, data: isDeleteApiParametereData },] = useDeleteApiParameterMutation();

    useEffect(() => {
      if (isDeleteApiParameterSuccess && isDeleteApiParametereData) {
        ToastService.success(isDeleteApiParametereData.errorMessage);
        const currentPageObject = molGridRef.current.getCurrentPageObject();
        getLists(currentPageObject,molGridRef.current.generateSortingString());
      }
    }, [isDeleteApiParameterSuccess, isDeleteApiParametereData]);

    const getLists = (pageObject,sortingString) => {
      const request = {
        pagination: {
          pageNumber: pageObject.pageNumber,
          pageSize: pageObject.pageSize,
        },
        filters: { searchText: "" },
        sortString: sortingString
      };
      getApiParameters(request);
    };

    const handlePageChange = (page) => {
      getLists(page);
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
        onGetData()
      }, []);
  
    useEffect(() => {
      if (isGetApiParametersSuccess && isGetApiParameterseData) {
        if (isGetApiParameterseData) {
          setListData(isGetApiParameterseData.dataSource);  
        }
        if (isGetApiParameterseData.totalRecord) {
          setTotalRowCount(isGetApiParameterseData.totalRecord);
        }
      }
    }, [isGetApiParametersSuccess, isGetApiParameterseData]);
 
     
  const handleDeleteClick = (data) => {
    confirm("Delete?", "Are you sure you want to Delete?", "Delete", "Cancel"
     ).then((confirmed) => {
      if (confirmed) {
        deleteApiParameter(data.parameterId);
      }
    });
  };
      const actionHandler = {
        EDIT: handleEditClick,
        DELETE: handleDeleteClick,    
      };

      useImperativeHandle(childRef, () => ({
        callChildFunction: onGetData
    }));
 return(<>
  <div className="row">
          <div className="col-md-12 table-striped">
            <MolGrid
              ref={molGridRef}
            configuration={ApiParameterGridConfig}
              dataSource={listData}
              allowPagination={true}
              pagination={{
               totalCount: totalRowCount,
                pageSize: 20,
                currentPage: 1,
              }}
              onPageChange={handlePageChange}
              onSorting={handleSorting}
              isLoading={isGetApiParametersLoading}
              onActionChange={actionHandler}
            />
          </div>
        </div>
 
 </>)
}
export default ApiParametersList;