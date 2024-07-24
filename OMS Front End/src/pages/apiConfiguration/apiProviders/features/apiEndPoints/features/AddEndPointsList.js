/* eslint-disable react-hooks/exhaustive-deps */

import { useState ,useRef ,useEffect} from "react";
import SwalAlert from "../../../../../../services/swalService/SwalService";
import MolGrid from "../../../../../../components/Grid/MolGrid";
import SidebarModel from "../../../../../../components/ui/sidebarModel/SidebarModel";
import { ApiEndPointGridConfig } from "../config/ApiEndPoints.data";
import { useImperativeHandle } from "react";
import ToastService from "../../../../../../services/toastService/ToastService";
import { AppIcons } from "../../../../../../data/appIcons";
import { useDeleteApiEndpointMutation,useGetApiEndpointsMutation,} from "../../../../../../app/services/apiEndPointsAPI";
import AddEditApiParameters from "./apiParameters/features/AddEditApiParameters";

let parameterData = {};
const ApiEndPointsList=({handleEditClick,childRef,  providerId,initData})=>{
    const molGridRef = useRef();
    const endpointId=initData.endpointId;
     const [listData, setListData] = useState();
    const [totalRowCount, setTotalRowCount] = useState(0);
    const { confirm } = SwalAlert();
    const [isModelOpen, setIsModelOpen] = useState(false);
    
    const [getApiEndpoints,{ isLoading: isApiEndPointsLoading, isSuccess: isApiEndPointsSuccess, data: isApiEndPointsData },] = useGetApiEndpointsMutation();
    const [deleteApiEndpoint,{  isSuccess: isDeleteApiEndpointSuccess, data: isDeleteApiEndpointeData }, ] = useDeleteApiEndpointMutation();


      useEffect(() => {
        if (isDeleteApiEndpointSuccess && isDeleteApiEndpointeData) {
          ToastService.success(isDeleteApiEndpointeData.errorMessage);
          const currentPageObject = molGridRef.current.getCurrentPageObject();
          getLists(currentPageObject,molGridRef.current.generateSortingString());
        }
      }, [isDeleteApiEndpointSuccess, isDeleteApiEndpointeData]);
   
    useEffect(() => {
      if (isApiEndPointsSuccess && isApiEndPointsData) {
        if (isApiEndPointsData) {
          setListData(isApiEndPointsData.dataSource);
          
        }
        if (isApiEndPointsData.totalRecord) {
          setTotalRowCount(isApiEndPointsData.totalRecord);
        }
      }
    }, [isApiEndPointsSuccess, isApiEndPointsData]);

    const getLists = (pageObject,sortingString) => {
      const request = {
        pagination: {
          pageNumber: pageObject.pageNumber,
          pageSize: pageObject.pageSize,
        },
        filters: { searchText: "" },
        sortString: sortingString,
        providerId:providerId,
      };
      getApiEndpoints(request);
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
        onGetData()
      }, []);
    const handleDeleteClick = (data) => {
            confirm( "Delete?", "Are you sure you want to Delete?", "Delete",  "Cancel"
      ).then((confirmed) => {
        if (confirmed) {
          deleteApiEndpoint(data.endpointId);
        }
      });
    };

    useImperativeHandle(childRef, () => ({
        callChildFunction: onGetData
    }));

    const handleParameterAddClick=(data)=>{
   
      parameterData = { ...data }
        setIsModelOpen(!isModelOpen);
    }

    const onSidebarClose = () => {
      setIsModelOpen(false);

   };
   
  const onSuccess = () => {
    setIsModelOpen(true);
    if (childRef.current) {
        childRef.current.callChildFunction();
    }
};

   const actionHandler = {
  "Add Parameter":handleParameterAddClick,
        EDIT: handleEditClick,
       DELETE: handleDeleteClick,    
      };
 return(<>
  <div className="row">
          <div className="col-md-12 table-striped api-provider">
            <MolGrid
              ref={molGridRef}
              configuration={ApiEndPointGridConfig}
              dataSource={listData}
              allowPagination={true}
              pagination={{
                totalCount: totalRowCount,
                pageSize: 10,
                currentPage: 1,
              }}
              onPageChange={handlePageChange}
              onSorting={handleSorting}
              isLoading={isApiEndPointsLoading}
              onActionChange={actionHandler}
            />
          </div>
        </div>
        <SidebarModel
         modalTitle=  "Api Parameter"
         contentClass="content-60"
         onClose={onSidebarClose}
         modalTitleIcon={AppIcons.AddIcon}
         isOpen={isModelOpen}
        
        >
          <AddEditApiParameters
          initData={parameterData}
            onClose={onSidebarClose}
            onSuccess={onSuccess}
            endpointId={endpointId}
            />
        </SidebarModel>
 </>)
}
export default ApiEndPointsList;
