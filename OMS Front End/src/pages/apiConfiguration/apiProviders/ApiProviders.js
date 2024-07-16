import { useRef, useState } from "react";
import MolGrid from "../../../components/Grid/MolGrid";
import CardSection from "../../../components/ui/card/CardSection";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import { ApiProvidersGridConfig, addEditApiProviderFormData } from "./config/ApiProviders.data";
import AddEditApiProviders from "./features/AddEditApiProviders";
import { AppIcons } from "../../../data/appIcons";
import { useEffect } from "react";
import { useDeleteApiProviderMutation, useGetApiProvidersMutation } from "../../../app/services/apiProviderAPI";
import ToastService from "../../../services/toastService/ToastService";
import SwalAlert from "../../../services/swalService/SwalService";
import { onResetForm } from "../../../utils/FormFields/ResetForm/handleResetForm";

const ApiProviders=()=>{
    const molGridRef = useRef();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [listData, setListData] = useState();
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const { confirm } = SwalAlert();
    const [formData, setFormData] = useState(addEditApiProviderFormData);
    const [getApiProviders,{ isLoading: isApiProvidersLoading, isSuccess: isApiProvidersSuccess, data: isApiProviderseData },] = useGetApiProvidersMutation();
    const [deleteApiProvider,{  isSuccess: isDeleteProviderSuccess, data: isDeleteProvidereData },] = useDeleteApiProviderMutation();

    useEffect(() => {
      if (isDeleteProviderSuccess && isDeleteProvidereData) {
        ToastService.success(isDeleteProvidereData.errorMessage);
        const currentPageObject = molGridRef.current.getCurrentPageObject();
        getLists(currentPageObject);
      }
    }, [isDeleteProviderSuccess, isDeleteProvidereData]);

    const getLists = (pageObject) => {
      const request = {
        pagination: {
          pageNumber: pageObject.pageNumber,
          pageSize: pageObject.pageSize,
        },
        filters: { searchText: "" },
      };
      getApiProviders(request);
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
    const handleToggleModal = () => {
        setIsModelOpen(true);
      };
      const onSidebarClose = () => {
         setIsModelOpen(false);
      };
    
      const handleEditClick = (data) => {
        onResetForm(addEditApiProviderFormData,setFormData, null);
     setIsModelOpen(true);
     setFormData(data);
     setIsEdit(true);        
      };
      const listDataGet = () => {
        const currentPageObject = molGridRef.current.getCurrentPageObject();
        getLists(currentPageObject);
      };
    
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
              configuration={ApiProvidersGridConfig}
              dataSource={listData}
              allowPagination={true}
              pagination={{
               totalCount: totalRowCount,
                pageSize: 20,
                currentPage: 1,
              }}
              onPageChange={handlePageChange}
              isLoading={isApiProvidersLoading}
              onActionChange={actionHandler}
            />
          </div>
        </div>
      </CardSection>
      
        <SidebarModel
         modalTitle= "Add API Provider"
         contentClass="content-40"
         onClose={onSidebarClose}
         modalTitleIcon={AppIcons.AddIcon}
         isOpen={isModelOpen}
        >
          <AddEditApiProviders 
           isEdit={isEdit}
          initData={formData}
          listDataGet={listDataGet}
          onClose={onSidebarClose}
          />
        </SidebarModel>
    </div>
    </>)

}
export default ApiProviders;