import { useRef,useEffect ,useState} from "react";
import { useDeleteApiEndpointMutation, useGetApiEndpointsMutation } from "../../../../app/services/apiEndPointsAPI";
import MolGrid from "../../../../components/Grid/MolGrid";
import { ApiEndPointGridConfig } from "../config/ApiEndPoints.data";
import SwalAlert from "../../../../services/swalService/SwalService";
import ToastService from "../../../../services/toastService/ToastService";
import { useImperativeHandle } from "react";


const ApiEndPointsList=({handleEditClick,childRef})=>{
    const molGridRef = useRef();
     const [listData, setListData] = useState();
    const [totalRowCount, setTotalRowCount] = useState(0);
  
    const { confirm } = SwalAlert();
    
    const [getApiEndpoints,{ isLoading: isApiEndPointsLoading, isSuccess: isApiEndPointsSuccess, data: isApiEndPointseData },] = useGetApiEndpointsMutation();
    const [deleteApiEndpoint,{  isSuccess: isDeleteApiEndpointSuccess, data: isDeleteApiEndpointeData }, ] = useDeleteApiEndpointMutation();


      useEffect(() => {
        if (isDeleteApiEndpointSuccess && isDeleteApiEndpointeData) {
          ToastService.success(isDeleteApiEndpointeData.errorMessage);
          const currentPageObject = molGridRef.current.getCurrentPageObject();
          getLists(currentPageObject,molGridRef.current.generateSortingString());
        }
      }, [isDeleteApiEndpointSuccess, isDeleteApiEndpointeData]);
   
    useEffect(() => {
      if (isApiEndPointsSuccess && isApiEndPointseData) {
        if (isApiEndPointseData) {
          setListData(isApiEndPointseData.dataSource);
          
        }
        if (isApiEndPointseData.totalRecord) {
          setTotalRowCount(isApiEndPointseData.totalRecord);
        }
      }
    }, [isApiEndPointsSuccess, isApiEndPointseData]);

    const getLists = (pageObject,sortingString) => {
      const request = {
        pagination: {
          pageNumber: pageObject.pageNumber,
          pageSize: pageObject.pageSize,
        },
        filters: { searchText: "" },
        sortString: sortingString
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

   const actionHandler = {
        EDIT: handleEditClick,
       DELETE: handleDeleteClick,    
      };
 return(<>
  <div className="row">
          <div className="col-md-12 table-striped">
            <MolGrid
              ref={molGridRef}
              configuration={ApiEndPointGridConfig}
              dataSource={listData}
              allowPagination={true}
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
 </>)
}
export default ApiEndPointsList;
