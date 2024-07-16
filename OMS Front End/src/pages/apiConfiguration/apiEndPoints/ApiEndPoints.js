import { useState } from "react";
import { useRef } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import MolGrid from "../../../components/Grid/MolGrid";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../data/appIcons";
import AddEditApiEndPoints from "./features/AddEditApiEndPoints";
import { ApiEndPointGridConfig, addEditApiEndPointsFormData } from "./config/ApiEndPoints.data";
import { useEffect } from "react";
import { useDeleteApiEndpointMutation, useGetApiEndpointsMutation } from "../../../app/services/apiEndPointsAPI";
import SwalAlert from "../../../services/swalService/SwalService";
import ToastService from "../../../services/toastService/ToastService";
import { onResetForm } from "../../../utils/FormFields/ResetForm/handleResetForm";

const ApiEndPoints=()=>{
    const molGridRef = useRef();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [listData, setListData] = useState();
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const { confirm } = SwalAlert();
    const [formData, setFormData] = useState(addEditApiEndPointsFormData);
    const [getApiEndpoints,{ isLoading: isApiEndPointsLoading, isSuccess: isApiEndPointsSuccess, data: isApiEndPointseData },] = useGetApiEndpointsMutation();
    const [deleteApiEndpoint,{  isSuccess: isDeleteApiEndpointSuccess, data: isDeleteApiEndpointeData }, ] = useDeleteApiEndpointMutation();

    const handleToggleModal = () => {
        setIsModelOpen(true);
      };

      useEffect(() => {
        if (isDeleteApiEndpointSuccess && isDeleteApiEndpointeData) {
          ToastService.success(isDeleteApiEndpointeData.errorMessage);
          const currentPageObject = molGridRef.current.getCurrentPageObject();
          getLists(currentPageObject);
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

    const getLists = (pageObject) => {
      const request = {
        pagination: {
          pageNumber: pageObject.pageNumber,
          pageSize: pageObject.pageSize,
        },
        filters: { searchText: "" },
      };
      getApiEndpoints(request);
    };

    const handlePageChange = (page) => {
      getLists(page);
    };
    useEffect(() => {
      if (molGridRef.current) {
        const defaultPageObject = molGridRef.current.getCurrentPageObject();
        getLists(defaultPageObject);
      }
    }, []);

    const handleDeleteClick = (data) => {
   confirm( "Delete?", "Are you sure you want to Delete?", "Delete",  "Cancel"
      ).then((confirmed) => {
        if (confirmed) {
          deleteApiEndpoint(data.endpointId);
        }
      });
    };

    const handleEditClick = (data) => {
      onResetForm(addEditApiEndPointsFormData,setFormData, null);
      setIsModelOpen(true);
      setFormData(data);
      setIsEdit(true);     
     };

    const listDataGet = () => {
       const currentPageObject = molGridRef.current.getCurrentPageObject();
        getLists(currentPageObject);
   };
   const onSidebarClose = () => {
         setIsModelOpen(false);
      };
   const actionHandler = {
        EDIT: handleEditClick,
       DELETE: handleDeleteClick,    
      };
return(<>
  <div>
      <CardSection
        cardTitle="API Providers"
        buttonClassName="btn theme-button"
       // rightButton={buttonVisible ? true : false}
        rightButton={ true }
        buttonText="Add"
       textWithIcon={true}
       iconImg={AppIcons.PlusIcon}
       titleButtonClick={handleToggleModal}
      >
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
              isLoading={isApiEndPointsLoading}
              onActionChange={actionHandler}
            />
          </div>
        </div>
      </CardSection>
      
        <SidebarModel
         modalTitle= "Add API EndPoints"
         contentClass="content-40"
         onClose={onSidebarClose}
         modalTitleIcon={AppIcons.AddIcon}
         isOpen={isModelOpen}
        >
          <AddEditApiEndPoints
            isEdit={isEdit}
            listDataGet={listDataGet}
         initData={formData}
        onClose={onSidebarClose}
          />
        </SidebarModel>
    </div></>)
}
export default ApiEndPoints