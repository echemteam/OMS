/* eslint-disable react-hooks/exhaustive-deps */

import { useState ,useRef ,useEffect,useImperativeHandle} from "react";
import PropTypes from "prop-types";
import SwalAlert from "../../../../../../services/swalService/SwalService";
import SidebarModel from "../../../../../../components/ui/sidebarModel/SidebarModel";
import { ApiEndPointGridConfig } from "../config/ApiEndPoints.data";
import ToastService from "../../../../../../services/toastService/ToastService";
import { AppIcons } from "../../../../../../data/appIcons";
import { useDeleteApiEndpointMutation,useGetApiEndpointsMutation,} from "../../../../../../app/services/apiEndPointsAPI";
import AddEditApiParameters from "./apiParameters/features/AddEditApiParameters";
import FinalMolGrid from "../../../../../../components/FinalMolGrid/FinalMolGrid";

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
      ADDPARAMETERS:handleParameterAddClick,
        EDIT: handleEditClick,
       DELETE: handleDeleteClick,    
      };
 return(<>
  <div className="row">
          <div className="col-md-12 table-striped api-provider api-management">
            <FinalMolGrid
              ref={molGridRef}
              configuration={ApiEndPointGridConfig}
              dataSource={listData}
              allowPagination={false}
              pagination={{
                totalCount: totalRowCount,
                pageSize: 20,
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

ApiEndPointsList.propTypes = {
  handleEditClick: PropTypes.func.isRequired,
  providerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  initData: PropTypes.shape({
      endpointId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  childRef: PropTypes.shape({
    current: PropTypes.shape({
      callChildFunction: PropTypes.func,
    }),
  }),
};
export default ApiEndPointsList;
