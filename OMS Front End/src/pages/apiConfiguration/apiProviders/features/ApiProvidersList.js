import { useRef ,useState,useEffect} from "react";
import MolGrid from "../../../../components/Grid/MolGrid";
import SwalAlert from "../../../../services/swalService/SwalService";
import { useDeleteApiProviderMutation, useGetApiProvidersMutation } from "../../../../app/services/apiProviderAPI";
import ToastService from "../../../../services/toastService/ToastService";
import { ApiProvidersGridConfig,  } from "../config/ApiProviders.data";
import { useImperativeHandle } from "react";


const ApiProvidersList=({handleEditClick,childRef})=>{
    const molGridRef = useRef();
    const [listData, setListData] = useState();
    const [totalRowCount, setTotalRowCount] = useState(0);

    const { confirm } = SwalAlert();
 
    const [getApiProviders,{ isLoading: isApiProvidersLoading, isSuccess: isApiProvidersSuccess, data: isApiProviderseData },] = useGetApiProvidersMutation();
    const [deleteApiProvider,{  isSuccess: isDeleteProviderSuccess, data: isDeleteProvidereData },] = useDeleteApiProviderMutation();

    useEffect(() => {
      if (isDeleteProviderSuccess && isDeleteProvidereData) {
        ToastService.success(isDeleteProvidereData.errorMessage);
        const currentPageObject = molGridRef.current.getCurrentPageObject();
        getLists(currentPageObject,molGridRef.current.generateSortingString());
      }
    }, [isDeleteProviderSuccess, isDeleteProvidereData]);

    const getLists = (pageObject,sortingString) => {
      const request = {
        pagination: {
          pageNumber: pageObject.pageNumber,
          pageSize: pageObject.pageSize,
        },
        filters: { searchText: "" },
        sortString: sortingString
      };
      getApiProviders(request);
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
  
    useEffect(() => {
      if (isApiProvidersSuccess && isApiProviderseData) {
        if (isApiProviderseData) {
          setListData(isApiProviderseData.dataSource);  
        }
        if (isApiProviderseData.totalRecord) {
          setTotalRowCount(isApiProviderseData.totalRecord);
        }
      }
    }, [isApiProvidersSuccess, isApiProviderseData]);
  
    
    
  const handleDeleteClick = (data) => {
    confirm("Delete?", "Are you sure you want to Delete?", "Delete", "Cancel"
     ).then((confirmed) => {
      if (confirmed) {
        deleteApiProvider(data.providerId);
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
              configuration={ApiProvidersGridConfig}
              dataSource={listData}
              allowPagination={true}
              pagination={{
               totalCount: totalRowCount,
                pageSize: 20,
                currentPage: 1,
              }}
              onPageChange={handlePageChange}
              onSorting={handleSorting}
              isLoading={isApiProvidersLoading}
              onActionChange={actionHandler}
            />
          </div>
        </div>
</>)
}
export default ApiProvidersList;