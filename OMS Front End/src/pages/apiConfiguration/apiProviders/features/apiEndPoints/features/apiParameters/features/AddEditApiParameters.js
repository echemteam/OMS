/* eslint-disable react-hooks/exhaustive-deps */

import { useState,useRef,useEffect } from "react";
import PropTypes from "prop-types";
import SwalAlert from "../../../../../../../../services/swalService/SwalService";
import { ApiParameterGridConfig, addEditApiParameterFormData } from "../config/ApiParameter.data";
import { onResetForm } from "../../../../../../../../utils/FormFields/ResetForm/handleResetForm";
import ToastService from "../../../../../../../../services/toastService/ToastService";
import FormCreator from "../../../../../../../../components/Forms/FormCreator";
import Buttons from "../../../../../../../../components/ui/button/Buttons";
import { ApiParametersDataTypes } from "../../../../../../../../utils/Enums/commonEnums";
import { useAddEditApiParameterMutation, useDeleteApiParameterMutation, useGetApiParametersMutation, useLazyGetApiParameterByParameterIdQuery } from "../../../../../../../../app/services/apiParametersAPI";
import FinalMolGrid from "../../../../../../../../components/FinalMolGrid/FinalMolGrid";

const AddEditApiParameters = (props) => {
  
  const apiParameterRef = useRef();
   const [parameterId,setParameterId ]=useState()
   const molGridRef = useRef();
   const [listData, setListData] = useState();
   const [totalRowCount, setTotalRowCount] = useState(0);
   const { confirm } = SwalAlert();

  const [apiParameterFormData, setApiParameterFormData] = useState(addEditApiParameterFormData);
  const [getApiParameterByParameterId,{ isFetching: isGetApiParameterByParameterIdFetching, isSuccess: isGetApiParameterByParameterIdSuccess, data: GetApiParameterByParameterIdData,},] = useLazyGetApiParameterByParameterIdQuery();
  const [getApiParameters,{ isLoading: isGetApiParametersLoading, isSuccess: isGetApiParametersSuccess, data: isGetApiParametersData },] = useGetApiParametersMutation();
  const [deleteApiParameter,{  isSuccess: isDeleteApiParameterSuccess, data: isDeleteApiParameterData },] = useDeleteApiParameterMutation();
 
  const [addEditApiParameter,{  isLoading: isAddEditApiParameterLoading,isSuccess: isAddEditApiParameterSucess,data: allAddEditApiParameterData,}, ] = useAddEditApiParameterMutation();
  useEffect(() => {

    if ( !isGetApiParameterByParameterIdFetching && isGetApiParameterByParameterIdSuccess &&GetApiParameterByParameterIdData ) {
      const newFrom = { ...apiParameterFormData };
      newFrom.initialState = {
        endpointId: GetApiParameterByParameterIdData.endpointId,
        parameterId: GetApiParameterByParameterIdData.parameterId,
        name: GetApiParameterByParameterIdData.name,
        dataType: GetApiParameterByParameterIdData.dataType,
        defaultValue: GetApiParameterByParameterIdData.defaultValue,
        isRequired: GetApiParameterByParameterIdData.isRequired,
      };
      setApiParameterFormData(newFrom);
      setParameterId(GetApiParameterByParameterIdData.parameterId);
    }
  }, [isGetApiParameterByParameterIdFetching, isGetApiParameterByParameterIdSuccess,GetApiParameterByParameterIdData ]);

  useEffect(() => {
    if (parameterId && props.isEdit) {
      getApiParameterByParameterId(parameterId);
    }
  }, [parameterId,props.isEdit]);



  useEffect(() => {
    if (isAddEditApiParameterSucess && allAddEditApiParameterData) {
      onResetForm(addEditApiParameterFormData, setApiParameterFormData, null);
      onGetData();
      ToastService.success(allAddEditApiParameterData.errorMessage);
    }
  }, [isAddEditApiParameterSucess, allAddEditApiParameterData]);

  const handleResetAndClose = () => {
    onResetForm(addEditApiParameterFormData, setApiParameterFormData, null);
    props.onClose();
  };

  useEffect(() => {
    const dropdownField = addEditApiParameterFormData.formFields.find((item) => item.dataField === "dataType" );
    dropdownField.fieldSetting.options = Object.entries(ApiParametersDataTypes).map(([key, value]) => ({
        label: key,
        value:value ,
      })
    );
  }, []);

  const handleAddEditAPIParameters = () => {
  
    const formData = apiParameterRef.current.getFormData();

    if (formData && !parameterId) {
      let request = {
        ...formData,
        endpointId:props.initData.endpointId,
        dataType: formData.dataType.value,
      };
      addEditApiParameter(request);
    } else if (formData && parameterId ) {

      let requestData = {
        ...formData,
        parameterId: parameterId,
        endpointId:props.initData.endpointId,
        dataType:
          formData.dataType && typeof formData.dataType === "object"
            ? formData.dataType.value
            : formData.dataType,
            isRequired: formData.isRequired,
      };
      addEditApiParameter(requestData);
    }
  };

  useEffect(() => {
    if (isDeleteApiParameterSuccess && isDeleteApiParameterData) {
      ToastService.success(isDeleteApiParameterData.errorMessage);
      const currentPageObject = molGridRef.current.getCurrentPageObject();
      getLists(currentPageObject,molGridRef.current.generateSortingString());
    }
  }, [isDeleteApiParameterSuccess, isDeleteApiParameterData]);

  const getLists = (pageObject,sortingString) => {
    const request = {
      pagination: {
        pageNumber: pageObject.pageNumber,
        pageSize: pageObject.pageSize,
      },
      filters: { searchText: "" },
      sortString: sortingString,
      endpointId:props.initData.endpointId,
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
    }, [props.initData.endpointId]);

  useEffect(() => {
     
    if (isGetApiParametersSuccess && isGetApiParametersData) {
      if (isGetApiParametersData) {
        setListData(isGetApiParametersData.dataSource);  
      }
      if (isGetApiParametersData.totalRecord) {
        setTotalRowCount(isGetApiParametersData.totalRecord);
      }
    }
  }, [isGetApiParametersSuccess, isGetApiParametersData]);

  const handleDeleteClick = (data) => {
    confirm("Delete?", "Are you sure you want to Delete?", "Delete", "Cancel"
     ).then((confirmed) => {
      if (confirmed) {
        deleteApiParameter(data.parameterId);
      }
    });
  };

  const handleEditClick=(data)=>{
    getApiParameterByParameterId(data.parameterId);
  }
      const actionHandler = {
         EDIT: handleEditClick,
        DELETE: handleDeleteClick,    
      };


  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-12 mt-2">
            <div className="row vertical-form">
              <FormCreator
                ref={apiParameterRef}
                config={apiParameterFormData}
                {...apiParameterFormData}
              />
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="d-flex align-item-center justify-content-end mb-2">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText={props.isEdit ? "Update" : "Save"}
                onClick={handleAddEditAPIParameters}
               isLoading={isAddEditApiParameterLoading}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
                onClick={handleResetAndClose}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 table-striped api-provider">
            <FinalMolGrid
              ref={molGridRef}
            configuration={ApiParameterGridConfig}
              dataSource={listData}
              allowPagination={true}
              pagination={{
               totalCount: totalRowCount,
                pageSize: 10,
                currentPage: 1,
              }}
              onPageChange={handlePageChange}
              onSorting={handleSorting}
              isLoading={isGetApiParametersLoading}
              onActionChange={actionHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};
AddEditApiParameters.propTypes = {
  isEdit: PropTypes.bool,
  initData: PropTypes.shape({
    endpointId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddEditApiParameters;
